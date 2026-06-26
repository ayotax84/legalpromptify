// Phase 2: AI-powered legal document generation via Lovable AI Gateway.
// - JWT verified in code (verify_jwt = false in config)
// - Zod-validated input
// - Two-pass generation: draft -> Chain-of-Verification review
// - Returns clean HTML ready to render

import { createClient } from "npm:@supabase/supabase-js@2.45.0";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { z } from "npm:zod@3.23.8";

const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_PUBLISHABLE_KEY") ?? Deno.env.get("SUPABASE_ANON_KEY")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const BodySchema = z.object({
  documentType: z.string().min(1).max(80),
  title: z.string().min(1).max(200),
  jurisdiction: z.string().min(1).max(80),
  templateSlug: z.string().min(1).max(80).optional(),
  formData: z.record(z.unknown()),
  additionalInstructions: z.string().max(2000).optional(),
});

const SYSTEM_PROMPT = `You are a senior contracts attorney drafting professional, jurisdiction-appropriate legal documents.

Output requirements:
- Return ONLY clean semantic HTML (no <html>, <head>, <body>, no markdown fences).
- Wrap the entire document in <div class="document-container">.
- Use <h1> for the title (centered, uppercase), <h2> for section headings (numbered: "1.", "2."), <p> for paragraphs.
- Include defined-term parties in bold, recitals, all standard clauses appropriate to the document type and jurisdiction (governing law, severability, entire agreement, notices, etc.), and a signature block (two columns using <div class="signature-block">).
- Substitute every provided field value. Do not invent party names, addresses, or dates not supplied.
- Use formal legal English. Avoid placeholders like [TBD] unless the field is genuinely blank.
- Tailor mandatory clauses to the jurisdiction (US, UK, EU member state).`;

async function callGateway(messages: Array<{ role: string; content: string }>) {
  const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Lovable-API-Key": LOVABLE_API_KEY!,
    },
    body: JSON.stringify({
      model: "google/gemini-3-flash-preview",
      messages,
    }),
  });

  if (res.status === 429) {
    return { error: "rate_limited", status: 429, message: "AI rate limit reached. Please try again shortly." };
  }
  if (res.status === 402) {
    return { error: "credits_exhausted", status: 402, message: "AI credits exhausted. Add credits in Lovable Cloud." };
  }
  if (!res.ok) {
    const txt = await res.text();
    return { error: "gateway_error", status: res.status, message: txt };
  }

  const json = await res.json();
  const content = json?.choices?.[0]?.message?.content ?? "";
  return { content };
}

function stripFences(html: string): string {
  return html
    .replace(/^```(?:html)?\s*/i, "")
    .replace(/```\s*$/i, "")
    .trim();
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    if (!LOVABLE_API_KEY) {
      return new Response(JSON.stringify({ error: "missing_api_key" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // JWT verification
    const authHeader = req.headers.get("Authorization") ?? "";
    const token = authHeader.replace(/^Bearer\s+/i, "");
    if (!token) {
      return new Response(JSON.stringify({ error: "unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: { headers: { Authorization: `Bearer ${token}` } },
    });
    const { data: userData, error: userErr } = await supabase.auth.getUser(token);
    if (userErr || !userData?.user) {
      return new Response(JSON.stringify({ error: "unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Input validation
    const parsed = BodySchema.safeParse(await req.json());
    if (!parsed.success) {
      return new Response(
        JSON.stringify({ error: "invalid_input", details: parsed.error.flatten().fieldErrors }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }
    const { documentType, title, jurisdiction, templateSlug, formData, additionalInstructions } = parsed.data;

    // Load template-specific guidance (prompt_template + required_clauses) using
    // service role because those columns are restricted from end users.
    let templatePrompt = "";
    let requiredClauses: string[] = [];
    if (templateSlug) {
      const admin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
      const { data: tmpl } = await admin
        .from("templates")
        .select("prompt_template, required_clauses")
        .eq("slug", templateSlug)
        .eq("is_active", true)
        .maybeSingle();
      if (tmpl) {
        templatePrompt = (tmpl.prompt_template as string) ?? "";
        requiredClauses = (tmpl.required_clauses as string[]) ?? [];
      }
    }

    const clausesBlock = requiredClauses.length
      ? `\nRequired clauses (include each one as a numbered section):\n- ${requiredClauses.join("\n- ")}\n`
      : "";

    // Pass 1: draft
    const draftUserPrompt = `Draft a ${documentType} titled "${title}" governed by ${jurisdiction} law.

${templatePrompt ? `Template guidance:\n${templatePrompt}\n` : ""}${clausesBlock}
Party and clause data (JSON):
${JSON.stringify(formData, null, 2)}

${additionalInstructions ? `Additional instructions:\n${additionalInstructions}\n` : ""}
Return ONLY the HTML document.`;

    const draft = await callGateway([
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: draftUserPrompt },
    ]);
    if ("error" in draft) {
      return new Response(JSON.stringify(draft), {
        status: draft.status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const draftHtml = stripFences(draft.content);

    // Pass 2: Chain-of-Verification — review and improve.
    const review = await callGateway([
      { role: "system", content: SYSTEM_PROMPT },
      {
        role: "user",
        content: `Review the following ${documentType} draft for legal completeness under ${jurisdiction} law.
Verify every required clause for this document type is present, defined terms are consistent, party names match throughout, and the signature block is complete.
Return the corrected, final HTML document (same format rules apply). Do not add commentary.

DRAFT:
${draftHtml}`,
      },
    ]);
    if ("error" in review) {
      // Fall back to the draft if verification fails non-fatally.
      return new Response(JSON.stringify({ html: draftHtml, verified: false }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const finalHtml = stripFences(review.content);

    // Log usage
    await supabase.from("usage_events").insert({
      user_id: userData.user.id,
      event_type: "document_generated",
      metadata: { documentType, jurisdiction, title },
    });

    return new Response(JSON.stringify({ html: finalHtml, verified: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-document error:", e);
    return new Response(JSON.stringify({ error: "internal_error", message: String(e) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

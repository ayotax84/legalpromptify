# Production Readiness Plan — AI Legal Document Generator

Built using a layered prompt-engineering framework (RACE: Role · Action · Context · Expectations) combined with Chain-of-Verification and Self-Consistency for legal output quality. The plan below is what I will execute in build mode, in order.

---

## Phase 1 — Backend Foundation (Lovable Cloud)

Enable Lovable Cloud to replace all `localStorage` auth and mock data.

1. **Auth**
   - Email/password + Google sign-in
   - Real `SignIn`, `SignUp`, `/reset-password` pages wired to Cloud
   - `AuthGuard` reads live session (`onAuthStateChange` + `getUser`)
2. **Database schema** (with RLS + GRANTs)
   - `profiles` (id, full_name, company, avatar_url, plan)
   - `user_roles` + `app_role` enum + `has_role()` security-definer fn
   - `documents` (id, user_id, type, title, status, content_html, form_data jsonb, jurisdiction, created_at, updated_at)
   - `templates` (id, slug, name, category, jurisdictions[], schema jsonb, prompt_template, is_premium)
   - `document_versions` (history / audit trail)
   - `subscriptions` (plan, status, period_end, stripe_customer_id)
   - `usage_events` (for plan limits + analytics)
3. **Storage bucket** `documents/` for generated PDFs (private, signed URLs)

## Phase 2 — Real AI Generation Pipeline

Replace the hard-coded HTML generator with Lovable AI Gateway.

Edge functions:
- `generate-document` — streams draft from `google/gemini-3-flash-preview` using a structured prompt (Role: senior contracts attorney; Context: jurisdiction + party data; Expectations: clause-by-clause JSON → rendered HTML). Uses Chain-of-Verification: second pass validates required clauses are present.
- `review-document` — risk/quality review pass, returns flagged clauses + suggestions.
- `summarize-document` — plain-English summary.
- `chat-with-document` — Q&A over a saved doc (streaming).

All functions: CORS, Zod validation, JWT verification in code, rate-limit per user, 402/429 surfaced in UI.

## Phase 3 — Template System

- Seed `templates` table with structured JSON schemas for: NDA (mutual/one-way), Employment, Service/Consulting, Independent Contractor, Freelance, Privacy Policy, Terms of Service, Rental/Lease, Sales, Partnership, Non-Compete, MSA + SOW.
- Each template: field schema (drives `DocumentForm` dynamically), jurisdiction variants, required clauses list (used by verification pass).
- Admin-only template editor page gated by `has_role('admin')`.

## Phase 4 — PDF + Export

- `render-pdf` edge function using a headless renderer (pdf-lib or @react-pdf via npm:) → uploads to Storage → returns signed URL.
- DOCX export via `docx` npm package.
- Branded cover page, page numbers, signature blocks.

## Phase 5 — E-Signature (lightweight)

- Generate signing link per party (token in `document_signatures` table).
- Public `/sign/:token` page — typed/drawn signature, IP + timestamp + UA captured (audit trail).
- Final signed PDF re-rendered and locked.

## Phase 6 — Payments (Stripe via Lovable)

- Plans: Free (3 docs/mo), Professional, Business.
- `check-subscription`, `create-checkout`, `customer-portal` edge functions.
- Plan-based gating enforced server-side in `generate-document` using `usage_events`.

## Phase 7 — UX polish & dashboard upgrades

- Dashboard: real document list, filters, search, status chips, duplicate, delete (soft), version history viewer.
- DocumentViewer: inline edit, AI "improve this clause" selection menu, comments.
- Toast + skeleton loaders everywhere; optimistic updates.
- Empty/error states for every async surface.

## Phase 8 — Security, Compliance, Trust

- RLS audit (owner-only on documents/versions/signatures; admin via `has_role`).
- Zod validation on every form + every edge function input.
- HIBP leaked-password check enabled.
- `/privacy`, `/terms`, `/security` pages with accurate, app-owned content + disclaimer that generated output is not legal advice.
- Security scan run; fix all critical findings before publish.

## Phase 9 — SEO, Analytics, Observability

- Per-page title/meta/OG/Twitter, JSON-LD (SoftwareApplication + FAQPage on pricing).
- `sitemap.xml`, `robots.txt`, canonical tags.
- Lightweight analytics events table + funnel (signup → first doc → export → upgrade).
- Edge-function logging + 402/429 user-facing error surfaces.

## Phase 10 — QA & Launch

- Playwright smoke flow: signup → generate NDA → export PDF → upgrade → sign.
- Lighthouse pass (perf/SEO/a11y > 90).
- Publish with proper site metadata + favicon.

---

## Technical notes

- Chat model default: `google/gemini-3-flash-preview` via `@ai-sdk/openai-compatible` and `https://ai.gateway.lovable.dev/v1` with header `Lovable-API-Key`.
- Roles never stored on `profiles`; always on `user_roles` + `has_role()`.
- Every `CREATE TABLE public.*` migration includes GRANTs then RLS then policies.
- No raw SQL via RPC; typed client only.
- Secrets: `LOVABLE_API_KEY` auto, `STRIPE_SECRET_KEY` via Stripe enablement flow.

---

## Self-engineered execution prompt (what I will follow in build mode)

> **Role:** Senior full-stack engineer + legal-tech product lead.
> **Action:** Ship phases 1→10 in order, one phase per turn batch, verifying each before moving on.
> **Context:** Existing React/Vite/Tailwind/shadcn codebase with mock auth and static templates; switching to Lovable Cloud + Lovable AI.
> **Expectations:**
> 1. Every backend change ships with RLS + GRANTs + Zod validation.
> 2. Every AI call runs server-side with a verification pass and surfaces 402/429.
> 3. No regressions to current public pages; preserve design system tokens.
> 4. After each phase: build green, manual or Playwright check of the critical path, brief status to user.
> 5. Stop and ask only when a decision is irreversible (plan tiers, jurisdictions to launch with, e-sign legal scope).

---

## Decisions I need from you before starting Phase 1

1. **Profiles needed?** Default yes (name, company, plan) — confirm or expand.
2. **Auth methods:** Email/password + Google (default) — add Apple or SAML?
3. **Launch jurisdictions:** start with US (all states generic) + UK + EU, or narrower?
4. **E-signature scope:** lightweight in-app signing (above) vs integrate DocuSign later?

Reply with answers (or "use defaults") and I'll switch to build mode starting Phase 1.
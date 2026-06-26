## Phase 3 — Template Library & Admin Governance

### 1. Seed 12 jurisdiction-aware templates
Insert 8 new templates alongside existing 4 (NDA, Employment, Service, Privacy Policy). Each gets a structured `field_schema` (JSONB), `required_clauses[]`, and a tailored `prompt_template`.

New templates:
- Independent Contractor Agreement (Commercial)
- Consulting Agreement (Commercial)
- Master Services Agreement / SOW (Commercial, premium)
- Residential Lease Agreement (Real Estate)
- Terms of Service (Compliance)
- Cookie Policy (Compliance)
- Cease & Desist Letter (Disputes)
- Software License Agreement / EULA (IP, premium)

All carry `jurisdictions: ['US','UK','EU']`.

### 2. Dynamic field schema format
Store `field_schema` as JSON Schema-lite:
```json
{
  "sections": [
    { "title": "Parties",
      "fields": [
        { "name": "disclosingParty", "label": "Disclosing Party", "type": "text", "required": true },
        { "name": "jurisdiction", "label": "Jurisdiction", "type": "select",
          "options": ["United States","United Kingdom","European Union"], "required": true }
      ]
    }
  ]
}
```
Field types supported: text, textarea, date, number, select, checkbox.

### 3. Admin governance
- Add `/admin/templates` route (guarded by `AuthGuard` + role check via `has_role`).
- List, create, edit, archive (toggle `is_active`) templates.
- New `useIsAdmin()` hook calling `has_role` RPC.
- Add a "Make me admin" one-click bootstrap on the admin page when no admin exists yet (server-side check via RPC + edge function `bootstrap-admin`).

### 4. DB-driven frontend
- Rewrite `src/pages/Templates.tsx` to fetch from `templates` table (no hardcoded list), with search + category filter from DB.
- Rewrite `src/components/DocumentForm.tsx` to render dynamically from `field_schema` instead of three hardcoded zod schemas. Validation built at runtime from schema.
- `src/pages/GeneratorPage.tsx` loads template by slug from DB and passes the schema to the dynamic form.

### 5. Edge function uses stored prompts
- Add `bootstrap-admin` edge function (one-time, no-op if any admin exists).
- Update `generate-document` to fetch the template's `prompt_template` and `required_clauses` server-side (service role) and inject them into the system prompt for higher accuracy.

### 6. Files touched
New:
- `src/pages/AdminTemplates.tsx`
- `src/components/admin/TemplateEditor.tsx`
- `src/hooks/useIsAdmin.tsx`
- `supabase/functions/bootstrap-admin/index.ts`

Edited:
- `src/pages/Templates.tsx` (DB-driven)
- `src/components/DocumentForm.tsx` (schema-driven)
- `src/pages/GeneratorPage.tsx` (load template by slug)
- `src/App.tsx` (admin route)
- `src/components/Navbar.tsx` (Admin link for admins)
- `supabase/functions/generate-document/index.ts` (read template from DB)

DB:
- Insert 8 templates + backfill `field_schema` / `required_clauses` for existing 4.

### Out of scope (saved for later phases)
- PDF/DOCX export (Phase 5)
- E-signature workflow (Phase 7)
- Stripe gating of premium templates (Phase 6) — the `is_premium` flag is stored but not yet enforced.

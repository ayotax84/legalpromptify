
-- Restrict raw signature token column to backend only (edge functions via service_role).
REVOKE SELECT (token) ON public.document_signatures FROM anon, authenticated;

-- Restrict proprietary prompt_template column to backend only.
REVOKE SELECT (prompt_template) ON public.templates FROM anon, authenticated;

# EUF pro — independent copy rules

- Keep interface translations in the shared language catalog and expose them through LanguageProvider so all pages share the selected language.
- Preserve official French exam extracts, prompts and preparatory guide source content in French with explicit left-to-right direction so language changes cannot alter examination material.
- Use manifest-only home-screen installation with public icons and a shared install control; do not add service workers or offline caching unless offline use is requested.
- Essay evaluation and literature-professor guidance use direct OpenAI Responses through dynamically imported server-only providers with OPENAI_API_KEY and optional AI_MODEL, keeping credentials private; neither returns corrected answers nor rewritten text.
- Accounts, roles, allowances, progress records and professor entitlements live in an external Supabase project; keep tables in public with owner-scoped RLS, keep roles in a separate protected user_roles table, and verify administrator and professor access server-side.
- Reserve evaluation allowances atomically in PostgreSQL before AI calls and confirm delivery only after durable storage; a failed evaluation must never consume an attempt.
- Build with Vite and Nitro (node_server by default, NITRO_PRESET=vercel for Vercel); keep server credentials in runtime environment variables, never with the VITE_ prefix.

- Literature tutoring uses a separate owner-readable privileged-write usage ledger; reserve access before AI and atomically save feedback and complete usage, releasing failures. Free access and paid entitlements stay separate from exam allowances.

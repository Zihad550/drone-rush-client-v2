# CLAUDE.md

Guidance for Claude Code when working in `drone-rush-client-v2`.

## Design system — DroneRush v2

All UI work follows the v2 design system in
`resources/dronerush-v2-design-guidelines-html/`. Key conventions:

- **Colors:** `dr-` tokens only (`dr-red`, `dr-surface`, `dr-field`, `dr-text` /
  `dr-text-2` / `dr-text-3`, `dr-bd-1..4`). Dark-first with a light theme.
- **Fonts:** `font-chakra` (display/titles), `font-poppins` (sub-heads, buttons,
  labels), `font-dm-mono` (uppercase eyebrows/spec labels, tracked ~0.18–0.22em),
  default body = DM Sans.
- **Section header motif:** a 2px red bar + mono uppercase eyebrow above a Chakra
  Petch title. Reuse `DashboardPageHeader` for dashboard pages.
- **Cards:** `rounded-[16px] border border-dr-bd-1 bg-dr-surface`, hover
  `border-dr-red/30`. Primary CTA uses the `dr-red-grad` class.

## Backend contract — the server is a separate repo

The API lives in the sibling repo **`../drone-rush-server`** (Express + MongoDB).
This client does not own the backend.

**When a task needs a backend endpoint that does not exist yet:**

1. Verify it's actually missing — check `../drone-rush-server/src/app/routes/index.ts`
   and the relevant module's `*.route.ts`.
2. Wire the client side against the intended endpoint anyway (service in
   `src/services/**`) and add a graceful fallback so the UI still renders.
3. **Document the required endpoint** in
   `../drone-rush-server/REQUIRED_ENDPOINTS.md` — method, path, auth, response
   shape (match the client `IUser`/type it maps to), and which page needs it.
4. Mention it in the summary so the backend can implement it.

Do the same for **every future task**: any new/changed endpoint the client
depends on must be recorded in `../drone-rush-server/REQUIRED_ENDPOINTS.md`.

Note: the access-token JWT payload only carries `{ id, role }` — `name`, `email`,
`phone`, `address` are **not** in the token; fetch them from the API.

## Tooling

- Lint/format: `pnpm lint` / `pnpm lint:format` (Biome).
- Typecheck: `npx tsc --noEmit`.

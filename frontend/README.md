# URL Shortener Frontend (Next.js 16)

Production-grade frontend for the URL Shortener backend using:
- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS + shadcn/ui-style components
- Zustand state management
- Axios API client
- React Hook Form + Zod validation

## Quick Start

1. Install dependencies:

```bash
pnpm install
```

2. Configure environment:

```bash
cp .env.example .env.local
```

3. Ensure backend API is running at `http://localhost:3000` (or update `NEXT_PUBLIC_API_URL`).

4. Start the frontend:

```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) (or your configured frontend port).

## Scripts

```bash
pnpm dev
pnpm lint
pnpm typecheck
pnpm build
pnpm start
```

## Project Structure

```text
src/
├── app/                 # Next.js App Router pages/layouts
├── components/          # UI + feature components
├── features/            # entities → use-cases → adapters
├── hooks/               # Custom hooks for store consumption
├── lib/                 # API client, utils, validations
├── stores/              # Zustand stores
├── styles/              # Theme styles
└── types/               # Shared API/error types
```

## API Contract Coverage

Implemented endpoints:
- `POST /user/signup`
- `POST /user/login`
- `POST /shorten`
- `GET /codes`
- `PATCH /:id`
- `DELETE /:id`
- `GET /:shortCode` (client-side redirect page)

## Notes

- Auth token is stored in `localStorage` and mirrored to a cookie for middleware-based route protection.
- Axios is used for all backend requests with centralized typed error parsing.
- Frontend validation mirrors backend rules using Zod schemas.

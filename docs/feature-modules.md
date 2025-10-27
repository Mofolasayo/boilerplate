# Feature module workflow

Phase 5 adds reusable building blocks for feature dashboards:

- `src/components/layout/filter-toolbar.tsx` – search + action toolbar shared across index pages.
- `src/components/layout/data-card.tsx` & `data-grid.tsx` – present at-a-glance metrics using Shadcn cards and Lucide icons.
- `src/components/layout/data-table.tsx` – opinionated wrapper around TanStack Table with pagination controls.
- `src/features/accounts/components/account-table.tsx` – feature-specific wiring of the generic table to account data.
- `src/app/(dashboard)/accounts` – reference screen combining metrics, filters, and the account table via the `useAccounts` hook.

When adding a new feature:

1. **Service layer** – expose repositories and service functions under `src/features/<feature>/api`.
2. **API route** – create a Hono router under `src/app/api/<feature>` and mount it in `[[...route]]/route.ts`.
3. **Hooks** – add React Query hooks under `src/features/<feature>/hooks` that call the typed Hono client.
4. **UI** – assemble screens using the shared layout components plus feature-specific tables/cards. Gate the screen with `getFeatureFlag`/`useFeatureFlag` if you want staged rollouts.
5. **Invalidation** – reuse the `queryKey` naming convention so mutations can call `queryClient.invalidateQueries({ queryKey: [...] })`.

Following this pattern keeps concerns separated while making new dashboard sections quick to spin up.

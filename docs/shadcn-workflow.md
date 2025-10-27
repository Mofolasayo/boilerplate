# Shadcn UI Workflow

This project ships with Shadcn UI preconfigured inside `apps/web`. Keep the workflow consistent by following these steps:

1. **Generate components via CLI**

   ```bash
   cd apps/web
   npx shadcn@latest add <component-name>
   ```

   Components are emitted to `src/components/ui`. The CLI respects the aliases defined in `apps/web/components.json`.

2. **Prefer single-source primitives**
   - Shared UI lives under `src/components/ui`.
   - Feature-specific wrappers should be placed in `src/components/<feature>` and compose primitives rather than forking them.

3. **Global styles & tokens**
   - Color tokens originate in `src/app/globals.css`.
   - Tailwind configuration is centralized in `tailwind.config.ts`. Extend design tokens (e.g., `chart` colors) there.

4. **Adding new registries or aliases**
   Update `components.json` when introducing new directories (e.g., `@/features`), then rerun the CLI so generated imports remain correct.

5. **Version alignment**
   Shadcn dependencies (`class-variance-authority`, `tailwindcss-animate`, Radix packages) are installed via the CLI. Run `npm install` at the repo root after generating components to keep the workspace lockfile in sync and delete `apps/web/node_modules` if it is created by the CLI.

6. **Prettier & linting**
   Generated files use the project’s Prettier config. Always run `npm run format:check` before committing to guarantee Tailwind class sorting via `prettier-plugin-tailwindcss`.

7. **Upgrading Shadcn**
   When a new CLI release ships, run `npx shadcn@latest upgrade` inside `apps/web`. Review the diff to verify token changes and update the roadmap if the workflow evolves.

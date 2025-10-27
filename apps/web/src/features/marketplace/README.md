# Marketplace feature

This directory houses future marketplace integrations. Suggested structure:

- `api/` – service layer for listing apps, managing installs, and proxying provider webhooks.
- `components/` – UI building blocks such as app cards, install dialogs, billing prompts.
- `hooks/` – data fetching hooks (React Query) for marketplace APIs.

Enable the marketplace route by setting `NEXT_PUBLIC_FEATURE_MARKETPLACE=true` in your environment and flesh out these modules as integrations are added.

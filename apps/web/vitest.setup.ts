import "@testing-library/jest-dom/vitest";

if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = "postgres://user:pass@localhost:5432/test";
}

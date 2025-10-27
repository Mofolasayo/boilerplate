import path from "node:path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    const alias = config.resolve.alias ?? {};
    const lucidePath = path.resolve(process.cwd(), "../../node_modules/lucide-react");

    // Force webpack to resolve the hoisted lucide-react package from the monorepo root.
    alias["lucide-react"] = lucidePath;
    alias["lucide-react$"] = lucidePath;

    config.resolve.alias = alias;

    return config;
  },
};

export default nextConfig;

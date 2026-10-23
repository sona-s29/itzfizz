// Static export so the site can be hosted on GitHub Pages.
// NEXT_PUBLIC_BASE_PATH is set by the GitHub Action (e.g. "/itzfizz-hero").
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;

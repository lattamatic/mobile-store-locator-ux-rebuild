const isGitHubPages = process.env.GITHUB_PAGES === "true";
const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1];

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true
  },
  trailingSlash: true,
  basePath: isGitHubPages && repositoryName ? `/${repositoryName}` : "",
  assetPrefix: isGitHubPages && repositoryName ? `/${repositoryName}/` : ""
};

export default nextConfig;

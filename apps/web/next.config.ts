import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages:["@pockeman/ui", "@pockeman/types", "@pockeman/utils", "@pockeman/hooks"] // Add this line to transpile the ui package
};

export default nextConfig;

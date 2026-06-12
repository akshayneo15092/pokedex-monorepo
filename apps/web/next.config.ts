import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages:["@pokeman/ui", "@pokeman/types", "@pokeman/utils", "@pokeman/hooks"] // Add this line to transpile the ui package
};

export default nextConfig;

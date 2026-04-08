import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async redirects() {
    return [
      { source: "/feature", destination: "/about/feature", permanent: true },
      { source: "/company", destination: "/about/corporate", permanent: true },
      { source: "/corporate", destination: "/about/corporate", permanent: true },
      { source: "/software", destination: "/services/software", permanent: true },
      { source: "/infrastructure-services", destination: "/services/infrastructure", permanent: true },
      { source: "/cloudservice", destination: "/services/cloud", permanent: true },
      { source: "/ittraining", destination: "/services/training", permanent: true },
      { source: "/techstudy", destination: "/services/research", permanent: true },
      { source: "/recruitinfo", destination: "/recruit", permanent: true },
      { source: "/archives/news", destination: "/news", permanent: true },
      { source: "/archives/news/:slug*", destination: "/news/:slug*", permanent: true },
    ];
  },
};

export default nextConfig;

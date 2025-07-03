/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Handle undici module issue
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        "undici": false,
      };
    }
    
    // Ignore undici in client-side builds
    config.externals = config.externals || [];
    config.externals.push({
      "undici": "undici"
    });

    return config;
  },
  
  // Experimental features for better compatibility
  experimental: {
    serverComponentsExternalPackages: ['undici']
  }
}

module.exports = nextConfig 
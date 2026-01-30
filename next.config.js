/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,

  // Performance optimizations
  poweredByHeader: false,
  generateEtags: false,
  
  // Image optimization
  images: {
    domains: [],
    unoptimized: true,
    formats: ['image/webp', 'image/avif'],
  },
  
  // Environment variables
  env: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_PUBLIC_ANALYTICS_ID: process.env.NEXT_PUBLIC_ANALYTICS_ID,
  },
  
  // Webpack optimization
  webpack: (config, { dev, isServer }) => {
    // Production optimizations
    if (!dev) {
      config.optimization = {
        ...config.optimization,
        usedExports: true,
        sideEffects: false,
        splitChunks: {
          chunks: 'all',
          minSize: 20000,
          maxSize: 244000,
          cacheGroups: {
            vendor: {
              test: /[\/]node_modules[\/]/,
              name: 'vendors',
              chunks: 'all',
              priority: 10,
            },
            gsap: {
              test: /[\/]node_modules[\/]gsap[\/]/,
              name: 'gsap',
              chunks: 'all',
              priority: 20,
            },
            three: {
              test: /[\/]node_modules[\/](@react-three|three)[\/]/,
              name: 'three',
              chunks: 'all',
              priority: 20,
            },
          },
        },
      };
    }
    
    // 3D model loading
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/models/[name].[hash][ext]',
      },
    });
    
    // Optimize imports
    config.resolve.alias = {
      ...config.resolve.alias,
      'react': 'react',
      'react-dom': 'react-dom',
    };
    
    return config;
  },
  
  // Experimental features for performance (disabled for scroll-based experience)
  // experimental: {
  //   scrollRestoration: true, // Disabled - would interfere with chakra scroll animations
  // },
};

module.exports = nextConfig;

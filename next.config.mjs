import withPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
            protocol: "https",
            hostname: "cdn.dummyjson.com",
            port: "",
            pathname: "/**",
            },
        ],
        domains: ["firebasestorage.googleapis.com"],
    },
};

// PWA Configuration
const pwaConfig = withPWA({
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development", // Disable in dev mode
    runtimeCaching: [
    {
        urlPattern: /^https:\/\/firebasestorage\.googleapis\.com\//,
        handler: "CacheFirst",
        options: {
        cacheName: "firebase-images",
        expiration: {
            maxEntries: 60,
          maxAgeSeconds: 30 * 24 * 60 * 60, // Cache for 30 days
        },
        },
    },
    {
        urlPattern: /_next\/image\?url=/,
        handler: "CacheFirst",
        options: {
        cacheName: "next-image",
        expiration: {
            maxEntries: 60,
          maxAgeSeconds: 30 * 24 * 60 * 60, // Cache for 30 days
        },
        },
    },
    {
        urlPattern: /_next\/static\/.*/i,
        handler: "CacheFirst",
        options: {
        cacheName: "static-resources",
        },
    },
    {
        urlPattern: /\.(?:eot|otf|ttc|ttf|woff|woff2|font\.css)$/i,
        handler: "CacheFirst",
        options: {
        cacheName: "static-font-assets",
        expiration: {
            maxEntries: 4,
          maxAgeSeconds: 7 * 24 * 60 * 60, // Cache for 7 days
        },
        },
    },
    {
        urlPattern: /\/api\/.*/i,
        handler: "NetworkFirst",
        options: {
        cacheName: "apis",
        expiration: {
            maxEntries: 16,
          maxAgeSeconds: 24 * 60 * 60, // Cache API responses for 24 hours
        },
        networkTimeoutSeconds: 10, // Wait up to 10 seconds before falling back to cache
        },
    },
    ],
});

export default pwaConfig(nextConfig);
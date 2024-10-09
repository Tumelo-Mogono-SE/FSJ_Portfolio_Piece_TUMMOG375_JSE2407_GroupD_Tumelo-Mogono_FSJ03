import { withPWA } from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
            protocol: 'https',
            hostname: 'cdn.dummyjson.com', 
            port: '', 
            pathname: '/**', 
            },
        ],
    },
};


export default withPWA({
    ...nextConfig,
    pwa: {
        dest: 'public',
        register: true, 
        skipWaiting: true,
        runtimeCaching: [
            {
                urlPattern: /^https:\/\/your-cdn-url\/.*\.(?:png|jpg|jpeg|svg|gif)$/,
                handler: 'CacheFirst',
                options: {
                    cacheName: 'image-cache',
                    expiration: {
                    maxEntries: 50,
                    maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
                    },
                },
            },
        ], 
    },
});

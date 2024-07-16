/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                protocol: 'https',
                hostname:'platform-lookaside.fbsbx.com'
            },
            {
                protocol: 'https',
                hostname:'utfs.io'
            }
        ]
    }
};

export default nextConfig;

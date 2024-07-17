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
            ,
            {
                protocol: 'https',
                hostname:'img.daisyui.com'
            }
            ,
            {
                protocol: 'https',
                hostname:'www.themealdb.com'
            }
        ]
    }
};

export default nextConfig;

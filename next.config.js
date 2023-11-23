/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    env: {
        SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
        SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
        SPOTIFY_REFRESH_TOKEN: process.env.SPOTIFY_REFRESH_TOKEN,
        SPOTIFY_REDIRECT_URI: process.env.SPOTIFY_REDIRECT_URI,
        SPOTIFY_USER_ID: process.env.SPOTIFY_USER_ID,
        HOTJAR_SITE_ID: process.env.HOTJAR_SITE_ID,
        GOOGLE_TAG_ID: process.env.GOOGLE_TAG_ID,
    },
    images: {
        remotePatterns: [{ hostname: '*.scdn.co' }, { hostname: '*.spotifycdn.com' }],
    },
}

module.exports = nextConfig

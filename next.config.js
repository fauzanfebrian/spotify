/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    env: {
        SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
        SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
        SPOTIFY_REFRESH_TOKEN: process.env.SPOTIFY_REFRESH_TOKEN,
        SPOTIFY_REDIRECT_URI: process.env.SPOTIFY_REDIRECT_URI,
        SPOTIFY_USER_ID: process.env.SPOTIFY_USER_ID,
    },
    images: {
        domains: ['i.scdn.co', 'mosaic.scdn.co', 'images-ak.spotifycdn.com'],
    },
}

module.exports = nextConfig

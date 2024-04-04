/** @type {Record<string,string>} */
const env = {
    SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
    SPOTIFY_REFRESH_TOKEN: process.env.SPOTIFY_REFRESH_TOKEN,
    SPOTIFY_REDIRECT_URI: process.env.SPOTIFY_REDIRECT_URI,
    SPOTIFY_USER_ID: process.env.SPOTIFY_USER_ID,
}

if (process.env.HOTJAR_SITE_ID) {
    env.HOTJAR_SITE_ID = process.env.HOTJAR_SITE_ID
}

if (process.env.GOOGLE_TAG_ID) {
    env.GOOGLE_TAG_ID = process.env.GOOGLE_TAG_ID
}

/** @type {import('next').NextConfig} */
const nextConfig = {
    env,
    reactStrictMode: false,
    images: {
        remotePatterns: [{ hostname: '*.scdn.co' }, { hostname: '*.spotifycdn.com' }],
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: ['@svgr/webpack'],
        })

        return config
    },
    cacheMaxMemorySize: 0,
    cacheHandler: require.resolve('./cache-handler.js'),
}

module.exports = nextConfig

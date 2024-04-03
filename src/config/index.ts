export const SPOTIFY_CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID
export const SPOTIFY_CLIENT_SECRET = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET
export const SPOTIFY_REFRESH_TOKEN = process.env.NEXT_PUBLIC_SPOTIFY_REFRESH_TOKEN
export const SPOTIFY_REDIRECT_URI = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI
export const SPOTIFY_USER_ID = process.env.NEXT_PUBLIC_SPOTIFY_USER_ID
export const GOOGLE_TAG_ID = process.env.NEXT_PUBLIC_GOOGLE_TAG_ID
export const APP_URL = new URL(SPOTIFY_REDIRECT_URI || 'https://spotify.fauzanfebrian.my.id').origin

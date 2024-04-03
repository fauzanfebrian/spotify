'use client'
import { SPOTIFY_CLIENT_ID, SPOTIFY_REDIRECT_URI } from '@/config'
import { useEffect } from 'react'

export default function LoginPage() {
    useEffect(() => {
        const clientId = SPOTIFY_CLIENT_ID
        const redirect_uri = SPOTIFY_REDIRECT_URI
        const state = 'KAnsSJKLMs0JINnM'

        const scope = [
            'user-read-currently-playing',
            'user-top-read',
            'user-read-recently-played',
            'playlist-read-private',
            'playlist-read-collaborative',
        ].join(' ')

        const query = {
            response_type: 'code',
            client_id: clientId,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state,
        }

        const queryStringify = Object.entries(query)
            .map(q => q.join('='))
            .join('&')

        window.location.href = `https://accounts.spotify.com/authorize?${queryStringify}`
    }, [])

    return <div>Login</div>
}

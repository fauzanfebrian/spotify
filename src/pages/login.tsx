import React, { useEffect } from 'react'

export default function Login() {
    useEffect(() => {
        const clientId = process.env.SPOTIFY_CLIENT_ID
        const scope =
            'user-read-currently-playing user-top-read user-read-recently-played playlist-read-private playlist-read-collaborative'
        const state = 'KAnsSJKLMs0JINnM'
        const redirect_uri = process.env.SPOTIFY_REDIRECT_URI
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

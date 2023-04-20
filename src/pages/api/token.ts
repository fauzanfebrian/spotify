import axios, { AxiosError } from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'
import { SpotifyToken } from 'src/interface'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        console.log(req.body)

        const code = req.body.spotifyCode
        const redirectUri = process.env.SPOTIFY_REDIRECT_URI
        const clientId = process.env.SPOTIFY_CLIENT_ID
        const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
        const encodedToken = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')

        if (!code)
            return res.status(400).json({
                message: 'code not defined',
            })

        axios.interceptors.request.clear()

        const resToken = await axios.post<SpotifyToken>(
            'https://accounts.spotify.com/api/token',
            {
                grant_type: 'authorization_code',
                code,
                redirect_uri: redirectUri,
            },
            { headers: { 'Content-Type': 'application/x-www-form-urlencoded', Authorization: `Basic ${encodedToken}` } }
        )

        console.log(resToken.data)

        res.status(200).json({ refreshToken: resToken.data.refresh_token, token: resToken.data.access_token })
    } catch (error) {
        const data = error instanceof AxiosError ? error.response?.data : undefined
        const message = error instanceof AxiosError ? error.message : error
        const statusCode = error instanceof AxiosError ? error.response?.status || 500 : 500

        return res.status(statusCode).json({ message, statusCode, data })
    }
}

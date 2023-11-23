import axiosDefault from 'axios'
import dayjs from 'dayjs'
import { SpotifyToken } from 'src/interface/token'

const axios = axiosDefault.create({
    baseURL: 'https://api.spotify.com/v1',
})

let tokenTTL: Date
export async function accessToken() {
    if (tokenTTL > dayjs().toDate()) return

    const clientId = process.env.SPOTIFY_CLIENT_ID
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
    const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN
    const encodedToken = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')

    axios.interceptors.request.clear()

    const res = await axios.post<SpotifyToken>(
        'https://accounts.spotify.com/api/token',
        {
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
        },
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded', Authorization: `Basic ${encodedToken}` } }
    )

    tokenTTL = dayjs()
        .add(res.data.expires_in - 60, 'second')
        .toDate()
    axios.interceptors.request.use(config => {
        if (res.data.access_token) config.headers.Authorization = `Bearer ${res.data.access_token}`
        return config
    })
}

export default axios

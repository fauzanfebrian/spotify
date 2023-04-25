import axios, { AxiosError } from 'axios'
import dayjs from 'dayjs'
import type { NextApiRequest, NextApiResponse } from 'next'
import { SpotifyArtist, SpotifyData, SpotifyGenre, SpotifyToken, SpotifyTrack, SpotifyUser } from 'src/interface'

let expireToken: Date

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
    try {
        const data = await getSpotifyData()

        res.status(200).json(data)
    } catch (error) {
        const data = error instanceof AxiosError ? error.response?.data : undefined
        const message = error instanceof AxiosError ? error.message : error
        const statusCode = error instanceof AxiosError ? error.response?.status || 500 : 500

        res.status(statusCode).json({ message, statusCode, data })
    }
}

export async function getSpotifyData(): Promise<SpotifyData> {
    await getToken()

    const [artists, tracks, user] = await Promise.all([getTopArtists(), getTopTracks(), getUser()])

    const genres = getTopGenres(artists)

    return { artists, tracks, genres, user }
}

async function getTopArtists(): Promise<SpotifyArtist[]> {
    const res = await axios.get('https://api.spotify.com/v1/me/top/artists?limit=20&offset=0&time_range=short_term')
    return res.data?.items || []
}

async function getTopTracks(): Promise<SpotifyTrack[]> {
    const res = await axios.get('https://api.spotify.com/v1/me/top/tracks?limit=5&offset=0&time_range=short_term')
    return res.data?.items || []
}

async function getUser(): Promise<SpotifyUser> {
    const spotifyId = process.env.SPOTIFY_USER_ID
    const res = await axios.get(`https://api.spotify.com/v1/users/${spotifyId}`)
    return res.data
}

function getTopGenres(artists: SpotifyArtist[]) {
    const mappedGenres = artists
        .flatMap(artist => artist.genres)
        .reduce((acc, curr) => {
            if (!acc[curr]) acc[curr] = { name: curr, total: 1 }
            else acc[curr].total += 1

            return acc
        }, {} as Record<string, SpotifyGenre>)

    const genres = Object.values(mappedGenres)

    return genres
        .sort((a, b) => {
            if (b.total === a.total) {
                if (b.name < a.name) return 1
                else return -1
            }
            return b.total - a.total
        })
        .splice(0, 10)
}

const getToken = async () => {
    if (expireToken > dayjs().toDate()) return

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

    expireToken = dayjs()
        .add(res.data.expires_in - 60, 'second')
        .toDate()
    axios.interceptors.request.use(config => {
        if (res.data.access_token) config.headers.Authorization = `Bearer ${res.data.access_token}`
        return config
    })
}

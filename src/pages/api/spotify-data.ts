import axios, { AxiosError } from 'axios'
import dayjs from 'dayjs'
import type { NextApiRequest, NextApiResponse } from 'next'
import { SpotifyData } from 'src/interface'
import { SpotifyArtist } from 'src/interface/artist'
import { SpotifyGenre } from 'src/interface/genre'
import { PlayingTrack } from 'src/interface/playing'
import { SpotifyPlaylist } from 'src/interface/playlist'
import { SpotifyToken } from 'src/interface/token'
import { SpotifyTrack } from 'src/interface/track'
import { SpotifyUser } from 'src/interface/user'

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
    await getAccessToken()

    const [artists, tracks, user, playlists, playingTrack] = await Promise.all([
        getTopArtists(),
        getTopTracks(),
        getUser(),
        getPlaylists(),
        getPlayingTrack(),
    ])

    const genres = getTopGenres(artists)

    const data: SpotifyData = { artists, tracks, genres, user, playlists, playingTrack }

    return data
}

async function getTopArtists(): Promise<SpotifyArtist[]> {
    const res = await axios.get('https://api.spotify.com/v1/me/top/artists', {
        params: {
            limit: 30,
            offset: 0,
            time_range: 'short_term',
        },
    })
    return res.data?.items || []
}

async function getPlaylists(): Promise<SpotifyPlaylist[]> {
    const spotifyId = process.env.SPOTIFY_USER_ID
    const res = await axios.get(`https://api.spotify.com/v1/users/${spotifyId}/playlists`)

    const playlists: SpotifyPlaylist[] = res.data?.items || []

    return playlists.filter(playlist => playlist.public)
}

async function getTopTracks(): Promise<SpotifyTrack[]> {
    const res = await axios.get('https://api.spotify.com/v1/me/top/tracks', {
        params: {
            limit: 10,
            offset: 0,
            time_range: 'short_term',
        },
    })
    return res.data?.items || []
}

async function getUser(): Promise<SpotifyUser> {
    const spotifyId = process.env.SPOTIFY_USER_ID
    const res = await axios.get(`https://api.spotify.com/v1/users/${spotifyId}`)
    return res.data
}

async function getPlayingTrack(): Promise<PlayingTrack> {
    const res = await axios.get('https://api.spotify.com/v1/me/player/currently-playing')
    return res.data
}

function getTopGenres(artists: SpotifyArtist[]) {
    const mappedGenres = artists
        .flatMap(artist => artist.genres)
        .reduce((object, genre) => {
            if (!object[genre]) {
                object[genre] = { name: genre, total: 1, percentage: 0 }
            } else {
                object[genre].total += 1
            }

            return object
        }, {} as Record<string, SpotifyGenre>)

    const genres = Object.values(mappedGenres)

    const dataGenres = genres
        .sort((a, b) => {
            if (b.total === a.total) {
                if (b.name < a.name) return 1
                else return -1
            }
            return b.total - a.total
        })
        .splice(0, 10)

    const totalArtistInGenres = dataGenres.reduce((curr, genre) => curr + genre.total, 0)

    dataGenres.forEach(genre => {
        const percentage = (genre.total / totalArtistInGenres) * 100
        genre.percentage = +percentage.toFixed(2)
    })

    return dataGenres
}

const getAccessToken = async () => {
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

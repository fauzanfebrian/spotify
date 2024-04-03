'use server'
import dayjs from 'dayjs'
import { SpotifyData } from '../types'
import { topArtists } from './artists'
import { accessToken } from './axios'
import { topGenres } from './genres'
import { currentlyPlayingTrack } from './playingTrack'
import { userPlaylists } from './playlists'
import { topTracks } from './tracks'
import { currentUser } from './user'

let cacheData: SpotifyData
let cacheTTL: Date

export async function spotifyData(): Promise<SpotifyData> {
    await accessToken()

    if (cacheTTL > new Date() && cacheData) {
        cacheData.playingTrack = await currentlyPlayingTrack()

        return cacheData
    }

    const [artists, tracks, user, playlists, playingTrack] = await Promise.all([
        topArtists(),
        topTracks(),
        currentUser(),
        userPlaylists(),
        currentlyPlayingTrack(),
    ])

    const genres = topGenres(artists)

    const data: SpotifyData = { artists, tracks, genres, user, playlists, playingTrack }

    cacheData = data
    cacheTTL = dayjs().add(3, 'hours').toDate()

    return data
}

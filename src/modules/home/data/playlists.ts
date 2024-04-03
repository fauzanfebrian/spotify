import { SPOTIFY_USER_ID } from '@/config'
import { SpotifyPlaylist } from '../types/playlist'
import axios from './axios'

export async function userPlaylists(): Promise<SpotifyPlaylist[]> {
    const spotifyId = SPOTIFY_USER_ID
    const res = await axios.get(`/users/${spotifyId}/playlists`)

    const playlists: SpotifyPlaylist[] = res.data?.items || []

    return playlists.filter(playlist => playlist.public)
}

import { SPOTIFY_USER_ID } from '@/config'
import { SpotifyPlaylist } from '../types/playlist'
import axios from '../../axios'

export async function userPlaylists(): Promise<SpotifyPlaylist[]> {
    const spotifyId = SPOTIFY_USER_ID
    const res = await axios.get<{ items: SpotifyPlaylist[] }>(`/users/${spotifyId}/playlists`)

    const playlists = res.data?.items || []

    return playlists.filter(playlist => playlist.public)
}

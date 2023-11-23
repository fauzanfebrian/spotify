import { SpotifyPlaylist } from 'src/interface/playlist'
import axios from './axios'

export async function userPlaylists(): Promise<SpotifyPlaylist[]> {
    const spotifyId = process.env.SPOTIFY_USER_ID
    const res = await axios.get(`/users/${spotifyId}/playlists`)

    const playlists: SpotifyPlaylist[] = res.data?.items || []

    return playlists.filter(playlist => playlist.public)
}

import { SPOTIFY_USER_ID } from '@/config'
import { SpotifyUser } from '../types/user'
import axios from './axios'

export async function currentUser(): Promise<SpotifyUser> {
    const spotifyId = SPOTIFY_USER_ID
    const res = await axios.get(`/users/${spotifyId}`)
    return res.data
}

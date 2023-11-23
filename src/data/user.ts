import { SpotifyUser } from 'src/interface/user'
import axios from './axios'

export async function currentUser(): Promise<SpotifyUser> {
    const spotifyId = process.env.SPOTIFY_USER_ID
    const res = await axios.get(`https://api.spotify.com/v1/users/${spotifyId}`)
    return res.data
}

import axios from './axios'
import { SpotifyArtist } from '../types/artist'

export async function topArtists(): Promise<SpotifyArtist[]> {
    const res = await axios.get('/me/top/artists', {
        params: {
            limit: 30,
            offset: 0,
            time_range: 'short_term',
        },
    })
    return res.data?.items || []
}

import axios from './axios'
import { SpotifyArtist } from 'src/interface/artist'

export async function topArtists(): Promise<SpotifyArtist[]> {
    const res = await axios.get('https://api.spotify.com/v1/me/top/artists', {
        params: {
            limit: 30,
            offset: 0,
            time_range: 'short_term',
        },
    })
    return res.data?.items || []
}

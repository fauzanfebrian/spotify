import axios from './axios'
import { SpotifyArtist } from '../types/artist'

export async function topArtists(): Promise<SpotifyArtist[]> {
    const res = await axios.get<{ items: SpotifyArtist[] }>('/me/top/artists', {
        params: {
            limit: 15,
            offset: 0,
            time_range: 'short_term',
        },
    })

    const artists = res.data?.items || []

    artists.forEach(artist => {
        artist.genres = artist.genres.splice(0, 5)
    })

    return artists
}

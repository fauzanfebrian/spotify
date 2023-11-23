import axios from './axios'
import { SpotifyTrack } from 'src/interface/track'

export async function topTracks(): Promise<SpotifyTrack[]> {
    const res = await axios.get('https://api.spotify.com/v1/me/top/tracks', {
        params: {
            limit: 10,
            offset: 0,
            time_range: 'short_term',
        },
    })
    return res.data?.items || []
}

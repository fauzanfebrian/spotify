import axios from './axios'
import { SpotifyTrack } from '../types/track'

export async function topTracks(): Promise<SpotifyTrack[]> {
    const res = await axios.get('/me/top/tracks', {
        params: {
            limit: 10,
            offset: 0,
            time_range: 'short_term',
        },
    })
    return res.data?.items || []
}

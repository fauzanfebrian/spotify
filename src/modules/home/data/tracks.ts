import { SpotifyTrack } from '../types/track'
import axios from './axios'

export async function topTracks(): Promise<SpotifyTrack[]> {
    const res = await axios.get<{ items: SpotifyTrack[] }>('/me/top/tracks', {
        params: {
            limit: 15,
            offset: 0,
            time_range: 'short_term',
        },
    })

    const tracks = res.data?.items || []

    tracks.forEach(track => {
        delete track.available_markets
        delete track.album.available_markets
    })

    return tracks
}

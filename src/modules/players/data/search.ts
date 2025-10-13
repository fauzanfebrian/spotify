import axios from '../../axios'
import { SearchResponse, Track } from '../types/search'

export const revalidate = 0

const blockedArtistIds = ['0zuIBB0gRxp4i4E2gvrcoM', '0NbKRRBuiIUwS9irPvi7wD']

export async function searchTrack(search: string): Promise<Track[]> {
    const res = await axios.get<SearchResponse>('/search', {
        params: {
            q: search,
            type: 'track',
            market: 'id',
            limit: 5,
            offset: 0,
        },
    })

    const tracks = res.data?.tracks?.items || []

    tracks.forEach(track => {
        track?.artists?.forEach(artist => {
            if (blockedArtistIds.includes(artist?.id)) {
                tracks.splice(tracks.indexOf(track), 1)
                return
            }
        })
    })

    return tracks
}

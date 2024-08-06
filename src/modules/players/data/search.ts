import axios from '../../axios'
import { SearchResponse, Track } from '../types/search'

export const revalidate = 0

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

    console.log(res.data)

    return res.data?.tracks?.items || []
}

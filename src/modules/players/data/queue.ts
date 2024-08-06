import axios from '../../axios'
import { QueueData } from '../types/queue'

export const revalidate = 0

export async function playbackQueue(): Promise<QueueData> {
    const res = await axios.get<QueueData>('/me/player/queue')
    return res.data
}

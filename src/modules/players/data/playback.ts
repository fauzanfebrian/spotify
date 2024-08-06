import axios from '../../axios'
import { PlaybackData } from '../types/playback'

export const revalidate = 0

export async function playbackState(): Promise<PlaybackData> {
    const res = await axios.get<PlaybackData>('/me/player')

    return res.data
}

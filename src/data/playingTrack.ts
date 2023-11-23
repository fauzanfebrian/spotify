import { PlayingTrack } from 'src/interface/playing'
import axios from './axios'

export async function currentlyPlayingTrack(): Promise<PlayingTrack | undefined> {
    try {
        const res = await axios.get('https://api.spotify.com/v1/me/player/currently-playing')
        return res.data
    } catch (error) {
        return undefined
    }
}

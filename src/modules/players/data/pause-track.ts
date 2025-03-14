import axios from '@/modules/axios'

export async function pauseTrack() {
    await axios.put('me/player/pause')
}

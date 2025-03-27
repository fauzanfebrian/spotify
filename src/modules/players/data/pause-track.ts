import axios from '@/modules/axios'

export async function pauseTrack(deviceId?: string) {
    await axios.put('me/player/pause', {
        params: {
            device_id: deviceId || undefined,
        },
    })
}

import axios from '@/modules/axios'

export async function playTrack(deviceId?: string, contextUri?: string) {
    await axios.put(
        'me/player/play',
        {
            context_uri: contextUri || undefined,
            position_ms: 0,
        },
        {
            params: { device_id: deviceId || undefined },
        },
    )
}

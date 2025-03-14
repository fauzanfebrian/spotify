import axios from '@/modules/axios'

export async function playTrack(deviceId?: string, contextUri?: string) {
    await axios.put(
        'me/player/play',
        { context_uri: contextUri || undefined, position_ms: 0 },
        { params: { device_id: deviceId || undefined } },
    )
    await axios.put('me/player/repeat', undefined, { params: { state: 'context' } }).catch(() => {
        // Ignore error if repeat is not supported
    })
    await axios.put('me/player/shuffle', undefined, { params: { state: true } }).catch(() => {
        // Ignore error if shuffle is not supported
    })
}

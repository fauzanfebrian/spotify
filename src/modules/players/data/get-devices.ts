import axios from '@/modules/axios'

export interface DeviceData {
    id: string
    is_active: boolean
    is_private_session: boolean
    is_restricted: boolean
    name: string
    type: string
    volume_percent: number
    supports_volume: boolean
}

export async function getDevices(): Promise<DeviceData[]> {
    try {
        const res = await axios.get('/me/player/devices')
        return res.data.devices || []
    } catch (error) {
        return []
    }
}

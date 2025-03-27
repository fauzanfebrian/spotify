import { pauseTrack } from '@/modules/players/data/pause-track'
import { responseJson } from '@/utils/response-json'
import { NextApiRequest } from 'next'

export async function GET(req: NextApiRequest) {
    try {
        const uri = new URL(req.url || 'http://localhost')
        const deviceId = uri.searchParams.get('device_id') || ''

        await pauseTrack(deviceId)

        return responseJson({ message: 'Success pause Track' })
    } catch (error: any) {
        console.error(error?.response || error)
        return responseJson({ message: 'Failed pause Track' }, 500)
    }
}

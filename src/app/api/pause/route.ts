import { pauseTrack } from '@/modules/players/data/pause-track'
import { responseJson } from '@/utils/response-json'

export async function GET() {
    try {
        await pauseTrack()

        return responseJson({ message: 'Success pause Track' })
    } catch (error: any) {
        console.error(error?.response || error)
        return responseJson({ message: 'Failed pause Track' }, 500)
    }
}

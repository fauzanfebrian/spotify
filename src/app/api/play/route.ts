import { userPlaylists } from '@/modules/home/data/playlists'
import { playTrack } from '@/modules/players/data/play-track'
import { responseJson } from '@/utils/response-json'
import { NextApiRequest } from 'next'

export async function GET(req: NextApiRequest) {
    const uri = new URL(req.url || 'http://localhost')
    const deviceId = uri.searchParams.get('device_id') || ''
    let contextUri = uri.searchParams.get('context_uri') || ''

    if (!contextUri) {
        const playlists = await userPlaylists()
        // randomize the playlist
        const randomIndex = Math.floor(Math.random() * playlists.length)
        contextUri = playlists[randomIndex].uri
    }

    await playTrack(deviceId, contextUri)

    return responseJson({ message: 'Success Play Track' })
}

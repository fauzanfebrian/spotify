import { nextQueue } from '@/modules/players/data/next'
import { responseJson } from '@/utils/response-json'
import { AxiosError } from 'axios'
import type { NextApiRequest } from 'next'

export const revalidate = 0

export async function POST(req: NextApiRequest) {
    try {
        const search = new URL(req.url || '').searchParams

        const deviceId = search.get('device')

        if (!deviceId) {
            return responseJson(false)
        }

        const data = await nextQueue(deviceId)

        return responseJson(data)
    } catch (error) {
        const data = error instanceof AxiosError ? error.response?.data : undefined
        const message = error instanceof AxiosError ? error.message : error
        const statusCode = error instanceof AxiosError ? error.response?.status || 500 : 500

        return responseJson({ message, statusCode, data }, statusCode)
    }
}

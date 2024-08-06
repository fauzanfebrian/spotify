import { searchTrack } from '@/modules/players/data/search'
import { responseJson } from '@/utils/response-json'
import { AxiosError } from 'axios'
import type { NextApiRequest } from 'next'

export const revalidate = 0

export async function GET(req: NextApiRequest) {
    try {
        const search = new URL(req.url || '').searchParams.get('search')

        if (!search) {
            return responseJson([])
        }

        const data = await searchTrack(search || '')

        return responseJson(data)
    } catch (error) {
        const data = error instanceof AxiosError ? error.response?.data : undefined
        const message = error instanceof AxiosError ? error.message : error
        const statusCode = error instanceof AxiosError ? error.response?.status || 500 : 500

        return responseJson({ message, statusCode, data }, statusCode)
    }
}

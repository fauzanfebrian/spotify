import { spotifyData } from '@/modules/home/data'
import { responseJson } from '@/utils/response-json'
import { AxiosError } from 'axios'
import type { NextApiRequest } from 'next'

export const revalidate = 0

export async function GET(_req: NextApiRequest) {
    try {
        const data = await spotifyData()

        return responseJson(data)
    } catch (error) {
        const data = error instanceof AxiosError ? error.response?.data : undefined
        const message = error instanceof AxiosError ? error.message : error
        const statusCode = error instanceof AxiosError ? error.response?.status || 500 : 500

        return responseJson({ message, statusCode, data }, statusCode)
    }
}

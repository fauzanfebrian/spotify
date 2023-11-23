import { AxiosError } from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import { spotifyData } from 'src/data'

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
    try {
        const data = await spotifyData()

        res.status(200).json(data)
    } catch (error) {
        const data = error instanceof AxiosError ? error.response?.data : undefined
        const message = error instanceof AxiosError ? error.message : error
        const statusCode = error instanceof AxiosError ? error.response?.status || 500 : 500

        res.status(statusCode).json({ message, statusCode, data })
    }
}

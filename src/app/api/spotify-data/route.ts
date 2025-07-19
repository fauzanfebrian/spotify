import { spotifyData } from '@/modules/home/data'
import { responseJson } from '@/utils/response-json'
import { AxiosError } from 'axios'

export const revalidate = 0

export async function GET(req: Request) {
    try {
        const interval = 5000

        const stream = new ReadableStream({
            start(controller) {
                const intervalId = setInterval(async () => {
                    const datasource = await spotifyData()
                    const data = `data: ${JSON.stringify(datasource)}\n\n`
                    controller.enqueue(new TextEncoder().encode(data))
                }, interval)

                req.signal.onabort = () => {
                    clearInterval(intervalId)
                    controller.close()
                }
            },
        })

        return new Response(stream, {
            headers: {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache, no-transform',
                Connection: 'keep-alive',
            },
        })
    } catch (error) {
        const data = error instanceof AxiosError ? error.response?.data : undefined
        const message = error instanceof AxiosError ? error.message : error
        const statusCode = error instanceof AxiosError ? error.response?.status || 500 : 500

        return responseJson({ message, statusCode, data }, statusCode)
    }
}

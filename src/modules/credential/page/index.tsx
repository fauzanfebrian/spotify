'use client'
import axios from '@/axios'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function CredentialPage() {
    const query = useSearchParams()
    const [data, setData] = useState<{ refreshToken: string; token: string }>()

    const code = query.get('code')

    useEffect(() => {
        if (typeof code === 'string') {
            loadData()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [code])

    const loadData = async () => {
        try {
            const res = await axios.post('token', { spotifyCode: code })
            setData(res.data)
        } catch (error) {
            return
        }
    }

    return data ? (
        <main className="flex h-screen w-screen justify-center items-center overflow-hidden flex-col">
            <h4 className="text-center text-lg">Your token (click to copy)</h4>
            <h6
                className="text-center cursor-pointer text-gray-400 text-sm"
                onClick={() => navigator.clipboard.writeText(data.token)}
            >
                {data.token}
            </h6>
            <h4 className="text-center text-lg">Your refresh token (click to copy)</h4>
            <h6
                className="text-center cursor-pointer text-gray-400 text-sm"
                onClick={() => navigator.clipboard.writeText(data.refreshToken)}
            >
                {data.refreshToken}
            </h6>
        </main>
    ) : (
        <main className="flex h-screen w-screen justify-center items-center overflow-hidden flex-col">
            <h1 className="text-xl text-green-600 font-bold">What Do You Want Here!!!</h1>
        </main>
    )
}

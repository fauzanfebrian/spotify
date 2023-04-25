import { useRouter } from 'next/router'
import React from 'react'

export default function Credential() {
    const router = useRouter()

    const code = router.query.code as string

    return (
        <main className="flex h-screen w-screen justify-center items-center overflow-hidden flex-col">
            <h4 className="text-center text-lg">Your code credential (click to copy)</h4>
            <h6
                className="text-center cursor-pointer text-gray-400 text-sm"
                onClick={() => navigator.clipboard.writeText(code)}
            >
                {code}
            </h6>
        </main>
    )
}

import { NextResponse } from 'next/server'

export function responseJson<T extends object>(data: T, status = 200) {
    return new NextResponse(JSON.stringify(data), { headers: { 'Content-Type': 'application/json' }, status })
}

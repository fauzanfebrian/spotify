import { NextResponse } from 'next/server'

export function responseJson<T extends any>(data: T, status = 200) {
    return new NextResponse(JSON.stringify(data), { headers: { 'Content-Type': 'application/json' }, status })
}

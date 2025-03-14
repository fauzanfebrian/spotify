import { userPlaylists } from '@/modules/home/data/playlists'
import { getDevices } from '@/modules/players/data/get-devices'
import React from 'react'

export default async function page() {
    const devices = await getDevices()
    const playlists = await userPlaylists()

    return (
        <>
            <h1>User Devices</h1>

            <h2 className="text-3xl text-white">Devices</h2>
            <ul className="px-11 list-disc">
                {devices.map(device => (
                    <li key={device.id} className="text-white mt-3">
                        <p className="italic">#{device.id}</p>
                        <h2>{device.name}</h2>
                        <p>{device.type}</p>
                        <p>{device.is_active ? 'Active' : 'Inactive'}</p>
                        <p>{device.is_private_session ? 'Private session' : 'Public session'}</p>
                        <p>{device.is_restricted ? 'Restricted' : 'Not restricted'}</p>
                        <p>{device.volume_percent}% volume</p>
                        <p>{device.supports_volume ? 'Supports volume' : 'Does not support volume'}</p>
                    </li>
                ))}
            </ul>

            <h2 className="text-3xl text-white">Playlists</h2>
            <ul className="px-11 list-disc">
                {playlists.map(playlist => (
                    <li key={playlist.id} className="text-white mt-3">
                        <p className="italic">#{playlist.uri}</p>
                        <h2>{playlist.name}</h2>
                        <p>{playlist.description}</p>
                        <p>{playlist.tracks.total} tracks</p>
                    </li>
                ))}
            </ul>
        </>
    )
}

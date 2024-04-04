import CredentialPage from '@/modules/credential/page'
import { Suspense } from 'react'

export default function Credential() {
    return (
        <Suspense>
            <CredentialPage />
        </Suspense>
    )
}

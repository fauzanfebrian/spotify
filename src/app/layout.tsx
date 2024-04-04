import { GOOGLE_TAG_ID } from '@/config'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const poppims = Poppins({ weight: '400', subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </head>
            <body className={poppims.className}>{children}</body>

            {!!GOOGLE_TAG_ID && (
                <>
                    <Script src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_TAG_ID}`} />
                    <Script id="google-analytics">
                        {`
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', '${GOOGLE_TAG_ID}');
                        `}
                    </Script>
                </>
            )}
        </html>
    )
}
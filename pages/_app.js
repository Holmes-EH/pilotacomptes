import Head from 'next/head'
import { AppWrapper } from '@/context/store'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
	return (
		<AppWrapper>
			<Head>
				<meta
					name='viewport'
					content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover'
				/>
			</Head>
			<Component {...pageProps} />
		</AppWrapper>
	)
}

export default MyApp

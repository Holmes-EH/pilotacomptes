import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
	render() {
		return (
			<Html>
				<Head>
					<meta name='application-name' content='Pilotacomptes' />
					<meta name='apple-mobile-web-app-capable' content='yes' />
					<meta
						name='apple-mobile-web-app-status-bar-style'
						content='default'
					/>
					<meta
						name='apple-mobile-web-app-title'
						content='Pilotacomptes'
					/>
					<meta
						name='description'
						content='Une app pour suivre les comptes pour le créneau de samedi / 11h'
					/>
					<meta name='format-detection' content='telephone=no' />
					<meta name='mobile-web-app-capable' content='yes' />
					<link rel='manifest' href='/manifest.json' />
					<link
						rel='apple-touch-icon'
						href='icons/apple-touch-icon.png'
					></link>
					<meta name='theme-color' content='#40614e' />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}

export default MyDocument

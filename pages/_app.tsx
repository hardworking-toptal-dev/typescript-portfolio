import NProgress from 'nprogress';
import { AppProps } from 'next/app';
import { GlobalStyles as TailwindStyles } from 'twin.macro';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'react-hot-toast';
import { useEffectOnce, useEvent } from 'react-use';
import { useRouter } from 'next/router';

import 'inter-ui/inter.css';
import 'nprogress/nprogress.css';
import 'windi.css';

import { colors, useClick } from '~/lib';
import { Theme } from '~/types';

NProgress.configure({
	easing: 'ease',
	minimum: 0.3,
	showSpinner: false,
	speed: 800,
});

export default function App({ Component, pageProps }: AppProps) {
	const router = useRouter();
	const [play] = useClick();

	useAnalytics();

	useEvent('mousedown', () => play());
	useEvent('mouseup', () => play());

	useEffectOnce(() => {
		router.events.on('routeChangeStart', () => NProgress.start());
		router.events.on('routeChangeComplete', () => NProgress.done());
		router.events.on('routeChangeError', () => NProgress.done());
	});

	return (
		<ThemeProvider attribute="class" defaultTheme={Theme.SYSTEM} themes={Object.values(Theme)}>
			<TailwindStyles />
			<Toaster />
			<Component {...pageProps} />
			<style jsx global>{`
				#nprogress .bar {
					height: 0.25rem;
					background-color: ${colors.primary[500]};
				}
			`}</style>
		</ThemeProvider>
	);
}

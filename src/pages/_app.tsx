import type { AppProps } from 'next/app';

import '@/styles/globals.css';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export const App = ({ Component, pageProps }: AppProps) => <Component {...pageProps} />;

export default App;

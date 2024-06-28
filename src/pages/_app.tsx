import { AppProps } from 'next/app';
import '../styles/globals.css'; // Ensure this path is correct

const MyApp = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default MyApp;

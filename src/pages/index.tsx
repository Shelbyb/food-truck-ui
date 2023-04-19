import Head from 'next/head';
import { GoogleMapsWrapper } from '@/components/googleMaps/GoogleMapsWrapper';
import styles from '@/styles/Home.module.css';

export const Home = (): JSX.Element => (
  <>
    <Head>
      <title>Food Truck Location Service</title>
      <meta name="description" content="Food truck location service" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <main className={styles.main}>
      <GoogleMapsWrapper />
    </main>
  </>
);

export default Home;

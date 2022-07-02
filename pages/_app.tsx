import '../styles/globals.scss'
import Layout from "../components/layout"
import type { AppProps } from 'next/app'
import createAstar from '../utils/canvas/createAstar';

function MyApp({ Component, pageProps }: AppProps) {
  createAstar();

  return <Layout>
    <Component {...pageProps} />
  </Layout>
}

export default MyApp

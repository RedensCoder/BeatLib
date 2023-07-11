import '../styles/globals.css';
import Player from "../components/Player";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} player={Player} />
}

export default MyApp

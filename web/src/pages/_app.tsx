import "@/styles/globals.scss";
import './Pagination/Form/Elements/Label/Label.css';
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

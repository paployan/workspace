import React from "react";
import type { AppProps } from "next/app";
import { wrapper } from "../store";
import "../styles/index.scss";
import "react-quill/dist/quill.snow.css";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default wrapper.withRedux(MyApp);

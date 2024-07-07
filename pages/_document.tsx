import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <body style={{ backgroundColor: '#F7F7F7', color: '#333333', fontFamily: "'Arial', sans-serif" }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/layout";
import theme from "@/thema";
import { ThemeProvider } from '@mui/material/styles';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <ThemeProvider theme={theme}>
      <Component {...pageProps} />
      </ThemeProvider>
    </Layout>
  )
}

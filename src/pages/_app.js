import "@/styles/globals.css";
import Head from "next/head";
import liff from "@line/liff";
import React from "react";
import { CssBaseline } from "@mui/material";
import Layout from "@/components/Layout/Layout";
import getLPTheme from "@/data/getLPTheme";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Aos from "aos";
const App = ({ Component, pageProps }) => {
  const LPtheme = createTheme(getLPTheme("light"));
  React.useEffect(() => {
    Aos.init();
  }, []);
  return (
    <>
      <Head>
        <title>จับเบอร์ของรางวัล</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ThemeProvider theme={LPtheme}>
        <CssBaseline />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  );
};

export default App;

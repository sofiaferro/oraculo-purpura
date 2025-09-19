import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../styles/theme/theme";
import Card from "../components/Card";

export default function Home() {
  return (
    <>
      <Head>
        <title>Púrpura</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="theme-color" content="#2a1810" />
        <link rel="icon" href="favicon.png" />
        {/* Preload background image to prevent flicker */}
        <link rel="preload" as="image" href="/img/background.png" />
      </Head>
      <div className="App">
        <ThemeProvider theme={theme}>
          <div className="App-content">
            <Card />
          </div>
        </ThemeProvider>
      </div>
    </>
  );
}

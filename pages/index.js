import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../styles/theme/theme";
import Card from "../components/Card";
import { useEffect } from "react";

export default function Home() {
  // Fix for mobile viewport height (address bar)
  useEffect(() => {
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    setVH();
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', setVH);
    
    return () => {
      window.removeEventListener('resize', setVH);
      window.removeEventListener('orientationchange', setVH);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Púrpura</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="theme-color" content="#2a1810" />
        <link rel="icon" href="favicon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
        <link href="https://fonts.googleapis.com/css2?family=MedievalSharp&family=Open+Sans&display=swap" rel="stylesheet"/>
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

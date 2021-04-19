import Head from 'next/head'
import { ThemeProvider } from "@material-ui/core";
import theme from "../styles/theme/theme";

export default function Home() {
  return (
    <>
      <Head>
        <title>Púrpura</title>
        <link rel="icon" href="favicon.png" />
      </Head>
      <div className="App">
      <ThemeProvider theme={theme}>
        <header className="App-content">
          
        </header>
        <footer className="footer">
          
        </footer>
      </ThemeProvider>
      </div>
      </>
  )
}

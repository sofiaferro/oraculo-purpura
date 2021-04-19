import Head from 'next/head'
import "../styles/App.css";
import { ThemeProvider } from "@material-ui/core";
import theme from "../styles/theme/theme";
import oracle from "../public/img/oracle_alfa.png";
import Card from "../components/Card";
import Cafecito from "../components/Cafecito";

export default function Home() {
  return (
    <>
      <Head>
        <title>Púrpura</title>
        <link rel="icon" href="favicon.png" />
      </Head>
      <div className="App">
      <ThemeProvider theme={theme}>
      <img alt="" src={oracle} className="oracle" />
        <header className="App-content">
          <Card/>
        </header>
        <footer className="footer">
          <Cafecito/>
        </footer>
      </ThemeProvider>
      </div>
      </>
  )
}

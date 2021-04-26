import Head from "next/head";
import { ThemeProvider } from "@material-ui/core";
import theme from "../styles/theme/theme";
import Card from "../components/Card";
const oracle = "/img/oracle_alfa.png";

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
            <Card />
          </header>
        </ThemeProvider>
      </div>
    </>
  );
}

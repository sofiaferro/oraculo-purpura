import Head from "next/head";
import { ThemeProvider } from "@material-ui/core";
import theme from "../styles/theme/theme";
import Card from "../components/Card";

export default function Home() {
  return (
    <>
      <Head>
        <title>Púrpura</title>
        <link rel="icon" href="favicon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=MedievalSharp&family=Open+Sans&display=swap" rel="stylesheet"/>
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

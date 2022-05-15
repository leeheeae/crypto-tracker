import Router from "./Router";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'IBM Plex Sans KR', sans-serif;
    background-color: ${props => props.theme.bgColor};
    color: ${props => props.theme.textColor};
  }
  a {
    color: inherit;
  }
`

const App = () => {
  return (
    <>
      <GlobalStyle/>
      <Router />
    </>
  );
};

export default App;
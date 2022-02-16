import { Component, Fragment } from "react";
import HomeScreen from "./screens/HomeScreen";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
html {
  --shadow: 0 12px 24px 0 rgba(0,0,0,0.09);
  --green:  green;
 }
body {
   width: 100vw;
  min-height: 100vh;
  font-family: 'Roboto', sans-serif;
     
}
* {
  box-sizing: border-box;
  padding: none;
  margin: none;
}
`;

class App extends Component {
  render() {
    return (
      <>
        <Fragment>
          <GlobalStyle />
          <Router>
            <Header />
            <Routes>
              <Route path='/' element={<HomeScreen />} exact />
              <Route path='/product/:id' element={<ProductScreen />} />
              <Route path='/cart/' element={<CartScreen />} />
            </Routes>
          </Router>
        </Fragment>
      </>
    );
  }
}
export default App;

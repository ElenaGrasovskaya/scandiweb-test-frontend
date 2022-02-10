import { Component } from "react";
import HomeScreen from "./screens/HomeScreen";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import ProductScreen from './screens/ProductScreen';
import CartScreen from "./screens/CartScreen";


class App extends Component {
  render() {
    return (
      <Router>
        <Header />
        <Routes>
            <Route path = '/' element={<HomeScreen />} exact/>
            <Route path = '/product/:id' element={<ProductScreen/>} />
            <Route path = '/cart/' element={<CartScreen/>} />
        </Routes>
      </Router>

    );
  }
}
export default App;

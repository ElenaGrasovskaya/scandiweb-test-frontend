import React, { Component } from "react";
import ReactDOM, { render } from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { Provider } from "react-redux";
import store from "./store";

const client = new ApolloClient({ uri: "http://localhost:4000/api" });

const ApolloApp = (App) => (
  <ApolloProvider client={client}>
    <Provider store = {store}>
      <App />
    </Provider>
  </ApolloProvider>
);

render(ApolloApp(App), document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

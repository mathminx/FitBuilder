// import statements
import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

// todo: import the necessary components.


import Footer from './components/footer/index';

import Login from './components/login/index';
import Signup from './components/signup/index';
import LoginSignupModal from "./components/login_signup_modal";
import Dashboard from "./pages/dashboard";



const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});


const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
      <Dashboard>
      </Dashboard>
      </div>
    </ApolloProvider>
  );
}

export default App;
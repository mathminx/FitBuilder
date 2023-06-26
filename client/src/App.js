// import statements
import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";


import LoginSignupModal from "./components/login_signup_modal";
import FitBuildLandingPage from "./pages/landingPage/LandingPage";
import SimpleNavbar from "./components/navbar/Navbar";
import Dashboard from "./pages/dashboard/index";

const httpLink = createHttpLink({
  uri: "/graphql",
});


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
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
      <SimpleNavbar></SimpleNavbar>
        <Routes>
          <Route path="/" element={<FitBuildLandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
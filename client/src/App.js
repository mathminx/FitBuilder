// import statements
import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";



import FitBuildLandingPage from "./pages/landingPage/LandingPage";
import SimpleNavbar from "./components/navbar/Navbar";
import Dashboard from "./pages/DashboardHub"
import ViewPrograms from "./pages/ViewPrograms";

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
        <Header/>
          <Routes>
            <Route path="/" element={<FitBuildLandingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        <Footer/>
      </Router>
    </ApolloProvider>
  );
}

export default App;
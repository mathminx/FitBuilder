// import statements
import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";

import FitBuildLandingPage from "./pages/landingPage/LandingPage";
<<<<<<< HEAD
import SimpleNavbar from "./components/navbar/Navbar";
import Dashboard from "./pages/DashboardHub";
import ExerciseComponent from "./pages/addExercises/AddExercises";
import WorkoutForm from "./pages/createWorkout/WorkoutForm";
import ProgramPage from "./pages/programPage/ProgramPage";
import CreateProgram from "./pages/addProgram/AddProgramForm";
import AmandaWorkoutForm from "./pages/createWorkout/AmandaWorkoutForm";
=======
import Dashboard from "./pages/DashboardHub"
import ViewPrograms from "./pages/ViewPrograms";
>>>>>>> jonson/viewPrograms

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
<<<<<<< HEAD
        <SimpleNavbar></SimpleNavbar>
        <Routes>
          <Route path="/" element={<FitBuildLandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/createprogram" element={<CreateProgram />} />
          {/* <Route path="/viewprograms" element={< />} /> */}
          <Route path="/createworkout" element={<WorkoutForm />} />
          <Route path="/addexercises" element={<ExerciseComponent />} />
          {/* <Route path="/createworkout" element={<AmandaWorkoutForm />} /> */}
          <Route path="/program" element={<ProgramPage />} />
        </Routes>
=======
        <Header/>
          <Routes>
            <Route path="/" element={<FitBuildLandingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/viewallprograms" element={<ViewPrograms/>}></Route>
          </Routes>
        <Footer/>
>>>>>>> jonson/viewPrograms
      </Router>
    </ApolloProvider>
  );
}


export default App;
// import statements
import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";

import FitBuildLandingPage from "./pages/landingPage/LandingPage";
import ExerciseComponent from "./pages/addExercises/AddExercises";
import WorkoutForm from "./pages/createWorkout/WorkoutForm";
import ProgramPage from "./pages/programPage/ProgramPage";
import ModifyProgram from "./pages/addProgram/ModifyProgramForm";
import CreateProgram from "./pages/addProgram/AddProgramForm";
import Dashboard from "./pages/DashboardHub"
import ViewPrograms from "./pages/ViewPrograms";
import StartWorkout from "./pages/StartWorkout";
import SaveWorkout from "./pages/FinishWorkout";
import SarahDashboard from "./pages/SarahDashboard";
// import ModifyExerciseComponent from "./pages/addExercises/AddExercises";
import EditExercise from "./pages/addExercises/EditExercise";

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
        <Header />
        <Routes>
          <Route path="/" element={<FitBuildLandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/viewallprograms" element={<ViewPrograms />}></Route>
          <Route path="/createprogram" element={<CreateProgram />} />
          <Route path="/modifyprogram/:programId" element={<ModifyProgram />} />
          <Route path="/createworkout/:programId" element={<WorkoutForm />} />
          <Route path="/addexercises/:workoutId" element={<ExerciseComponent />}/>
          <Route path="/modifyexercise/:exerciseId" element={<EditExercise />}/>
          <Route path="/programs/:programId" element={<ProgramPage />} />
          <Route path="/startworkout/:workoutId" element={<StartWorkout />}></Route>
          <Route path="/saveworkout" element={<SaveWorkout />}></Route>
          <Route path="/sarahdashboard" element={<SarahDashboard />}></Route>
        </Routes>
        <Footer />
      </Router>
    </ApolloProvider>
  );
}


export default App;
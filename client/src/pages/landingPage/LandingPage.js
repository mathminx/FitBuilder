import React from "react";
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";
import Auth from "../../utils/auth"

const FitBuildLandingPage = () => {
  const navigate = useNavigate();

  const handleStartClick = () => {
   console.log('button clicked');
    if (Auth.loggedIn()) {
        navigate('/dashboard'); // Redirect to dashboard if logged in.
    }
  };

  return (
    <div className="landingPageContainer">
      <img src={process.env.PUBLIC_URL + 'runner.png'} style={styles.imageStyle}/>
      <h1 className="welcomeMessage">Welcome to FitBuild!</h1>
      <p className="appDescription">
        Create your own personalized workout plans, track your progress, and
        achieve your fitness goals.
      </p>
      <button className="getStartedButton" onClick={handleStartClick}>
        Get Started
      </button>
    </div>
  );
};

const styles = {
  imageStyle: {
    height: '30%',
  }
}

export default FitBuildLandingPage;

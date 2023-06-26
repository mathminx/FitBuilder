import React from "react";
import "./landingPage/LandingPage.css";

const FitBuildLandingPage = () => {

  const handleStartClick = () => {
   console.log('button clicked');
  };

  return (
    <div className="landingPageContainer">
      <img src={process.env.PUBLIC_URL + '/runner.png'} style={styles.imageStyle}/>
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
  },
  buttonStyle: ""
}

export default FitBuildLandingPage;

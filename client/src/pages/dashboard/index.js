import React from "react";

const Dashboard = () => {

  return (
    <div className="dashboard">
      <div className="user-section">
        <h2>Welcome</h2>
      </div>

      <div className="program-section">
        <h3>Current Program</h3>
        <button>
          Change Program
        </button>
      </div>

      <div className="exercise-section">
        <h3>Exercises</h3>
      </div>
    </div>
  );
};

export default Dashboard;

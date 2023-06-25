// import React from "react";
// import { useQuery, useMutation } from "@apollo/client";
// import {
//   GET_CURRENT_USER,
//   GET_CURRENT_PROGRAM,
//   GET_EXERCISES,
//   UPDATE_PROGRAM,
// } from "./queries"; // Replace with your queries

// const Dashboard = () => {
//   const { data: userData } = useQuery(GET_CURRENT_USER);
//   const { data: programData } = useQuery(GET_CURRENT_PROGRAM);
//   const { data: exerciseData } = useQuery(GET_EXERCISES);

//   const [updateProgram] = useMutation(UPDATE_PROGRAM);

//   const handleProgramChange = (newProgramId) => {
//     updateProgram({ variables: { programId: newProgramId } });
//   };

//   return (
//     <div className="dashboard">
//       <div className="user-section">
//         <h2>Welcome, {userData?.user?.name}</h2>
//       </div>

//       <div className="program-section">
//         <h3>Current Program: {programData?.program?.name}</h3>
//         <button onClick={() => handleProgramChange("newProgramId")}>
//           Change Program
//         </button>
//       </div>

//       <div className="exercise-section">
//         <h3>Exercises</h3>
//         <div className="exercise-cards">
//           {exerciseData?.exercises.map((exercise) => (
//             <div key={exercise.id} className="exercise-card">
//               <h4>{exercise.name}</h4>
//               <p>{exercise.description}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

// import React, { useState } from "react";
// import { Card, Modal, Button, Descriptions, Row, Col, Typography } from "antd";
// import { useParams } from "react-router-dom";
// import { GET_SINGLE_PROGRAM } from "../../utils/queries";

// const { Title } = Typography;

// // Replace with your data
// const PROGRAM_INFORMATION = {
//   name: "Program 1",
//   description: "Program description",
//   startDate: "2023-01-01",
//   endDate: "2023-12-31",
// };

// // Replace with your data
// const WORKOUTS = [
//   { id: 1, name: "Workout 1", description: "Workout description" },
//   // Add more workouts...
// ];

// // Replace with your data
// const EXERCISES = [
//   { id: 1, name: "Exercise 1", description: "Exercise description" },
//   // Add more exercises...
// ];

// const ProgramPage = () => {
//   const [selectedWorkout, setSelectedWorkout] = useState(null);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const { programId } = useParams();

//   const handleOpenModal = (workout) => {
//     setSelectedWorkout(workout);
//     setIsModalVisible(true);
//   };

//   const handleCloseModal = () => {
//     setSelectedWorkout(null);
//     setIsModalVisible(false);
//   };

//   // Replace these functions with your logic
//   const handleAddExercise = () => {
//     console.log("Adding a new exercise...");
//   };

//   const handleEditExercise = (exerciseId) => {
//     console.log("Editing exercise: ", exerciseId);
//   };

//   const handleRemoveExercise = (exerciseId) => {
//     console.log("Removing exercise: ", exerciseId);
//   };

//   const handleDeleteWorkout = (workoutId) => {
//     console.log("Deleting workout: ", workoutId);
//     handleCloseModal(); // Close the modal after deleting the workout
//   };

//   const handleAddWorkout = () => {
//     console.log("Adding a new workout...");
//   };

//   const handleDeleteProgram = () => {
//     console.log("Deleting program...");
//   };

//   return (
//     <>
//       <Title level={2}>Program Details</Title>
//       <Button
//         type="danger"
//         onClick={handleDeleteProgram}
//         style={{ float: "right" }}
//       >
//         Delete Program
//       </Button>
//       <Descriptions>
//         <Descriptions.Item label="Name">
//           {PROGRAM_INFORMATION.name}
//         </Descriptions.Item>
//         <Descriptions.Item label="Description">
//           {PROGRAM_INFORMATION.description}
//         </Descriptions.Item>
//         <Descriptions.Item label="Start Date">
//           {PROGRAM_INFORMATION.startDate}
//         </Descriptions.Item>
//         <Descriptions.Item label="End Date">
//           {PROGRAM_INFORMATION.endDate}
//         </Descriptions.Item>
//       </Descriptions>

//       <Row gutter={16}>
//         {WORKOUTS.map((workout) => (
//           <Col span={8} key={workout.id}>
//             <Card title={workout.name}>
//               <p>{workout.description}</p>
//               <Button type="primary" onClick={() => handleOpenModal(workout)}>
//                 View Details
//               </Button>
//             </Card>
//           </Col>
//         ))}
//       </Row>

//       <Button type="primary" onClick={handleAddWorkout}>
//         Add New Workout
//       </Button>

//       <Modal visible={isModalVisible} onCancel={handleCloseModal} footer={null}>
//         {selectedWorkout && (
//           <>
//             <Title level={2}>{selectedWorkout.name}</Title>
//             <p>{selectedWorkout.description}</p>

//             {EXERCISES.map((exercise) => (
//               <Card
//                 key={exercise.id}
//                 title={exercise.name}
//                 style={{ marginBottom: "20px" }}
//               >
//                 <p>{exercise.description}</p>
//                 <Button onClick={() => handleEditExercise(exercise.id)}>
//                   Edit Exercise
//                 </Button>
//                 <Button onClick={() => handleRemoveExercise(exercise.id)}>
//                   Remove Exercise
//                 </Button>
//               </Card>
//             ))}

//             <Button type="primary" onClick={handleAddExercise}>
//               Add New Exercise
//             </Button>

//             <Button
//               type="danger"
//               onClick={() => handleDeleteWorkout(selectedWorkout.id)}
//             >
//               Delete Workout
//             </Button>
//           </>
//         )}
//       </Modal>
//     </>
//   );
// };

// export default ProgramPage;


import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { Card, Modal, Button, Descriptions, Row, Col, Typography } from "antd";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const { Title } = Typography;

// Fetch single program GraphQL Query
const GET_SINGLE_PROGRAM = gql`
  query Program($id: ID!) {
    program(_id: $id) {
      title
      duration
      daysPerWeek
      workouts {
        _id
        name
      }
    }
  }
`;

const ProgramPage = () => {
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { programId } = useParams();
  const navigate = useNavigate();


  // Fetch the program data
  const { loading, error, data } = useQuery(GET_SINGLE_PROGRAM, {
    variables: { id: programId },
  });

  // Loading and error states
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error! {error.message}</p>;

  const program = data?.program || {}; // If data is not yet loaded, program will be an empty object

  const handleOpenModal = (workout) => {
    setSelectedWorkout(workout);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setSelectedWorkout(null);
    setIsModalVisible(false);
  };

  // Replace these functions with your logic
  const handleAddExercise = () => {
    console.log("Adding a new exercise...");
  };

  const handleEditExercise = (exerciseId) => {
    console.log("Editing exercise: ", exerciseId);
  };

  const handleRemoveExercise = (exerciseId) => {
    console.log("Removing exercise: ", exerciseId);
  };

  const handleDeleteWorkout = (workoutId) => {
    console.log("Deleting workout: ", workoutId);
    handleCloseModal(); // Close the modal after deleting the workout
  };

  const handleAddWorkout = () => {
    console.log("Adding a new workout...");

    console.log("Adding a new workout...");
    navigate(`/createworkout/${programId}`);

  };

  const handleDeleteProgram = () => {
    console.log("Deleting program...");
  };

  return (
    <>
      <Title level={2}>Program Details</Title>
      <Button
        type="danger"
        onClick={handleDeleteProgram}
        style={{ float: "right" }}
      >
        Delete Program
      </Button>
      <Descriptions>
        <Descriptions.Item label="Name">{program.title}</Descriptions.Item>
        <Descriptions.Item label="Duration (weeks)">
          {program.duration}
        </Descriptions.Item>
        <Descriptions.Item label="Days per week">
          {program.daysPerWeek}
        </Descriptions.Item>
      </Descriptions>

      <Row gutter={16}>
        {program.workouts?.map((workout) => (
          <Col span={8} key={workout._id}>
            <Card title={workout.name}>
              {/* <p>Day Number: {workout.dayNumber}</p> */}
              {/* <p>Complete: {workout.complete.toString()}</p> */}
              <Button type="primary" onClick={() => handleOpenModal(workout)}>
                View Details
              </Button>
            </Card>
          </Col>
        ))}
      </Row>

      <Button type="primary" onClick={handleAddWorkout}>
        Add New Workout
      </Button>

      <Modal visible={isModalVisible} onCancel={handleCloseModal} footer={null}>
        {selectedWorkout && (
          <>
            <Title level={2}>{selectedWorkout.name}</Title>
            <p>Day Number: {selectedWorkout.dayNumber}</p>
            <p>Complete: {selectedWorkout.complete.toString()}</p>

            {selectedWorkout.exercises.map((exercise) => (
              <Card
                key={exercise._id}
                title={exercise.name}
                style={{ marginBottom: "20px" }}
              >
                <p>Description: {exercise.description}</p>
                <Button onClick={() => handleEditExercise(exercise._id)}>
                  Edit Exercise
                </Button>
                <Button onClick={() => handleRemoveExercise(exercise._id)}>
                  Remove Exercise
                </Button>
              </Card>
            ))}

            <Button type="primary" onClick={handleAddExercise}>
              Add New Exercise
            </Button>

            <Button
              type="danger"
              onClick={() => handleDeleteWorkout(selectedWorkout._id)}
            >
              Delete Workout
            </Button>
          </>
        )}
      </Modal>
    </>
  );
};

export default ProgramPage;


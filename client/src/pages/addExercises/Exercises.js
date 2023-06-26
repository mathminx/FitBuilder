// import axios from "axios";
// import { useEffect, useState } from "react";
// import Card from "react-bootstrap/Card";
// import Col from "react-bootstrap/Col";
// import Row from "react-bootstrap/Row";
// import Button from "react-bootstrap/Button";
// import ExerciseSearchForm from "./AddExercises";

// const ExerciseComponent = ({ exerciseType, muscleGroup }) => {
//   const [exercises, setExercises] = useState([]);

//   useEffect(() => {
//     const options = {
//       method: "GET",
//       url: "https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises",
//       //   params: { type: "cardio" },
//       params: {
//         type: exerciseType,
//         muscle: muscleGroup,
//       },
//       headers: {
//         "X-RapidAPI-Key": "4acea068f2mshdbcc23c62ee4486p14fc15jsnb7caa4dbd4dc",
//         "X-RapidAPI-Host": "exercises-by-api-ninjas.p.rapidapi.com",
//       },
//     };

//     axios
//       .request(options)
//       .then((response) => {
//         setExercises(response.data);
//       })
//       .catch((error) => {
//         console.error("There was an error!", error);
//       });
//   }, []);

//   return (
//     <>
//      <ExerciseSearchForm></ExerciseSearchForm>
    
//     <Row xs={1} md={2} className="g-4">
//       {exercises.map((exercise) => (
//         <Col key={exercise.id}>
//           <Card border="secondary" bg="dark" text="light">
//             <Card.Body>
//               <Card.Title>{exercise.name}</Card.Title>
//               <Card.Subtitle className="mb-2 text-secondary">
//                 Exercise Category: {exercise.type} <br></br>
//                 Target Muscle Group: {exercise.muscle}
//               </Card.Subtitle>
//               <Card.Text>{exercise.instructions}</Card.Text>
//               <Card.Link href="#">Equipment: {exercise.equipment}</Card.Link>
//               <Card.Link href="#">Difficulty: {exercise.difficulty}</Card.Link>
//               <br></br>
//               <br></br>
//               <Button variant="outline-primary">Add Exercise</Button>{" "}
//             </Card.Body>
//           </Card>
//         </Col>
//       ))}
//     </Row>
//     </>
//   );
// };

// export default ExerciseComponent;

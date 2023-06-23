import { Checkbox, List } from 'antd';

const ExerciseList = ({ exercises, selectedExercises, onExerciseSelect }) => (
  <List
    dataSource={exercises}
    renderItem={(exercise) => (
      <List.Item>
        <Checkbox
          checked={selectedExercises.includes(exercise.id)}
          onChange={() => onExerciseSelect(exercise.id)}
        >
          {exercise.name}
        </Checkbox>
      </List.Item>
    )}
  />
);

export default ExerciseList;
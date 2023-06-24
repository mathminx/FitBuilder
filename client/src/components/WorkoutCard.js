import React from 'react';
import { Card, Typography, List } from 'antd';

const { Title, Text } = Typography;

const WorkoutCard = ({ workout }) => (
  <Card>
    <Title level={4}>{workout.name}</Title>
    <Text>Duration: {workout.duration}</Text>
    <Text>Intensity Level: {workout.intensity}</Text>
    <Text>Exercises:</Text>
    <List
      dataSource={workout.exercises}
      renderItem={(exercise) => <Text>{exercise.name}</Text>}
    />
  </Card>
);

export default WorkoutCard;
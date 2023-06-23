import { Card, Typography, Image } from 'antd';

const { Meta } = Card;
const { Title, Text } = Typography;

const ExerciseCard = ({ exercise }) => (
  <Card cover={<Image src={exercise.image} alt={exercise.name} />}>
    <Meta
      title={<Title level={4}>{exercise.name}</Title>}
      description={<Text>{exercise.description}</Text>}
    />

  </Card>
);
export default ExerciseCard;

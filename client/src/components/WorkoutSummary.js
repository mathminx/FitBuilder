import React from 'react';
import { Statistic } from 'antd';

const WorkoutSummary = ({ duration, caloriesBurned, avgHeartRate }) => (
  <div>
    <Statistic title="Total Duration" value={duration} suffix="minutes" />
    <Statistic title="Calories Burned" value={caloriesBurned} suffix="kcal" />
    <Statistic title="Average Heart Rate" value={avgHeartRate} suffix="bpm" />
  </div>
);

export default WorkoutSummary;
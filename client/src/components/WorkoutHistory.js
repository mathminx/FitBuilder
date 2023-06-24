import React from 'react';
import { Table } from 'antd';

const WorkoutHistory = ({ workouts }) => {
  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date'
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration'
    },
    {
      title: 'Statistics',
      dataIndex: 'statistics',
      key: 'statistics'
    }
  ];

  const data = workouts.map((workout) => ({
    key: workout.id,
    date: workout.date,
    duration: workout.duration,
    statistics: `${workout.caloriesBurned} kcal, ${workout.avgHeartRate} bpm`
  }));

  return <Table columns={columns} dataSource={data} />;
};

export default WorkoutHistory;

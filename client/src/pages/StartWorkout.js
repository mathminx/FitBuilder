import React from 'react';
import { Link } from 'react-router-dom'; // used to go back to dashboard
import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';

    function startWorkout () {
        const { data } = useQuery(GET_ME); // used to query user data to start specific workout
    }

    return (
        <>
        {/* */}
        </>
      );
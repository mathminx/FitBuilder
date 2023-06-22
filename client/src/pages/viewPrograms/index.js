// Utilizie useQuery to query the user and get the program data saved to the users account

import React from 'react';
import { Link } from 'react-router-dom'; // used to go back to dashboard, enter into program 
import { useQuery } from '@apollo/client';
import { GET_ME } from '../../utils/queries';

    function ProgramView () {
        const { data } = useQuery(GET_ME); 
        let user; 

        if (data) {
            user = data.user
        }
    }

    return (
        <>
        {/* If user porgram data is avalible return programs (user.program.map, remember to make a key for each program._id), if not return something like "no programs created yet"  */}
        </>
      );

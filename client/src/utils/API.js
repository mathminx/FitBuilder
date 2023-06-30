import axios from "axios";
import { config } from 'dotenv';
config();

// Params:
//1. Exercise type: (optional)
//cardio
// olympic_weightlifting
// plyometrics
// powerlifting
// strength
// stretching
// strongman

//2. Muscle Group: (optional)
// abdominals
// abductors
// adductors
// biceps
// calves
// chest
// forearms
// glutes
// hamstrings
// lats
// lower_back
// middle_back
// neck
// quadriceps
// traps
// triceps

// 3. Difficulty:
// beginner
// intermediate
// expert

const exercisesAPICall = async (userOptions) => {
    const options = {
    method: "GET",
    url: "https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises",
    params: userOptions,
    headers: {
        "X-RapidAPI-Key": "process.env.RAPID_API_KEY",
        "X-RapidAPI-Host": "exercises-by-api-ninjas.p.rapidapi.com",
    },
    };

    try {
    const response = await axios.request(options);
    console.log(response.data);
    } catch (error) {
    console.error(error);
    }
};

export default exercisesAPICall;
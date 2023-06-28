import axios from "axios";
import { config } from 'dotenv';
config();

const exercisesAPICall = async (userOptions) => {
    const options = {
    method: "GET",
    url: "https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises",
    params: userOptions,
    headers: {
        "X-RapidAPI-Key": process.env.RAPID_API_KEY,
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
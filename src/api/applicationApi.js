import axios from "axios";
import dotenv from 'dotenv'

dotenv.config();
export const createApplication = async (data, token) => {
  try {
    const response = await axios.post(
      process.env.JOB_SERVICE_URL,
      data,
      {
        headers: {
          Authorization: token
        }
      }
    );

    console.log("Application Response:", response.data);
    return response.data;

  } catch (error) {
    console.error(
      "Error creating application:",
      error.response?.data || error.message
    );
    throw error;
  }
};

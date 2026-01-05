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


export const getApplications = async (token) => {
  try {
    const response = await axios.get(
      `${process.env.JOB_SERVICE_URL}/me`,
      {
        headers: {
          Authorization: token   // same token forward
        }
      }
    );

    console.log("Get Applications Response:", response.data);
    return response.data;

  } catch (error) {
    console.error(
      "Error fetching applications:",
      error.response?.data || error.message
    );
    throw error;
  }
};

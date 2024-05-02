import axios from "axios";

export const viewAll = async () => {
  try {
    const response = await axios.get(`http://localhost:9190/viewAll`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error while Fetching the Records : ", error);

    throw error;
  }
};

import axios from "axios";

const FetchDataQuery = async (url, coordinate) => {
  try {
    const response = await axios.get(`${url}${coordinate}`);
    return response;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
};

export default FetchDataQuery;

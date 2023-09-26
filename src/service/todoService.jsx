import axios from "axios";

export const getTodosService = async() => {
   const response = await axios.get(`http://127.0.0.1:8000/api/get-todos`);
   return response.data
};

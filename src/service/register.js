import axios from "axios";

export const register = async(data) => {
   const response = await axios({
                                method: 'post',
                                url: 'http://localhost:8080/api/create-user',
                                data 
                            });
   return response.data
};
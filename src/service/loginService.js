import axios from "axios";

export const login = async(data) => {
    console.log(data)
   const response = await axios({
                                method: 'post',
                                url: 'http://localhost:8080/api/login',
                                data 
                            });
   return response.data
};
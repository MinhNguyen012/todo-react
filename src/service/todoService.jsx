import axios from "axios";

export const getTodosService = async() => {
   const response = await axios({
                           url: 'http://localhost:8080/api/get-todos',
                           method: 'get',
                           headers: {
                              'authorization': localStorage.getItem('token'),
                           },
                        })
   return response.data
};

export const createTodoService = async(data) => {
   const response = await axios({
                           url: 'http://localhost:8080/api/create-todo',
                           method: 'post',
                           headers: {
                              'authorization': localStorage.getItem('token'),
                           },
                           data
                        })
   return response.data
}

export const changeStatusTodoService = async(data) => {
   const response = await axios({
                              url: 'http://localhost:8080/api/change-status',
                              method: 'post',
                              headers: {
                                 'authorization': localStorage.getItem('token'),
                              },
                              data
                           })
   return response.data
} 

export const deleteTodoService = async(todoId) => {
   const response = await axios({
                              url: `http://localhost:8080/api/delete-todo/${todoId}`,
                              method: 'delete',
                              headers: {
                                 'authorization': localStorage.getItem('token'),
                              }
                           })
   return response.data
} 

export const editTodoService = async(todoId,data) => {
   const response = await axios({
                           url: `http://localhost:8080/api/edit-todo/${todoId}`,
                           method: 'post',
                           headers: {
                              'authorization': localStorage.getItem('token'),
                           },
                           data
                        })
   return response.data
}
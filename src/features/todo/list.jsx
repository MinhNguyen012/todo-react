import React, { useEffect, useState } from 'react';
import {  Button, Input, Modal, Space, Table, Tag } from "antd";
import '../../css/listtodoapp.css'
import {  Controller, useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import { changeStatusTodoService, createTodoService, deleteTodoService, editTodoService, getTodosService } from '../../service/todoService';



function list(props) {
    const {register,handleSubmit, formState : {errors}, reset,control,setValue } = useForm()
    
    const [dataSource, setDataSource] = useState([]);
    const [editingTodo , setEditingTodo] = useState();


    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = (todo) => {
        setEditingTodo(todo)
        reset({ description_edit: todo.description , id: todo.key });
        setIsModalOpen(true);
    };
    
    const handleCancel = () => {
        setIsModalOpen(false);
    };


    const getTodoList = async() => {
        try {
            const response = await getTodosService();
            return response.data;
          } catch (error) {
            console.error('Error fetching todos:', error);
            return [];
          }  
    }

    const onSubmit = (data) => {
        addTodo(data)
    }

    const addTodo = async(data) => {
       await createTodoService(data)
        const todos = await getTodoList();
        getDataTodo(todos)
        reset()
    }

    const changeStatusTodo = async(key,newStatus) => {
        const dataChange = {
            'todo_id' : key,
            'status' : newStatus
        }
        const response = await changeStatusTodoService(dataChange)
        if(response.status == 200) {
            const dataTodos = await getTodoList();
            getDataTodo(dataTodos)
        }
    }
    const handelDeleteTodo = async (todoId) => {
        const response = await deleteTodoService(todoId) 
        console.log(response)
        const dataTodos = await getTodoList();
        getDataTodo(dataTodos)
    }

    const getDataTodo = (dataTodos) => {
        const formattedData = dataTodos.map((todo, index) => ({
            key: todo.id,
            description: todo.description, 
            status: todo.status, 
            action: todo.status
          }));
          setDataSource(formattedData);
    }

    const onEditTodo = async(data) => {
        console.log(data)
        const dataEdit = {
            'description':data.description_edit
        }
        const todoId = data.id
        editTodoService(todoId,dataEdit)
        const dataTodos = await getTodoList();
        getDataTodo(dataTodos)
        setIsModalOpen(false);
    }

    useEffect(() => {

        const fetchData = async () => {
          const dataTodos = await getTodoList();
          getDataTodo(dataTodos)
        };
    
        fetchData();
    }, []);
      
      const columns = [
        {
          title: 'Description',
          dataIndex: 'description',
          key: 'description',
        },
        {
          title: 'Status',
          dataIndex: 'status',
          key: 'status',
          render: (status) => {
            if(status ==1) {
                return <Tag  color="default">
                    New
                </Tag>
            }else if( status ==2) {
               return  <Tag color="processing">
                Processing
              </Tag>
            }else if(status ==3 ) {
               return  <Tag color="success">
                    Success
                </Tag>
            }
          }
        },
        {
          title: 'Action',
          dataIndex :'action',
          key: 'address',
          render: (status,todo) => {
            if(status ==1) {
                const newStatus = 2
                return(
                    <span>  
                        <Button type="primary" onClick={() => changeStatusTodo(todo.key,newStatus)} >
                            Process
                        </Button>
                        <Button type="primary" onClick={()=>showModal(todo)}>
                           Edit
                        </Button>
                        <Button onClick={() => handelDeleteTodo(todo.key)}>
                            Delete
                        </Button>
                    </span>
                )
                       
            }else if( status ==2) {
                const newStatus = 3
               return (
                    <span>
                        <Button type="primary" danger onClick={() => changeStatusTodo(todo.key,newStatus)}>
                            Complete
                        </Button>
                        <Button type="primary" onClick={() => showModal(todo)}>
                            Edit
                        </Button>
                        <Button onClick={() => handelDeleteTodo(todo.key)}>
                            Delete
                        </Button>
                    </span>
               )
            }
          }
        },
      ];

      const rowClassName = (record) => {
        if (record.status == 3) {
          return 'gachchu'; 
        }
        return '';
      };
      
    return (
        <div className='container'>
            <div className='form-todo'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input type="text" placeholder='Nhập việc cần làm' {...register('description')}/>
                    <button type='submit'>Add</button>
                </form>
            </div>
            <div className='table-todo'>
                <Table dataSource={dataSource} columns={columns} rowClassName={rowClassName} />
            </div>

            <Modal title="Basic Modal" open={isModalOpen}  onCancel={handleCancel} footer={null}>
                <form onSubmit={handleSubmit(onEditTodo)}>
                <Controller
                        name="description_edit"
                        control={control}
                        defaultValue={editingTodo ? editingTodo : ''}
                        render={({ field }) => <input {...field} />}
                    />
                    <Controller
                        name="id"
                        control={control}
                        defaultValue={editingTodo ? editingTodo : ''}
                        render={({ field }) => <input {...field} type='hidden' />}
                    />
                    <button style={{backgroundColor:'#1677ff',color:'white', border:'none', padding:'14px', marginLeft:'15px',borderRadius:'10px'}} type='submit'>OK</button>
                </form>
            </Modal>
        </div>
    );
}

export default list;
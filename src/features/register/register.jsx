import { Button, Form, Input,notification } from 'antd';
import '../../css/login.css'
import React, { useEffect, useState } from 'react';
import {Controller, useForm } from 'react-hook-form';
import { login } from '../../service/loginService';
import { useNavigate } from 'react-router-dom';
import { register } from '../../service/register';

function Register(props) {
    const navigate = useNavigate();
    const [error,setError] = useState();

    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type,message) => {
        api[type]({
        message: 'Error',
        description:
            message
        });
    };

    const onFinish = async(values) => {
        const email = values['email']
        const password = values['password']
        const name = values['name']
        
        const result = await register({
            'email' : email,
            'password' : password,
            'name' : name
            })
            console.log(result)
        if(result.status == 200) {
            navigate('/')
        }else {
            openNotificationWithIcon('error',result.message)
        }
    };

    
    const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    };
    const redirectLogin = () => {
        navigate('/')
    }
    

  
    return (
      <div className='form-login'>
              {contextHolder}

            <Form
                name="basic"
                labelCol={{
                span: 8,
                }}
                wrapperCol={{
                span: 16,
                }}
                style={{
                maxWidth: 600,
                }}
                initialValues={{
                remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                        {
                        required: true,
                        message: 'Please input your name!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
        
                <Form.Item
                label="email"
                name="email"
                rules={[
                    {
                    required: true,
                    message: 'Please input your email!',
                    },
                ]}
                >
                <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
    
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Register
              </Button>
              <Button type="primary" style={{marginLeft:"15px"}} onClick={redirectLogin}>
                Login
              </Button>
            </Form.Item>
          </Form>
          </div>
    
    )
}

export default Register;
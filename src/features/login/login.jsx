import { Button, Form, Input } from 'antd';
import '../../css/login.css'
import React, { useEffect, useState } from 'react';
import {Controller, useForm } from 'react-hook-form';
import { login } from '../../service/loginService';
import { useNavigate } from 'react-router-dom';

function Login(props) {
    const navigate = useNavigate();

    const onFinish = async(values) => {
        const email = values['email']
        const password = values['password']
        
        const result = await getDataLogin({
            'email' : email,
            'password' : password,
            })
    };

    const getDataLogin = async(data) => {
        const dataLogin = await(login(data))
        
        if(dataLogin['status'] === 200){
          localStorage.setItem ('token', dataLogin['jwt']);
            navigate('/todo')
        }
    }

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};
  
    return (
      <div className='form-login'>
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
                Submit
              </Button>
            </Form.Item>
          </Form>
          </div>
    
    )
}

export default Login;
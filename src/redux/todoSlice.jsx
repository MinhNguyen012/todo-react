
import { createSlice } from '@reduxjs/toolkit';
import React from 'react';

export const todos = createSlice( {
    name: 'todos',
    initialState : [],
    reducers: {
        getTodos: (state,action) => {
            return {
                ...state,
                todos: action.payload
            }
        }
    }
})

const { reducers,actions} = todos;
export const {getTodos} = actions;
export default reducers;
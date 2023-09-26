import { configureStore } from "@reduxjs/toolkit";
import { todos } from "./redux/todoSlice";

const rootReducer  = {
    todos: todos
}

const store = configureStore({
    reducer: rootReducer
})

export default store
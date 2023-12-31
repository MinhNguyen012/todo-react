import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import List from './features/todo/list'
import Login from './features/login/login'
import { Route, Routes } from 'react-router-dom'
import Register from './features/register/register'

function App() {

  return (
    <>

      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/todo' element={<List/>} />
        <Route path='/register' element= {<Register/>} />
      </Routes>
    </>
  )
}

export default App

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Test from './components/Test'


function App() {
  return (
    <Routes>
        {/* <Route path="/" element={<Test/>} /> */}
        <Route path="/" element={<div>ABC</div>} />
    </Routes>
  )
}

export default App

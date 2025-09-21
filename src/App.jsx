import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Test from './components/Test'
import CashFlow from './components/CashFlow'
import Budgeting from './components/Budgeting'
import Login from './components/Login'
import Home from './components/Home'
import Overview1 from './components/Overview1'
import Goals from './components/Goals'

function App() {
  return (
    <Routes>
        <Route path="/test" element={<Test/>} />
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/overview" element={<Overview1/>} />
        <Route path="/cash-flow" element={<CashFlow/>} />
        <Route path="/budgeting" element={<Budgeting/>} />
        <Route path="/goals" element={<Goals/>} />
        
    </Routes>
  )
}

export default App

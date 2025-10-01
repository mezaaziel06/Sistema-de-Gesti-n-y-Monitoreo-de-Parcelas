import { Routes, Route } from 'react-router-dom'
import Login from './assets/pages/Login'
import Register from './assets/pages/Register'
import Dashboard from './assets/pages/Dashboard'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  )
}

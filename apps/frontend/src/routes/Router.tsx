import { Routes, Route } from 'react-router-dom'
import App from '../App'
import { Home } from '../pages/Home'

export const MyRouter = () => {
  return (
    <Routes>
      <Route index element={<Home/>} />
      <Route path="about" element={<App/>} />
      <Route path='login' element={<App/>} />
      <Route path='register' element={<App/>} />
    </Routes>
  )
}

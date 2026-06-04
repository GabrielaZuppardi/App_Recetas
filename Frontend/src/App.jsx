import './App.css'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import AdminLoginPage from './pages/AdminLoginPage'
import AdminDashboardPage from './pages/AdminDashboardPage'
import NotFoundPage from './pages/NotFoundPage'
import { Provider } from 'react-redux'
import store from './store/store'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/registro" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/loginAdmin" element={<AdminLoginPage />} />
          <Route path="/dashboardAdmin" element={<AdminDashboardPage />} />
          <Route path="*" element={<NotFoundPage />} />  
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
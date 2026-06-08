import { Provider } from 'react-redux'
import store from './store/store'
import { BrowserRouter, Routes, Route } from 'react-router'
import ProtectedRoute from './app/guards/ProtectedRoute'
import ContainerPage from './pages/ContainerPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import AdminLoginPage from './pages/AdminLoginPage'
import AdminDashboardPage from './pages/AdminDashboardPage'
import NotFoundPage from './pages/NotFoundPage'

import './App.css'


function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          
          <Route index element={<LoginPage />} />
          <Route path="/loginAdmin" element={<AdminLoginPage />} />
          <Route path="/registro" element={<RegisterPage />} />

          <Route path="/" element={<ContainerPage />}>

            <Route element={<ProtectedRoute rolPermitido="usuario" />}>
              <Route path="dashboard" element={<DashboardPage />} />
            </Route>

            <Route element={<ProtectedRoute rolPermitido="administrador" />}>
              <Route path="dashboardAdmin" element={<AdminDashboardPage />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />

          </Route>
        
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
import './App.css'
import Dashboard from './components/Dashboard'
import Login from './components/LoginPage'
import Registro from './components/Registro'
import { Provider } from 'react-redux'
import store from './store/store'

function App() {
  return (
    <Provider store={store}>
      {/* <Login /> */}
      <Registro />
      {/* <Dashboard /> */}
    </Provider>
  )
}

export default App
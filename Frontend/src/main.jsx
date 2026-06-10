import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// index.css content moved into App.css — import removed
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)

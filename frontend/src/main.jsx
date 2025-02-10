import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

//for routing 
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  //Wrapping our router inside the App
  <StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </StrictMode>,
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import FinoStore from './redux/store/FinoStore.js'
import { CookiesProvider } from 'react-cookie'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <CookiesProvider defaultSetOptions={{path:"/Layout"}}> 
  <Provider store={FinoStore} >
  <BrowserRouter>
    <App />
   </BrowserRouter> 
   </Provider>  
   </CookiesProvider> 
  </React.StrictMode>,
)

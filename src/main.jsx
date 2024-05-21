import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { CookiesProvider } from 'react-cookie'
import  FinoStore from "./redux/store/FinoStore.js"


ReactDOM.createRoot(document.getElementById('root')).render(
  
  
  <Provider store={FinoStore} >
    <CookiesProvider defaultSetOptions={{path:"/Layout"}}> 
  <BrowserRouter>
    <App />
   </BrowserRouter> 
   </CookiesProvider> 
   </Provider>  
  
)

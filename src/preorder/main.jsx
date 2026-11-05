import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import PreOrder from './PreOrder.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PreOrder />
  </StrictMode>,
)

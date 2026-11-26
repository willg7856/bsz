import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Apply from './Apply.jsx'
import './apply.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Apply />
  </StrictMode>,
)

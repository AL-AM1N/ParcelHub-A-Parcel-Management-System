import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router/dom";
import { router } from './router/router';
import AuthProvider from './contexts/AuthContext/AuthProvider';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='bg-[#EAECED]'>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </div>
  </StrictMode>,
)

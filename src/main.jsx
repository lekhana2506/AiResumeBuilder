import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignIn from './auth/sign-in/SignIn.jsx'
import { Home } from 'lucide-react'
import HomePage from './Pages/HomePage/HomePage.jsx'
import Dashboard from './Pages/Dashboard/Dashboard.jsx'
import { ClerkProvider } from '@clerk/clerk-react'
import SignInPage from './auth/sign-in/SignIn.jsx'
import EditResume from './Pages/Dashboard/Resume/[resumeId]/edit'
import ViewResume from './myresume/documentId/View'


const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}
const router=createBrowserRouter(
  [{
    path:'/',
    element:<HomePage/>
  },
    {
      element:<App/>,
      children:[
        
        {
          path:'/dashboard',
          element:<Dashboard/>
        },
        {
          path:'/dashboard/resume/:documentId/edit',
          element:<EditResume/>
        }
      ]
    },
    {
      path:'/auth/signin',
      element:<SignInPage/>
    },
    {
      path:'/myresume/:documentId/View',
      element:<ViewResume/>
    }
  ]
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <RouterProvider router={router}/>
    </ClerkProvider>
    
  </StrictMode>,
)

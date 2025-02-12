import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import './index.css'
import App from './App.jsx'
import NotFoundPage from './pages/NotFoundPage'
import EventDetailPage from './pages/EventDetail'
import EventsPage from './pages/eventsPage'
import ClubsPage from './components/ui/custom/ClubPage.jsx'
import SignUpForm from './components/signup.jsx'
import LoginForm from './components/login.jsx'
import Contact from './pages/Contact'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFoundPage />,
  },
  ,
  {
    path: '/events',
    element: <EventsPage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/events/:Eventid',
    element: <EventDetailPage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/clubs',
    element: <ClubsPage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/signup',
    element: <SignUpForm />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/login',
    element: <LoginForm />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/contact',
    element: <Contact />,
    errorElement: <NotFoundPage />,
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Link, useLocation, Navigate } from 'react-router';
import './index.css';
import App from './App.jsx';
import NotFoundPage from './pages/NotFoundPage';
import EventDetailPage from './pages/EventDetail';
import EventsPage from './pages/eventsPage';
import ClubsPage from './components/ui/custom/ClubPage.jsx';
import SignUpForm from './components/signup.jsx';
import LoginForm from './components/login.jsx';
import { AuthProvider, useAuth } from './context/auth-context';
import Contact from './pages/Contact'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

const EventScheduleRedirect = () => {
  useEffect(() => {
    window.location.href = 'http://127.0.0.1:8000/add_event/';
  }, []);

  return <div>Redirecting to event schedule...</div>;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFoundPage />,
  },
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
    path: '/add_event',
    element: (
      <ProtectedRoute>
        <EventScheduleRedirect />
      </ProtectedRoute>
    ),
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
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);

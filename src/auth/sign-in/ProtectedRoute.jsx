import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('jwt');

  if (!token) {
    // Redirect to sign-in if not authenticated
    return <Navigate to="/auth/signin" />;
  }

  return children;
};

export default ProtectedRoute;

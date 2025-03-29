
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if user is authenticated from localStorage
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authStatus);
    
    if (!authStatus) {
      navigate('/sign-in');
    }
  }, [navigate]);

  // Show nothing while checking auth status to prevent flashes
  if (isAuthenticated === null) {
    return null;
  }

  // If authenticated, render children
  return isAuthenticated ? <>{children}</> : null;
};

export default AuthGuard;

'use client';

import { useAuth } from '../context/AuthContext';
import { useLogging } from '../context/LoggingContext';

/**
 * LoginButton component handles user authentication UI
 * It displays either a login button or user info with logout button
 */
export default function LoginButton() {
  const { isAuthenticated, login, logout, userData } = useAuth();
  const logging = useLogging();

  const handleLogin = () => {
    logging.info('User initiated login');
    login();
  };

  const handleLogout = () => {
    logging.info('User logged out');
    logout();
  };

  return (
    <div className="fixed top-8 left-8 z-10">
      {isAuthenticated ? (
        <div className="flex items-center space-x-3">
          <span className="text-blue-300 text-sm">
            {userData?.name || 'User'}
          </span>
          <button
            onClick={handleLogout}
            className="bg-indigo-900/70 hover:bg-indigo-800/90 text-white px-3 py-1 rounded text-sm transition-all duration-300"
            aria-label="Logout"
          >
            Logout
          </button>
        </div>
      ) : (
        <button
          onClick={handleLogin}
          className="bg-indigo-900/70 hover:bg-indigo-800/90 text-white px-3 py-1 rounded text-sm transition-all duration-300"
          aria-label="Login"
        >
          Login
        </button>
      )}
    </div>
  );
}

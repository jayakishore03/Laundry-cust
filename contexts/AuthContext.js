import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (mobileNumber, password) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setUser({ mobileNumber, name: `User ${mobileNumber.slice(-4)}` });
      setIsLoading(false);
    }, 1000);
  };

  const signup = async (name, email, password, mobileNumber, address) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setUser({ email, name, mobileNumber, address });
      setIsLoading(false);
    }, 1000);
  };

  const logout = () => {
    setUser(null);
  };

  const isAuthenticated = () => {
    return user !== null;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        isAuthenticated: isAuthenticated(),
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


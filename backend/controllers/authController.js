import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const username = localStorage.getItem('username');
    return {
      token,
      role,
      user: username ? { username } : null,
    };
  });

  const login = (data) => {
    localStorage.setItem('token', data.token);
    localStorage.setItem('role', data.role);
    localStorage.setItem('username', data.username); // assuming your backend sends `username`

    setAuth({
      token: data.token,
      role: data.role,
      user: { username: data.username },
    });
    return data.role;
  };

  const logout = () => {
    localStorage.clear();
    setAuth({ token: null, role: null, user: null });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

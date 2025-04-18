import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const name = localStorage.getItem('name'); // ⬅️ store name too
    return { token, role, name };
  });

  const login = (data) => {
    localStorage.setItem('token', data.token);
    localStorage.setItem('role', data.role);
    localStorage.setItem('username', data.username);  // ✅ Set username
    setAuth({
      token: data.token,
      role: data.role,
      user: { username: data.username }  // ✅ Save in state
    });
    return data.role;
  };
  

  const logout = () => {
    localStorage.clear();
    setAuth({ token: null, role: null, name: null });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

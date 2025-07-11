
import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";


export function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedLoggedIn = localStorage.getItem("loggedIn") === "true";
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setLoggedIn(storedLoggedIn);
    setUser(storedUser);
  }, []);

  const login = (email, password) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    console.log(storedUser);
    
    if (
      storedUser &&
      storedUser.email === email &&
      storedUser.password === password
    ) {
      localStorage.setItem("loggedIn", "true");
      setLoggedIn(true);
      setUser(storedUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("loggedIn");
    // localStorage.removeItem("user");
    setLoggedIn(false);
    setUser(null);
  };

  const signin = (email, password) => {
    const newUser = { email,password };
    localStorage.setItem("user", JSON.stringify(newUser));
    localStorage.setItem("loggedIn", "true");
    setLoggedIn(true);
    setUser(newUser);
  };

  return (
    <AuthContext.Provider
      value={{ loggedIn, login, logout, signin, user }}
    >
      {children}
    </AuthContext.Provider>
  );
}
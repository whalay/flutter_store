// import React, { createContext, useState } from 'react';

// const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [authState, setAuthState] = useState({
//     token: null,
//     user: null,
//   });

//   const login = (token, user) => {
//     // Perform login logic
//     setAuthState({
//       ...authState,
//       token: token,
//       user: user,
//     });
//     setIsLoggedIn(true);
//   };

//   const logout = () => {
//     // Perform logout logic
//     setAuthState({
//       token: null,
//       user: null,
//     });
//     setIsLoggedIn(false);
//   };

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, login, logout, authState }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export { AuthContext, AuthProvider };

import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout,isLoggedIn, user  }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };


import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState({});
  const [mockTestData, setMockTestData] = useState({});

  return (
    <AuthContext.Provider value={{ authData, setAuthData, mockTestData, setMockTestData }}>
      {children}
    </AuthContext.Provider>
  );
};

import React, { useContext, useState } from 'react'

const Auth = React.createContext()

export const AuthProvider =({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userInfo,setUserInfo]=useState(null);
  const [currentPage,setcurrentPage]=useState(1);

  return (
    <Auth.Provider value={{ loggedIn, update: setLoggedIn,setUserInfo,userInfo,currentPage,setcurrentPage }}>
      {children}
    </Auth.Provider>
  )
}

export const useAuth = () => useContext(Auth);
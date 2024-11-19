import { useEffect, useState } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider
} from "react-router-dom";
import MainLayout from "./Pages/More/MainLayout";
import Home from "./Pages/Home";
import SearchResult from "./Pages/SearchResult";
import Cart from "./Pages/Cart";
import Login from "./Pages/Login";
import { useAuth } from "./Context/AuthContext.jsx";
import CategoryWise from "./Pages/CategoryWise.jsx";

function App() {
  const {loggedIn}=useAuth();
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to={loggedIn? "/app/dashboard" : "/auth"} />,
    },
    {
      path:"/auth",
      element:loggedIn?<Navigate to="/app/dashboard"/>:<Login/>
    },
    {
      path: "/app/",
      element: <MainLayout />,
      children: [
        {
          path: "/app/dashboard",
          element: <Home/>, // Home must have <Outlet /> to render child components
        },
        {
          path: "/app/search",
          element: <SearchResult/>,
        },
        {
          path: "/app/category",
          element: <CategoryWise/>,
        },
        {
          path: "/app/cart",
          element: <Cart/>,
        },
      ],
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

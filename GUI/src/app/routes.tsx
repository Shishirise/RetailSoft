import { createBrowserRouter, Navigate } from "react-router-dom";

// Pages
import Login from "./components/login";
import Signup from "./components/signup";

// Dashboard Layout + Pages
import { Layout } from "./components/layout";
import { Dashboard } from "./components/dashboard";
import { Inventory } from "./components/inventory";
import { Sales } from "./components/sales";
import { Reports } from "./components/reports";

// 🔐 Simple auth check (localStorage)
const isLoggedIn = !!localStorage.getItem("loggedIn");

export const router = createBrowserRouter([
  {
    path: "/", // 🔥 Landing page = LOGIN
    element: <Login />,
  },

  {
    path: "/signup",
    element: <Signup />,
  },

  {
    path: "/dashboard",
    element: isLoggedIn ? <Layout /> : <Navigate to="/" />,
    children: [
      {
        index: true, // default /dashboard
        element: <Dashboard />,
      },
      {
        path: "inventory",
        element: <Inventory />,
      },
      {
        path: "sales",
        element: <Sales />,
      },
      {
        path: "reports",
        element: <Reports />,
      },
    ],
  },

  // ❗ Catch unknown routes
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);
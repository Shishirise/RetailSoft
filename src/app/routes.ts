import { createBrowserRouter, Navigate } from "react-router-dom";

import Login from "./components/login";
import Signup from "./components/signup";

import { Layout } from "./components/layout";
import { Dashboard } from "./components/dashboard";
import { Inventory } from "./components/inventory";
import { Sales } from "./components/sales";
import { Reports } from "./components/reports";

// simple auth (temporary)
const isLoggedIn = localStorage.getItem("user");

export const router = createBrowserRouter([
  {
    path: "/",              // 🔥 FIRST PAGE = LOGIN
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
      { index: true, element: <Dashboard /> },
      { path: "inventory", element: <Inventory /> },
      { path: "sales", element: <Sales /> },
      { path: "reports", element: <Reports /> },
    ],
  },
]);
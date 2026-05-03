import { createBrowserRouter } from "react-router";
import { Layout } from "./components/layout";
import { Dashboard } from "./components/dashboard";
import { Inventory } from "./components/inventory";
import { Sales } from "./components/sales";
import { Reports } from "./components/reports";

/**
 * Router configuration for the application
 * Defines all routes and their corresponding components
 */
export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout, // Main layout with sidebar navigation
    children: [
      { index: true, Component: Dashboard }, // Default route - Dashboard
      { path: "inventory", Component: Inventory }, // Inventory management page
      { path: "sales", Component: Sales }, // Sales tracking page
      { path: "reports", Component: Reports }, // Reports generation page
    ],
  },
]);
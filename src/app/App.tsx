import { RouterProvider } from "react-router";
import { router } from "./routes";

/**
 * Main App component
 * Entry point for the inventory/sales tracking application
 * Uses React Router for navigation between Dashboard, Inventory, and Sales pages
 */
export default function App() {
  return <RouterProvider router={router} />;
}
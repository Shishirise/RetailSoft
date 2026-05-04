<<<<<<< HEAD
import { RouterProvider } from "react-router";
import { router } from "./routes";
=======
import { AuthProvider } from "./contexts/AuthContext";
import { AppRouter } from "./components/app-router";
>>>>>>> 005beb18e (Initial commit - connect local project)

/**
 * Main App component
 * Entry point for the inventory/sales tracking application
 * Uses React Router for navigation between Dashboard, Inventory, and Sales pages
<<<<<<< HEAD
 */
export default function App() {
  return <RouterProvider router={router} />;
=======
 * Includes authentication context for manager login
 */
export default function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
>>>>>>> 005beb18e (Initial commit - connect local project)
}
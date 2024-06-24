import { createBrowserRouter } from "react-router-dom";
import Home from "./components/pages/home";
import NotFound from "./components/pages/not-found";
import Dashboard from "./components/pages/dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

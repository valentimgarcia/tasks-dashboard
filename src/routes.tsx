import { createBrowserRouter } from "react-router-dom";
import Main from "./components/pages/main";
import NotFound from "./components/pages/not-found";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

import { useRoutes } from "react-router-dom";
import Config from "./pages/config";
import Home from "./pages/home";
import Dashboard from "./pages/dashboard";
import PostPost from "./pages/postPost";
import Nav from "./components/nav";
import AddConfig from "./pages/addConfig";
import { ContextProvider } from "./config/context";
export default function Router() {
  return useRoutes([
    {
      path: "/",
      children: [
        {
          path: "",
          element: <Home />,
        },
      ],
    },
    {
      path: "/app",
      element: <Nav />,
      children: [
        {
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          path: "addconfig",
          element: <AddConfig />,
        },
        {
          path: "config",
          element: <Config />,
        },
        {
          path: "post",
          element: <PostPost />,
        },
        // {
        //   path: "report/:rid/:pid",
        //   element: <Report />,
        // },
        // {
        //   path: "reportpost/:id?/:name?",
        //   element: <PostReport />,
        // },
      ],
    },
  ]);
}

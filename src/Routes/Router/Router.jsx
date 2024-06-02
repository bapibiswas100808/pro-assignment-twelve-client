import { createBrowserRouter } from "react-router-dom";
import Root from "../../Root/Root";
import HomePage from "../../Pages/HomePage/HomePage";
import AllTest from "../../Pages/AllTest/AllTest";
import Login from "../../Components/Login/Login";
import Register from "../../Components/Register/Register";
const Router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      { path: "/", element: <HomePage></HomePage> },
      { path: "/allTest", element: <AllTest></AllTest> },
      { path: "/login", element: <Login></Login> },
      { path: "/register", element: <Register></Register> },
    ],
  },
]);

export default Router;

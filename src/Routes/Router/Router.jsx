import { createBrowserRouter } from "react-router-dom";
import Root from "../../Root/Root";
import HomePage from "../../Pages/HomePage/HomePage";
import AllTest from "../../Pages/AllTest/AllTest";
const Router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      { path: "/", element: <HomePage></HomePage> },
      { path: "/allTest", element: <AllTest></AllTest> },
    ],
  },
]);

export default Router;

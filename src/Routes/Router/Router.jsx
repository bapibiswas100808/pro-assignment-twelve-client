import { createBrowserRouter } from "react-router-dom";
import Root from "../../Root/Root";
import HomePage from "../../Pages/HomePage/HomePage";
import AllTest from "../../Pages/AllTest/AllTest";
import Login from "../../Components/Login/Login";
import Register from "../../Components/Register/Register";
import DashBoard from "../../Pages/DashBoard/DashBoard";
import MyProfile from "../../Pages/DashBoard/MyProfile/MyProfile";
import MyResults from "../../Pages/DashBoard/MyResults/MyResults";
import MyAppointments from "../../Pages/DashBoard/MyAppointments/MyAppointments";
const Router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      { path: "/", element: <HomePage></HomePage> },
      { path: "/allTest", element: <AllTest></AllTest> },
      { path: "/login", element: <Login></Login> },
      { path: "/register", element: <Register></Register> },
      {
        path: "/dashBoard",
        element: <DashBoard></DashBoard>,
        children: [
          { path: "myProfile", element: <MyProfile></MyProfile> },
          { path: "myApp", element: <MyAppointments></MyAppointments> },
          { path: "myResult", element: <MyResults></MyResults> },
        ],
      },
    ],
  },
]);

export default Router;

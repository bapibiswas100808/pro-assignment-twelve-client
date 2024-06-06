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
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import TestDetails from "../../Pages/TestDetails/TestDetails";
import AllUsers from "../../Pages/DashBoard/AllUsers/AllUsers";
import AddTest from "../../Pages/DashBoard/AddTest/AddTest";
const Router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      { path: "/", element: <HomePage></HomePage> },
      { path: "/allTest", element: <AllTest></AllTest> },
      {
        path: "/testDetails/:id",
        element: (
          <PrivateRoute>
            <TestDetails></TestDetails>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/allTest/${params.id}`),
      },
      { path: "/login", element: <Login></Login> },
      { path: "/register", element: <Register></Register> },
    ],
  },
  {
    path: "/dashBoard",
    element: (
      <PrivateRoute>
        <DashBoard></DashBoard>
      </PrivateRoute>
    ),
    children: [
      // user
      { path: "/dashBoard", element: <MyProfile></MyProfile> },
      { path: "myApp", element: <MyAppointments></MyAppointments> },
      { path: "myResult", element: <MyResults></MyResults> },
      // admin
      { path: "allUser", element: <AllUsers></AllUsers> },
      { path: "addTest", element: <AddTest></AddTest> },
    ],
  },
]);

export default Router;

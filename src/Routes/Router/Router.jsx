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
import AllTests from "../../Pages/DashBoard/AllTests/AllTests";
import UpdateTest from "../../Pages/DashBoard/UpdateTest/UpdateTest";
import AddBanner from "../../Pages/DashBoard/AddBanner/AddBanner";
import AllBanner from "../../Pages/DashBoard/AllBanner/AllBanner";
import Reservation from "../../Pages/DashBoard/Reservation/Reservation";
import Stats from "../../Pages/DashBoard/Stats/Stats";
import About from "../../Pages/About/About";
import Blogs from "../../Pages/Blogs/Blogs";
import ContactUs from "../../Pages/ContactUs/ContactUs";
import AdminRoute from "../AdminRoute/AdminRoute";
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
          fetch(
            `https://pro-assignment-tweleve-server.vercel.app/allTest/${params.id}`
          ),
      },
      { path: "/login", element: <Login></Login> },
      { path: "/register", element: <Register></Register> },
      { path: "/about", element: <About></About> },
      { path: "/blog", element: <Blogs></Blogs> },
      { path: "/contact", element: <ContactUs></ContactUs> },
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
      { path: "/dashBoard/myProfile", element: <MyProfile></MyProfile> },
      { path: "myApp", element: <MyAppointments></MyAppointments> },
      { path: "myResult", element: <MyResults></MyResults> },
      // admin
      { path: "allUser", element: <AllUsers></AllUsers> },
      { path: "addTest", element: <AddTest></AddTest> },
      { path: "allTest", element: <AllTests></AllTests> },
      { path: "addBanner", element: <AddBanner></AddBanner> },
      { path: "allBanner", element: <AllBanner></AllBanner> },
      { path: "reserve", element: <Reservation></Reservation> },
      {
        path: "/dashBoard/stats",
        element: (
          <AdminRoute>
            <Stats></Stats>
          </AdminRoute>
        ),
      },
      {
        path: "/dashBoard/update/:id",
        element: <UpdateTest></UpdateTest>,
        loader: ({ params }) =>
          fetch(
            `https://pro-assignment-tweleve-server.vercel.app/allTest/${params.id}`
          ),
      },
    ],
  },
]);

export default Router;

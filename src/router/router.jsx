import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Authentication/Login/Login";
import Register from "../pages/Authentication/Register/Register";
import Coverage from "../pages/Coverage/Coverage";
import PrivateRoute from "../routes/PrivateRoute";
import SendParcel from "../pages/SendParcel/SendParcel";
import DashboardLayout from "../layouts/DashboardLayout";
import MyParcels from "../pages/Dashboard/MyParcels/MyParcels";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import TrackParcel from "../pages/Dashboard/TrackParcel/TrackParcel";
import BeARider from "../pages/Dashboard/BeARider/BeARider";
import PrendingRiders from "../pages/Dashboard/PendingRiders/PendingRiders";
import ActiveRider from "../pages/Dashboard/ActiveRiders/ActiveRiders";
import MakeAdmin from "../pages/Dashboard/MakeAdmin/MakeAdmin";
import Forbidden from "../pages/Forbidden/Forbidden";
import AdminRoute from "../routes/AdminRoute";
import AssignRider from "../pages/Dashboard/AssignRider/AssignRider";
import RiderRoute from "../routes/RiderRoute";
import PendingDeliveries from "../pages/Dashboard/PendingDeliveries/PendingDeliveries";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        path: "/",
        Component: Home,
      },
      {
        path:'coverage',
        Component:Coverage,
        loader: () => fetch('/serviceCenters.json').then(res => res.json())
      },
      {
        path:'forbidden',
        Component:Forbidden
      },
      {
        path: 'beARider',
        element:<PrivateRoute><BeARider></BeARider></PrivateRoute>,
        loader: () => fetch("/serviceCenters.json").then(res => res.json())
      },
      {
        path:'sendParcel',
        element:<PrivateRoute><SendParcel></SendParcel></PrivateRoute>,
        loader: () => fetch("/serviceCenters.json").then(res => res.json())
      }
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: 'register',
        Component:Register
      }
    ],
  },
  {
    path:'/dashboard',
    element:<PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    children:[
      {
        path:'myParcels',
        Component:MyParcels
      },
      {
        path:'payment/:parcelId',
        Component:Payment
      },
      {
        path:'paymentHistory',
        Component:PaymentHistory
      },
      {
        path:'track',
        Component:TrackParcel
      },
      //rider only routes
      {
        path:'pending-deliveries',
        element: <RiderRoute><PendingDeliveries></PendingDeliveries></RiderRoute>
      },

      // admin only routes
      {
        path: 'assign-rider',
        element: <AdminRoute><AssignRider></AssignRider></AdminRoute>
      },
      {
        path:'pending-riders',
        element:<AdminRoute><PrendingRiders></PrendingRiders></AdminRoute>
      },
      {
        path:'active-riders',
        element:<AdminRoute><ActiveRider></ActiveRider></AdminRoute>
      },
      {
        path:'makeAdmin',
        element:<AdminRoute><MakeAdmin></MakeAdmin></AdminRoute>
      }
    ]
  }
]);

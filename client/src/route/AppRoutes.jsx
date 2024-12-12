import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "../components/LoginPage";
import RegisterPage from "../components/RegisterPage";
import HomePage from "../components/HomePage";
import Layout from "../layouts/Layout";
import LayoutUser from "../layouts/LayoutUser";
import ContactPage from "../components/ContactPage";
import AccoutPage from "../components/AccoutPage";
import DetailPage from "../components/DetailPage";
import SettingPage from "../components/SettingPage";
import BookingPage from "../components/BookingPage";
import UpdateProfilePage from "../components/UpdateProfilePage";
import UpdatePasswordPage from "../components/UpdatePasswordPage";
import RoomPage from "../components/RoomPage";
import BookingDetailPage from "../components/BookingDetailPage";
import PaymentPage from "../components/PaymentPage";
import LayoutAdmin from "../layouts/LayoutAdmin";
import EmployeePage from "../components/admin/employee/EmployeePage";
import Room from "../components/admin/room/Room";
import Booking from "../components/admin/booking/Booking";
import CheckIn from "../components/admin/CheckIn";
import CheckOut from "../components/admin/CheckOut";
import UpdateEmployee from "../components/admin/employee/UpdateEmployee";
import CreateEmployee from "../components/admin/employee/CreateEmployee";
import Lists from "../components/admin/employee/Lists";
import ConfirmPage from "../components/admin/booking/ConfirmPage";
import GetRoom from "../components/admin/booking/GetRoom";
import UpdateBoooking from "../components/admin/UpdateCheckin";
import Main from "../components/admin/Main";
import CreateBooking from "../components/admin/booking/CreateBooking";
import ListsRoom from "../components/admin/room/ListsRoom";
import CreateRoom from "../components/admin/room/CreateRoom";
import UpdateRoom from "../components/admin/room/UpdateRoom";
import UpdateCheckin from "../components/admin/UpdateCheckin";

const route = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "room", element: <RoomPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "detail/:id", element: <DetailPage /> },
      { path: "payment/:id", element: <PaymentPage /> },
    ],
  },
  {
    path: "/user",
    element: <LayoutUser />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "room", element: <RoomPage /> },
      { path: "contact", element: <ContactPage /> },
      {
        path: "setting",
        element: <SettingPage />,
        children: [
          { index: true, element: <AccoutPage /> },

          { path: "booking", element: <BookingPage /> },
          { path: "detail/:id", element: <BookingDetailPage /> },
          { path: "update-profile/:id", element: <UpdateProfilePage /> },
          { path: "update-password/:id", element: <UpdatePasswordPage /> },
        ],
      },
      { path: "detail/:id", element: <DetailPage /> },
      { path: "payment/:id", element: <PaymentPage /> },
    ],
  },
  {
    path: "/admin",
    element: <LayoutAdmin />,
    children: [
      { index: true, element: <Main /> },
      {
        path: "room",
        element: <Room />,
        children: [
          { index: true, element: <ListsRoom /> },
          { path: "update/:id", element: <UpdateRoom /> },
          { path: "create", element: <CreateRoom /> },
        ],
      },

      {
        path: "booking",
        element: <Booking />,
        children: [
          { index: true, element: <CreateBooking /> },
          { path: "confirm", element: <ConfirmPage /> },
          { path: "get-room", element: <GetRoom /> },
        ],
      },
      {
        path: "employee",
        element: <EmployeePage />,
        children: [
          { index: true, element: <Lists /> },
          { path: "update/:id", element: <UpdateEmployee /> },
          { path: "create", element: <CreateEmployee /> },
        ],
      },
      { path: "update/:id", element: <UpdateBoooking /> },
      {
        path: "checkin",
        element: <CheckIn />,
        children: [{ path: "update", element: <UpdateCheckin /> }],
      },
      { path: "checkout", element: <CheckOut /> },
    ],
  },
]);

const AppRoutes = () => {
  return (
    <>
      <RouterProvider router={route} />
    </>
  );
};

export default AppRoutes;

// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./assets/style.css";
import React from "react";
import Menu from "./assets/pages/Menu";
import Update from "./assets/pages/Update";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Create from "./assets/pages/Create";

const arrayRouter = [
  {
    path: "/update/:id",
    element: <Update />,
  },
  {
    path: "/",
    element: <Menu />,
  },
  {
    path: "/Create",
    element: <Create />,
  },
];

const router = createBrowserRouter(arrayRouter);

function App() {
  // component

  return (
    <div>
      <RouterProvider router={router} />;
    </div>
  );
}
export default App;

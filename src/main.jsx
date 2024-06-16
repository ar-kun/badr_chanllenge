import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/css/index.css';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Order } from './Pages/Order';
import { ErrorPage } from './Pages/ErrorPage';
import { DetailOrder } from './Pages/DetailOrder';
import { CreateOrder } from './Pages/CreateOrder';

const router = createBrowserRouter([
 {
  path: '/',
  element: <Order />,
  errorElement: <ErrorPage />,
 },
 {
  path: '/detail/:OrderId',
  element: <DetailOrder />,
  errorElement: <ErrorPage />,
 },
 {
  path: '/create',
  element: <CreateOrder />,
  errorElement: <ErrorPage />,
 },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
 <React.StrictMode>
  <RouterProvider router={router} />
 </React.StrictMode>
);

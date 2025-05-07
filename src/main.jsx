import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import Root from './Layout/Root.jsx';
import Home from './component/Home.jsx';
import Destination from './component/Destination.jsx';
import Authentication from './PagesAuthentication/Authentication.jsx';
import LoginPage from './component/LoginPage.jsx';
import Register from './component/Register.jsx';
import AuthProvider from './Provider/AuthProvider.jsx';
import PrivateRoute from './Layout/PrivateRoute.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children:[
      {
        path: '/',
        Component: Home,
      },
      {
        path: '/:id',
        loader: ()=> fetch('/places.json').then(res => res.json()),
        element: <PrivateRoute> <Destination></Destination></PrivateRoute>,
      },
      {
        path: '/auth',
        Component: Authentication,
        children: [
          {
            path: '/auth/login',
            Component: LoginPage,
          },
          {
            path: '/auth/register',
            Component: Register,
          }
        ]
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)

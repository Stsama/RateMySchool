import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Layout from './components/Layout';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import UserProfile from './pages/UserProfile';
import Delete from './pages/DeleteSchool';
import SingleSchool from './pages/SingleSchool';
import EditSchool from './pages/EditSchool';
import CreateSchool from './pages/CreateSchool';
import Logout from './pages/Logout';
import Dashboard from './pages/Dashboard';
import CategorySchool from './pages/CategorySchools';
import AuthorSchool from './pages/AuthorSchools';
import Authors from './pages/Authors';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    errorElement: <ErrorPage/>,
    children : [
      {index: true, element: <Home/>},
      {path: 'login', element: <Login/>},
      {path: 'register', element: <Register/>},
      {path: 'profile/:id', element: <UserProfile/>},
      {path: 'logout', element: <Logout/>},

      {path: 'create', element: <CreateSchool/>},
      {path: 'schools/:id', element: <SingleSchool/>},
      {path: 'schools/:id/edit', element: <EditSchool/>},
      {path: 'schools/:id/delete', element: <Delete/>},
      {path: 'schools/users/:id', element: <AuthorSchool/>},
      {path: 'authors', element: <Authors/>},
      {path: 'schools/categories/:category', element: <CategorySchool/>},

      {path: 'myschools/:id', element: <Dashboard/>},

    ]
  }

]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

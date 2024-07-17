import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Layout from './components/Layout';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/UserProfile';
import Delete from './pages/DeleteSchool';
import SingleSchool from './pages/SingleSchool';
import EditSchool from './pages/EditSchool';
import CreateSchool from './pages/CreateSchool';
import Search from './pages/SearchSchool';
import Logout from './pages/Logout';
import Dashboard from './pages/Dashboard';
import Schools from './pages/Schools';
import CategorySchool from './pages/CategorySchool';
import AuthorSchools from './pages/AuthorSchools';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    errorElement: <ErrorPage/>,
    children : [
      {index: true, element: <Home/>},
      {path: 'login', element: <Login/>},
      {path: 'register', element: <Register/>},
      {path: 'profile', element: <Profile/>},
      {path: 'schools', element: <Schools/>},
      {path: 'schools/:author/', element: <AuthorSchools/>},
      {path: 'schools/category/:category', element: <CategorySchool/>},
      {path: 'schools/:id', element: <SingleSchool/>},
      {path: 'schools/:id/edit', element: <EditSchool/>},
      {path: 'schools/:id/delete', element: <Delete/>},
      {path: 'create', element: <CreateSchool/>},
      {path: 'search', element: <Search/>},
      {path: 'logout', element: <Logout/>},
      {path: 'dashboard', element: <Dashboard/>},
      {}

    ]
  }

]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

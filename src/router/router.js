import React from 'react'
import { Link } from 'react-router-dom'

const Home = React.lazy(() => import('../views/home/Home'))
const About = React.lazy(() => import('../views/about/About'))
const Dashboard = React.lazy(() => import('../views/dashboard/Dashboard'))
const List = React.lazy(() => import('../views/list/List'))
const Login = React.lazy(() => import('../views/login/Login'))

export const routers = [
  {
    label: <Link to="/main">Main</Link>,
    element: (
      <React.Suspense fallback={<>...</>}>
        <Home />
      </React.Suspense>
    ),
    key: 'main',
    to: '/main'
  },
  {
    label: <Link to="/login">Login</Link>,
    element: (
      <React.Suspense fallback={<>...</>}>
        <Login />
      </React.Suspense>
    ),
    key: 'login',
    to: '/login'
  },
  {
    label: <Link to="/about">About</Link>,
    element: (
      <React.Suspense fallback={<>...</>}>
        <About name="Ken" />
      </React.Suspense>
    ),
    key: 'about',
    to: '/about'
  },
  {
    label: <Link to="/dashboard">Dashboard</Link>,
    element: (
      <React.Suspense fallback={<>...</>}>
        <Dashboard />
      </React.Suspense>
    ),
    key: 'dashboard',
    to: '/dashboard'
  },
  {
    label: <Link to="/list">List</Link>,
    element: (
      <React.Suspense fallback={<>...</>}>
        <List params={{ meta: { id: 1, name: 'ken' } }} />
      </React.Suspense>
    ),
    key: 'list',
    to: '/list'
  }
]

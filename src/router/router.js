import { Link } from 'react-router-dom'

import Home from '../views/home/Home'
import About from '../views/about/About'
import Dashboard from '../views/dashboard/Dashboard'
import List from '../views/list/List'

export const routers = [
  {
    label: <Link to="/main">Main</Link>,
    element: <Home />,
    key: 'main',
    to: '/main'
  },
  {
    label: <Link to="/about">About</Link>,
    element: <About name="Ken" />,
    key: 'about',
    to: '/about'
  },
  {
    label: <Link to="/dashboard">Dashboard</Link>,
    element: <Dashboard />,
    key: 'dashboard',
    to: '/dashboard'
  },
  {
    label: <Link to="/list">List</Link>,
    element: <List params={{ meta: { id: 1, name: 'ken' } }} />,
    key: 'list',
    to: '/list'
  }
]

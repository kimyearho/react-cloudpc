import React, { Suspense } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { WindowsOutlined, CodeSandboxOutlined } from '@ant-design/icons'

import Layout from '../layouts/Layout'
import Login from '../views/login/Login'
import Loader from '../utils/loader'
import Home from '../views/home/Home'

// const Home = React.lazy(() => imporCt('../views/home/Home'))
const CloudPcDetail = React.lazy(() =>
  import('../views/cloudPcInfo/CloudPcDetail')
)

const RequireAuth = ({ children }) => {
  const isAuthentication = useSelector(
    (state) => state.user.userInfo.isAuthentication
  )
  if (!isAuthentication) {
    return <Navigate to="/login" replace />
  }
  return children
}

const IsLogin = () => {
  const isAuthentication = useSelector(
    (state) => state.user.userInfo.isAuthentication
  )
  if (!isAuthentication) {
    return <Login />
  }
}

export const routers = [
  {
    key: 'root',
    path: '/',
    element: <Layout />,
    children: [
      {
        key: 'login',
        path: '/login',
        element: <IsLogin />
      },
      {
        key: 'dashboard',
        path: '/dashboard',
        index: true,
        icon: <WindowsOutlined />,
        element: (
          <RequireAuth>
            <Suspense fallback={<Loader />}>
              <Home />
            </Suspense>
          </RequireAuth>
        )
      },
      {
        key: 'cpcinfo',
        path: '/cpc-info',
        icon: <CodeSandboxOutlined />,
        label: 'Cloud PC 정보',
        children: [
          {
            index: true,
            element: (
              <RequireAuth>
                <Suspense fallback={<Loader />}>
                  <CloudPcDetail
                    meta={{
                      title: 'Cloud PC 목록',
                      showPcSubmenu: true,
                      showAlert: false
                    }}
                  />
                </Suspense>
              </RequireAuth>
            )
          }
        ]
      }
    ]
  }
]

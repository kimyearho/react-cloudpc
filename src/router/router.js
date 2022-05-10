import React, { Suspense } from 'react'
import Loader from '../utils/loader'
import { useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import {
  WindowsOutlined,
  CodepenOutlined,
  CodeSandboxOutlined
} from '@ant-design/icons'

//* 지연 로딩을 해야한다면 아래 솔루션을 사용한다.
// const Login = React.lazy(async () => {
//   const [moduleExports] = await Promise.all([
//     import('../views/login/Login'),
//     new Promise((resolve) => setTimeout(resolve, 500))
//   ])
//   return moduleExports
// })

const Home = React.lazy(() => import('../views/home/Home'))
const CloudPcDetail = React.lazy(() =>
  import('../views/cloudPcInfo/CloudPcDetail')
)

function RequireAuth({ children }) {
  const isAuthentication = useSelector(
    (state) => state.user.userInfo.isAuthentication
  )
  if (!isAuthentication) {
    return <Navigate to="/login" replace />
  }
  return children
}

export const routers = [
  {
    label: <Link to="/main">Home</Link>,
    key: 'main',
    path: '/main',
    icon: <WindowsOutlined />,
    meta: null,
    element: (
      <RequireAuth>
        <Suspense fallback={<Loader />}>
          <Home />
        </Suspense>
      </RequireAuth>
    )
  },
  {
    label: <Link to="/cloudPcInfo">Cloud PC 정보</Link>,
    key: 'cloudPcInfo',
    path: '/cloudPcInfo',
    icon: <CodeSandboxOutlined />,
    meta: null,
    element: (
      <RequireAuth>
        <Suspense fallback={<Loader />}>
          <CloudPcDetail
            meta={{
              title: 'CloudPC 정보',
              showPcSubmenu: false,
              showAlert: true,
              alertTitle:
                '자가 오류복구는 Cloud PC에 이상이 있을 시 사용자가 직접 Cloud PC를 초기화 하는 기능입니다.',
              alertMessage:
                '오류 복구는 C드라이브에 설치된 OS 영역만 초기화되며 D드라이브의 데이터는 초기화되지 않습니다. (사용자가 별도로 설치한 프로그램은 모두 삭제됨)'
            }}
          />
        </Suspense>
      </RequireAuth>
    )
  },
  {
    label: 'Cloud PC 관리',
    key: 'submenu',
    icon: <CodepenOutlined />,
    children: [
      {
        type: 'group',
        label: 'User',
        children: [
          {
            label: <Link to="/about">자가 오류 복구</Link>,
            key: 'about',
            path: '/about',
            element: (
              <RequireAuth>
                <Suspense fallback={<Loader />}>
                  <></>
                </Suspense>
              </RequireAuth>
            )
          }
        ]
      },
      {
        type: 'group',
        label: 'Example',
        children: [
          {
            label: <Link to="/dashboard">장애 처리 신청</Link>,
            key: 'dashboard',
            path: '/dashboard',
            element: (
              <RequireAuth>
                <Suspense fallback={<>...</>}>
                  <></>
                </Suspense>
              </RequireAuth>
            )
          },
          {
            label: <Link to="/list">스냅샷 및 복원</Link>,
            key: 'list',
            path: '/list',
            element: (
              <RequireAuth>
                <Suspense fallback={<>...</>}>
                  {/* <List params={{ meta: { id: 1, name: 'ken' } }} /> */}
                  <></>
                </Suspense>
              </RequireAuth>
            )
          }
        ]
      }
    ]
  }
]

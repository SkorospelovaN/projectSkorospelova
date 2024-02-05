import {AUTH_ROUTE,MAIN_ROUTE, ONEREQ_ROUTE, PROFILE_ROUTE, REQ_ROUTE} from './utils/consts'
import { Navigate, RouterProvider, createBrowserRouter} from 'react-router-dom'
import OneRequest from './pages/OneRequest'
import Auth from './pages/Auth'
import Profile from './pages/Profile'
import Request from './pages/Request'
import MainPage from './MainPage'
import { useSelector } from 'react-redux'


const router = createBrowserRouter([
  {
    path: MAIN_ROUTE,
    element: <MainPage />,
    children: [
        {
            path: AUTH_ROUTE,
            element: <Auth />
        },
        {
            path: MAIN_ROUTE,
            element: <Auth />
        },
        {
            path: PROFILE_ROUTE,
            element: <Navigate to={MAIN_ROUTE} />
        }
      ]
  }
])

const userRoutes = createBrowserRouter ([
    {
        path: MAIN_ROUTE,
        element: <MainPage />,
        children: [
            {
                path: REQ_ROUTE,
                element: <Request />
            },
            {
                path: PROFILE_ROUTE,
                element: <Profile />
            },
            {
                path: MAIN_ROUTE,
                element: <Navigate to={PROFILE_ROUTE} />
            }
        ]
    }
])

const adminRoutes = createBrowserRouter ([
    {
        path: MAIN_ROUTE,
        element: <MainPage />,
        children: [
            {
                path: PROFILE_ROUTE,
                element: <Profile />
            },
            {
                path: ONEREQ_ROUTE,
                element: <OneRequest />
            },
            {
                path: MAIN_ROUTE,
                element: <Navigate to={PROFILE_ROUTE} />
            }
        ]
    }
])

function App() {

    const token = useSelector((state) => state.auth.token)
    const role = useSelector((state) => state.auth.role)
  
    console.log(token);
  
  
    return (
      token ? role === "ADMIN" ? <RouterProvider router={adminRoutes} /> : <RouterProvider router={userRoutes} /> :
      <RouterProvider router={router} />
    )
  }
  
  export default App

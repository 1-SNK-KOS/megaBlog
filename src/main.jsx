import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Provider} from 'react-redux'
import store from './store/store.js'
import { Route, RouterProvider , createBrowserRouter , createRoutesFromElements } from 'react-router-dom'
import Home from './pages/Home.jsx'
import { AuthLayout } from './components/index.js'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import EditPost from './pages/EditPost.jsx'
import AllPosts from './pages/AllPosts.jsx'
import Post from './pages/Post.jsx'
import AddPost from './pages/AddPost.jsx'
//REVIEW : why we are giving login components instead of page
// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path='/' element={<App/>}>
//       <Route path = '/'  element={<Home/>}/>
//       <Route path = '/login' element={<AuthLayout authentication = {false}><Login/></AuthLayout> } />
//       <Route path = '/signup' element={   <AuthLayout authentication={false}> <Signup/></AuthLayout>} />
//       <Route path = '/all-posts' element={<AuthLayout authentication> {"  "}<AllPost/> </AuthLayout>} />
//       <Route path = '/add-post' element={<AuthLayout authentication>  {" "}<AddPost/></AuthLayout>} />
//       <Route path = '/edit-post/:slug' element={ <AuthLayout authentication> {" "} <EditPost /> </AuthLayout>}/>
//       <Route path = '/post/:slug' element={<Post/>}/>
//     </Route>
//   )
// )

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/login",
            element: (
                <AuthLayout authentication={false}>
                    <Login />
                </AuthLayout>
            ),
        },
        {
            path: "/signup",
            element: (
                <AuthLayout authentication={false}>
                    <Signup />
                </AuthLayout>
            ),
        },
        {
            path: "/all-posts",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <AllPosts />
                </AuthLayout>
            ),
        },
        {
            path: "/add-post",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <AddPost />
                </AuthLayout>
            ),
        },
        {
            path: "/edit-post/:slug",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <EditPost />
                </AuthLayout>
            ),
        },
        {
            path: "/post/:slug",
            element: <Post />,
        },
    ],
},
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)

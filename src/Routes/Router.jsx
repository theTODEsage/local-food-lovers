import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home";
import AllReviews from "../Pages/AllReviews";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import AddReview from "../Pages/AddReview";
import PrivateRoute from "./PrivateRoute";
import MyReviews from "../Pages/MyReviews";
import ViewDetails from "../Pages/ViewDetails";
import EditReview from "../Pages/EditReview";
import NotFound from "../Pages/NotFound";
import MyFavorites from "../Components/MyFavorites";

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout/>,
        children: [
            {
                index: true,
                element: <Home/>
            },
            {
                path: '/all-reviews',
                element: <AllReviews/>
            },
            {
                path: '/add-review',
                element: <PrivateRoute><AddReview/></PrivateRoute>
            },
            {
                path: '/my-reviews',
                element: <PrivateRoute><MyReviews/></PrivateRoute>
            },
            {
                path:"/reviews/:id",
                element: <ViewDetails/>
            },
            {
                path:"/edit-review/:id",
                element: <PrivateRoute><EditReview/></PrivateRoute>
            },
            {
                path: '/my-favorites',
                element: <PrivateRoute><MyFavorites/></PrivateRoute>
            }
        ]
    },
    {
        path: '/auth',
        element: <AuthLayout/>,
        children: [
            {
                path: '/auth/login',
                element: <Login/>
            },
            {
                path: '/auth/register',
                element: <Register/>
            }
        ]
    },
    {
        path: '*',
        element: <NotFound/>
    }
])

export default router;
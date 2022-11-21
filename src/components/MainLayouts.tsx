import React, {useState} from 'react';
import {Link, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import CreatePost from "../pages/CreatePost";
import Login from "../pages/Login";
import {auth} from "../firebase";
import {signOut} from 'firebase/auth';
import {useNavigate} from "react-router";
import PrivateRoutes from "./PrivateRoutes";
import EditPost from "../pages/EditPost";
import MyPosts from "../pages/MyPosts";

const MainLayouts = () => {
    const [isAuth, setIsAuth] = useState<boolean>(false);
    const navigate = useNavigate();

    const logOff = () => {
        signOut(auth)
            .then(() => {
                setIsAuth(false);
                localStorage.clear();
                navigate('/login');
            })
    }

    return (
        <>
            <nav>
                <Link to={'/'}>Home</Link>
                {isAuth && <Link to={'/createpost'}>New post</Link>}
                {isAuth && <Link to={'/myposts'}>My posts</Link>}
                {!isAuth ? <Link to={'/login'}>Log in</Link> : <button onClick={logOff}>Sign out</button>}
            </nav>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route element={<PrivateRoutes isAuth={isAuth} />}>
                    <Route path='/createpost' element={<CreatePost/>} />
                    <Route path='/post/edit/:postId' element={<EditPost />} />
                    <Route path='/myposts' element={<MyPosts />} />
                </Route>
                <Route path='/login' element={<Login isAuth={isAuth} setIsAuth={setIsAuth} />} />
            </Routes>
        </>
    )
}
export default MainLayouts;
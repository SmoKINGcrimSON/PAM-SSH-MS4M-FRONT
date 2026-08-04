import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoutes = () => {
    const location = useLocation();
    const token = localStorage.getItem('token');
    //let auth = {'token':false}

    //return(
    //    token ? <Outlet /> : <Navigate to="/login" />
    //)
    if (!token){
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <Outlet />
}

export default PrivateRoutes
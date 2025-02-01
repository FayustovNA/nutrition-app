import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ children, isLoggedIn }: { children: JSX.Element; isLoggedIn: boolean }) => {
    return isLoggedIn ? children : <Navigate to="/login" replace />;
};
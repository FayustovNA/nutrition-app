import { Navigate } from 'react-router-dom';

export const RoleBasedRoute = ({ children, requiredRole, isUser }: { children: JSX.Element; requiredRole: string; isUser: string }) => {
    return isUser === requiredRole ? children : <Navigate to="/" />;
};
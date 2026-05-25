import { Navigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuth } from '../../application/hooks/useAuth';

export const RoleRoute = ({ allowedRoles }) => {
    const { role } = useAuth();

    if (!allowedRoles.includes(role)) {
        return role === 'creator'
            ? <Navigate to="/creator/dashboard" replace />
            : <Navigate to="/follower/feed" replace />;
    }

    return <Outlet />;
};

RoleRoute.propTypes = {
    allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired
};

import PropTypes from 'prop-types';
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { TokenContext } from './Context/TokenContext';

const ProtectedRoute = ({ children }) => {
    const { token } = useContext(TokenContext);
    const location = useLocation();

    return token ? children : <Navigate to="/login" state={{ from: location }} />;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
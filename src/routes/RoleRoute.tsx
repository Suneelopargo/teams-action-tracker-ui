import type { ReactElement } from 'react';

import { Navigate } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';

interface Props {
    children: ReactElement;
    roles: ('ADMIN' | 'PARTICIPANT')[];
}

export default function RoleRoute({
    children,
    roles,
}: Props) {
    const { user, isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (!user || !roles.includes(user.role)) {
        return (
            <Navigate
                to={user?.role === 'ADMIN' ? '/' : '/meetings'}
                replace
            />
        );
    }

    return children;
}
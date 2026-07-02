import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../features/auth/AuthContext";


interface ProtectedRouteProps{
    allowedRoles?: ('ROLE_USER' | 'ROLE_ADMIN' | 'ROLE_AUDITOR')[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({allowedRoles}) => {
    const {isAuthenticated, user, isLoading} = useAuth();

    if (isLoading) {
        return(
            <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400 font-mono text-xs">
                LOADING SECURE ROUTING LAYER ...
            </div>
        );
    }

    if (!isAuthenticated) {
        return<Navigate to="/login" replace />
    }

    if (allowedRoles && user && !allowedRoles.includes(user.role)) {
        return <Navigate to="/unauthorized" replace/>;
    }

    return <Outlet />;
}
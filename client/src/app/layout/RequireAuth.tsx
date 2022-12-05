import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppSelector } from "../store/configureStore";

interface Props {
    children: JSX.Element,
    roles?: string[]
}

export default function RequireAuth({ children, roles }: Props) {
    let location = useLocation();
    const { user } = useAppSelector(state => state.account);

    useEffect(() => {
      if (roles && !roles?.some(r => user?.roles?.includes(r))) {
        toast.error('Not authorised to access this area, sorry');
      }
    }, [user?.roles, roles])

    if (!user) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (roles && !roles?.some(r => user.roles?.includes(r))) {
        return <Navigate to="/catalog" replace />;
    }

    return children;
  }
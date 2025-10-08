import { Navigate, Outlet } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadUser } from "@/slice/authSlice";
import type { AppDispatch } from "@/store";

const PrivateRoute = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { isAuthenticated, isLoading } = useSelector(
    (state: { auth: { isAuthenticated: boolean; isLoading: boolean } }) =>
      state.auth
  );

  useEffect(() => {
    const storedUser = localStorage.getItem("activeAccount");
    if (!isAuthenticated && storedUser) {
      dispatch(loadUser());
    }
  }, [dispatch, isAuthenticated]);

  if (isLoading) {
    return null;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;

import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { UserContext } from "../hooks/UserContext";

function ProtectedRoute() {
  const { users, loading } = useContext(UserContext);
  const location = useLocation();

  // Step 1: wait until localStorage is loaded
  if (loading) return <p>Loading...</p>;

  // Step 2: if no user → redirect to login
  if (!users) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ msg: "Please login first", from: location.pathname }}
      />
    );
  }

  // Step 3: allow access
  return <Outlet />;
}

export default ProtectedRoute;

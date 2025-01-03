import { useSelector } from "react-redux";
import { Navigate } from "react-router";
export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((store) => store.auth);
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return children;
};
export const AuthenticatedUser = ({ children }) => {
  const { isAuthenticated } = useSelector((store) => store.auth);
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }
  return children;
};
export const AdminRoute = ({ children }) => {
  const { user, isAuthenticated } = useSelector((store) => store.auth);
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  if (user.user.role !== "instructor") {
    return <Navigate to="/" />;
  }
  return children;
};

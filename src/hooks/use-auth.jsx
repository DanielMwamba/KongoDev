import { useSelector } from "react-redux";

export default function useAuth() {
  const isAuthenticated = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.user);
  return { isAuthenticated, user };
}

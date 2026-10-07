import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { verify } from "../store/slice/userSlice";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

export default function Protect() {
  const { user, loading } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    dispatch(verify(false));
  }, [dispatch, location.pathname]);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/", { replace: true });
    }
  }, [user, loading, navigate]);
  if (loading || !user) return null;
  return <Outlet />;
}

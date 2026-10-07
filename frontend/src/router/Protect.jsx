import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { verify } from "../store/slice/userSlice";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

export default function Protect() {
  const { user, loading } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {  
      dispatch(verify(false));
  }, [dispatch]);

  useEffect(() => {
    
    if (!loading && !user) {
      navigate("/", { replace: true });
    }
  }, [user, loading, navigate]);
  return <Outlet />;
}

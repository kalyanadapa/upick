import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";

const AdminRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo &&userInfo?.data?.user?.isAdmin ? (
  <Box sx={{background: "linear-gradient(135deg, #2b5876, #4e4376)",}}>
  <Outlet />
  </Box>
  
  ) : (
    <Navigate to="/login" replace />
  );
};
export default AdminRoute;

import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useLogoutMutation } from "../redux/api/usersApiSlice";
import { logout } from "../redux/features/auth/authSlice";
import { useNavigate } from 'react-router';
import { useDispatch } from "react-redux";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function LogOut({ open, handleClose }) {
    const [logoutApiCall] = useLogoutMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logoutHandler = async () => {
        try {
          await logoutApiCall().unwrap();
          dispatch(logout());
          handleClose()
          navigate("/"); 
        } catch (error) {
          console.error(error);
          if(error.data.statusCode===401){
            localStorage.clear()
            document.cookie = "accessToken=; Max-Age=0; path=/; HttpOnly; secure";
            document.cookie = "refreshToken=; Max-Age=0; path=/; HttpOnly; secure";
          
            // Refresh the page to log the user out or redirect to login page
            window.location.reload(); 
          }
        }
      };
  return (
    <React.Fragment>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        PaperProps={{
            sx: {
              backgroundColor: 'white', // Custom background color
            },
          }}
      >
        <DialogTitle className='text-red-700'>{"Are you sure  you want to Logout ?"}</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} variant='outlined'>No</Button>
          <Button variant='contained' onClick= {logoutHandler}>Yes</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

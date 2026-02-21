// eslint-disable-next-line no-unused-vars
import React, { useState, useRef, useEffect } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  CircularProgress,
  Typography,
  Fade,
  Backdrop,
} from "@mui/material";
import { Visibility, VisibilityOff, Close, CloudUpload, CheckCircle } from "@mui/icons-material";
import Logo from "./Logo";
import { useSelector, useDispatch } from "react-redux";
import { closeSignUpModal, openLoginModal } from "../redux/features/auth/authSlice";

// eslint-disable-next-line react/prop-types
const SignUpModal = ({isLoading, onSubmit }) => {
  const dispatch = useDispatch();
  const { isSignUpModalOpen } = useSelector((state) => state.auth);
  const scrollContainerRef = useRef(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
    avatar: null,
    coverImage: null,
  });
  const [showPassword, setShowPassword] = useState(false);

  // Auto-focus the scroll container when modal opens
  useEffect(() => {
    if (isSignUpModalOpen && scrollContainerRef.current) {
      scrollContainerRef.current.focus();
    }
  }, [isSignUpModalOpen]);

  // Handle keyboard scrolling
  const handleKeyDown = (e) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    const scrollAmount = 50;
    
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      container.scrollBy({ top: scrollAmount, behavior: 'smooth' });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      container.scrollBy({ top: -scrollAmount, behavior: 'smooth' });
    } else if (e.key === 'PageDown') {
      e.preventDefault();
      container.scrollBy({ top: container.clientHeight, behavior: 'smooth' });
    } else if (e.key === 'PageUp') {
      e.preventDefault();
      container.scrollBy({ top: -container.clientHeight, behavior: 'smooth' });
    } else if (e.key === 'Home') {
      e.preventDefault();
      container.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (e.key === 'End') {
      e.preventDefault();
      container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  const handleClose = () => {
    dispatch(closeSignUpModal());
  };

  const textFieldStyles = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '12px',
      backgroundColor: '#f8fafc',
      transition: 'all 0.3s ease',
      '&:hover': {
        backgroundColor: '#f1f5f9',
      },
      '&.Mui-focused': {
        backgroundColor: '#fff',
        boxShadow: '0 0 0 3px rgba(236, 72, 153, 0.1)',
      },
      '& fieldset': {
        borderColor: '#e2e8f0',
      },
      '&:hover fieldset': {
        borderColor: '#cbd5e1',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#ec4899',
        borderWidth: '2px',
      },
    },
    '& .MuiInputLabel-root': {
      color: '#64748b',
      '&.Mui-focused': {
        color: '#ec4899',
      },
    },
  };

  return (
    <Modal 
      open={isSignUpModalOpen} 
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
          sx: { backgroundColor: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(8px)' }
        },
      }}
    >
      <Fade in={isSignUpModalOpen}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '95%', sm: '450px' },
            maxHeight: '90vh',
            bgcolor: 'white',
            borderRadius: '24px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            outline: 'none',
            overflow: 'hidden',
          }}
        >
          {/* Header with gradient */}
          <Box
            sx={{
              background: 'linear-gradient(135deg, #2e1924 0%, #90847b 100%)',
              py: 3,
              px: 4,
              position: 'relative',
            }}
          >
            <IconButton
              onClick={handleClose}
              sx={{
                position: 'absolute',
                right: 12,
                top: 12,
                color: 'white',
                bgcolor: 'rgba(255,255,255,0.2)',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' },
              }}
              size="small"
            >
              <Close fontSize="small" />
            </IconButton>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
              <Logo />
            </Box>
            <Typography
              variant="h5"
              sx={{
                color: 'white',
                fontWeight: 700,
                textAlign: 'center',
                textShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }}
            >
              Create Account
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'rgba(255,255,255,0.9)',
                textAlign: 'center',
                mt: 0.5,
              }}
            >
              Join Upick and start shopping
            </Typography>
          </Box>

          {/* Form Content */}
          <Box
            ref={scrollContainerRef}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            sx={{
              px: 4,
              py: 3,
              maxHeight: 'calc(90vh - 200px)',
              overflowY: 'auto',
              outline: 'none',
              '&::-webkit-scrollbar': {
                width: '6px',
              },
              '&::-webkit-scrollbar-track': {
                background: 'transparent',
              },
              '&::-webkit-scrollbar-thumb': {
                background: '#e2e8f0',
                borderRadius: '3px',
              },
              '&::-webkit-scrollbar-thumb:hover': {
                background: '#cbd5e1',
              },
            }}
          >
            <form onSubmit={handleFormSubmit}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                <TextField
                  name="fullName"
                  label="Full Name"
                  variant="outlined"
                  fullWidth
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  sx={textFieldStyles}
                />
                <TextField
                  name="email"
                  label="Email"
                  type="email"
                  variant="outlined"
                  fullWidth
                  value={formData.email}
                  onChange={handleChange}
                  required
                  sx={textFieldStyles}
                />
                <TextField
                  name="username"
                  label="Username"
                  variant="outlined"
                  fullWidth
                  value={formData.username}
                  onChange={handleChange}
                  required
                  sx={textFieldStyles}
                />
                <TextField
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  variant="outlined"
                  fullWidth
                  value={formData.password}
                  onChange={handleChange}
                  required
                  sx={textFieldStyles}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          sx={{ color: '#94a3b8' }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                {/* Avatar Upload */}
                <Box>
                  <Typography variant="body2" sx={{ color: '#475569', fontWeight: 500, mb: 1 }}>
                    Profile Picture *
                  </Typography>
                  <label>
                    <Box
                      sx={{
                        border: '2px dashed',
                        borderColor: formData.avatar ? '#10b981' : '#e2e8f0',
                        borderRadius: '12px',
                        p: 2.5,
                        textAlign: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        bgcolor: formData.avatar ? '#f0fdf4' : '#f8fafc',
                        '&:hover': {
                          borderColor: '#ec4899',
                          bgcolor: '#fdf2f8',
                        },
                      }}
                    >
                      {formData.avatar ? (
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                          <CheckCircle sx={{ color: '#10b981' }} />
                          <Typography variant="body2" sx={{ color: '#10b981', fontWeight: 500 }}>
                            {formData.avatar.name}
                          </Typography>
                        </Box>
                      ) : (
                        <>
                          <CloudUpload sx={{ fontSize: 32, color: '#94a3b8', mb: 0.5 }} />
                          <Typography variant="body2" sx={{ color: '#64748b' }}>
                            Click to upload avatar
                          </Typography>
                        </>
                      )}
                    </Box>
                    <input
                      type="file"
                      name="avatar"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={handleChange}
                      required
                    />
                  </label>
                </Box>

                {/* Cover Image Upload */}
                <Box>
                  <Typography variant="body2" sx={{ color: '#475569', fontWeight: 500, mb: 1 }}>
                    Cover Image (Optional)
                  </Typography>
                  <label>
                    <Box
                      sx={{
                        border: '2px dashed',
                        borderColor: formData.coverImage ? '#10b981' : '#e2e8f0',
                        borderRadius: '12px',
                        p: 2.5,
                        textAlign: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        bgcolor: formData.coverImage ? '#f0fdf4' : '#f8fafc',
                        '&:hover': {
                          borderColor: '#ec4899',
                          bgcolor: '#fdf2f8',
                        },
                      }}
                    >
                      {formData.coverImage ? (
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                          <CheckCircle sx={{ color: '#10b981' }} />
                          <Typography variant="body2" sx={{ color: '#10b981', fontWeight: 500 }}>
                            {formData.coverImage.name}
                          </Typography>
                        </Box>
                      ) : (
                        <>
                          <CloudUpload sx={{ fontSize: 32, color: '#94a3b8', mb: 0.5 }} />
                          <Typography variant="body2" sx={{ color: '#64748b' }}>
                            Click to upload cover
                          </Typography>
                        </>
                      )}
                    </Box>
                    <input
                      type="file"
                      name="coverImage"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={handleChange}
                    />
                  </label>
                </Box>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={isLoading}
                  sx={{
                    mt: 1,
                    py: 1.5,
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #ec4899 0%, #f97316 100%)',
                    fontSize: '1rem',
                    fontWeight: 600,
                    textTransform: 'none',
                    boxShadow: '0 4px 15px rgba(236, 72, 153, 0.4)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #db2777 0%, #ea580c 100%)',
                      boxShadow: '0 6px 20px rgba(236, 72, 153, 0.5)',
                      transform: 'translateY(-2px)',
                    },
                    '&:active': {
                      transform: 'translateY(0)',
                    },
                  }}
                >
                  {isLoading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : "Create Account"}
                </Button>
              </Box>
            </form>

            {/* Divider */}
            <Box sx={{ display: 'flex', alignItems: 'center', my: 3 }}>
              <Box sx={{ flex: 1, height: '1px', bgcolor: '#e2e8f0' }} />
              <Typography variant="body2" sx={{ px: 2, color: '#94a3b8' }}>
                or
              </Typography>
              <Box sx={{ flex: 1, height: '1px', bgcolor: '#e2e8f0' }} />
            </Box>

            {/* Login Link */}
            <Box sx={{ textAlign: 'center', pb: 1 }}>
              <Typography variant="body2" sx={{ color: '#64748b' }}>
                Already have an account?{' '}
                <Button
                  onClick={() => dispatch(openLoginModal())}
                  sx={{
                    p: 0,
                    minWidth: 'auto',
                    fontWeight: 600,
                    color: '#ec4899',
                    textTransform: 'none',
                    '&:hover': {
                      bgcolor: 'transparent',
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Sign In
                </Button>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default SignUpModal;

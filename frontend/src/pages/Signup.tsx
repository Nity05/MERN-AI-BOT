import React, { useEffect } from "react";
import { IoIosLogIn } from "react-icons/io";
import { Box, Typography, Button } from "@mui/material";
import CustomizedInput from "../components/shared/CustomizedInput";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try {
      toast.loading("Signing Up", { id: "signup" });
      await auth?.signup(name, email, password);
      toast.success("Signed Up Successfully", { id: "signup" });
    } catch (error) {
      console.log(error);
      toast.error("Signing Up Failed", { id: "signup" });
    }
  };

  useEffect(() => {
    if (auth?.user) {
      return navigate("/chat");
    }
  }, [auth]);

  return (
    <Box 
      width="100%" 
      height="100vh" 
      display="flex" 
      sx={{
        background: `linear-gradient(135deg, #EAEBD0 0%, #DA6C6C 100%)`,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle at 20% 80%, rgba(175, 62, 62, 0.3) 0%, transparent 50%), 
                      radial-gradient(circle at 80% 20%, rgba(205, 86, 86, 0.3) 0%, transparent 50%)`,
          zIndex: 1
        }
      }}
    >
      {/* Left Side - Robot Image */}
      <Box 
        padding={8} 
        display={{ md: "flex", sm: "none", xs: "none" }}
        flex={1}
        alignItems="center"
        justifyContent="center"
        sx={{ zIndex: 2, position: 'relative' }}
      >
        <Box
          sx={{
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: '-20px',
              left: '-20px',
              right: '-20px',
              bottom: '-20px',
              background: `linear-gradient(45deg, rgba(175, 62, 62, 0.1), rgba(205, 86, 86, 0.1))`,
              borderRadius: '50%',
              filter: 'blur(20px)',
              zIndex: -1
            }
          }}
        >
          <img 
            src="airobot.png" 
            alt="Robot" 
            style={{ 
              width: "400px",
              filter: 'drop-shadow(0 20px 40px rgba(175, 62, 62, 0.3))',
              transition: 'transform 0.3s ease',
            }} 
          />
        </Box>
      </Box>

      {/* Right Side - Signup Form */}
      <Box
        display="flex"
        flex={{ xs: 1, md: 1 }}
        justifyContent="center"
        alignItems="center"
        padding={2}
        sx={{ zIndex: 2, position: 'relative' }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: '100%',
            maxWidth: '480px',
            background: 'rgba(234, 235, 208, 0.95)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            border: '2px solid rgba(255, 255, 255, 0.2)',
            boxShadow: `
              0 25px 50px rgba(175, 62, 62, 0.15),
              inset 0 1px 0 rgba(255, 255, 255, 0.2)
            `,
            padding: '48px 40px',
            position: 'relative',
            overflow: 'hidden',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              transform: 'translateY(-8px)',
              boxShadow: `
                0 35px 70px rgba(175, 62, 62, 0.2),
                inset 0 1px 0 rgba(255, 255, 255, 0.3)
              `,
            },
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: '-100%',
              width: '100%',
              height: '100%',
              background: `linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)`,
              transition: 'left 0.5s',
            },
            '&:hover::before': {
              left: '100%',
            }
          }}
        >
          {/* Decorative Elements */}
          <Box
            sx={{
              position: 'absolute',
              top: '-50px',
              right: '-50px',
              width: '100px',
              height: '100px',
              background: `linear-gradient(45deg, #DA6C6C, #CD5656)`,
              borderRadius: '50%',
              opacity: 0.1,
              zIndex: -1
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: '-30px',
              left: '-30px',
              width: '60px',
              height: '60px',
              background: `linear-gradient(45deg, #CD5656, #AF3E3E)`,
              borderRadius: '50%',
              opacity: 0.1,
              zIndex: -1
            }}
          />

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            {/* Header */}
            <Box textAlign="center" mb={2}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  background: `linear-gradient(135deg, #AF3E3E 0%, #CD5656 100%)`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 4px 8px rgba(175, 62, 62, 0.3)',
                  marginBottom: 1,
                  fontSize: { xs: '2rem', md: '2.5rem' }
                }}
              >
                Join Us Today
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: '#AF3E3E',
                  opacity: 0.8,
                  fontWeight: 500
                }}
              >
                Create your account to get started
              </Typography>
            </Box>

            {/* Input Fields */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Box
                sx={{
                  '& .MuiInputBase-root': {
                    background: 'rgba(255, 255, 255, 0.7)',
                    borderRadius: '12px',
                    border: '2px solid transparent',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 0.9)',
                      borderColor: '#DA6C6C',
                    },
                    '&.Mui-focused': {
                      background: 'rgba(255, 255, 255, 1)',
                      borderColor: '#AF3E3E',
                      boxShadow: '0 0 0 4px rgba(175, 62, 62, 0.1)',
                    }
                  }
                }}
              >
                <CustomizedInput type="text" name="name" label="Full Name" />
              </Box>

              <Box
                sx={{
                  '& .MuiInputBase-root': {
                    background: 'rgba(255, 255, 255, 0.7)',
                    borderRadius: '12px',
                    border: '2px solid transparent',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 0.9)',
                      borderColor: '#DA6C6C',
                    },
                    '&.Mui-focused': {
                      background: 'rgba(255, 255, 255, 1)',
                      borderColor: '#AF3E3E',
                      boxShadow: '0 0 0 4px rgba(175, 62, 62, 0.1)',
                    }
                  }
                }}
              >
                <CustomizedInput type="email" name="email" label="Email Address" />
              </Box>

              <Box
                sx={{
                  '& .MuiInputBase-root': {
                    background: 'rgba(255, 255, 255, 0.7)',
                    borderRadius: '12px',
                    border: '2px solid transparent',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 0.9)',
                      borderColor: '#DA6C6C',
                    },
                    '&.Mui-focused': {
                      background: 'rgba(255, 255, 255, 1)',
                      borderColor: '#AF3E3E',
                      boxShadow: '0 0 0 4px rgba(175, 62, 62, 0.1)',
                    }
                  }
                }}
              >
                <CustomizedInput type="password" name="password" label="Password" />
              </Box>
            </Box>

            {/* Submit Button */}
            <Button
              type="submit"
              sx={{
                width: "100%",
                height: '56px',
                borderRadius: '16px',
                background: `linear-gradient(135deg, #AF3E3E 0%, #CD5656 50%, #DA6C6C 100%)`,
                color: 'white',
                fontSize: '1.1rem',
                fontWeight: 600,
                textTransform: 'none',
                border: 'none',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: `
                  0 8px 32px rgba(175, 62, 62, 0.3),
                  inset 0 1px 0 rgba(255, 255, 255, 0.2)
                `,
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: `
                    0 12px 40px rgba(175, 62, 62, 0.4),
                    inset 0 1px 0 rgba(255, 255, 255, 0.3)
                  `,
                  background: `linear-gradient(135deg, #9A3535 0%, #B84848 50%, #C85F5F 100%)`,
                },
                '&:active': {
                  transform: 'translateY(0px)',
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  background: `linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)`,
                  transition: 'left 0.5s',
                },
                '&:hover::before': {
                  left: '100%',
                }
              }}
              endIcon={<IoIosLogIn style={{ fontSize: '1.3rem' }} />}
            >
              Create Account
            </Button>

            {/* Footer Link */}
            <Box textAlign="center" mt={2}>
              <Typography
                variant="body2"
                sx={{
                  color: '#AF3E3E',
                  opacity: 0.8,
                  '& a': {
                    color: '#CD5656',
                    textDecoration: 'none',
                    fontWeight: 600,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      color: '#AF3E3E',
                      textDecoration: 'underline',
                    }
                  }
                }}
              >
                Already have an account? <a href="/login">Sign in here</a>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Signup;
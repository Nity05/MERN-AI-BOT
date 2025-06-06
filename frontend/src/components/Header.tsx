import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Stack from "@mui/material/Stack";
import Logo from "./shared/Logo";
import { useAuth } from "../context/AuthContext";
import NavigationLink from "./shared/NavigationLink";

const Header = () => {
  const auth = useAuth();

  return (
    <AppBar
      position="sticky"
      
      sx={{

        bgcolor: "rgba(234, 235, 208, 0.2)",
        backdropFilter: "blur(12px)",
        boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
        borderRadius: "0 0 20px 20px",
        px: 3,
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Logo />

        <Stack direction="row" spacing={2} alignItems="center">
          {auth?.isLoggedIn ? (
            <>
              <NavigationLink
                bg="#DA6C6C"
                to="/chat"
                text="Go To Chat"
                textColor="white"
                
              />
              <NavigationLink
                bg="#AF3E3E"
                textColor="white"
                to="/"
                text="Logout"
                onClick={auth.logout}
               
              />
            </>
          ) : (
            <>
              <NavigationLink
                bg="#DA6C6C"
                to="/login"
                text="Login"
                textColor="white"
                
              />
              <NavigationLink
                bg="#AF3E3E"
                textColor="white"
                to="/signup"
                text="Signup"
                
              />
            </>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

import { Box, useMediaQuery, useTheme } from "@mui/material";
import React from "react";

import Footer from "../components/footer/Footer";
import HeroIntro from "../components/typer/HeroIntro";

const Home = () => {
  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box width={"100%"} height={"100%"}>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
          mx: "auto",
          mt: 3,
        }}
      >
        <Box>
          <HeroIntro />
        </Box>
        
      </Box>
    </Box>
  );
};

export default Home;

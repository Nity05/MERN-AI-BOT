import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface MousePosition {
  x: number;
  y: number;
}

interface FloatingOrbProps {
  delay: number;
  duration: number;
  size: string;
  opacity: number;
  position: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
}

const FloatingOrb: React.FC<FloatingOrbProps> = ({ delay, duration, size, opacity, position }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity,
      scale: [0.8, 1.2, 0.8],
      x: [0, 30, -30, 0],
      y: [0, -40, 20, 0]
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
    sx={{
      position: "absolute",
      width: size,
      height: size,
      borderRadius: "50%",
      background: "linear-gradient(135deg, rgba(218, 108, 108, 0.6), rgba(175, 62, 62, 0.4))",
      filter: "blur(1px)",
      zIndex: 1,
      ...position
    }}
  />
);

const ParticleField: React.FC = () => {
  const particles = Array.from({ length: 20 }, (_, i) => (
    <motion.div
      key={i}
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: [0, 1, 0],
        scale: [0, 1, 0],
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight
      }}
      transition={{
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 2,
        repeat: Infinity,
        repeatDelay: Math.random() * 5
      }}
      sx={{
        position: "absolute",
        width: "4px",
        height: "4px",
        borderRadius: "50%",
        backgroundColor: "rgba(234, 235, 208, 0.6)",
        zIndex: 1
      }}
    />
  ));

  return <>{particles}</>;
};

const GridPattern: React.FC = () => (
  <Box
    sx={{
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: `
        linear-gradient(rgba(218, 108, 108, 0.1) 1px, transparent 1px),
        linear-gradient(90deg, rgba(218, 108, 108, 0.1) 1px, transparent 1px)
      `,
      backgroundSize: "60px 60px",
      opacity: 0.3,
      zIndex: 1
    }}
  />
);

const HeroIntro: React.FC = () => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState<boolean>(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: `
          radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
            rgba(218, 108, 108, 0.9) 0%, 
            rgba(175, 62, 62, 0.95) 30%, 
            rgba(218, 108, 108, 0.8) 70%,
            rgba(175, 62, 62, 0.7) 100%
          )
        `,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        px: 2,
        transition: "background 0.3s ease",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 80%, rgba(218, 108, 108, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(175, 62, 62, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(243, 227, 227, 0.1) 0%, transparent 50%)
          `,
          zIndex: 1
        },
        "&::after": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            linear-gradient(45deg, 
              rgba(218, 108, 108, 0.05) 25%, 
              transparent 25%, 
              transparent 75%, 
              rgba(218, 108, 108, 0.05) 75%
            ),
            linear-gradient(-45deg, 
              rgba(218, 108, 108, 0.05) 25%, 
              transparent 25%, 
              transparent 75%, 
              rgba(218, 108, 108, 0.05) 75%
            )
          `,
          backgroundSize: "40px 40px",
          opacity: 0.4,
          zIndex: 1
        }
      }}
    >
      <GridPattern />
      <ParticleField />
      
      {/* Floating Orbs */}
      <FloatingOrb 
        delay={0} 
        duration={8} 
        size="80px" 
        opacity={0.6} 
        position={{ top: "20%", left: "10%" }}
      />
      <FloatingOrb 
        delay={2} 
        duration={6} 
        size="120px" 
        opacity={0.4} 
        position={{ top: "60%", right: "15%" }}
      />
      <FloatingOrb 
        delay={4} 
        duration={10} 
        size="60px" 
        opacity={0.7} 
        position={{ bottom: "30%", left: "20%" }}
      />
      <FloatingOrb 
        delay={1} 
        duration={7} 
        size="100px" 
        opacity={0.5} 
        position={{ top: "15%", right: "25%" }}
      />

      {/* Animated corner accents */}
      <motion.div
        initial={{ opacity: 0, scale: 0, rotate: -180 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 2, delay: 1.5, type: "spring" }}
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          width: "100px",
          height: "100px",
          border: "3px solid rgba(234, 235, 208, 0.4)",
          borderRadius: "50% 0 50% 0",
          zIndex: 2
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0, rotate: 180 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 2, delay: 1.7, type: "spring" }}
        style={{
          position: "absolute",
          bottom: "20px",
          right: "20px",
          width: "80px",
          height: "80px",
          border: "2px solid rgba(234, 235, 208, 0.5)",
          borderRadius: "0 50% 0 50%",
          zIndex: 2
        }}
      />

      {/* Pulsing side elements */}
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.7, 0.3]
        }}
        transition={{ duration: 3, repeat: Infinity }}
        sx={{
          position: "absolute",
          left: "50px",
          top: "50%",
          width: "4px",
          height: "100px",
          background: "linear-gradient(to bottom, transparent, rgba(234, 235, 208, 0.6), transparent)",
          zIndex: 2
        }}
      />

      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.7, 0.3]
        }}
        transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
        sx={{
          position: "absolute",
          right: "50px",
          top: "50%",
          width: "4px",
          height: "100px",
          background: "linear-gradient(to bottom, transparent, rgba(234, 235, 208, 0.6), transparent)",
          zIndex: 2
        }}
      />

      {/* Main content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ position: "relative", zIndex: 3, maxWidth: "900px" }}
      >
        <motion.div variants={itemVariants}>
          <Typography
            variant="h2"
            sx={{
              fontFamily: "'Outfit', sans-serif",
              color: "#EAEBd0",
              fontWeight: "700",
              textShadow: "0 0 40px rgba(0,0,0,0.6), 0 0 80px rgba(218, 108, 108, 0.3)",
              mb: 1,
              fontSize: { xs: "2rem", md: "3.5rem" },
              letterSpacing: "2px"
            }}
          >
            Welcome to
          </Typography>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Typography
            variant="h1"
            sx={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: { xs: "3.5rem", md: "6rem", lg: "8rem" },
              background: `
                linear-gradient(135deg, 
                  #EAEBd0 0%, 
                  #DA6C6C 20%, 
                  #F3E3E3 40%, 
                  #DA6C6C 60%, 
                  #EAEBd0 80%,
                  #F3E3E3 100%
                )
              `,
              backgroundSize: "400% 400%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: "900",
              textShadow: "0 0 60px rgba(218, 108, 108, 0.5)",
              animation: "gradientShift 8s ease-in-out infinite",
              "@keyframes gradientShift": {
                "0%, 100%": { backgroundPosition: "0% 50%" },
                "25%": { backgroundPosition: "100% 50%" },
                "50%": { backgroundPosition: "200% 50%" },
                "75%": { backgroundPosition: "300% 50%" }
              },
              lineHeight: 0.9,
              letterSpacing: "-2px"
            }}
          >
            GENIE GPT
          </Typography>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Typography
            variant="h6"
            sx={{
              color: "#F3E3E3",
              mt: 4,
              fontFamily: "'Poppins', sans-serif",
              maxWidth: "700px",
              mx: "auto",
              textShadow: "0 0 20px rgba(0,0,0,0.4)",
              fontSize: { xs: "1.1rem", md: "1.4rem" },
              lineHeight: 1.6,
              fontWeight: "300",
              letterSpacing: "0.5px"
            }}
          >
            Chat seamlessly, build custom models, and experience your personal AI
            assistant powered by cutting-edge technology. Discover the future of AI interaction.
          </Typography>
        </motion.div>

        <motion.div
          variants={itemVariants}
          whileHover={{ 
            scale: 1.1, 
            rotateZ: 2,
            boxShadow: "0 20px 50px rgba(0,0,0,0.5)"
          }}
          whileTap={{ scale: 0.95 }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          <Button
            component={Link}
            to="/login"
            sx={{
              mt: 6,
              px: 8,
              py: 2.5,
              fontSize: "1.3rem",
              fontWeight: "700",
              borderRadius: "60px",
              background: isHovered 
                ? "linear-gradient(135deg, #F3E3E3 0%, #EAEBd0 50%, #DA6C6C 100%)"
                : "linear-gradient(135deg, #EAEBd0 0%, #F3E3E3 100%)",
              color: "#AF3E3E",
              position: "relative",
              overflow: "hidden",
              textTransform: "none",
              boxShadow: "0 15px 35px rgba(0,0,0,0.3), inset 0 2px 0 rgba(255,255,255,0.2)",
              border: "2px solid rgba(234, 235, 208, 0.3)",
              fontFamily: "'Outfit', sans-serif",
              letterSpacing: "1px",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: "-100%",
                width: "100%",
                height: "100%",
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                transition: "left 0.6s ease"
              },
              "&:hover::before": {
                left: "100%"
              },
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
            }}
          >
            Get Started 🚀
          </Button>
        </motion.div>

        {/* Animated pulse indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          sx={{
            position: "absolute",
            bottom: { xs: "-150px", md: "-200px" },
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "12px"
          }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.4, 1, 0.4],
                backgroundColor: ["#EAEBd0", "#DA6C6C", "#EAEBd0"]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: i * 0.4
              }}
              sx={{
                width: "14px",
                height: "14px",
                borderRadius: "50%",
                backgroundColor: "#EAEBd0",
                boxShadow: "0 0 10px rgba(234, 235, 208, 0.5)"
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </Box>
  );
};

export default HeroIntro;
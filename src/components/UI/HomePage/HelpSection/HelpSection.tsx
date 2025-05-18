"use client";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import HandshakeIcon from "@mui/icons-material/Handshake";
import SecurityIcon from "@mui/icons-material/Security";
import { Box, Container, Grid, Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";

const HelpSection = () => {
  const theme = useTheme();

  const featureItems = [
    {
      icon: <ContentPasteIcon sx={{ color: "#2AB29F", fontSize: "50px" }} />,
      title: "Report a lost or found item",
      description:
        "Report a lost or found item. We will take it into consideration and help you find it.",
    },
    {
      icon: <SecurityIcon sx={{ color: "#2AB29F", fontSize: "50px" }} />,
      title: "Prove you are the owner of the item",
      description:
        "Once the lost item is matched, prove ownership through security questions (e.g., describe the color, model of your phone). Our partner who found the item will validate your claim.",
    },
    {
      icon: <HandshakeIcon sx={{ color: "#2AB29F", fontSize: "50px" }} />,
      title: "Get your Item back",
      description:
        "Once ownership is verified, contact our partner who found your item to arrange for its return.",
    },
  ];

  return (
    <Container
      sx={{
        my: { xs: 10, md: 15 },
        py: 5,
        position: "relative",
        "&:before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "100%",
          background:
            "linear-gradient(to bottom, rgba(42, 178, 159, 0.05) 0%, rgba(255,255,255,1) 100%)",
          zIndex: -1,
        },
      }}
      maxWidth="xl"
    >
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography
          sx={{
            fontWeight: "bold",
            color: "#2AB29F",
            mb: 2,
            fontSize: { xs: "1.75rem", md: "2.125rem" },
            lineHeight: 1.2,
          }}
          component="h2"
          variant="h4"
        >
          How {`"FoundIt"`} Can Help You
        </Typography>

        <Typography
          sx={{
            color: "#B0B0B0",
            maxWidth: "600px",
            mx: "auto",
            fontSize: { xs: "1rem", md: "1.125rem" },
          }}
        >
          We&apos;ve got you covered with our comprehensive lost and found
          solution
        </Typography>
      </Box>

      <Grid
        container
        spacing={4}
        sx={{
          textAlign: "center",
          justifyContent: "center",
        }}
      >
        {featureItems.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <motion.div>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  px: 2,
                  py: 3,
                  borderRadius: 4,
                  background: "white",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow: "0 15px 35px rgba(42, 178, 159, 0.15)",
                  },
                }}
              >
                <Box
                  sx={{
                    p: 3,
                    mb: 3,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background:
                      "linear-gradient(135deg, rgba(42, 178, 159, 0.1) 0%, rgba(255,255,255,1) 100%)",
                    borderRadius: "50%",
                    width: "120px",
                    height: "120px",
                    position: "relative",
                    "&:after": {
                      content: '""',
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      border: "1px solid rgba(42, 178, 159, 0.2)",
                      borderRadius: "50%",
                      animation: "ripple 3s infinite ease-out",
                    },
                  }}
                >
                  {item.icon}
                </Box>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    color: "#2B4D46",
                    mb: 2,
                    fontSize: "1.25rem",
                  }}
                >
                  {item.title}
                </Typography>
                <Typography
                  sx={{
                    color: "#5E646A",
                    fontSize: "1rem",
                    lineHeight: 1.6,
                  }}
                >
                  {item.description}
                </Typography>
              </Box>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      <style jsx global>{`
        @keyframes ripple {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(1.3);
            opacity: 0;
          }
        }
      `}</style>
    </Container>
  );
};

export default HelpSection;

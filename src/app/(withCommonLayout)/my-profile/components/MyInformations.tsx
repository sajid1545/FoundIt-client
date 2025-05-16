import {
  Box,
  Card,
  CardContent,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";

const MyInformation = ({ myProfile }: any) => {
  const theme = useTheme();

  const infoCards = [
    {
      title: "Email",
      value: myProfile?.user?.email || "Not provided",
      empty: !myProfile?.user?.email,
    },
    {
      title: "Name",
      value: myProfile?.user?.name || "Not provided",
      empty: !myProfile?.user?.name,
    },
    {
      title: "Bio",
      value: myProfile?.bio || "No bio available",
      empty: !myProfile?.bio,
    },
    {
      title: "Age",
      value: myProfile?.age || "No age info available",
      empty: !myProfile?.age,
    },
  ];

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      gap={3}
      flexWrap="wrap"
      justifyContent="center"
      sx={{ my: 4, px: { xs: 2, sm: 0 } }}
    >
      {infoCards.map((card, index) => (
        <Box
          key={index}
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          whileHover={{ y: -5 }}
          sx={{ minWidth: 280, flex: 1 }}
        >
          <Card
            sx={{
              height: "100%",
              borderRadius: 3,
              background: "linear-gradient(145deg, #f4f7fe, #ffffff)",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
              border: "1px solid rgba(200, 237, 253, 0.5)",
              transition: "all 0.3s ease",
              "&:hover": {
                boxShadow: "0 8px 32px rgba(42, 178, 159, 0.15)",
                borderColor: "rgba(42, 178, 159, 0.3)",
              },
            }}
          >
            <CardContent sx={{ p: 3, height: "100%" }}>
              <Stack
                direction="column"
                justifyContent="space-between"
                sx={{ height: "100%" }}
              >
                <Box>
                  <Typography
                    variant="caption"
                    sx={{
                      display: "inline-block",
                      mb: 1.5,
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 2,
                      backgroundColor: "#2AB29F20",
                      color: "#2AB29F",
                      fontWeight: "bold",
                      letterSpacing: 0.5,
                      textTransform: "uppercase",
                    }}
                  >
                    {card.title}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color: card.empty ? "text.secondary" : "text.primary",
                      fontStyle: card.empty ? "italic" : "normal",
                      lineHeight: 1.4,
                      wordBreak: "break-word",
                      minHeight: card.title === "Bio" ? "4em" : "auto",
                    }}
                  >
                    {card.value}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    mt: 2,
                    height: 4,
                    borderRadius: 2,
                    background: card.empty
                      ? theme.palette.grey[300]
                      : "linear-gradient(90deg, #2AB29F, #C8EDFD)",
                    opacity: card.empty ? 0.5 : 1,
                  }}
                />
              </Stack>
            </CardContent>
          </Card>
        </Box>
      ))}
    </Stack>
  );
};

export default MyInformation;

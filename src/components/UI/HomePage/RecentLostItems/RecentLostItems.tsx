import { dateFormatter } from "@/utils/dateFormatter";
import { timeFormatter } from "@/utils/timeFormatter";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";

const RecentLostItems = async () => {
  const res = await fetch(`${process.env.BACKEND_HOSTED_LINK}/lost-items`, {
    cache: "no-store",
  });
  const data = await res.json();

  const lostItems = data?.data;

  return (
    <Container sx={{ my: 10 }} maxWidth="xl">
      <Typography
        variant="h3"
        sx={{
          color: "text.primary",
          mb: 6,
          fontWeight: 700,
          textAlign: "center",
          position: "relative",
          "&::after": {
            content: '""',
            display: "block",
            width: "100px",
            height: "4px",
            background: "linear-gradient(90deg, #2AB29F, #C8EDFD)",
            margin: "16px auto 0",
            borderRadius: "4px",
          },
        }}
      >
        Recent Lost Item Reports
      </Typography>

      <Stack direction={{ xs: "column", md: "row" }} gap={4} mt={5}>
        {lostItems?.length > 0 ? (
          lostItems.slice(0, 3).map((item: any) => (
            <Card
              key={item.id}
              sx={{
                flex: 1,
                minWidth: { xs: "100%", md: "350px" },
                backgroundColor: "#ffffff",
                border: "1px solid rgba(200, 237, 253, 0.5)",
                borderRadius: 3,
                textAlign: "center",
                p: 0,
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 8px 24px rgba(42, 178, 159, 0.15)",
                  borderColor: "#2AB29F",
                },
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Typography
                  variant="h5"
                  fontWeight={700}
                  color="#2AB29F"
                  gutterBottom
                  sx={{ mb: 3 }}
                >
                  {item.lostItemName}
                </Typography>

                <Box
                  sx={{
                    p: 3,
                    mb: 3,
                    backgroundColor: "rgba(200, 237, 253, 0.2)",
                    borderRadius: 2,
                    borderLeft: "4px solid #2AB29F",
                    textAlign: "left",
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    sx={{ mb: 1, fontWeight: 600 }}
                  >
                    ITEM DESCRIPTION
                  </Typography>
                  <Typography variant="body1">{item.description}</Typography>
                </Box>

                <Box
                  sx={{
                    p: 3,
                    mb: 4,
                    backgroundColor: "rgba(200, 237, 253, 0.2)",
                    borderRadius: 2,
                    borderLeft: "4px solid #2AB29F",
                    textAlign: "left",
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    sx={{ mb: 1, fontWeight: 600 }}
                  >
                    DETAILS
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    <Box component="span" fontWeight={600}>
                      Location:
                    </Box>{" "}
                    {item.location}
                  </Typography>
                  <Typography variant="body1">
                    <Box component="span" fontWeight={600}>
                      Date:
                    </Box>{" "}
                    {dateFormatter(item.lostDate)} at{" "}
                    {timeFormatter(item.lostDate)}
                  </Typography>
                </Box>

                <Link href={`/lost-items/${item.id}`} passHref>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      py: 1.5,
                      borderRadius: 2,
                      fontWeight: 600,
                      fontSize: "1rem",
                      backgroundColor: "#2AB29F",
                      "&:hover": {
                        backgroundColor: "#1E9C8B",
                        boxShadow: "none",
                      },
                    }}
                  >
                    View Details
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))
        ) : (
          <Box
            sx={{
              width: "100%",
              p: 6,
              textAlign: "center",
              backgroundColor: "rgba(200, 237, 253, 0.3)",
              borderRadius: 3,
              border: "2px dashed #2AB29F",
            }}
          >
            <Typography variant="h5" color="text.secondary" sx={{ mb: 2 }}>
              No Lost Items Found
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              There are currently no lost item reports available.
            </Typography>
            <Link href="/report-lost-item" passHref>
              <Button
                variant="contained"
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 600,
                  backgroundColor: "#2AB29F",
                  "&:hover": {
                    backgroundColor: "#1E9C8B",
                  },
                }}
              >
                Report a Lost Item
              </Button>
            </Link>
          </Box>
        )}
      </Stack>

      {lostItems?.length > 0 && (
        <Box sx={{ textAlign: "center", mt: 6 }}>
          <Link href="/lost-items" passHref>
            <Button
              variant="outlined"
              sx={{
                px: 6,
                py: 1.5,
                borderRadius: 2,
                borderWidth: 2,
                borderColor: "#2AB29F",
                color: "#2AB29F",
                fontWeight: 600,
                fontSize: "1rem",
                "&:hover": {
                  backgroundColor: "#2AB29F",
                  color: "white",
                  borderWidth: 2,
                },
              }}
            >
              View All Lost Items
            </Button>
          </Link>
        </Box>
      )}
    </Container>
  );
};

export default RecentLostItems;

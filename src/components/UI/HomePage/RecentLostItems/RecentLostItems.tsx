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
        align="center"
        variant="h3"
        sx={{ color: "text.secondary", m: 3, fontWeight: "bold" }}
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
                minWidth: { xs: "100%", md: "280px" },
                backgroundColor: "#f8fbfe",
                border: "1px solid #C8EDFD",
                borderRadius: 2,
                textAlign: "center",
                p: 3,
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                "&:hover": {
                  borderColor: "#2AB29F",
                  boxShadow: "0 8px 24px rgba(42, 178, 159, 0.15)",
                },
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  fontWeight={700}
                  color="primary.main"
                  gutterBottom
                >
                  {item.lostItemName}
                </Typography>

                <Box
                  sx={{
                    p: 2,
                    mb: 2,
                    backgroundColor: "rgba(200, 237, 253, 0.2)",
                    borderRadius: 1,
                    borderLeft: "3px solid #2AB29F",
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    p: 2,
                    mb: 3,
                    backgroundColor: "rgba(200, 237, 253, 0.2)",
                    borderRadius: 1,
                    borderLeft: "3px solid #2AB29F",
                  }}
                >
                  <Typography variant="body2">
                    <Box component="span" fontWeight={600}>
                      Location:
                    </Box>{" "}
                    {item.location}
                  </Typography>
                  <Typography variant="body2">
                    <Box component="span" fontWeight={600}>
                      Date:
                    </Box>{" "}
                    {dateFormatter(item.lostDate)}{" "}
                    {timeFormatter(item.lostDate)}
                  </Typography>
                </Box>

                <Link href={`/lost-items/${item.id}`} passHref>
                  <Button
                    variant="contained"
                    sx={{
                      fontWeight: 600,
                      backgroundColor: "#2AB29F",
                      "&:hover": {
                        backgroundColor: "#1E9C8B",
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
              p: 4,
              textAlign: "center",
              backgroundColor: "rgba(200, 237, 253, 0.3)",
              borderRadius: 2,
              border: "1px dashed #2AB29F",
            }}
          >
            <Typography variant="h6" color="text.secondary">
              No lost items found
            </Typography>
            <Typography variant="body1" mt={1}>
              You haven&apos;t reported any lost items yet.
            </Typography>
            <Link href="/report-lost-item" passHref>
              <Button
                variant="outlined"
                sx={{
                  mt: 2,
                  borderColor: "#2AB29F",
                  color: "#2AB29F",
                  "&:hover": {
                    backgroundColor: "rgba(42, 178, 159, 0.1)",
                    borderColor: "#2AB29F",
                  },
                }}
              >
                Report a Lost Item
              </Button>
            </Link>
          </Box>
        )}
      </Stack>
      <Link href="/lost-items">
        <Button
          variant="outlined"
          sx={{
            mt: "20px",
            border: "1px solid #2AB29F",
            color: "#203145",
            display: "block",
            textAlign: "center",
            fontWeight: "bold",
            mx: "auto",
            my: "20px",

            "&:hover": {
              backgroundColor: "#2AB29F",
              color: "white",
              transition: "all 0.5s",
              border: "1px solid #2AB29F",
            },
          }}
        >
          View ALL
        </Button>
      </Link>
    </Container>
  );
};

export default RecentLostItems;

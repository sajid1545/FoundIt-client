"use client";

import { useGetMyClaimedRequestsQuery } from "@/redux/api/claimItems";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Container,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";

const MyClaimedRequests = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetMyClaimedRequestsQuery({});

  return (
    <Container sx={{ my: 8 }} maxWidth="xl">
      <Typography
        variant="h4"
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
        My Claim Requests
      </Typography>

      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "200px",
          }}
        >
          <Typography variant="h6" color="text.secondary">
            Loading your claims...
          </Typography>
        </Box>
      ) : (
        <>
          {data?.length === 0 && !isLoading && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "300px",
                backgroundColor: "rgba(200, 237, 253, 0.3)",
                borderRadius: 3,
                border: "1px dashed #2AB29F",
                p: 4,
              }}
            >
              <Typography variant="h5" color="text.secondary">
                No Claim Requests Found
              </Typography>
            </Box>
          )}

          <Stack direction={{ xs: "column" }} gap={4} mt={5}>
            {data?.map((item: any) => (
              <Card
                key={item.id}
                sx={{
                  borderRadius: 3,
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                  border: "1px solid rgba(200, 237, 253, 0.5)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow: "0 8px 24px rgba(42, 178, 159, 0.15)",
                  },
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Stack spacing={3}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: "#2AB29F",
                        textAlign: "center",
                        mb: 2,
                      }}
                    >
                      {item?.foundItem?.foundItemName}
                    </Typography>

                    <Stack
                      direction={{ xs: "column", md: "row" }}
                      gap={3}
                      flexWrap="wrap"
                      justifyContent="center"
                    >
                      <Box
                        sx={{
                          flex: 1,
                          minWidth: "300px",
                          p: 3,
                          backgroundColor: "rgba(200, 237, 253, 0.2)",
                          borderRadius: 2,
                          borderLeft: "3px solid #2AB29F",
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{
                            display: "block",
                            mb: 1,
                            fontWeight: 600,
                            color: "text.secondary",
                          }}
                        >
                          Item Description
                        </Typography>
                        <Typography variant="body1">
                          {item?.foundItem?.description ||
                            "No description provided"}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          flex: 1,
                          minWidth: "300px",
                          p: 3,
                          backgroundColor: "rgba(200, 237, 253, 0.2)",
                          borderRadius: 2,
                          borderLeft: "3px solid #2AB29F",
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{
                            display: "block",
                            mb: 1,
                            fontWeight: 600,
                            color: "text.secondary",
                          }}
                        >
                          Finder&apos;s Information
                        </Typography>
                        <Typography variant="body1">
                          {item?.foundItem?.user?.name || "Unknown"}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          flex: 1,
                          minWidth: "300px",
                          p: 3,
                          backgroundColor: "rgba(200, 237, 253, 0.2)",
                          borderRadius: 2,
                          borderLeft: "3px solid #2AB29F",
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{
                            display: "block",
                            mb: 1,
                            fontWeight: 600,
                            color: "text.secondary",
                          }}
                        >
                          Claim Status
                        </Typography>
                        <Chip
                          label={item?.status}
                          sx={{
                            fontWeight: 600,
                            backgroundColor:
                              item?.status === "APPROVED"
                                ? "rgba(76, 175, 80, 0.1)"
                                : item?.status === "REJECTED"
                                ? "rgba(244, 67, 54, 0.1)"
                                : "rgba(255, 152, 0, 0.1)",
                            color:
                              item?.status === "APPROVED"
                                ? "#4CAF50"
                                : item?.status === "REJECTED"
                                ? "#F44336"
                                : "#FF9800",
                          }}
                        />
                      </Box>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </>
      )}
    </Container>
  );
};

export default MyClaimedRequests;

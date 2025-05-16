"use client";

import { useGetMyFoundItemsQuery } from "@/redux/api/foundItems";
import { dateFormatter } from "@/utils/dateFormatter";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import ItemDeleteConfirmation from "./components/ItemDeleteConfirmation";

const MyFoundItemsPage = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetMyFoundItemsQuery({});

  const [openAlert, setOpenAlert] = useState(false);
  const [idToDelete, setIdToDelete] = useState<string>("");

  const handleOpenDeleteConfirmation = (id: string) => {
    setOpenAlert(true);
    setIdToDelete(id);
  };

  // Color theme variables
  const primaryColor = "#2AB29F";
  const primaryLight = "rgba(42, 178, 159, 0.1)";
  const primaryLighter = "rgba(42, 178, 159, 0.05)";
  const primaryDark = "#1E9C8B";

  return (
    <Container sx={{ my: 15 }} maxWidth="xl">
      <ItemDeleteConfirmation
        open={openAlert}
        setOpen={setOpenAlert}
        id={idToDelete}
      />

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
            background: `linear-gradient(90deg, ${primaryColor}, #C8EDFD)`,
            margin: "16px auto 0",
            borderRadius: "4px",
          },
        }}
      >
        My Found Items
      </Typography>

      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "200px",
            backgroundColor: primaryLighter,
            borderRadius: 2,
            border: `1px solid ${primaryLight}`,
          }}
        >
          <Typography variant="h6" color="text.secondary">
            Loading your found items...
          </Typography>
        </Box>
      ) : (
        <>
          {data?.length === 0 && !isLoading && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "300px",
                backgroundColor: primaryLighter,
                borderRadius: 3,
                border: `1px dashed ${primaryColor}`,
                p: 4,
                textAlign: "center",
              }}
            >
              <Typography variant="h5" color="text.secondary" sx={{ mb: 2 }}>
                No Found Items Available
              </Typography>
              <Typography variant="body1" sx={{ mb: 3 }}>
                You&apos;ve not reported any found items yet.
              </Typography>
              <Link href="/report-found-item" passHref>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: primaryColor,
                    "&:hover": {
                      backgroundColor: primaryDark,
                    },
                  }}
                >
                  Report Found Item
                </Button>
              </Link>
            </Box>
          )}

          <Stack direction="column" gap={4} mt={5}>
            {data?.map((item: any) => (
              <Card
                key={item.id}
                sx={{
                  borderRadius: 3,
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                  border: `1px solid ${primaryLight}`,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow: "0 8px 24px rgba(42, 178, 159, 0.15)",
                  },
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Stack spacing={3}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 2,
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          color: primaryColor,
                        }}
                      >
                        {item?.foundItemName}
                      </Typography>
                      <Chip
                        label={
                          item?.claim?.length > 0
                            ? `${item.claim.length} Claim${
                                item.claim.length !== 1 ? "s" : ""
                              }`
                            : "No Claims"
                        }
                        size="small"
                        sx={{
                          backgroundColor:
                            item?.claim?.length > 0
                              ? "rgba(76, 175, 80, 0.1)"
                              : "rgba(158, 158, 158, 0.1)",
                          color:
                            item?.claim?.length > 0 ? "#4CAF50" : "#9E9E9E",
                          fontWeight: 600,
                        }}
                      />
                    </Box>

                    <Stack
                      direction={{ xs: "column", md: "row" }}
                      gap={3}
                      flexWrap="wrap"
                      justifyContent="center"
                    >
                      <Box
                        sx={{
                          p: 3,
                          backgroundColor: primaryLighter,
                          borderRadius: 2,
                          borderLeft: `3px solid ${primaryColor}`,
                          flex: 1,
                          minWidth: "300px",
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
                          {item?.description || "No description provided"}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          p: 3,
                          backgroundColor: primaryLighter,
                          borderRadius: 2,
                          borderLeft: `3px solid ${primaryColor}`,
                          flex: 1,
                          minWidth: "300px",
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
                          Details
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 1 }}>
                          <Box component="span" fontWeight={600}>
                            Location:
                          </Box>{" "}
                          {item?.location || "Unknown"}
                        </Typography>
                        <Typography variant="body1">
                          <Box component="span" fontWeight={600}>
                            Date Found:
                          </Box>{" "}
                          {dateFormatter(item?.foundDate)}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          p: 3,
                          backgroundColor: primaryLighter,
                          borderRadius: 2,
                          borderLeft: `3px solid ${primaryColor}`,
                          flex: 1,
                          minWidth: "300px",
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
                          Actions
                        </Typography>
                        <Stack
                          direction="row"
                          spacing={2}
                          justifyContent="center"
                        >
                          <Link
                            href={`/my-found-items/edit-item/${item?.id}`}
                            passHref
                          >
                            <Button
                              variant="contained"
                              size="small"
                              sx={{
                                px: 3,
                                fontWeight: 600,
                                backgroundColor: primaryColor,
                                "&:hover": {
                                  backgroundColor: primaryDark,
                                },
                              }}
                            >
                              Edit
                            </Button>
                          </Link>
                          <Button
                            onClick={() =>
                              handleOpenDeleteConfirmation(item?.id)
                            }
                            variant="outlined"
                            color="error"
                            size="small"
                            sx={{
                              px: 3,
                              fontWeight: 600,
                            }}
                          >
                            Delete
                          </Button>
                        </Stack>
                      </Box>
                    </Stack>

                    {item?.claim?.length > 0 && (
                      <Link href={`/my-found-items/edit/${item?.id}`} passHref>
                        <Button
                          variant="contained"
                          fullWidth
                          sx={{
                            mt: 2,
                            py: 1.5,
                            borderRadius: 2,
                            fontWeight: 600,
                            backgroundColor: primaryColor,
                            "&:hover": {
                              backgroundColor: primaryDark,
                            },
                          }}
                        >
                          Manage {item.claim.length} Claim
                          {item.claim.length !== 1 ? "s" : ""}
                        </Button>
                      </Link>
                    )}
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

export default MyFoundItemsPage;

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
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import ItemDeleteConfirmation from "../../my-found-items/components/ItemDeleteConfirmation";

const MyFoundItems = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetMyFoundItemsQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
    }
  );

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
  const secondaryColor = "#C8EDFD";

  return (
    <Container sx={{ my: 8 }} maxWidth="xl">
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
            background: `linear-gradient(90deg, ${primaryColor}, ${secondaryColor})`,
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
                justifyContent: "center",
                alignItems: "center",
                height: "200px",
                backgroundColor: primaryLighter,
                borderRadius: 2,
                border: `1px dashed ${primaryColor}`,
              }}
            >
              <Typography variant="h5" color="text.secondary">
                No Found Items Available
              </Typography>
            </Box>
          )}

          <Stack
            direction={{ xs: "column", md: "row" }}
            gap={4}
            flexWrap="wrap"
            justifyContent="center"
          >
            {data?.slice(0, 3)?.map((item: any, index: number) => (
              <Box
                key={item.id}
                component={motion.div}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                sx={{ minWidth: { xs: "100%", md: "360px" }, flex: 1 }}
              >
                <Card
                  sx={{
                    height: "100%",
                    borderRadius: 3,
                    background: "#ffffff",
                    boxShadow: `0 6px 20px ${primaryLight}`,
                    border: `1px solid ${primaryLight}`,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      boxShadow: `0 12px 24px ${primaryLight}`,
                    },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Stack spacing={2}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          mb: 1,
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 700,
                            color: primaryDark,
                          }}
                        >
                          {item?.foundItemName}
                        </Typography>
                        <Chip
                          label={
                            item?.claim?.length > 0
                              ? `${item.claim.length} Claims`
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

                      <Box
                        sx={{
                          p: 2,
                          backgroundColor: primaryLighter,
                          borderRadius: 2,
                          borderLeft: `3px solid ${primaryColor}`,
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{
                            display: "block",
                            mb: 0.5,
                            fontWeight: 600,
                            color: primaryDark,
                          }}
                        >
                          Description
                        </Typography>
                        <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                          {item?.description || "No description provided"}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          p: 2,
                          backgroundColor: primaryLighter,
                          borderRadius: 2,
                          borderLeft: `3px solid ${primaryColor}`,
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{
                            display: "block",
                            mb: 0.5,
                            fontWeight: 600,
                            color: primaryDark,
                          }}
                        >
                          Location & Date
                        </Typography>
                        <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                          {item?.location || "Unknown location"} •{" "}
                          {dateFormatter(item?.foundDate)}
                        </Typography>
                      </Box>

                      <Stack
                        direction="row"
                        spacing={2}
                        justifyContent="space-between"
                        sx={{ mt: 2 }}
                      >
                        <Stack direction="row" spacing={1}>
                          <Link
                            href={`/my-found-items/edit-item/${item?.id}`}
                            passHref
                          >
                            <Button
                              variant="outlined"
                              size="small"
                              sx={{
                                borderRadius: 2,
                                px: 2,
                                fontWeight: 600,
                                borderColor: primaryLight,
                                color: primaryDark,
                                "&:hover": {
                                  borderColor: primaryColor,
                                  backgroundColor: primaryLighter,
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
                              borderRadius: 2,
                              px: 2,
                              fontWeight: 600,
                              "&:hover": {
                                backgroundColor: "rgba(244, 67, 54, 0.04)",
                              },
                            }}
                          >
                            Delete
                          </Button>
                        </Stack>
                      </Stack>

                      {item?.claim?.length > 0 && (
                        <Link
                          href={`/my-found-items/edit/${item?.id}`}
                          passHref
                        >
                          <Button
                            variant="contained"
                            sx={{
                              mt: 2,
                              width: "100%",
                              borderRadius: 2,
                              py: 1,
                              fontWeight: 600,
                              backgroundColor: primaryColor,
                              "&:hover": {
                                backgroundColor: primaryDark,
                              },
                            }}
                          >
                            View {item.claim.length} Claim
                            {item.claim.length !== 1 ? "s" : ""}
                          </Button>
                        </Link>
                      )}
                    </Stack>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Stack>

          {data?.length > 0 && (
            <Box
              component={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              sx={{ textAlign: "center", mt: 6 }}
            >
              <Link href="/my-found-items" passHref>
                <Button
                  variant="outlined"
                  sx={{
                    px: 5,
                    py: 1.5,
                    borderRadius: 2,
                    borderWidth: 2,
                    borderColor: primaryColor,
                    color: primaryDark,
                    fontWeight: 600,
                    fontSize: "1rem",
                    "&:hover": {
                      backgroundColor: primaryColor,
                      color: "white",
                      borderWidth: 2,
                    },
                  }}
                >
                  View All My Found Items
                </Button>
              </Link>
            </Box>
          )}
        </>
      )}
    </Container>
  );
};

export default MyFoundItems;

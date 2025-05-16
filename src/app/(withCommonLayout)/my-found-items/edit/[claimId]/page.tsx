"use client";

import { useGetSingleFoundItemQuery } from "@/redux/api/foundItems";
import { Cancel, CheckCircle, Pending } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  Chip,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import UpdateStatusModal from "../../components/UpdateStatusModal";

type TProps = {
  params: {
    claimId: string;
  };
};

type ClaimStatus = "APPROVED" | "REJECTED" | "PENDING";

const statusIcons: Record<ClaimStatus, JSX.Element> = {
  APPROVED: <CheckCircle color="success" sx={{ fontSize: 20 }} />,
  REJECTED: <Cancel color="error" sx={{ fontSize: 20 }} />,
  PENDING: <Pending color="warning" sx={{ fontSize: 20 }} />,
};
const FoundItemsClaim = ({ params }: TProps) => {
  const id = params.claimId;
  const { data, isLoading } = useGetSingleFoundItemQuery(id);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedClaimId, setSelectedClaimId] = useState<string>("");

  const handleOpenModal = (id: string) => {
    setSelectedClaimId(id);
    setIsModalOpen(true);
  };

  const claims = data?.claim;

  return (
    <>
      <UpdateStatusModal
        open={isModalOpen}
        setOpen={setIsModalOpen}
        id={selectedClaimId}
      />

      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
          }}
        >
          <Typography variant="h6" color="text.secondary">
            Loading claims...
          </Typography>
        </Box>
      ) : (
        <Container maxWidth="lg" sx={{ py: 15 }}>
          {/* Header Section */}
          <Box textAlign="center" mb={6}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                color: "#2AB29F",
                mb: 2,
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              {data?.foundItemName}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{ maxWidth: 600, mx: "auto" }}
            >
              Review and manage all claims submitted for this found item
            </Typography>
          </Box>

          {/* Claims Grid */}
          <Stack spacing={4}>
            {claims?.map((item: any) => (
              <Card
                key={item?.id}
                sx={{
                  p: 4,
                  borderRadius: 3,
                  boxShadow: "0 8px 24px rgba(42, 178, 159, 0.1)",
                  borderLeft: "4px solid #2AB29F",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: "0 12px 28px rgba(42, 178, 159, 0.15)",
                  },
                }}
              >
                <Stack
                  direction={{ xs: "column", md: "row" }}
                  spacing={3}
                  alignItems={{ md: "center" }}
                >
                  {/* User Avatar & Basic Info */}
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                      {item?.user?.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mb={2}>
                      Submitted on{" "}
                      {new Date(item?.createdAt).toLocaleDateString()}
                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography variant="body2">Status:</Typography>
                      <Chip
                        size="small"
                        label={item?.status}
                        icon={
                          statusIcons[item?.status as ClaimStatus] ||
                          statusIcons.PENDING
                        }
                        sx={{
                          fontWeight: 600,
                          backgroundColor:
                            item?.status === "APPROVED"
                              ? "rgba(46, 125, 50, 0.1)"
                              : item?.status === "REJECTED"
                              ? "rgba(211, 47, 47, 0.1)"
                              : "rgba(255, 152, 0, 0.1)",
                          color:
                            item?.status === "APPROVED"
                              ? "success.dark"
                              : item?.status === "REJECTED"
                              ? "error.dark"
                              : "warning.dark",
                        }}
                      />
                    </Box>
                  </Box>

                  {/* Action Buttons */}
                  <Box>
                    <Button
                      variant="contained"
                      onClick={() => handleOpenModal(item?.id)}
                      sx={{
                        backgroundColor: "#2AB29F",
                        "&:hover": {
                          backgroundColor: "#1e8c7a",
                        },
                        px: 4,
                        py: 1.5,
                        borderRadius: 2,
                        fontWeight: 600,
                        textTransform: "none",
                        boxShadow: "none",
                      }}
                    >
                      Update Status
                    </Button>
                  </Box>
                </Stack>

                {/* Additional Details (shown on click if needed) */}
                <Box mt={3} sx={{ display: "none" /* Can be toggled */ }}>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Contact:</strong>{" "}
                    {item?.user?.email || "Not provided"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Description:</strong>{" "}
                    {item?.description || "No additional details"}
                  </Typography>
                </Box>
              </Card>
            ))}

            {claims?.length === 0 && (
              <Box textAlign="center" py={10}>
                <Typography variant="h6" color="text.secondary">
                  No claims have been submitted for this item yet
                </Typography>
              </Box>
            )}
          </Stack>
        </Container>
      )}
    </>
  );
};

export default FoundItemsClaim;

"use client";

import { CustomBorderTextField } from "@/components/Forms/FoundItInput";
import { CustomBorderSelectField } from "@/components/Forms/FoundItSelect";
import DoYouKnowBanner from "@/components/UI/FoundItemsPage/DoYouKnowBanner/DoYouKnowBanner";
import { useGetCategoriesQuery } from "@/redux/api/categoriesApi";
import { useGetAllFoundItemsQuery } from "@/redux/api/foundItems";
import { useDebounced } from "@/redux/hooks";
import { dateFormatter } from "@/utils/dateFormatter";
import { timeFormatter } from "@/utils/timeFormatter";
import {
  Box,
  Button,
  Container,
  MenuItem,
  Pagination,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Unstable_Grid2";
import Link from "next/link";
import { useState } from "react";

const FoundItemsPage = () => {
  const theme = useTheme();
  const query: Record<string, any> = {};

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  query["page"] = page;
  query["limit"] = limit;

  const debouncedTerm = useDebounced({ searchQuery: searchTerm, delay: 600 });

  if (!!debouncedTerm) {
    query["searchTerm"] = searchTerm;
  }

  query["category"] = category;

  const { data, isLoading, refetch } = useGetAllFoundItemsQuery({ ...query });
  const { data: categories, isLoading: categoriesLoading } =
    useGetCategoriesQuery({});

  const foundItems = data?.foundItems || [];
  const meta = data?.meta;
  const totalItems = meta?.total || 0;

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Container sx={{ my: 15 }} maxWidth="xl">
      <DoYouKnowBanner />

      {/* Enhanced Header Section */}
      <Box
        sx={{
          backgroundColor: "rgba(200, 237, 253, 0.2)",
          borderRadius: 3,
          p: 4,
          my: 6,
          border: "1px solid rgba(42, 178, 159, 0.3)",
          boxShadow: "0 4px 20px rgba(42, 178, 159, 0.1)",
        }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          gap={4}
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            variant="h3"
            sx={{
              color: "#2AB29F",
              fontWeight: 700,
              whiteSpace: "nowrap",
            }}
          >
            All Found Items
          </Typography>

          <Stack
            direction={{ xs: "column", md: "row" }}
            gap={2}
            sx={{ width: { xs: "100%", md: "600px" } }}
          >
            <CustomBorderSelectField
              size="small"
              select
              label="Filter by Category"
              disabled={categoriesLoading}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#2AB29F",
                  },
                },
              }}
            >
              <MenuItem value="">All Categories</MenuItem>
              {categories?.map((item: any) => (
                <MenuItem key={item.id} value={item.name}>
                  {item.name}
                </MenuItem>
              ))}
            </CustomBorderSelectField>

            <CustomBorderTextField
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search found items..."
              size="small"
              value={searchTerm}
              fullWidth
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#2AB29F",
                  },
                },
              }}
            />
          </Stack>
        </Stack>
      </Box>

      {/* Loading State */}
      {isLoading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "200px",
          }}
        >
          <Typography variant="h6" color="text.secondary">
            Loading found items...
          </Typography>
        </Box>
      )}

      {/* Empty State */}
      {foundItems?.length === 0 && !isLoading && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "300px",
            backgroundColor: "rgba(200, 237, 253, 0.3)",
            borderRadius: 3,
            border: "1px dashed #2AB29F",
            p: 4,
          }}
        >
          <Typography variant="h5" color="text.secondary" sx={{ mb: 2 }}>
            No Found Items Available
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            There are currently no found items matching your search criteria.
          </Typography>
          <Button
            variant="contained"
            onClick={() => {
              setSearchTerm("");
              setCategory("");
            }}
            sx={{
              backgroundColor: "#2AB29F",
              "&:hover": {
                backgroundColor: "#1E9C8B",
              },
            }}
          >
            Reset Filters
          </Button>
        </Box>
      )}

      {/* Items Grid */}
      {!isLoading && foundItems.length > 0 && (
        <>
          <Grid container spacing={3}>
            {foundItems?.map((item: any) => (
              <Grid key={item.id} lg={4} md={6} xs={12}>
                <Card
                  sx={{
                    height: "100%",
                    borderRadius: 3,
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                    border: "1px solid rgba(200, 237, 253, 0.5)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 8px 24px rgba(42, 178, 159, 0.15)",
                    },
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Stack spacing={2}>
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: 700,
                          color: "#2AB29F",
                          mb: 1,
                        }}
                      >
                        {item.foundItemName}
                      </Typography>

                      <Box
                        sx={{
                          p: 2,
                          backgroundColor: "rgba(200, 237, 253, 0.2)",
                          borderRadius: 2,
                          borderLeft: "3px solid #2AB29F",
                        }}
                      >
                        <Typography variant="body1">
                          {item.description}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          p: 2,
                          backgroundColor: "rgba(200, 237, 253, 0.2)",
                          borderRadius: 2,
                          borderLeft: "3px solid #2AB29F",
                        }}
                      >
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
                          {dateFormatter(item.foundDate)} at{" "}
                          {timeFormatter(item.foundDate)}
                        </Typography>
                      </Box>

                      <Link href={`/found-items/${item.id}`} passHref>
                        <Button
                          variant="contained"
                          fullWidth
                          sx={{
                            mt: 2,
                            py: 1.5,
                            borderRadius: 2,
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
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Pagination */}
          {totalItems > limit && (
            <Box
              sx={{
                mt: 6,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Pagination
                count={Math.ceil(totalItems / limit)}
                page={page}
                onChange={handleChange}
                color="primary"
                sx={{
                  "& .MuiPaginationItem-root": {
                    color: "#2AB29F",
                  },
                  "& .MuiPaginationItem-root.Mui-selected": {
                    backgroundColor: "#2AB29F",
                    color: "white",
                  },
                }}
              />
            </Box>
          )}
        </>
      )}
    </Container>
  );
};

export default FoundItemsPage;

import knowIcon from "@/assets/icons/knowIcon.png";
import { Box, Button, Typography, useTheme } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const DoYouKnowBanner = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: "rgba(200, 237, 253, 0.3)",
        boxShadow: "0px 8px 24px rgba(42, 178, 159, 0.15)",
        p: { xs: 3, md: 5 },
        borderRadius: 3,
        width: { xs: "100%", md: "80%" },
        margin: "auto",
        border: "1px solid rgba(42, 178, 159, 0.2)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          gap: { xs: 3, md: 6 },
        }}
      >
        <Box
          sx={{
            flexShrink: 0,
            display: "flex",
            justifyContent: "center",
            width: { xs: "100%", md: "auto" },
          }}
        >
          <Image
            src={knowIcon}
            alt="knowIcon"
            width={160}
            height={160}
            style={{
              objectFit: "contain",
              filter: "drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.1))",
            }}
          />
        </Box>

        <Box sx={{ textAlign: { xs: "center", md: "left" }, flex: 1 }}>
          <Typography
            variant="h4"
            sx={{
              mb: 2,
              fontWeight: 700,
              color: "#2B4D46",
              fontSize: { xs: "1.75rem", md: "2rem" },
              lineHeight: 1.2,
            }}
          >
            Did You Know?
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "#5E646A",
              mb: 3,
              fontSize: { xs: "1rem", md: "1.1rem" },
              lineHeight: 1.6,
            }}
          >
            We&apos;ve found items that might belong to you. To claim them,
            submit a request through our secure system. You&apos;ll need to be
            logged in to complete the process and help us verify your ownership.
          </Typography>

          <Link href="/submit-claim-items" passHref>
            <Button
              variant="contained"
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 2,
                fontWeight: 600,
                fontSize: "1rem",
                backgroundColor: "#2AB29F",
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: "#1E9C8B",
                  boxShadow: "none",
                },
              }}
            >
              Submit Claim Request
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default DoYouKnowBanner;

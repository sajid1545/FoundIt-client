import { Box, Stack, Typography } from "@mui/material";

const MyInformation = ({ myProfile }: any) => {
	return (
		<Stack
			direction={{ xs: "column", md: "row" }}
			gap={2}
			flexWrap={"wrap"}
			justifyContent={"center"}>
			<Box
				sx={{
					p: 2,
					border: "1px solid #C8EDFD",
					background: "#f4f7fe",
					minWidth: "300px",
					textAlign: "center",
				}}>
				<Typography color={"text.secondary"} variant="caption">
					Email
				</Typography>
				<Typography>{myProfile?.user?.email}</Typography>
			</Box>
			<Box
				sx={{
					p: 2,
					border: "1px solid #C8EDFD",
					background: "#f4f7fe",
					minWidth: "300px",
					textAlign: "center",
				}}>
				<Typography color={"text.secondary"} variant="caption">
					Name
				</Typography>
				<Typography>{myProfile?.user?.name}</Typography>
			</Box>
			<Box
				sx={{
					p: 2,
					border: "1px solid #C8EDFD",
					background: "#f4f7fe",
					minWidth: "300px",
					textAlign: "center",
				}}>
				<Typography color={"text.secondary"} variant="caption">
					Bio
				</Typography>
				<Typography>{myProfile?.bio ? myProfile?.bio : "No Bio available"}</Typography>
			</Box>
			<Box
				sx={{
					p: 2,
					border: "1px solid #C8EDFD",
					background: "#f4f7fe",
					minWidth: "300px",
					textAlign: "center",
				}}>
				<Typography color={"text.secondary"} variant="caption">
					Age
				</Typography>
				<Typography>{myProfile?.age === 0 ? "No age info available" : myProfile?.age}</Typography>
			</Box>
		</Stack>
	);
};

export default MyInformation;

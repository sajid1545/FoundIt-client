import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import HandshakeIcon from "@mui/icons-material/Handshake";
import SecurityIcon from "@mui/icons-material/Security";
import { Box, Container, Grid, Typography } from "@mui/material";
const HelpSection = () => {
	return (
		<Container sx={{ my: 15 }} maxWidth="xl">
			<Typography
				sx={{ fontWeight: "bold", color: "#2AB29F", textAlign: "center", mb: 1 }}
				variant="h4">
				How {`"FoundIt"`} Can help you
			</Typography>

			<Typography sx={{ color: "#B0B0B0", mb: 3, textAlign: "center" }}>
				We have got you covered
			</Typography>

			<Grid container spacing={3} sx={{ textAlign: "center" }}>
				<Grid item xs={12} sm={6} md={4}>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							alignItems: "center",
						}}>
						<Box
							sx={{
								border: "1px solid #D3D3D3",
								p: 5,
								boxShadow: 22,
								borderRadius: "30%",
								width: "150px",
								height: "150px",
								mb: 3,
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								"&:hover": {
									cursor: "pointer",
									transition: "all 0.5s ease",
									border: "1px solid #C8EDFD",
								},
								"&:hover svg": {
									color: "#2B4D46",
									transition: "all 0.5s ease",
								},
							}}>
							<Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
								<ContentPasteIcon sx={{ color: "#2AB29F", fontSize: "50px" }} />
							</Box>
						</Box>
						<Typography sx={{ fontWeight: "bold", color: "#2B4D46", mb: 3 }} variant="h5">
							Report a lost or found item
						</Typography>
						<Typography sx={{ color: "#5E646A" }}>
							Report a lost or found item. We will take it into consideration and help you find it.
						</Typography>
					</Box>
				</Grid>
				<Grid item xs={12} sm={6} md={4}>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							alignItems: "center",
						}}>
						<Box
							sx={{
								border: "1px solid #D3D3D3",
								p: 5,
								boxShadow: 22,
								borderRadius: "30%",
								width: "150px",
								height: "150px",
								mb: 3,
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								"&:hover": {
									cursor: "pointer",
									transition: "all 0.5s ease",
									border: "1px solid #C8EDFD",
								},
								"&:hover svg": {
									color: "#2B4D46",
									transition: "all 0.5s ease",
								},
							}}>
							<Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
								<SecurityIcon sx={{ color: "#2AB29F", fontSize: "50px" }} />
							</Box>
						</Box>
						<Typography sx={{ fontWeight: "bold", color: "#2B4D46", mb: 3 }} variant="h5">
							Prove your are the owner of the item
						</Typography>
						<Typography sx={{ color: "#5E646A" }}>
							Once the lost item matched, prove who you are thanks to a security question (ex:
							describe the color,model of your phone, ...). Then, our partner who found this item
							will be able to validate that this is yours
						</Typography>
					</Box>
				</Grid>
				<Grid item xs={12} sm={6} md={4}>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							alignItems: "center",
						}}>
						<Box
							sx={{
								border: "1px solid #D3D3D3",
								p: 5,
								boxShadow: 22,
								borderRadius: "30%",
								width: "150px",
								height: "150px",
								mb: 3,
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								"&:hover": {
									cursor: "pointer",
									transition: "all 0.5s ease",
									border: "1px solid #C8EDFD",
								},
								"&:hover svg": {
									color: "#2B4D46",
									transition: "all 0.5s ease",
								},
							}}>
							<Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
								<HandshakeIcon sx={{ color: "#2AB29F", fontSize: "50px" }} />
							</Box>
						</Box>
						<Typography sx={{ fontWeight: "bold", color: "#2B4D46", mb: 3 }} variant="h5">
							Get your Item back
						</Typography>
						<Typography sx={{ color: "#5E646A" }}>
							Once the lost item matched, contact our partner who found this item and they will
							return it to you .
						</Typography>
					</Box>
				</Grid>
			</Grid>
		</Container>
	);
};

export default HelpSection;

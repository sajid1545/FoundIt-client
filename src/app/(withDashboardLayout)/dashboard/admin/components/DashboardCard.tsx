import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { SxProps } from "@mui/material/styles";
import Image, { StaticImageData } from "next/image";
import * as React from "react";

export interface BudgetProps {
	sx?: SxProps;
	value: string;
	icon?: StaticImageData | string;
	title: string;
	iconColor?: string;
}

export function DashboardCard({
	icon,
	sx,
	value,
	title,
	iconColor,
}: BudgetProps): React.JSX.Element {
	return (
		<Card
			sx={{
				...sx,
				borderRadius: "12px",
			}}>
			<CardContent>
				<Stack spacing={3}>
					<Stack
						direction="row"
						sx={{ alignItems: "flex-start", justifyContent: "space-between" }}
						spacing={3}>
						<Stack spacing={1}>
							<Typography color="primary.main" variant="overline">
								{title}
							</Typography>
							<Typography variant="h4">{value}</Typography>
						</Stack>
						<Avatar
							sx={{
								backgroundColor: `${iconColor}`,

								color: "#fff",
								mx: "auto",
							}}>
							<Image src={icon as string} alt={title} width={56} height={56} />
						</Avatar>
					</Stack>
				</Stack>
			</CardContent>
		</Card>
	);
}

import React from "react";
import {
	Typography,
	Card,
	CardActionArea,
	CardMedia,
	CardContent,
	Grid
} from "@mui/material";
import { Link } from "react-router-dom";

import './../App.css';

interface Dir {
	direction: string;
	image: string;
}

const Direction: React.FC<Dir> = ({ direction, image}) => {
	const joinedImage = "img/" + image;
	const [href] = image.split(".");
	return (
		<Grid item sm={2.4} className="">
			<Link to={href} style={{ textDecoration: 'none' }}>
				<Card sx={{ maxWidth: 250 }}>
					<CardActionArea>
						<CardMedia
							component="img"
							height="140"
							image={joinedImage}
							alt={joinedImage}
						/>
						<CardContent>
							<Typography sx={{ height: 100, display: "flex", alignItems: "center", justifyContent: "center" }} variant="h5" component="div">
								{direction}
							</Typography>
						</CardContent>
					</CardActionArea>
				</Card>
			</Link>
		</Grid>
	);
};

export default Direction;


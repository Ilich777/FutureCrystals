import React from "react";
import {
	Typography,
	Link,
	Card,
	CardActionArea,
	CardMedia,
	CardContent,
	Grid
} from "@mui/material";
import './../App.css';

interface Dir{
	direction: string
	image: string
}

const Direction: React.FC<Dir> = ({direction, image}) => {
	const joinedImage = "img/"+image;
	return (
		<Grid item sm={2.4} className="">
			<Card sx={{ maxWidth: 250 }}>
				<CardActionArea>
					<CardMedia
						component="img"
						height="140"
						image={joinedImage}
						alt="green iguana"
					/>
					<CardContent>
						<Typography gutterBottom variant="h5" component="div">
							<Link href="google.com" underline="none">{direction}</Link>
						</Typography>
						<Typography variant="body2" color="text.secondary">
							Lizards are a widespread group of squamate reptiles, with over 6,000
							species, ranging across all continents except Antarctica
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
		</Grid>
	);
};

export default Direction;


import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container/Container";
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
import Direction from "./Direction";

interface Dir {
	direction_id: string,
	direction_name: string,
	image: string;
}

const DirectionBody = () => {

	const dir: Dir[] = [];
	const [directions, setDirections] = useState(dir);

	useEffect(() => {
		try {
			fetch("/directions/")
				.then((response) => {
					if (response !== undefined)
						return response.json();
					else
						throw new Error("Directions not found.");
				})
				.then((json: Dir[]) => setDirections(json));
		} catch (e) {
			console.log(e);
		}
	}, []);

	return (
		<Container maxWidth="xl">
			{/* <Typography variant="h6" mt={5} gutterBottom sx={{ color: "#161227" }}>
				Выберите направление
			</Typography> */}
			<Grid container spacing={6} className="CardContainer">
				{directions.map(direction => {
					const {
						direction_id,
						direction_name,
						image
					} = direction;
					return (
						<Direction
							direction={direction_name}
							image={image}
							key={direction_id}
						/>
					);
				})}
			</Grid>
		</Container>
	);
};

export default DirectionBody;

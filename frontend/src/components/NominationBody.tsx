import {
	Container,
	FormControl,
	Grid,
	InputLabel,
	ListItemText,
	MenuItem,
	Select,
	SelectChangeEvent,
	Typography
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import Dropzone from 'react-dropzone';

interface HPr {
	id: number;
}

interface Nom {
	nomination_id: number,
	nomination_name: string,
	max_mark: number,
	description: string,
	createdAt: Date,
	updatedAt: Date;
}

const NominationBody: React.FC<HPr> = ({ id }) => {
	const nom: Nom[] = [];
	const [nominations, setNominations] = useState(nom);

	const [selectedNomination, setSelectedNomination] = useState('');
	const [nominationDescription, setnominationDescription] = useState('');

	const [nomination, setNomination] = React.useState('');
	const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, [selectedNomination]);
	
	useEffect(() => {
		try {
			fetch(`/nomination/${id}`)
				.then((response) => {
					if (response !== undefined)
						return response.json();
					else
						throw new Error("Nominations not found.");
				})
				.then((json: Nom[]) => setNominations(json));
		} catch (e) {
			console.log(e);
		}
	}, []);

	const handleChange = (event: SelectChangeEvent) => {
		setIsVisible(false);
		const nominationId = event.target.value;
		setNomination(nominationId as string);
		const [findedNomination] = nominations.filter((nom) => nom.nomination_id === +nominationId);
		setSelectedNomination(findedNomination.nomination_name);
		setnominationDescription(findedNomination.description);
	};
	
	// const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
	//   setSelectedNomination(event.target.value);
	// };

	const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files !== null) {
			const file = event.target.files[0];
			// Здесь вы можете обработать загрузку файла в выбранную категорию
			console.log(`Загрузка файла ${file.name} в категорию ${selectedNomination}`);
		}
	};


	return (
		<Container maxWidth="xl" sx={{ minWidth: 120, width: { xs: 500, sm: 400, md: 600, lg: 450 } }} className="">
			{/* <Typography variant="h6" mt={5} gutterBottom sx={{ color: "#161227" }}>
				Выберите номинацию
			</Typography> */}
			<Grid container spacing={10} className="NominationContainer">
				<Grid item lg={12} className="">
					<FormControl fullWidth >
						<InputLabel id="select-label">Номинация</InputLabel>
						<Select
							labelId="select-label"
							id="select"
							value={nomination}
							label="Nomination"
							onChange={handleChange}
						>
							{nominations.map((nomination, index) => {
								const id = nomination.nomination_id.toString(),
									name = nomination.nomination_name,
									desc = nomination.description;
								return (
									<MenuItem key={id} value={id}>
										<ListItemText primary={name} secondary={desc} />
									</MenuItem>
								);
							})}
						</Select>
					</FormControl>
				</Grid>

				<Grid item lg={12} className={`NominationItem ${isVisible ? 'fadeIn' : ''}`}>
					{nomination !== '' && (
						<>
							<Typography variant="h5" gutterBottom sx={{ color: "#161227" }}>
							{selectedNomination}
							</Typography> 
							<i>({nominationDescription})</i>
						</>
					)}
				</Grid>

				<Grid item lg={12} className={`NominationItem ${isVisible ? 'fadeIn' : ''}`}>
					{nomination !== '' && (
						<Dropzone onDrop={(acceptedFiles) => { console.log(acceptedFiles); }}>
							{({ getRootProps, getInputProps }) => (
								<section>

									<div {...getRootProps()}>
										<input {...getInputProps()} />
										<p>Перетащите файлы сюда или кликните для выбора файлов</p>
									</div>
								</section>
							)}
						</Dropzone>
					)}
				</Grid>

			</Grid>
		</Container>
	);
};

export default NominationBody;

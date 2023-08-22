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
import React, { useState, useEffect, DragEvent } from 'react';
import Dropzone, { FileWithPath } from 'react-dropzone';

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
	const [drag, setDrag] = useState(false);


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

	const dragStartHandler = (event: DragEvent) => {
		event.preventDefault();
		setDrag(true);
	}
	
	const dragLeaveHandler = (event: DragEvent) => {
		event.preventDefault();
		setDrag(false);
	}

	//Upload after drop
	const onDropHandler = (event: DragEvent) => {
		event.preventDefault();
		const files = [...event.dataTransfer.files];
		console.log(files);
		setDrag(false);
	}
	
	// const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
	//   setSelectedNomination(event.target.value);
	// };

	//Upload after click
	const handleUpload = (files: FileWithPath[]) => {
		console.log(`Загрузка файла ${files}`);
		if (files !== null) {
			console.log(`Загрузка файла ${files}`);
			const file = files.shift();
			if (file !== undefined)
			console.log(`Загрузка файла ${file.name}`);
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
						<Dropzone onDrop={handleUpload}>
							{({ getRootProps, getInputProps }) => (
								<section>
										<div {...getRootProps()}
										className={	drag ? "DropArea2" : "DropArea"}
										onDragStart={(e) => dragStartHandler(e) }
										onDragLeave={(e) => dragLeaveHandler(e) }
										onDragOver={(e) => dragStartHandler(e) } 
										onDrop={(e) => onDropHandler(e)}>
										<input {...getInputProps()} />
										{	drag 
											? "Отпустите файлы чтобы загрузить" 
											: "Перетащите файлы сюда или кликните для выбора файлов"
										}
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

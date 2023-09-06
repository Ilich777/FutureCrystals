import {
	Alert,
	Button,
	Container,
	FormControl,
	Grid,
	InputLabel,
	ListItemText,
	MenuItem,
	Select,
	SelectChangeEvent,
	Snackbar,
	Typography
} from '@mui/material';
import React, { useState, useEffect, DragEvent } from 'react';
import Dropzone, { FileWithPath } from 'react-dropzone';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

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
	//const [nomId, setNomId] = useState("");
	const [nominationDescription, setnominationDescription] = useState('');

	const [nomination, setNomination] = React.useState('');
	const [isVisible, setIsVisible] = useState(false);
	const [drag, setDrag] = useState(false);
	const [activeButton, setActiveButton] = useState(false);
	const [fileCount, setFileCount] = useState(0);
	const [formData, setformData] = useState(new FormData());
	const [successAlert, setSuccessAlert] = useState(false);

	async function postData(url: string, obj: FormData) {
		try {
			const init = {
				method: "POST",
				body:obj
			};
			const result = await fetch(url, init);
			return result;
		}
		catch (er) {
			console.error("Ошибка:", er);
		}
	}

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
		setFileCount(0);
		setActiveButton(false);
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
	const onDropHandler = async (event: DragEvent) => {
		event.preventDefault();
		const files = [...event.dataTransfer.files],
		formData = new FormData();
		let currentCountFiles = 0;
		for(let file of files){
			formData.append("nomination_id", nomination);
			formData.append("files", file);
			currentCountFiles++;
		}
		setFileCount(currentCountFiles);
		setActiveButton(true);
		setformData(formData);
		setDrag(false);
	}

	//Upload after click
	const onClickHandler = async (files: FileWithPath[]) => {
		const formData = new FormData();
		let currentCountFiles = 0;
		for(let file of files){
			formData.append("nomination_id", nomination);
			formData.append("files", file);
			currentCountFiles++;
		}
		setFileCount(currentCountFiles);
		setActiveButton(true);
		setformData(formData);
		setDrag(false);
	};
	const onButtonClickHandler = async () => {
		await postData("requests/create", formData)
			.then(async (response)=>{
				if(response?.status === 201)
				setSuccessAlert(true);
			
				setFileCount(0);
				setActiveButton(false);
			});
	}

	const handleCloseSuccessAlert = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setSuccessAlert(false);
  };

	return (
		<>
			<Container maxWidth="xl" sx={{ minWidth: 120, width: { xs: 500, sm: 400, md: 600, lg: 450 } }} className="">
			{/* <Typography variant="h6" mt={5} gutterBottom sx={{ color: "#161227" }}>
				Выберите номинацию
			</Typography> */}
			<Grid container spacing={6} className="NominationContainer">
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
						<Dropzone onDrop={onClickHandler}>
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
				<Grid item lg={12} className={`NominationItem ${isVisible ? 'fadeIn' : ''}`}>
				{nomination !== '' && (
					<>
						<p>Выбрано файлов: {fileCount}</p>
						<Button
							component="label"
							variant="contained"
							startIcon={<CloudUploadIcon />}
							disabled = { !activeButton }
							onClick={onButtonClickHandler}
						>
							Upload a file
						</Button>
					</>
				)}
				</Grid>
			</Grid>
		</Container>
		<Snackbar
			anchorOrigin={{ vertical: "bottom", horizontal: 'right' }}
			autoHideDuration={2000}
			open={successAlert}
			onClose={handleCloseSuccessAlert}
		>
			<Alert onClose={handleCloseSuccessAlert} severity="success" sx={{ width: '100%' }}>
          Файлы успешно отправлены!
			</Alert>
		</Snackbar>
	</>

	);
};

export default NominationBody;

import React, { useState, useEffect, useCallback } from "react";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import withMainContainer from "@containers/withMainContainer";
import withAuthentication from "@containers/withAuthentication";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import Image from "react-bootstrap/Image";
import ProgressBar from "react-bootstrap/ProgressBar";
import { toast } from "react-toastify";
import withFirebase from "../../firebase/withFirebase";
import CarroDetalhes from "./CarroDetalhes";
import { useDropzone } from "react-dropzone";

const CarroImagesFormContainer = props => {
	const MAX_UPLOAD_IMAGES = 4;

	const { match, history } = props;
	const [carro, setCarro] = useState(null);
	const [images, setImages] = useState([]);
	const [uploadProgress, setUploadProgress] = useState(null);

	const functions = props.firebase.functions();
	const storage = props.firebase.storage();
	const firestore = props.firebase.firestore();

	const fetchCarById = () => {
		if (match.params.carId) {
			const carById = functions.httpsCallable("fetchCarById");

			carById({ car_id: match.params.carId })
				.then(carro => {
					setCarro(carro.data);
					console.log(carro.data);
				})
				.catch(err => {
					toast(err.message, {
						type: "error",
						hideProgressBar: true
					});
				});
		}
	};

	useEffect(() => {
		fetchCarById();
	}, []);

	const onDrop = acceptedFiles => {
		const canUploadMoreImages = allowUploadMoreImages(acceptedFiles, images);

		if (canUploadMoreImages) {
			updateImageSet(acceptedFiles, images);
		} else {
			toast.error(
				`Não é possível salvar mais de ${MAX_UPLOAD_IMAGES} imagens.`
			);
		}
	};

	const handleImagesSubmit = async () => {
		const imageSet = [...images];
		const storageReference = storage.ref();
		const carId = match.params.carId;

		for (let image of imageSet) {
			const metadata = {
				size: image.data.size,
				contentType: image.data.type,
				name: `${image.data.name}_${carId}_${Date.now()}.${
					image.data.type.split("/")[1]
				}`
			};

			const buffer = await image.data.arrayBuffer();

			const uploadTask = storageReference
				.child(`cars/${carId}/${metadata.name}`)
				.put(buffer, metadata);

			uploadTask.on(
				props.firebase.storage.TaskEvent.STATE_CHANGED,
				function(snapshot) {
					var progress =
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					console.log("Upload is " + progress + "% done");
					setUploadProgress(progress);

					switch (snapshot.state) {
						case props.firebase.storage.TaskState.PAUSED: // or 'paused'
							console.log("Upload is paused");
							break;
						case props.firebase.storage.TaskState.RUNNING: // or 'running'
							console.log("Upload is running");
							break;
					}
				},
				function(error) {
					console.log(error);
				},
				function() {
					// Upload completed successfully, now we can get the download URL
					uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
						console.log("File available at", downloadURL);
					});
				}
			);
		}

		// const carToUpdateReference = firestore.collection("cars").doc(car.id);
	};

	const updateImageSet = (imagesToUpload, currentImages) => {
		const imagesWithURL = imagesToUpload.map(file => {
			return {
				data: file,
				src: URL.createObjectURL(file)
			};
		});

		const imageSetUpdated = [...currentImages, ...imagesWithURL];
		setImages(imageSetUpdated);
	};

	const allowUploadMoreImages = (imagesToUpload = [], currentImages = []) => {
		return imagesToUpload.length + currentImages.length <= MAX_UPLOAD_IMAGES;
	};

	const removeImageFromImagesSet = imageKey => {
		const currentImages = [...images];
		currentImages.splice(imageKey, 1);
		setImages(currentImages);
	};

	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

	return (
		<Container className="mt-5">
			<Row>
				<Col md={{ span: 8, offset: 2 }}>
					<Card>
						<Card.Header as="h5">Upload Imagens</Card.Header>
						<Card.Body>
							<Row>
								<Col lg={8} md={8} xs={12}>
									{uploadProgress && (
										<ProgressBar
											now={uploadProgress}
											label={`${uploadProgress}%`}
										/>
									)}
									<div {...getRootProps()}>
										<input {...getInputProps()} />
										<Jumbotron className="text-center">
											<p>
												<i className="fas fa-file-upload fa-5x"></i>
											</p>
											{isDragActive ? (
												<p className="text-primary">Solte sua imagem aqui...</p>
											) : (
												<p className="text-muted">
													Arreste e solte suas imagens aqui...
												</p>
											)}
										</Jumbotron>
									</div>

									{images.length > 0 && (
										<div className="mb-5">
											<small>
												Para mostrar e esconder as opções da imagem:{" "}
												<strong>clique sobre a imagem</strong>
											</small>
											{images.map((image, key) => {
												return (
													<OverlayTrigger
														key={key}
														placement="top"
														trigger="click"
														overlay={
															<Popover id={`popover-basic`}>
																<Popover.Title as="h3">
																	Remover esta imagem?
																</Popover.Title>
																<Popover.Content>
																	<Button
																		onClick={() =>
																			removeImageFromImagesSet(key)
																		}
																		variant="danger"
																		block
																		size="sm"
																	>
																		Remover
																	</Button>
																</Popover.Content>
															</Popover>
														}
													>
														<Image width="200" src={image.src} />
													</OverlayTrigger>
												);
											})}
										</div>
									)}

									<div className="d-flex justify-content-between">
										<Button
											variant="danger"
											onClick={() => history.push("/carros")}
										>
											Cancelar
										</Button>
										<Button
											variant="success"
											onClick={() => handleImagesSubmit()}
										>
											Salvar
										</Button>
									</div>
								</Col>
								<Col lg={4} md={4} xs={12}>
									{!carro && (
										<Spinner animation="border" role="status">
											<span className="sr-only">Loading...</span>
										</Spinner>
									)}
									{carro && <CarroDetalhes carro={carro} />}
								</Col>
							</Row>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};

export default compose(
	withMainContainer,
	withAuthentication,
	withFirebase,
	withRouter
)(CarroImagesFormContainer);

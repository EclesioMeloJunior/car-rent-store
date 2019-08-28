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
					setImages(carro.data.images || []);
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

	const handleImagesSubmit = async (imagesToUpload = []) => {
		const imageSet =
			imagesToUpload.length < 1 ? [...images] : [...imagesToUpload];
		const carId = match.params.carId;
		const storageReference = storage.ref();
		const imagesLinks = [];

		for (let image of imageSet) {
			let imageExists = false;

			if (image.path) {
				const imageReference = await storageReference
					.child(image.path)
					.getDownloadURL();

				if (imageReference) {
					imageExists = true;
					imagesLinks.push({ src: imageReference, path: image.path });
				}
			}

			if (!imageExists) {
				const uploadImageTask = await uploadImage(image, carId);

				const downloadImageLink = await uploadImageTask.ref.getDownloadURL();
				const imageFullPath = await uploadImageTask.ref.location.path;

				imagesLinks.push({ src: downloadImageLink, path: imageFullPath });
			}
		}

		const carToUpdateReference = firestore.collection("cars").doc(carId);
		const carsReference = carToUpdateReference.update({ images: imagesLinks });

		carsReference
			.then(() => {
				toast("Imagens salvas com sucesso", {
					type: "success",
					hideProgressBar: true
				});
			})
			.catch(err => {
				console.log(err);
				toast("Problemas ao salvar as imagens", {
					type: "error",
					hideProgressBar: true
				});
			});
	};

	const uploadImage = async (image, carId) => {
		const storageReference = storage.ref();

		const metadata = {
			size: image.data.size,
			contentType: image.data.type,
			name: `${image.data.name}_${carId}_${Date.now()}.${
				image.data.type.split("/")[1]
			}`
		};

		const buffer = await image.data.arrayBuffer();

		const uploadTask = await storageReference
			.child(`cars/${carId}/${metadata.name}`)
			.put(buffer, metadata);

		return uploadTask;
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

	const removeImageFromImagesSet = async imageKey => {
		const storageReference = storage.ref();
		const currentImages = [...images];
		const excludeImages = currentImages.splice(imageKey, 1);

		if (excludeImages.length > 0) {
			const image = excludeImages[0];

			if (image.path) {
				var imageToRemoveReference = storageReference.child(image.path);
				await imageToRemoveReference.delete();
			}
		}

		await setImages(currentImages);
		await handleImagesSubmit(currentImages);
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

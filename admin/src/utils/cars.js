import carsManufactures from "./car_manufacturers.json";

export const getAllManufactures = () => {
	return carsManufactures;
};

export const getManufactureByIdx = idx => {
	return carsManufactures[idx];
};

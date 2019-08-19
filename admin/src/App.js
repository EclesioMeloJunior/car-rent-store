import React from "react";
import store from "@redux/store";
import Home from "./components/Home";
import { Provider } from "react-redux";
import Carros from "./components/Carros";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CarroFormContainer from "./components/Carros/CarroFormContainer";
import CarroImagesFormContainer from "./components/Carros/CarroImagesFormContainer";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Switch>
					<Route path="/" exact component={Home} />
					<Route path="/carros" exact component={Carros} />
					<Route
						path="/carros/form/:carId?"
						exact
						component={CarroFormContainer}
					/>
					<Route
						path="/carros/images/form/:carId"
						exact
						component={CarroImagesFormContainer}
					/>
				</Switch>
			</BrowserRouter>

			<ToastContainer />
		</Provider>
	);
}

export default App;

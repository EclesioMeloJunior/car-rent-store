import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import store from "@redux/store";
import Carros from "./components/Carros";
import CarroFormContainer from "./components/Carros/CarroFormContainer";

function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Switch>
					<Route path="/" exact component={Home} />
					<Route path="/carros" exact component={Carros} />
					<Route path="/carros/form" exact component={CarroFormContainer} />
				</Switch>
			</BrowserRouter>
		</Provider>
	);
}

export default App;

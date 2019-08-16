import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import store from "@redux/store";
import Carros from "./components/Carros";

function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Switch>
					<Route path="/" exact component={Home} />
					<Route path="/carros" exact component={Carros} />
				</Switch>
			</BrowserRouter>
		</Provider>
	);
}

export default App;

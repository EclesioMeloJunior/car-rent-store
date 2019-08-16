import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import store from "@redux/store";

function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Switch>
					<Route path="/" exact component={Home} />
				</Switch>
			</BrowserRouter>
		</Provider>
	);
}

export default App;

import React from "react";
import Navbar from "../components/Navbar";

const withMainContainer = Component => props => (
	<React.Fragment>
		<Navbar />
		<Component {...props} />
	</React.Fragment>
);

export default withMainContainer;

import React from "react";
import { compose } from "redux";
import withMainContainer from "@containers/withMainContainer";
import withAuthentication from "@containers/withAuthentication";
import withFirebase from "@firebase-app/withFirebase";

const Home = props => <h1>Hello from home!</h1>;

export default compose(
	withAuthentication,
	withMainContainer
)(Home);

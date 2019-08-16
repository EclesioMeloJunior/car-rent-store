import React from "react";
import FirebaseAuth from "react-firebaseui/FirebaseAuth";
import firebase from "@firebase-app";

const Authentication = props => {
	const uiConfig = {
		signInFlow: "popup",
		signInOptions: [
			firebase.auth.GoogleAuthProvider.PROVIDER_ID,
			firebase.auth.EmailAuthProvider.PROVIDER_ID
		]
	};

	return <FirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />;
};

export default Authentication;

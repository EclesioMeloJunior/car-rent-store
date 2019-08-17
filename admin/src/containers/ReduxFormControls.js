import React from "react";
import Form from "react-bootstrap/Form";

export const ReduxFormControl = ({ input, meta, ...props }) => {
	return <Form.Control {...props} {...input} />;
};

export const ReduxCheckControl = ({ input, meta, ...props }) => {
	return <Form.Check {...props} {...input} />;
};

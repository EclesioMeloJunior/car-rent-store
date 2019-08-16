import React from "react";
import { default as BootstrapNavbar } from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Navbar = () => (
	<BootstrapNavbar bg="dark" variant="dark">
		<BootstrapNavbar.Brand href="#home">BootstrapNavbar</BootstrapNavbar.Brand>
		<Nav className="mr-auto">
			<Nav.Link href="#home">Home</Nav.Link>
			<Nav.Link href="#features">Features</Nav.Link>
			<Nav.Link href="#pricing">Pricing</Nav.Link>
		</Nav>
		<Form inline>
			<Form.Control type="text" placeholder="Search" className="mr-sm-2" />
			<Button variant="outline-info">Search</Button>
		</Form>
	</BootstrapNavbar>
);

export default Navbar;

import React from "react";
import { Link } from "react-router-dom";
import { default as BootstrapNavbar } from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

const Navbar = () => (
	<BootstrapNavbar bg="dark" variant="dark">
		<BootstrapNavbar.Brand href="#home">Car Rent Store</BootstrapNavbar.Brand>
		<Nav className="mr-auto">
			<Link className="nav-link" to="/carros">
				Meus Carros
			</Link>
			<Link className="nav-link" to="/cidades">
				Cidades
			</Link>
			<Link className="nav-link" to="/configuracoes">
				Configurações
			</Link>
		</Nav>
	</BootstrapNavbar>
);

export default Navbar;

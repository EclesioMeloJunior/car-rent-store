import React from "react";
import { Link } from "react-router-dom";
import { default as BootstrapNavbar } from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
<<<<<<< HEAD
=======
import NavDropdown from "react-bootstrap/NavDropdown";
import { connect } from "react-redux";
import firebase from "@firebase-app";
>>>>>>> 0fb9756383097b8573e05422db4289090013261d

const AuthNavbar = props => (
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
<<<<<<< HEAD
=======
		<NavDropdown
			title={props.user.displayName}
			id="basic-nav-dropdown"
			alignRight
			className="nav-link"
		>
			<NavDropdown.Item onClick={() => firebase.auth().signOut()}>
				Sair
			</NavDropdown.Item>
		</NavDropdown>
>>>>>>> 0fb9756383097b8573e05422db4289090013261d
	</BootstrapNavbar>
);

const NotAuthNavbar = props => (
	<BootstrapNavbar bg="dark" variant="dark">
		<BootstrapNavbar.Brand href="#home">Car Rent Store</BootstrapNavbar.Brand>
	</BootstrapNavbar>
);

const Navbar = props => {
	return props.auth.user ? (
		<AuthNavbar user={props.auth.user} />
	) : (
		<NotAuthNavbar />
	);
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps)(Navbar);

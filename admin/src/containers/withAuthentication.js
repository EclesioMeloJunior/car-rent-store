import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import Authentication from "../components/Authentication";

import firebase from "../firebase";
import { authTypes } from "../redux/auth";

const withAuthentication = Component => props => {
  const [user, setUser] = useState(null);

  const handleAuthChanged = user => {
    localStorage.setItem("authUser", JSON.stringify(user));
    props.currentUser(user);
    setUser(user);
  };

  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged(handleAuthChanged);

    return () => unregisterAuthObserver();
  });

  return user ? <Component {...props} user={user} /> : <Authentication />;
};

const mapDispatchToProps = dispatch => ({
  currentUser: user => dispatch({ type: authTypes.CURRENT_USER, payload: user })
});

export default compose(connect(null, mapDispatchToProps), withAuthentication);

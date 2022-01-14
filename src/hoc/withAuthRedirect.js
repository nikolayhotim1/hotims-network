import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

const mapStateToPropsForRedirect = (state) => ({
    isAuth: state.auth.isAuth
});

export const withAuthRedirectComponent = (Component) => {
    class RedirectComponent extends React.Component {
        render() {
            if (!this.props.isAuth) return <Navigate to={'/login'} />;
            return <Component {...this.props} />;
        }
    }

    const ConnectedRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent);
    return ConnectedRedirectComponent;
};
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import history from './history';

const AuthenticateUser = (ComposedComponent) => {
  /**
   *
   */
  class Authenticate extends Component {
    /**
     * @method componentWillMount
     * @return {*} set user authentication status
     */
    componentWillMount() {
      if (!this.props.isAuthenticated) {
        history.push('/signin');
      }
    }
    /**
     * @method componentWillUpdate
     * @param {*} nextProps
     * @return {*} props
     */
    componentWillUpdate(nextProps) {
      if (!nextProps.isAuthenticated) {
        history.push('/signin');
      }
    }

    /**
 *
 * @returns { undefined }
 * @memberof Authenticate
 */
    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }

  Authenticate.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
  };

  const mapStateToProps = state => ({
    isAuthenticated: state.setCurrentUser.isAuthenticated,
  });

  return connect(mapStateToProps, null)(Authenticate);
};
export default AuthenticateUser;

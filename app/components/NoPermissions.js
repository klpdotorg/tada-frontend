import React, { Component } from 'react';
import { Link } from 'react-router';

export default class NoPermissions extends Component {
  render() {
    return (
      <div className="text-center">
        <h4>You don't have permissions to access this page.</h4><br />
        <Link to="/" className="btn btn-primary padded-btn">GO TO MAIN PAGE</Link>
      </div>
    );
  }
}

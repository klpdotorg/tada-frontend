import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Teachers } from '../../components/Teachers';

class GetTeachers extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return <Teachers {...this.props} />;
  }
}

const mapStateToProps = () => {};

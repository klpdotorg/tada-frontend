import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getProgramEntities } from '../../actions';
import { DefaultMessageView } from '../../components/AssessmentEntry';

class FetchProgramEntities extends Component {
  componentDidMount() {
    this.props.getProgramEntities([{ depth: 0, uniqueId: '1state' }]);
  }

  render() {
    return <DefaultMessageView />;
  }
}

FetchProgramEntities.propTypes = {
  getProgramEntities: PropTypes.func,
};

const DefaultMessage = connect(null, { getProgramEntities })(FetchProgramEntities);

export { DefaultMessage };

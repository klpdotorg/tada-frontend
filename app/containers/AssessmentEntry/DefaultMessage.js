import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import forEach from 'lodash.foreach';
import get from 'lodash.get';
import isEmpty from 'lodash.isempty';

import { getProgramEntities } from '../../actions';
import { DefaultMessageView } from '../../components/AssessmentEntry';

class FetchProgramEntities extends Component {
  componentDidMount() {
    const { params, fetchEntities } = this.props;
    const path = [{ depth: 0, uniqueId: '1state' }];
    const keys = Object.keys(params);

    // Doing foreach on keys and making path for fetching entities
    forEach(keys, (key, index) => {
      path.push({
        depth: index + 1,
        uniqueId: params[key],
      });
    });

    if (fetchEntities) {
      this.props.getProgramEntities(path);
    }
  }

  render() {
    return <DefaultMessageView />;
  }
}

FetchProgramEntities.propTypes = {
  params: PropTypes.object,
  getProgramEntities: PropTypes.func,
  fetchEntities: PropTypes.bool,
};

const mapStateToProps = (state, ownProps) => {
  const { params } = ownProps;
  const values = Object.values(params);
  const { programDetails } = state.programDetails;

  const lastId = values[values.length - 1];
  const lastEntity = get(programDetails, [lastId], {});
  if (isEmpty(lastEntity)) {
    return {
      fetchEntities: true,
    };
  }

  return {
    fetchEntities: false,
  };
};

const DefaultMessage = connect(mapStateToProps, { getProgramEntities })(FetchProgramEntities);

export { DefaultMessage };

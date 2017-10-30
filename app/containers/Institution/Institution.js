import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { get, isEmpty } from 'lodash';

import { DEFAULT_PARENT_ID } from 'config';
import { InstitutionView } from '../../components/Institution';
import {
  getEntities,
} from '../../actions';

class FetchInstitutionEntity extends Component {
  componentDidMount() {
    const { params, institution } = this.props;

    const { blockId, districtId, clusterId, institutionId } = params;
    if (isEmpty(institution)) {
      this.props.getEntities([DEFAULT_PARENT_ID, districtId, blockId, clusterId, institutionId]);
    }
  }

  render() {
    return <InstitutionView {...this.props} />;
  }
}

FetchInstitutionEntity.propTypes = {
  params: PropTypes.object,
  institution: PropTypes.object,
  getEntities: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => {
  const { blockId, districtId, clusterId, institutionId } = ownProps.params;

  return {
    district: get(state.boundaries.boundaryDetails, districtId, {}),
    block: get(state.boundaries.boundaryDetails, blockId, {}),
    cluster: get(state.boundaries.boundaryDetails, clusterId, {}),
    institution: get(state.boundaries.boundaryDetails, institutionId, {}),
    isLoading: state.appstate.loadingBoundary,
  };
};

const mapDispatchToProps = dispatch => ({
  toggleClassModal: () => {
    dispatch({
      type: 'TOGGLE_MODAL',
      modal: 'createClass',
    });
  },
  getEntities: (ids) => {
    dispatch(getEntities(ids));
  },
});

const Institution = connect(mapStateToProps, mapDispatchToProps)(FetchInstitutionEntity);

export { Institution };

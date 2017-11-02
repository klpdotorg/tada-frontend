import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { get, isEmpty } from 'lodash';

import { DEFAULT_PARENT_NODE_ID } from 'config';
import { InstitutionView } from '../../components/Institution';
import {
  getEntities,
  getLanguages,
  getInstitutionCategories,
  getManagements,
} from '../../actions';

class FetchInstitutionEntity extends Component {
  componentDidMount() {
    const { params, institution } = this.props;

    const { blockNodeId, districtNodeId, clusterNodeId, institutionNodeId } = params;
    if (isEmpty(institution)) {
      this.props.getEntities([
        DEFAULT_PARENT_NODE_ID,
        districtNodeId,
        blockNodeId,
        clusterNodeId,
        institutionNodeId,
      ]);
    }
    this.props.getLanguages();
    this.props.getInstitutionCats();
    this.props.getManagements();
  }

  render() {
    return <InstitutionView {...this.props} />;
  }
}

FetchInstitutionEntity.propTypes = {
  params: PropTypes.object,
  institution: PropTypes.object,
  getEntities: PropTypes.func,
  getLanguages: PropTypes.func,
  getInstitutionCats: PropTypes.func,
  getManagements: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => {
  const { blockNodeId, districtNodeId, clusterNodeId, institutionNodeId } = ownProps.params;

  return {
    district: get(state.boundaries.boundaryDetails, districtNodeId, {}),
    block: get(state.boundaries.boundaryDetails, blockNodeId, {}),
    cluster: get(state.boundaries.boundaryDetails, clusterNodeId, {}),
    institution: get(state.boundaries.boundaryDetails, institutionNodeId, {}),
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
  getLanguages: () => {
    dispatch(getLanguages());
  },
  getInstitutionCats: () => {
    dispatch(getInstitutionCategories());
  },
  getManagements: () => {
    dispatch(getManagements());
  },
});

const Institution = connect(mapStateToProps, mapDispatchToProps)(FetchInstitutionEntity);

export { Institution };

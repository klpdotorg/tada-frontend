import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { get, isEmpty } from 'lodash';

import { DEFAULT_PARENT_NODE_ID } from 'config';
import { InstitutionView } from '../../components/Institution';
import {
  getBoundariesEntities,
  getLanguages,
  getInstitutionCategories,
  getManagements,
  openTeachers,
} from '../../actions';

class FetchInstitutionEntity extends Component {
  componentDidMount() {
    const { params, institution } = this.props;
    const { blockNodeId, districtNodeId, clusterNodeId, institutionNodeId } = params;
    const path = [
      DEFAULT_PARENT_NODE_ID,
      districtNodeId,
      blockNodeId,
      clusterNodeId,
      institutionNodeId,
    ];

    if (isEmpty(institution)) {
      const entities = path.map((id, i) => {
        return { depth: i, uniqueId: id };
      });

      this.props.getBoundariesEntities(entities);
    }
    this.props.getLanguages();
    this.props.getInstitutionCats();
    this.props.getManagements();
  }

  render() {
    const { params } = this.props;
    const { blockNodeId, districtNodeId, clusterNodeId, institutionNodeId } = params;
    const path = [districtNodeId, blockNodeId, clusterNodeId, institutionNodeId];

    return <InstitutionView {...this.props} depth={path.length} />;
  }
}

FetchInstitutionEntity.propTypes = {
  params: PropTypes.object,
  institution: PropTypes.object,
  getBoundariesEntities: PropTypes.func,
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

const mapDispatchToProps = (dispatch) => {
  return {
    toggleClassModal: () => {
      dispatch({
        type: 'TOGGLE_MODAL',
        modal: 'createClass',
      });
    },
    getBoundariesEntities: (ids) => {
      dispatch(getBoundariesEntities(ids));
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
    showTeachers: (id, depth) => {
      dispatch(openTeachers(id, depth));
    },
  };
};

const Institution = connect(mapStateToProps, mapDispatchToProps)(FetchInstitutionEntity);

export { Institution };

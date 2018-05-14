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
  toggleClassModal,
} from '../../actions';
import { checkPermissions } from '../../utils';

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
  hasPermissions: PropTypes.bool,
};

const mapStateToProps = (state, ownProps) => {
  const { blockNodeId, districtNodeId, clusterNodeId, institutionNodeId } = ownProps.params;
  const { isAdmin } = state.profile;
  const institution = get(state.boundaries.boundaryDetails, institutionNodeId, {});
  const district = get(state.boundaries.boundaryDetails, districtNodeId, {});
  const block = get(state.boundaries.boundaryDetails, blockNodeId, {});
  const cluster = get(state.boundaries.boundaryDetails, clusterNodeId, {});

  const hasPermissions = checkPermissions(
    isAdmin,
    state.userPermissions,
    [district.id, block.id, cluster.id],
    institution.id,
  );

  return {
    district,
    block,
    cluster,
    institution,
    isLoading: state.appstate.loadingBoundary,
    isAdmin,
    hasPermissions,
  };
};

const Institution = connect(mapStateToProps, {
  toggleClassModal,
  getBoundariesEntities,
  getLanguages,
  getInstitutionCats: getInstitutionCategories,
  getManagements,
  showTeachers: openTeachers,
})(FetchInstitutionEntity);

export { Institution };

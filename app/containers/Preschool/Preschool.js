import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isEmpty, get } from 'lodash';

import { DEFAULT_PARENT_NODE_ID } from 'config';
import {
  getBoundariesEntities,
  getLanguages,
  getInstitutionCategories,
  getManagements,
  openTeachers,
  toggleClassModal,
} from '../../actions';
import { PreschoolView } from '../../components/Preschool';
import { checkPermissions } from '../../utils';

class FetchPreschoolEntity extends Component {
  componentDidMount() {
    const { params, institution } = this.props;

    const { districtNodeId, projectNodeId, circleNodeId, institutionNodeId } = params;
    if (isEmpty(institution)) {
      const entities = [
        DEFAULT_PARENT_NODE_ID,
        districtNodeId,
        projectNodeId,
        circleNodeId,
        institutionNodeId,
      ].map((id, i) => {
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

    return <PreschoolView {...this.props} depth={path.length} />;
  }
}

FetchPreschoolEntity.propTypes = {
  params: PropTypes.object,
  institution: PropTypes.object,
  getBoundariesEntities: PropTypes.func,
  getLanguages: PropTypes.func,
  getInstitutionCats: PropTypes.func,
  getManagements: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => {
  const { districtNodeId, projectNodeId, circleNodeId, institutionNodeId } = ownProps.params;
  const { isAdmin } = state.profile;
  const district = get(state.boundaries.boundaryDetails, districtNodeId, {});
  const project = get(state.boundaries.boundaryDetails, projectNodeId, {});
  const circle = get(state.boundaries.boundaryDetails, circleNodeId, {});
  const institution = get(state.boundaries.boundaryDetails, institutionNodeId, {});
  const hasPermissions = checkPermissions(
    isAdmin,
    state.userPermissions,
    [district.id, project.id, circle.id],
    institution.id,
  );

  return {
    district,
    project,
    circle,
    institution,
    isLoading: state.appstate.loadingBoundary,
    isAdmin,
    hasPermissions,
  };
};

const Preschool = connect(mapStateToProps, {
  toggleClassModal,
  showTeachers: openTeachers,
  getBoundariesEntities,
  getLanguages,
  getInstitutionCats: getInstitutionCategories,
  getManagements,
})(FetchPreschoolEntity);

export { Preschool };

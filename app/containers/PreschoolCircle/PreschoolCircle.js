import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import get from 'lodash.get';
import isEmpty from 'lodash.isempty';

import { DEFAULT_PARENT_NODE_ID } from 'config';
import {
  getBoundariesEntities,
  getInstitutionCategories,
  getLanguages,
  getManagements,
} from '../../actions';
import { PreschoolCircleView } from '../../components/PreschoolCircle';
import { getEntitiesPath } from '../../utils';

class FetchCircleEntity extends Component {
  componentWillMount() {
    const { params, circle } = this.props;
    const { districtNodeId, projectNodeId, circleNodeId } = params;

    if (isEmpty(circle)) {
      const entities = [
        DEFAULT_PARENT_NODE_ID,
        districtNodeId,
        projectNodeId,
        circleNodeId,
      ].map((id, i) => {
        return { depth: i, uniqueId: id };
      });

      this.props.getBoundariesEntities(entities);
    }

    this.props.getInstitutionCategories();
    this.props.getLanguages();
    this.props.getManagements();
  }

  render() {
    return <PreschoolCircleView {...this.props} />;
  }
}

FetchCircleEntity.propTypes = {
  params: PropTypes.object,
  circle: PropTypes.object,
  getBoundariesEntities: PropTypes.func,
  getInstitutionCategories: PropTypes.func,
  getLanguages: PropTypes.func,
  getManagements: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => {
  const { projectNodeId, districtNodeId, circleNodeId } = ownProps.params;
  const { isAdmin } = state.profile;
  const pathname = get(ownProps, ['location', 'pathname'], '');
  const paths = getEntitiesPath(pathname, [districtNodeId, projectNodeId]);

  return {
    circle: get(state.boundaries.boundaryDetails, circleNodeId, {}),
    project: get(state.boundaries.boundaryDetails, projectNodeId, {}),
    district: get(state.boundaries.boundaryDetails, districtNodeId, {}),
    isLoading: state.appstate.loadingBoundary,
    paths,
    isAdmin,
  };
};

const PreschoolCircle = connect(mapStateToProps, {
  getBoundariesEntities,
  getInstitutionCategories,
  getLanguages,
  getManagements,
})(FetchCircleEntity);

export default PreschoolCircle;

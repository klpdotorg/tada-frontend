import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { isEmpty } from 'lodash';

import { DEFAULT_PARENT_NODE_ID } from 'config';
import {
  getBoundariesEntities,
  getLanguages,
  getInstitutionCategories,
  getManagements,
} from '../../actions';
import { PreschoolView } from '../../components/Preschool';

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
    return <PreschoolView {...this.props} />;
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
  return {
    district: state.boundaries.boundaryDetails[districtNodeId],
    project: state.boundaries.boundaryDetails[projectNodeId],
    circle: state.boundaries.boundaryDetails[circleNodeId],
    institution: state.boundaries.boundaryDetails[institutionNodeId],
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
    showTeachers: (path) => {
      dispatch(push(`${path}/teachers`));
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
  };
};

const Preschool = connect(mapStateToProps, mapDispatchToProps)(FetchPreschoolEntity);

export { Preschool };

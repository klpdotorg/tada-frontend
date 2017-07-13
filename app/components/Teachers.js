import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Teachers from './Teachers/ShowTeachers';
import {
  getBoundaries,
  getInstitutions,
  openNode,
  fetchEntitiesFromServer,
  selectPrimaryTree,
  selectPreschoolTree,
} from '../actions';

class TeacherContainer extends Component {
  state = {
    isLoading: true,
  };

  getPreshoolData = () => {
    const { dispatch, params } = this.props;

    dispatch(selectPreschoolTree());
    dispatch({
      type: 'BOUNDARIES',
      payload: getBoundaries(1),
    }).then(() => {
      dispatch({
        type: 'BOUNDARIES',
        payload: getBoundaries(params.districtId),
      }).then(() => {
        dispatch(openNode(params.projectId));
        dispatch(fetchEntitiesFromServer(params.projectId));
        dispatch({
          type: 'BOUNDARIES',
          payload: getBoundaries(params.projectId),
        }).then(() => {
          dispatch(openNode(params.circleId));
          dispatch(fetchEntitiesFromServer(params.circleId));
          dispatch({
            type: 'BOUNDARIES',
            payload: getInstitutions(params.circleId),
          }).then(() => {
            this.setState({
              isLoading: false,
            });
            dispatch(openNode(params.institutionId));
            dispatch(fetchEntitiesFromServer(params.institutionId));
          });
        });
      });
    });
  };

  getPrimarySchoolData = () => {
    const { dispatch, params } = this.props;

    dispatch(selectPrimaryTree());
    dispatch({
      type: 'BOUNDARIES',
      payload: getBoundaries(1),
    }).then(() => {
      dispatch({
        type: 'BOUNDARIES',
        payload: getBoundaries(params.districtId),
      }).then(() => {
        dispatch(openNode(params.blockId));
        dispatch(fetchEntitiesFromServer(params.blockId));
        dispatch({
          type: 'BOUNDARIES',
          payload: getBoundaries(params.blockId),
        }).then(() => {
          dispatch(openNode(params.clusterId));
          dispatch(fetchEntitiesFromServer(params.clusterId));
          dispatch({
            type: 'BOUNDARIES',
            payload: getInstitutions(params.clusterId),
          }).then(() => {
            this.setState({
              isLoading: false,
            });
            dispatch(openNode(params.institutionId));
            dispatch(fetchEntitiesFromServer(params.institutionId));
          });
        });
      });
    });
  };

  componentDidMount() {
    const { dispatch, params } = this.props;

    dispatch(openNode(params.districtId));
    dispatch(fetchEntitiesFromServer(params.districtId));

    if (params.projectId) {
      this.getPreshoolData();
    } else {
      this.getPrimarySchoolData();
    }
  }

  loadingData() {
    return (
      <div>
        <i className="fa fa-cog fa-spin fa-lg fa-fw" />
        <span className="text-muted">Loading...</span>
      </div>
    );
  }

  render() {
    if (this.state.isLoading) {
      return this.loadingData();
    }

    return <Teachers {...this.props} />;
  }
}

TeacherContainer.propTypes = {
  dispatch: PropTypes.func,
  params: PropTypes.object,
};

export default TeacherContainer;

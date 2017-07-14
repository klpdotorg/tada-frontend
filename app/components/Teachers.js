import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ShowTeachers from './Teachers/ShowTeachers';
import {
  getBoundaries,
  getInstitutions,
  openNode,
  fetchEntitiesFromServer,
  selectPrimaryTree,
  selectPreschoolTree,
  getTeachers,
} from '../actions';

class Teachers extends Component {
  state = {
    isFetching: true,
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
            dispatch(openNode(params.institutionId));
            dispatch(fetchEntitiesFromServer(params.institutionId));
            dispatch(getTeachers(params.institutionId));
            this.setState({
              isFetching: false,
            });
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
            dispatch(openNode(params.institutionId));
            dispatch(fetchEntitiesFromServer(params.institutionId));
            dispatch(getTeachers(params.institutionId));
            this.setState({
              isFetching: false,
            });
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
    if (this.state.isFetching) {
      return this.loadingData();
    }

    const { teachers, params, boundaryDetails, dispatch } = this.props;

    console.log(this.props.teachers);

    return (
      <ShowTeachers
        params={params}
        boundaryDetails={boundaryDetails}
        teachers={teachers}
        dispatch={dispatch}
      />
    );
  }
}

Teachers.propTypes = {
  dispatch: PropTypes.func,
  params: PropTypes.object,
};

export default Teachers;

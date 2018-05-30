/*
* Secondary navigation bar for filtering/search etc..
*/
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { SecondaryNavBar } from '../../components/Header';
import { handleSearchText } from '../../actions';

const mapStateToProps = (state) => {
  return {
    suggestionResults: state.header.suggestionResults,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleDistrictModal: () => {
      dispatch({
        type: 'TOGGLE_MODAL',
        modal: 'createDistrict',
      });
    },
    managePrograms: () => {
      dispatch(push('/programmes'));
    },
    manageProgramFilter: () => {
      dispatch(push('/filterprograms'));
    },
    goHome: () => {
      dispatch(push('/dashboard'));
    },
    manageUsers: () => {
      dispatch(push('/users'));
    },
    managePermissions: () => {
      dispatch(push('/permissions'));
    },
    manageRevertEntity: () => {
      dispatch(push('/revert-entity/students'));
    },
    manageReports: () => {
      dispatch(push('/revert-entity/students'));
    },
    onSearch: (query) => {
      dispatch(handleSearchText(query));
    },
    mapAssessments: () => {
      dispatch(push('/mapassessments'));
    },
    handleSubmit: (entities) => {
      const data = entities[0];
      if (data) {
        const url = `/district/${data.boundaryDetails.district}/block/${data.boundaryDetails
          .block}/cluster/${data.boundaryDetails.cluster}/institution/${data.value}`;
        if (data.type === 'institution') {
          dispatch(push(url));
        } else {
          const studentGroupUrl = `/district/${data.boundaryDetails.district}/block/${data
            .boundaryDetails.block}/cluster/${data.boundaryDetails.cluster}/institution/${data
            .boundaryDetails.institution}/studentgroups/${data.boundaryDetails
            .student_group}/students/${data.value}`;
          dispatch(push(studentGroupUrl));
        }
      }
    },
  };
};

const SecondaryNavBarCont = connect(mapStateToProps, mapDispatchToProps)(SecondaryNavBar);

export { SecondaryNavBarCont };

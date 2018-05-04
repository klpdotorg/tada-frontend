import React from 'react';
import PropTypes from 'prop-types';

import {
  Header,
  BoundaryList,
  UserList,
  BoundaryAssessmentList,
  Actions,
} from '../../containers/Permissions';

import { Loading } from '../common';

const PermissionsView = (props) => {
  const { params, loading } = props;

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <Header params={params} />
      <div>
        <div className="row">
          <div className="permissions-cont col-md-8">
            <p className="subheader-text">Assign Permissions</p>
            <hr />
            <div className="row left-view">
              <BoundaryList boundaryId={params.boundaryId} boundaryType={params.boundaryType} />
              <UserList />
            </div>
          </div>
          <BoundaryAssessmentList />
        </div>
        <Actions />
      </div>
    </div>
  );
};

PermissionsView.propTypes = {
  params: PropTypes.object,
  loading: PropTypes.bool,
};

export { PermissionsView };

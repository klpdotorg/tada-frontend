import React from 'react';
import PropTypes from 'prop-types';

import {
  Header,
  BoundaryAssessmentList,
  Actions,
  UserAndBoundaryList,
} from '../../containers/Permissions';

import { Loading } from '../common';

const PermissionsView = (props) => {
  const { boundaryId, boundaryType, loading } = props;

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <Header boundaryId={boundaryId} boundaryType={boundaryType} />
      <div>
        <div className="row">
          <div className="permissions-cont col-md-8">
            <p className="subheader-text">Assign Permissions</p>
            <hr />
            <div className="row left-view">
              <UserAndBoundaryList boundaryId={boundaryId} boundaryType={boundaryType} />
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
  boundaryId: PropTypes.any,
  boundaryType: PropTypes.string,
  loading: PropTypes.bool,
};

export { PermissionsView };

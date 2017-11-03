import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

import { NoPermissionDistrictView } from './index';
import { CreateBlock } from '../../containers/PrimaryBlock';
import { CreateProject } from '../../containers/PreschoolProject';
import { EditDistrict } from '../../containers/PrimaryDistrict';

const PrimaryDistrictView = ({ isLoading, district, districtNodeId }) => {
  if (isLoading || isEmpty(district)) {
    return (
      <div>
        <i className="fa fa-cog fa-spin fa-lg fa-fw" />
        <span className="text-muted">Loading...</span>
      </div>
    );
  }

  return (
    <div>
      <ol className="breadcrumb">
        <li className="active">
          {district.name}
        </li>
      </ol>
      {sessionStorage.getItem('isAdmin')
        ? <EditDistrict districtNodeId={districtNodeId} />
        : <NoPermissionDistrictView name={district.name} />}
      <CreateBlock parent={district.id} parentNodeId={districtNodeId} />
      <CreateProject parent={district.id} parentNodeId={districtNodeId} />
    </div>
  );
};

PrimaryDistrictView.propTypes = {
  isLoading: PropTypes.bool,
  districtNodeId: PropTypes.string,
  district: PropTypes.object,
};

export { PrimaryDistrictView };

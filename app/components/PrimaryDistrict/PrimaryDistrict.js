import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

import { NoPermissionDistrictView } from './index';
import { CreateBlock } from '../../containers/PrimaryBlock';
import { CreateProject } from '../../containers/PreschoolProject';
import { EditDistrict } from '../../containers/PrimaryDistrict';

const PrimaryDistrictView = ({ isLoading, district, districtId }) => {
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
          {name}
        </li>
      </ol>
      {sessionStorage.getItem('isAdmin')
        ? <EditDistrict districtId={districtId} />
        : <NoPermissionDistrictView name={district.name} />}
      <CreateBlock parent={districtId} />
      <CreateProject parent={districtId} />
    </div>
  );
};

PrimaryDistrictView.propTypes = {
  isLoading: PropTypes.bool,
  districtId: PropTypes.string,
  district: PropTypes.object,
};

export { PrimaryDistrictView };

import React from 'react';
import PropTypes from 'prop-types';
import { NoPermissionDistrictView } from './index';
import { CreateBlock } from '../../containers/PrimaryBlock';
import { CreateProject } from '../../containers/PreschoolProject';
import { EditDistrict } from '../../containers/PrimaryDistrict';

const PrimaryDistrictView = ({ name, districtId }) =>
  <div>
    <ol className="breadcrumb">
      <li className="active">
        {name}
      </li>
    </ol>
    {sessionStorage.getItem('isAdmin')
      ? <EditDistrict districtId={districtId} />
      : <NoPermissionDistrictView name={name} />}
    <CreateBlock parent={districtId} />
    <CreateProject parent={districtId} />
  </div>;

PrimaryDistrictView.propTypes = {
  name: PropTypes.string,
  districtId: PropTypes.string,
};

export { PrimaryDistrictView };

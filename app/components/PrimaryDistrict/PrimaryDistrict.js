import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash.isempty';

import { Loading } from '../common';
import { Spinner } from '../../containers/common';
import { CreateBlock } from '../../containers/PrimaryBlock';
import { CreateProject } from '../../containers/PreschoolProject';
import { EditDistrict } from '../../containers/PrimaryDistrict';

const PrimaryDistrictView = ({ isLoading, district, districtNodeId }) => {
  if (isLoading || isEmpty(district)) {
    return <Loading />;
  }

  return (
    <div>
      <Spinner />
      <ol className="breadcrumb">
        <li className="active">{district.name}</li>
      </ol>
      <EditDistrict districtNodeId={districtNodeId} />
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

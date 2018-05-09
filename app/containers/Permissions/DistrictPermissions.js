import { connect } from 'react-redux';
import { isEmpty, get } from 'lodash';

import { PermissionsView } from '../../components/Permissions';

const mapStateToProps = (state, ownProps) => {
  const { districtId } = ownProps.params;
  const { boundariesByParentId } = state.boundaries;
  const boundaries = get(boundariesByParentId, 0, []);

  return {
    loading: isEmpty(boundaries),
    boundaryType: 'district',
    boundaryId: districtId,
  };
};

const DistrictPermissions = connect(mapStateToProps)(PermissionsView);

export { DistrictPermissions };

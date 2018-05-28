import { connect } from 'react-redux';
import isEmpty from 'lodash.isempty';
import get from 'lodash.get';

// import { PermissionsView } from '../../components/Permissions';

const mapStateToProps = (state, ownProps) => {
  const { boundaryType } = ownProps.params;
  const { boundariesByParentId } = state.boundaries;
  const depth = boundaryType === 'district' ? 1 : 2;
  const boundaries = get(boundariesByParentId, depth - 1, []);

  return {
    loading: isEmpty(boundaries),
  };
};

const Permissions = connect(mapStateToProps)(PermissionsView);

export { Permissions };

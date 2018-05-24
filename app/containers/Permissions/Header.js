import { connect } from 'react-redux';
import get from 'lodash.get';

import { HeaderView } from '../../components/Permissions';

const mapStateToProps = (state, ownProps) => {
  const { boundaryId, boundaryType } = ownProps;
  const { boundaryDetails, uncollapsedEntities } = state.boundaries;
  const boundary = get(boundaryDetails, boundaryId, {});

  if (boundaryType === 'district') {
    return {
      path: [boundary.name],
    };
  }

  const district = get(boundaryDetails, uncollapsedEntities[1], {});

  return {
    path: [district.name, boundary.name],
  };
};

const Header = connect(mapStateToProps)(HeaderView);

export { Header };

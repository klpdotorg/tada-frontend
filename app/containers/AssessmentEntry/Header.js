import { connect } from 'react-redux';
import get from 'lodash.get';

import { HeaderView } from '../../components/AssessmentEntry';

const mapStateToProps = (state, ownProps) => {
  const entityIds = ownProps.entityIds.filter((id) => {
    return id !== undefined;
  });
  const names = entityIds.map((id) => {
    return get(state.programDetails.programDetails, [id, 'name'], '');
  });

  return {
    names,
  };
};

const Header = connect(mapStateToProps)(HeaderView);

export { Header };

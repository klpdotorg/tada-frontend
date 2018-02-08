import React from 'react';
import PropTypes from 'prop-types';
import { RevertEntityTabs, ShowSelectedEntity } from './index';

const RevertEntity = ({ params, dispatch }) => {
  return (
    <div>
      <RevertEntityTabs activeTab={params.entityName} />
      <ShowSelectedEntity selectedEntity={params.entityName} dispatch={dispatch} />
    </div>
  );
};

RevertEntity.propTypes = {
  params: PropTypes.object,
  dispatch: PropTypes.object,
};

export { RevertEntity };

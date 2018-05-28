import React from 'react';
import PropTypes from 'prop-types';
import Entity from './Entity';

const ShowSelectedEntity = ({ selectedEntity, dispatch }) => {
  return <Entity dispatch={dispatch} entityName={selectedEntity} />;
};

ShowSelectedEntity.propTypes = {
  selectedEntity: PropTypes.string,
  dispatch: PropTypes.func,
};

export { ShowSelectedEntity };

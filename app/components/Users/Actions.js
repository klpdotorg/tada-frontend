import React from 'react';
import PropTypes from 'prop-types';

const ActionsView = (props) => {
  return (
    <div className="content-rigth users-actions">
      <button className="btn btn-primary delete-users-button" onClick={props.deleteUsers}>
        Delete
      </button>
      <button className="btn btn-primary">Deactivate</button>
    </div>
  );
};

ActionsView.propTypes = {
  deleteUsers: PropTypes.func,
};

export { ActionsView };

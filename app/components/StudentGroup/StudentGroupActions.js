import React from 'react';
import PropTypes from 'prop-types';

const StudentGroupActions = ({ isPrimary, hasPermissions, viewStudent, showBulkAdd }) => {
  if (isPrimary) {
    return (
      <div className="col-md-4 pull-right">
        <button
          className="btn btn-orange"
          onClick={showBulkAdd}
          title="Add Students"
          disabled={!hasPermissions}
        >
          Add Students
        </button>
        <button className="btn btn-orange padded-btn" onClick={viewStudent}>
          View Students
        </button>
      </div>
    );
  }

  return (
    <div className="col-md-4 pull-right">
      <button
        className="btn btn-green"
        onClick={showBulkAdd}
        title="Add Students"
        disabled={!hasPermissions}
      >
        Add Students
      </button>
      <button className="btn btn-green padded-btn" onClick={viewStudent}>
        View Students
      </button>
    </div>
  );
};

StudentGroupActions.propTypes = {
  isPrimary: PropTypes.bool,
  hasPermissions: PropTypes.bool,
  viewStudent: PropTypes.func,
  showBulkAdd: PropTypes.func,
};

export { StudentGroupActions };

import React from 'react';
import PropTypes from 'prop-types';

const ShowClassesView = (props) => {
  return (
    <div className="row center-block">
      <div className="col-md-12">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h4 className="panel-title">Select Classes</h4>
          </div>
          <div className="panel-body">
            <RenderClasses {...props} />
          </div>
        </div>
      </div>
    </div>
  );
};

const RenderClasses = (props) => {
  const { classes, selectedClasses } = props;

  // TODO add loading for classes

  if (!classes.length) {
    return <span>No Classes</span>;
  }

  return (
    <ul className="list-group" style={{ maxHeight: 100, overflowY: 'auto' }}>
      {classes.map((value) => {
        const checked = selectedClasses.includes(value.id);

        return (
          <li key={value.id} className="ma-student-group">
            <span className="ma-student-group-name">{value.name}</span>
            <div className="pull-right">
              <input
                type="checkbox"
                aria-label="..."
                checked={checked}
                onChange={(status) => {
                  props.selectClass(value.id, status);
                }}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
};

RenderClasses.propTypes = {
  classes: PropTypes.array,
  selectedClasses: PropTypes.array,
  selectClass: PropTypes.func,
};

export { ShowClassesView };

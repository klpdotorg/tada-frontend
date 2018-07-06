import React from 'react';
import PropTypes from 'prop-types';

const HeaderView = (props) => {
  const { names } = props;

  return (
    <div className="filterByProgram-header">
      <ol className="breadcrumb filterByProgram-path">
        {names.map((name, i) => {
          if (names.length - 1 === i) {
            return (
              <li className="active" key={i}>
                {name}
              </li>
            );
          }
          return <li key={i}>{name}</li>;
        })}
      </ol>
      <button
        disabled={props.disabled}
        onClick={() => {
          props.addRow();
        }}
        className="btn btn-primary"
        style={{ float: 'right', marginBottom: 20 }}
      >
        Add Row
      </button>
    </div>
  );
};

HeaderView.propTypes = {
  disabled: PropTypes.bool,
  addRow: PropTypes.func,
  names: PropTypes.array,
};

export { HeaderView };

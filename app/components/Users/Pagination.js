import React from 'react';
import PropTypes from 'prop-types';
import map from 'lodash.map';

import { generatePagination } from '../../utils';

const PaginationView = (props) => {
  const { count, current } = props;
  const numbers = Math.ceil(count / 10);
  const values = generatePagination(current, numbers, 4);

  return (
    <nav aria-label="Page navigation" className="user-pagination">
      <ul className="pagination">
        <li>
          <a aria-label="Previous" onClick={props.goBack}>
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        {map(values, (number, i) => {
          if (number === '...') {
            return (
              <li key={i}>
                <a href="#">{number}</a>
              </li>
            );
          }

          if (number === current) {
            return (
              <li
                key={i}
                className="active"
                onClick={() => {
                  props.change(Number(number));
                }}
              >
                <span>{number}</span>
              </li>
            );
          }

          return (
            <li
              key={i}
              onClick={() => {
                props.change(Number(number));
              }}
            >
              <span>{number}</span>
            </li>
          );
        })}
        <li>
          <a aria-label="Next" onClick={props.goForward}>
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

PaginationView.propTypes = {
  count: PropTypes.number,
  current: PropTypes.number,
  goForward: PropTypes.func,
  goBack: PropTypes.func,
};

export { PaginationView };

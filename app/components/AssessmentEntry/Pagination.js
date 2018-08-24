import React from 'react';
import PropTypes from 'prop-types';

import { generatePagination } from '../../utils';

const PaginationView = (props) => {
  const { count, current, params } = props;
  const numbers = Math.ceil(count / 10);
  const values = generatePagination(current, numbers, 4);

  return (
    <nav
      aria-label="Page navigation"
      className="answer-pagination"
      style={{ top: window.innerHeight - 250 }}
    >
      <ul className="pagination">
        <li className={current <= 1 ? 'disabled' : ''}>
          <a
            aria-label="Previous"
            onClick={() => {
              props.goBack(params);
            }}
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        {values.map((number, i) => {
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
                  props.change(Number(number), params);
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
                props.change(Number(number), params);
              }}
            >
              <span>{number}</span>
            </li>
          );
        })}
        <li className={current >= numbers ? 'disabled' : ''}>
          <a
            aria-label="Next"
            onClick={() => {
              props.goForward(params);
            }}
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

PaginationView.propTypes = {
  count: PropTypes.number,
  params: PropTypes.object,
  current: PropTypes.number,
  goForward: PropTypes.func,
  goBack: PropTypes.func,
};

export { PaginationView };

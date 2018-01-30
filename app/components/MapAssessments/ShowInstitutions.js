import React from 'react';
import PropTypes from 'prop-types';
import { capitalize, includes } from 'lodash';

const ShowInstitutionsView = (props) => {
  const { institutions, selectedInstitutions, selectedAllInstitutions } = props;

  // TODO add loading in institutions

  return (
    <div className="panel panel-primary">
      <div className="panel-heading ma-boundary-heading">
        <span className="ma-boundary-selectAll">
          All{' '}
          <input
            type="checkbox"
            className="ma-boundary-checkbox"
            checked={selectedAllInstitutions}
            onChange={props.selectAllInstitutions}
          />
        </span>
      </div>
      <ul className="list-group" style={{ overflowY: 'auto', maxHeight: 500 }}>
        {institutions.map((institution) => {
          const checked = includes(selectedInstitutions, institution.id);

          return (
            <li className="list-group-item" key={institution.id}>
              <div className="pull-left">{institution.id}</div>
              <span className="margin-left">{capitalize(institution.name)}</span>
              <div className="pull-right">
                <input
                  type="checkbox"
                  aria-label="..."
                  checked={checked}
                  onChange={() => {
                    props.selectInstitution(institution.id);
                  }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

ShowInstitutionsView.propTypes = {
  selectInstitution: PropTypes.func,
  selectedAllInstitutions: PropTypes.bool,
  selectedInstitutions: PropTypes.selectedInstitutions,
  institutions: PropTypes.institutions,
  selectAllInstitutions: PropTypes.func,
};

export { ShowInstitutionsView };

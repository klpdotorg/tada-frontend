import React from 'react';
import PropTypes from 'prop-types';
import { capitalize, includes, isEqual } from 'lodash';

import { Loading } from '../common';

const ShowInstitutionsView = (props) => {
  const { institutions, selectedInstitutions, loading } = props;
  const Ids = institutions.map((institution) => {
    return institution.value.id;
  });

  const selectedAllInstitutions = isEqual(Ids, selectedInstitutions);

  return (
    <div className="panel panel-primary">
      <div className="panel-heading ma-boundary-heading">
        <span className="ma-boundary-selectAll">
          All{' '}
          <input
            type="checkbox"
            className="ma-boundary-checkbox"
            checked={selectedAllInstitutions}
            onChange={() => {
              props.selectAllInstitutions(Ids);
            }}
          />
        </span>
      </div>
      {loading ? (
        <div className="base-spacing" style={{ paddingLeft: 10 }}>
          <Loading />
        </div>
      ) : (
        <ul className="list-group" style={{ overflowY: 'auto', maxHeight: 500 }}>
          {institutions.map((institution) => {
            const checked = includes(selectedInstitutions, institution.value.id);

            return (
              <li className="list-group-item" key={institution.uniqueId}>
                <div className="pull-left">{institution.value.id}</div>
                <span className="margin-left">{capitalize(institution.value.name)}</span>
                <div className="pull-right">
                  <input
                    type="checkbox"
                    aria-label="..."
                    checked={checked}
                    onChange={() => {
                      props.selectInstitution({
                        id: institution.value.id,
                      });
                    }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

ShowInstitutionsView.propTypes = {
  selectInstitution: PropTypes.func,
  selectedAllInstitutions: PropTypes.bool,
  selectedInstitutions: PropTypes.array,
  institutions: PropTypes.array,
  selectAllInstitutions: PropTypes.func,
  loading: PropTypes.bool,
};

export { ShowInstitutionsView };

import React from 'react';
import * as action from '../../actions';
import { capitalize, includes } from 'lodash';

export default class ShowInstitutions extends React.Component {
  selectInstitution = (id, checked) => {
    if (e.target.checked) {
      this.props.dispatch(action.selectMAInstitution(id));
    } else {
      this.props.dispatch(action.unselectMAInstitution(id));
    }
  };

  selectAllInstitutions = e => {
    if (e.target.checked) {
      this.props.dispatch(action.selectAllMAInstitutions());
    } else {
      this.props.dispatch(action.unselectAllMAInstitutions());
    }
  };

  render() {
    const {
      institutions,
      selectedInstitutions,
      fetchingInstitutions,
      selectAllInstitutions,
    } = this.props;

    const institutionList = institutions.map((institution, i) => {
      const checked = includes(selectedInstitutions, institution.id);

      return (
        <li className="list-group-item" key={i}>
          <div className="pull-left">
            {institution.id}
          </div>
          <span className="margin-left">{capitalize(institution.name)}</span>
          <div className="pull-right">
            <input
              type="checkbox"
              aria-label="..."
              checked={checked}
              onChange={this.selectInstitution.bind(null, institution.id)}
            />
          </div>
        </li>
      );
    });

    return (
      <div className="row center-block">
        <div className="col-md-12">
          <div className="panel panel-primary">
            <div className="panel-heading ma-boundary-heading">
              <span className="ma-boundary-selectAll">
                All
                {' '}<input
                  type="checkbox"
                  className="ma-boundary-checkbox"
                  checked={selectAllInstitutions}
                  onChange={this.selectAllInstitutions}
                />
              </span>
            </div>
            {fetchingInstitutions
              ? <div className="panel-body">
                  <i className="fa fa-cog fa-spin fa-lg fa-fw" />
                  <span className="text-muted">Loading...</span>
                </div>
              : <ul className="list-group" style={{ overflowY: 'auto', maxHeight: 500 }}>
                  {institutionList}
                </ul>}
          </div>
        </div>
      </div>
    );
  }
}

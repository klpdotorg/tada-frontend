import React, { Component } from 'react';
import * as action from '../../actions';
import PropTypes from 'prop-types';
import { includes } from 'lodash';

class ShowClasses extends Component {
  selectClass(id, checked) {
    if (checked) {
      this.props.dispatch(action.selectMAStudentGroup(id));
    } else {
      this.props.dispatch(action.unselectMAStudentGroup(id));
    }
  }

  renderClasses() {
    const { classes, selectedClasses } = this.props;

    if (!classes.length) {
      return <span>No Classes</span>;
    }

    return this.props.classes.map((studentGroup, i) => {
      const checked = includes(selectedClasses, studentGroup.id);

      return (
        <li key={i} className="ma-student-group">
          <span className="ma-student-group-name">
            {studentGroup.name}
          </span>
          <div className="pull-right">
            <input
              type="checkbox"
              aria-label="..."
              checked={checked}
              onChange={status => this.selectClass(studentGroup.id, status)}
            />
          </div>
        </li>
      );
    });
  }

  render() {
    const { fetchingStudentGroups } = this.props;

    return (
      <div className="row center-block">
        <div className="col-md-12">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h4 className="panel-title">Select Classes</h4>
            </div>
            {fetchingStudentGroups
              ? <div className="panel-body">
                  <i className="fa fa-cog fa-spin fa-lg fa-fw" />
                  <span className="text-muted">Loading...</span>
                </div>
              : <div />}
            <div className="panel-body">
              <ul className="list-group" style={{ maxHeight: 100, overflowY: 'auto' }}>
                {this.renderClasses()}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ShowClasses.propTypes = {
  classes: PropTypes.array,
  fetchingStudentGroups: PropTypes.bool,
  dispatch: PropTypes.func,
  selectedClasses: PropTypes.array,
};

export default ShowClasses;

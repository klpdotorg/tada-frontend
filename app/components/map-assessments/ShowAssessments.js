import React from 'react';
import * as action from '../../actions';
import { isEmpty, includes, filter } from 'lodash';

export default class ShowAssessments extends React.Component {
  componentDidMount = () => {
    if (isEmpty(this.props.programId)) {
      this.fetchAssessments(this.props.programId);
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.programId != this.props.programId) {
      if (nextProps.programId) {
        this.fetchAssessments(nextProps.programId);
      }
    }
  }

  selectAssessment = (id, checked) => {
    console.log(checked, id);
    if (checked) {
      this.props.dispatch(action.selectMAAssessment(id));
    } else {
      this.props.dispatch(action.unselectMAAssessment(id));
    }
  };

  fetchAssessments(programId) {
    const { dispatch } = this.props;

    dispatch(action.fetchAssessmentsForProgram(programId));
  }

  filterAssessments() {
    const { programId, assessments } = this.props;

    return filter(assessments, assessment => {
      return programId == assessment.programme;
    });
  }

  render() {
    const { fetchingAssessments, selectedAssessments } = this.props;

    const assessments = this.filterAssessments();
    const assessmentList = assessments.map((assessment, i) => {
      const checked = includes(selectedAssessments, assessment.id);

      return (
        <li className="list-group-item" key={i}>
          {assessment.name}
          <div className="pull-right">
            <input
              type="checkbox"
              aria-label="..."
              checked={checked}
              onChange={e => this.selectAssessment(assessment.id, e.target.checked)}
            />
          </div>
        </li>
      );
    });

    return (
      <div className="row center-block">
        <div className="col-md-12">
          <div className="panel panel-primary">
            <div className="panel-heading">
              <h3 className="panel-title">Assessments</h3>
            </div>
            {fetchingAssessments
              ? <div className="panel-body">
                  <i className="fa fa-cog fa-spin fa-lg fa-fw" />
                  <span className="text-muted">Loading...</span>
                </div>
              : <div />}
            <ul className="list-group" style={{ maxHeight: 200, overflowY: 'auto' }}>
              {assessmentList}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

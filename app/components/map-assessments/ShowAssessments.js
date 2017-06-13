import React from 'react';
import * as action from '../../actions';
import _ from 'lodash';

export default class ShowAssessments extends React.Component {
  componentDidMount = () => {
    if (!_.isEmpty(this.props.programId)) {
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

  fetchAssessments(programId) {
    const { dispatch } = this.props;

    dispatch(action.fetchAssessmentsForProgram(programId));
  }

  filterAssessments() {
    const { programId, assessments } = this.props;

    return _.filter(assessments, assessment => {
      return programId == assessment.programme;
    });
  }

  render() {
    const { fetchingAssessments } = this.props;

    const assessments = this.filterAssessments();
    const assessmentList = assessments.map((assessment, i) => {
      return (
        <li className="list-group-item" key={i}>
          {assessment.name}
          <div className="pull-right">
            <input type="checkbox" aria-label="..." />
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

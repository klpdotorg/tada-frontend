import React, { Component } from 'react';
import * as action from '../actions';
import { connect } from 'react-redux';
import _ from 'lodash';
import { getProgramsBySchoolType } from '../selectors';

export default class MapAssessments extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      selectedProgram: '',
      selectedAssessment: '',
    };
    this.selectProgram = this.selectProgram.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(action.fetchAllPrograms()).then(() => {
      let value = _.get(_.values(this.props.programs.programsById), '[0].id', '');
      this.selectProgram(value);
      this.setState({
        isLoading: false,
      });
    });
  }

  selectProgram(value) {
    this.setState(
      {
        selectedProgram: value,
      },
      () => {
        this.props
          .dispatch(action.fetchAssessmentsForProgram(this.state.selectedProgram))
          .then(() => {
            let assessment = _.get(_.values(this.props.assessmentsById), '[0].id', '');
            this.setState({
              selectedAssessment: assessment,
            });
          });
      },
    );
  }

  selectAssessment = value => {
    this.setState({
      selectedAssessment: value,
    });
  };

  render() {
    const programs = this.props.programs.programsById;
    const programsList = Object.values(programs).map((program, i) => {
      return <option key={program.id} value={program.id}>{program.name}</option>;
    });

    const assessmentList = _.filter(this.props.assessmentsById, (value, key) => {
      return value.programme == this.state.selectedProgram;
    }).map(assessment => {
      return <option key={assessment.id} value={assessment.id}>{assessment.name}</option>;
    });
    const loadingAssessments = this.props.assessmentsFetching;

    return this.state.isLoading
      ? <div>Loading...</div>
      : <div className="container">
          <div className="row">
            <div className="col-md-8">COL-MD-8</div>
            <div className="col-md-4">
              <div className="col-md-12">
                Select Programme:
                <select
                  value={this.state.selectedProgram}
                  onChange={e => {
                    this.selectProgram(e.target.value);
                  }}
                >
                  {programsList}
                </select>
              </div>
              <div className="col-md-12">
                Select Assessment Type:
                <br />
                {loadingAssessments
                  ? <p>Loading...</p>
                  : <select
                      value={this.state.selectedAssessment}
                      onChange={e => {
                        this.selectAssessment(e.target.value);
                      }}
                    >
                      {assessmentList}
                    </select>}
              </div>
              <div className="col-md-12">
                <input type="checkbox" id="1" name="1" value="1" />
                <label htmlFor="1">1</label>

              </div>
            </div>
          </div>
        </div>;
  }
}

import React from 'react';
import * as action from '../../actions';
import _ from 'lodash';

export default class ShowPrograms extends React.Component {
  componentDidMount() {
    this.fetchPrograms();
  }

  fetchPrograms = () => {
    this.props.dispatch(action.fetchAllPrograms()).then(() => {
      let value = _.get(this.filterProgramBySchool(), '[0].id', '');
      this.selectProgram(value);
    });
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.primarySelected != this.props.primarySelected) {
      console.log('getIt');
      this.fetchPrograms();
    }
  };

  filterProgramBySchool = () => {
    let { primarySelected, programs } = this.props;

    let result = _.filter(programs, program => {
      return (
        (primarySelected && program.programme_institution_category === 1) ||
        (!primarySelected && program.programme_institution_category === 2)
      );
    });

    return result;
  };

  changeProgram = e => {
    this.selectProgram(e.target.value);
  };

  selectProgram = value => {
    this.props.dispatch(action.setProgramInMA(value));
  };

  render() {
    const { value } = this.props;

    const programs = this.filterProgramBySchool();
    const programList = programs.map((program, i) => {
      return <option key={program.id} value={program.id}>{program.name}</option>;
    });

    return (
      <div className="row center-block margin-bottom">
        <div className="col-md-12">
          <p className="text-default" htmlFor="selectProgram">Select Programme: </p>
          <select
            className="form-control"
            id="selectProgram"
            onChange={this.changeProgram}
            value={value}
          >
            {programList}
          </select>
        </div>
      </div>
    );
  }
}

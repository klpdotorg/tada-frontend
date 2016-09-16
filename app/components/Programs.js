import React from 'react';
import { fetchProgramsInstitution } from '../actions/';

export default class Programs extends React.Component {


	componentWillMount(){
		console.log("Fetching programs");
		this.props.dispatch(fetchProgramsInstitution());
	}

	render() {
		var programs = Object.values(this.props.programsByInstitutionId).map((program,i) => {
			return (<option key={program.id}>{program.name}</option>);
		});
		return (
			<div className="form-inline">
				<div className="col-md-2">
					<input type="radio" name="Institutions" id="institution" value="Yes" checked="checked"/>
					Institution
				</div>
				<div className="col-md-2">
					<input type="radio" name="student" id="institution" value="No"/>
					Students
				</div>
				<div className="col-md-6 pull-right">
	  				<label>Programs:</label>
					  <select className="form-control" id="sel1">
					    {programs}
					  </select>
				</div>
				</div>

		);
	}
}

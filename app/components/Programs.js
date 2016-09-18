import React from 'react';
import { fetchProgramsInstitution } from '../actions/';

export default class Programs extends React.Component {


	componentWillMount(){
		console.log("Fetching programs");
		this.props.dispatch(fetchProgramsInstitution());
	}

	render() {
		var defaultProgramName = "";
		var programs = Object.values(this.props.programsByInstitutionId).map((program,i) => {
			return (<option key={program.id}>{program.name}</option>);
		});
		if(Object.keys(this.props.programsByInstitutionId).length >0)
		{
			var defaultProgram = Object.values(this.props.programsByInstitutionId)[0];
			defaultProgramName=defaultProgram.name;
			console.log(defaultProgram);
		}
		return (
			<div>
				<div className="form-inline">
					<div className="col-md-2">
						<input type="radio" name="Institutions" id="institution" value="Yes" checked="checked"/>
						Institution
					</div>
					<div className="col-md-2">
						<input type="radio" name="student" id="institution" value="No"/>
						Students
					</div>
					<div className="col-md-4">
		  				<label>Programs:</label>
						  <select className="form-control" id="sel1">
						    {programs}
						  </select>
					</div>
					<div className="col-md-2">
						<button type="button" className="btn brand-orange-bg">Add Program</button>
					</div>
					<div className="col-md-2">
						<button type="button" className="btn brand-orange-bg">Add Assessments</button>
					</div>
					
				</div>
					<div className="row">
						<div className="col-md-6 center-block">
							<h4 className="brand-blue"> Program Details</h4>	
						</div>
						<button type="button" className="col-sm-2 btn btn-info navbar-btn brand-blue-bg all-padded-btn"><span className="fa fa-pencil-square-o"></span>Edit</button>
						<button type="button" className="col-sm-2 btn btn-info navbar-btn brand-blue-bg all-padded-btn"><span className="fa fa-trash-o"></span>Delete</button>
					</div>

					<div className="row">	
						<label className="col-md-4">Program name: {defaultProgramName} </label>
						<label className="col-md-4">Start Date: </label>
					</div>
					<div className="row">
						<label className="col-md-4">Partner name: </label>
						<label className="col-md-4">End Date: </label>
					</div>

					<h4 className="brand-blue text-center"> Assessments in this Programme</h4>	

				
			</div>
		);
	}
}

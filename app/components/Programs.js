import React from 'react';
import { fetchProgramsInstitution, fetchProgramsStudent } from '../actions/';

export default class Programs extends React.Component {

	constructor(props)
	{
		super(props);
		this.state = {
			programTypeSelected:"institution",
		}
		this.handleOnClick = this.handleOnClick.bind(this);
		this.handleProgramSel = this.handleProgramTypeSelector.bind(this);
		console.log("State is -- ", this.state);
	}

	componentWillMount(){
		console.log("Fetching programs");
		this.props.dispatch(fetchProgramsInstitution());
	}

	componentWillReceiveProps(nextProps)
	{
		console.log("Component will receive props", nextProps);
		console.log("State is -- ", this.state);
		
		
	}	

	handleOnClick(e)
	{
		console.log("handling on click");
		console.log("Selected value is: " ,this.selProgram.value);
	}

	handleProgramTypeSelector(e)
	{
		console.log("handling program type selector");
		console.log("Institution selected:", this.institutionSel.checked);
		console.log("Student selected:", this.studentSel.checked);
		console.log(e.target.value);

		this.setState({
			programTypeSelected: e.target.value
		});

		if(e.target.value == "institution")
		{
			this.props.dispatch(fetchProgramsInstitution());

		}
		else
		{
			this.props.dispatch(fetchProgramsStudent());

		}
	}

	render() {

		var defaultProgramName = "";
		var programs;
		if(this.state.programTypeSelected == "institution")
		{
			programs = this.props.programsByInstitutionId;
		}
		else
		{
			programs = this.props.programsByStudentId;
		}
		var programsList= Object.values(programs).map((program,i) => {
			return (<option key={program.id}>{program.name}</option>);
		});
		if(Object.keys(programs).length >0)
		{
			var defaultProgram = Object.values(programs)[0];
			defaultProgramName=defaultProgram.name;
			console.log(defaultProgram);
		}
		return (
			<div>
				<div className="row center-block">
					<div className="col-md-2 form-group">
						<input type="radio" ref={(ref) => this.institutionSel = ref} checked={this.state.programTypeSelected == "institution"} name="programstypesel" id="institution" value="institution" onChange={this.handleProgramSel}/>
						Institution
					</div>
					<div className="col-md-2 form-group">
						<input type="radio" ref={(ref) => this.studentSel = ref} checked={this.state.programTypeSelected == "student"} name="programstypesel" id="institution" value="student" onChange={this.handleProgramSel}/>
						Students
					</div>
					<div className="col-md-4 form-inline">
		  				<label htmlFor="sel1">Programs:</label>
						  <select ref={(ref) => this.selProgram = ref} className="form-control"  id="sel1" onChange={this.handleOnClick}>
						    {programsList}
						  </select>
					</div>
					<div className=" col-md-4 form-group">
						<button type="button" className="btn brand-orange-bg all-padded-btn">Add Program</button>
						<button type="button" className="btn brand-orange-bg all-padded-btn">Add Assessments</button>
					</div>
					
						
					
					
				</div>
				<div className="grey-mist-bg">
					<div className="row center-block">
						<div className="col-md-6 pull-left">
							<h4>Program Details</h4>
							<hr/>
						</div>
						<div className="col-md-6 pull-right">
						<button type="button" className="col-sm-2 btn btn-info navbar-btn brand-blue-bg all-padded-btn"><span className="fa fa-pencil-square-o"></span>Edit</button>
						<button type="button" className="col-sm-2 btn btn-info navbar-btn brand-blue-bg all-padded-btn"><span className="fa fa-trash-o"></span>Delete</button>
						</div>
					</div>

					<div className="row">	
						<label className="col-md-4">Program name: {defaultProgramName} </label>
						<label className="col-md-4">Start Date: </label>
					</div>
					<div className="row">
						<label className="col-md-4">Partner name: </label>
						<label className="col-md-4">End Date: </label>
					</div>
				</div>
				<br/>
				<div>
					<h4 className="brand-blue text-center"> Assessments in this Programme</h4>	
				</div>
				
			</div>
		);
	}
}

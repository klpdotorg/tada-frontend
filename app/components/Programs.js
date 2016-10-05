import React from 'react';
import * as actions from '../actions/';

export default class Programs extends React.Component {

	constructor(props)
	{
		super(props);
		this.state = {
			currentProgramType:"institution",
			selectedProgram: {},
		}
		this.handleProgramSelection = this.handleProgramSelection.bind(this);
		this.handleProgramTypeSel = this.handleProgramTypeSelector.bind(this);
		console.log("State is -- ", this.state);
	}

	componentWillMount(){
		console.log("Fetching programs");
		this.props.dispatch(actions.fetchProgramsInstitution());
	}

	componentWillReceiveProps(nextProps)
	{
		console.log("Component will receive props", nextProps);
		
		
		
	}	

/*
	This needs to trigger fetching asessments for that program/type combo
*/
	handleProgramSelection(e)
	{
		console.log("Selected value is: " ,this.selProgram.value);
		if(this.state.currentProgramType == "institution")
		{
			this.props.dispatch(actions.fetchAssessmentsForInstitutionPrograms(this.selProgram.value));
		}
		else
		{
			this.props.dispatch(actions.fetchAssessmentsForStudentPrograms(this.selProgram.value));
		}
		this.setState({
			selectedProgram: this.selProgram.value
		});

	}

	handleProgramTypeSelector(e)
	{
		console.log("handling program type selector");
		console.log("Institution selected:", this.institutionSel.checked);
		console.log("Student selected:", this.studentSel.checked);
		console.log(e.target.value);

		this.setState({
			currentProgramType: e.target.value
		});

		//Subha: Not sure this is "done" like this. Before the state is finalized, is it okay
		//to act on it? Else, I get into an infinite loop in componentWillReceiveProps
		if(e.target.value == "institution")
		{
			this.props.dispatch(actions.fetchProgramsInstitution());

		}
		else
		{
			this.props.dispatch(actions.fetchProgramsStudent());

		}
	}

	render() {
		var selectedProgram;
		var selectedProgramName = "";
		var programs, assessments;
		var startDate;
		var endDate;
		if(this.state.currentProgramType == "institution")
		{
			programs = this.props.programsByInstitutionId;
			assessments = this.props.institutionAssessmentsByProgramId;
		}
		else
		{
			programs = this.props.programsByStudentId;
			assessments = this.props.studentAssessmentsByProgramId;
		}
		var programsList= Object.values(programs).map((program,i) => {
			return (<option key={program.id} value={program.id}>{program.name}</option>);
		});
		var assessmentsList = Object.values(assessments).map((assessment,i)=>{
			return(
				<tr>
					<td>{assessment.name}</td>
					<td></td>
					<td>{assessment.start_date}</td>
					<td>{assessment.end_date}</td>
					<td></td>
					<td>{assessment.double_entry}</td>
					<td>{assessment.flexi_assessment}</td>
					<td>{assessment.active}</td>
				</tr>
			);
		});
		
		if(Object.keys(programs).length >0 && jQuery.isEmptyObject(this.state.selectedProgram))
		{
			selectedProgram = Object.values(programs)[0];
			
		}
		else
		{
			selectedProgram = programs[this.state.selectedProgram];

		}
		if(!jQuery.isEmptyObject(selectedProgram))
		{
			selectedProgramName=selectedProgram.name;
			startDate = selectedProgram.start_date;
			endDate = selectedProgram.end_date;
		}
		return (
			<div>
				<div className="row center-block">
					<div className="col-md-2 form-inline">
						<input type="radio" className="form-control" ref={(ref) => this.institutionSel = ref} checked={this.state.currentProgramType == "institution"} name="programstypesel" id="institution" value="institution" onChange={this.handleProgramTypeSel}/>
						Institution
					</div>
					<div className="col-md-2 form-inline">
						<input type="radio" className="form-control" ref={(ref) => this.studentSel = ref} checked={this.state.currentProgramType == "student"} name="programstypesel" id="institution" value="student" onChange={this.handleProgramTypeSel}/>
						Students
					</div>
					<div className="col-md-4 form-inline">
		  				<label htmlFor="sel1">Programs:</label>
						  <select ref={(ref) => this.selProgram = ref} className="form-control"  id="sel1" onChange={this.handleProgramSelection}>
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
						<label className="col-md-4">Program name: {selectedProgramName} </label>
						<label className="col-md-4">Start Date: {startDate}</label>
					</div>
					<div className="row">
						<label className="col-md-4">Partner name: </label>
						<label className="col-md-4">End Date: {endDate}</label>
					</div>
				</div>
				<br/>
				<div>
					<h4 className="brand-blue text-center"> Assessments in this Programme</h4>	
				</div>
				<div>
					<table className="table table-bordered table-striped">
					<tbody>
						<tr className="info">
							<th>Assessment</th>
							<th>Class</th>
							<th>Start Date</th>
							<th>End Date</th>
							<th>Type</th>
							<th>Double Entry</th>
							<th>Flexi-type</th>
							<th>Status</th>
							<th>Select</th>
							<th>Edit</th>
							<th>Questions</th>
						</tr>
						{assessmentsList}
					</tbody>
					</table>
				</div>
				
			</div>
		);
	}
}

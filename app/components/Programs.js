import React from 'react';
import * as actions from '../actions/';

export default class Programs extends React.Component {

	constructor(props)
	{
		super(props);
		this.state = {
			selectedProgram: {},
		}
		this.handleProgramSelection = this.handleProgramSelection.bind(this);
		console.log("State is -- ", this.state);
	}

	componentWillMount(){
		console.log("Fetching programs");
		this.props.dispatch(actions.fetchAllPrograms());
	}

	/*
	Setting state here will NOT trigger another render
	*/
	componentWillReceiveProps(nextProps)
	{
		const programs = nextProps.programsById;
		if(!this.programsById && Object.keys(programs).length >0 && jQuery.isEmptyObject(this.state.selectedProgram))
		{
			console.log("receiving programs for the first time");
			const selectProgram = Object.values(programs)[0];	
			this.setState({
				selectedProgram: selectProgram.id
			});
		}


	}	

	componentDidUpdate(nextProps, nextState)
	{
		console.log("componentDidUpdate -- nextState", nextState);
		console.log("Current state", this.state);
		if(!jQuery.isEmptyObject(nextState.selectedProgram) && this.state.selectedProgram != nextState.selectedProgram)
		{
			console.log("Fetching assessments for program id", nextState.selectedProgram);
			this.props.dispatch(actions.fetchAssessmentsForProgram(nextState.selectedProgram));
		}
	}

/*
	This needs to trigger fetching asessments for that program/type combo
*/
	handleProgramSelection(e)
	{
		console.log("Selected value is: " ,this.selProgram.value);
		
		this.setState({
			selectedProgram: this.selProgram.value
		});

	}

	

	render() {
		var selectedProgram;
		var selectedProgramName = "";
		var programs, assessments;
		var startDate;
		var endDate;
		
		programs = this.props.programsById;
		assessments = this.props.assessmentsById;
		
		var programsList= Object.values(programs).map((program,i) => {
			return (<option key={program.id} value={program.id}>{program.name}</option>);
		});
		var assessmentsList = Object.values(assessments).map((assessment,i)=>{
			
			var flexi_assessment = "ThatsaNo";
			if(assessment.flexi_assessment && assessment.flexi_assessment == true)
				flexi_assessment = "ThatsaYes";
			var active = "No";
			if(assessment.active && assessment.active == 1)
				active = "Yes";
			console.log("Assessment is of flexi type", flexi_assessment);
			console.log("Assessment is active", active);
			return(
				<tr>
					<td>{assessment.name}</td>
					<td>{assessment.start_date}</td>
					<td>{assessment.end_date}</td>
					<td>TBD</td>
					<td>{assessment.double_entry}</td>
					<td>{flexi_assessment}</td>
					<td>{active}</td>
					<td><input type="checkbox" className="form-control" checked="true"/></td>
					<td><span className="fa fa-pencil-square-o"></span></td>
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

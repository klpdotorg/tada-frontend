import React from 'react';
import * as actions from '../actions/';
require('bootstrap-datepicker');

export default class Programs extends React.Component {

	constructor(props)
	{
		super(props);
		this.state = {
			selectedProgram: 0,
		}
		this.handleProgramSelection = this.handleProgramSelection.bind(this);
		this.handleCreateProgram = this.handleCreateProgram.bind(this);
		this.handleDeleteProgram = this.handleDeleteProgram.bind(this);
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

	componentDidUpdate(prevProps, prevState)
	{
		console.log("componentDidUpdate -- prevState", prevState);
		console.log("Current state", this.state);
		if(this.state.selectedProgram!=0 && this.state.selectedProgram != prevState.selectedProgram)
		{
			console.log("Fetching assessments for program id", this.state.selectedProgram);
			this.props.dispatch(actions.fetchAssessmentsForProgram(this.state.selectedProgram));
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

	handleCreateProgram()
	{
		var programName = this.createProgramName.value;
		var desc = this.createDescription.value;
		var start = this.createStartDate.value;
		var end = this.createEndDate.value;
		var isActive = "yes";
		console.log("Creating program..");
		$('#createProgramModal').modal('hide');
		this.props.dispatch(actions.createNewProgram(programName, desc, start, end, isActive)).then(response =>{
			$('#programCreatedName').text(response.name);
			$('#programCreatedModal').modal('show');
			this.props.dispatch(actions.fetchAllPrograms());

		}).catch(error => {
			console.log("ERROR in creating program..", JSON.stringify(error));
			$('#programCreationError').text(JSON.stringify(error.response));
			$('#programErrorModal').modal('show');
			//Show error modal for creating programs
		});
	}

	handleDeleteProgram()
	{
		console.log("Deleting program -- ", this.state.selectedProgram);
		this.props.dispatch(actions.deleteProgram(this.state.selectedProgram));
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
			
			var flexi_assessment = "No";
			var double_entry = "No";
			if(assessment.double_entry && assessment.double_entry == true)
				double_entry="Yes";
			if(assessment.flexi_assessment && assessment.flexi_assessment == true)
				flexi_assessment = "Yes";
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
					<td>{double_entry}</td>
					<td>{flexi_assessment}</td>
					<td>{active}</td>
					<td><input type="checkbox" className="form-control" checked="false"/></td>
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
						<button type="button" className="btn brand-orange-bg all-padded-btn" data-toggle="modal" data-target="#createProgramModal">Add Program</button>
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
						<button type="button" className="col-sm-2 btn btn-info navbar-btn brand-blue-bg all-padded-btn" data-toggle="modal" data-target="#editProgramModal"><span className="fa fa-pencil-square-o"></span>Edit</button>
						<button type="button" className="col-sm-2 btn btn-info navbar-btn brand-blue-bg all-padded-btn" onClick={this.handleDeleteProgram} ><span className="fa fa-trash-o"></span>Delete</button>
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
			{/*Create program modal dialog*/}
			 <div className="modal fade" data-backdrop="false" id="createProgramModal" tabIndex="-1" role="dialog" aria-labelledby="createProgramModal">
                  <div className="modal-dialog" role="document">
                      <div className="modal-content">
                          <div className="modal-header">
                              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                              <h4 className="modal-title" id="createProgramTitle"> Create Program</h4>
                          </div>
                          <div className="modal-body">
                              <form id="createProgram">
                              
                                <div className="form-group">
                                    <label htmlFor="createProgramName" className="control-label">Program:</label>
                                    <input type="text" className="form-control" required autofocus id="createProgramName" ref={(ref) => this.createProgramName = ref}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description" className="control-label">Description:</label>
                                    <input type="text" className="form-control" required autofocus id="description" ref={(ref) => this.createDescription = ref}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="startDate" className="control-label">Start Date</label>
                                    <input type="date" className="form-control" required autofocus id="startDate" ref={(ref) => this.createStartDate = ref}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="endDate" className="control-label">End Date:</label>
                                    <input type="date" className="form-control" required autofocus id="endDate" ref={(ref) => this.createEndDate = ref}/>
                                </div>
                              </form>
                          </div>
                          <div className="modal-footer">
                              <button type="button" className="btn btn-default" data-dismiss="modal">Discard</button>
                              <button type="button" className="btn btn-primary" onClick={this.handleCreateProgram}>Save</button>
                          </div>
                      </div>
                  </div>
       	 	</div>{/*End of modal*/}

       	 {/*Edit program modal dialog*/}
			 <div className="modal fade" data-backdrop="false" id="editProgramModal" tabIndex="-1" role="dialog" aria-labelledby="createProgramModal">
                  <div className="modal-dialog" role="document">
                      <div className="modal-content">
                          <div className="modal-header">
                              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                              <h4 className="modal-title" id="editProgramTitle"> Modify Program</h4>
                          </div>
                          <div className="modal-body">
                              <form id="createProgram">
                              
                                <div className="form-group">
                                    <label htmlFor="programName" className="control-label">Program:</label>
                                    <input type="text" className="form-control" required autofocus id="programName" ref={(ref) => this.programName = ref}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description" className="control-label">Description:</label>
                                    <input type="text" className="form-control" required autofocus id="description" ref={(ref) => this.description = ref}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="startDate" className="control-label">Start Date</label>
                                    <input type="date" className="form-control" required autofocus id="startDate" ref={(ref) => this.startDate = ref}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="endDate" className="control-label">End Date:</label>
                                    <input type="date" className="form-control" required autofocus id="endDate" ref={(ref) => this.endDate = ref}/>
                                </div>
                              </form>
                          </div>
                          <div className="modal-footer">
                              <button type="button" className="btn btn-default" data-dismiss="modal">Discard</button>
                              <button type="button" className="btn btn-primary">Save</button>
                          </div>
                      </div>
                  </div>
       	 	</div>{/*End of edit modal*/}
       	 {/* Program creation successful dialog */}
       	 <div className="modal fade" data-backdrop="false" id="programCreatedModal" tabIndex="-1" role="dialog" aria-labelledby="programCreatedModal">
                  <div className="modal-dialog" role="document">
                      <div className="modal-content">
                          <div className="modal-header">
                              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                              <h4 className="modal-title" id="programCreatedTitle"> Program Created!</h4>
                          </div>
                          <div className="modal-body">
                              <form id="createProgram">
                                <div className="form-group">
                                    <label className="control-label">Program created succcessfully!</label>
                                    <label id="programCreatedName"></label>
                                </div>
                                
                              </form>
                          </div>
                          <div className="modal-footer">
                              <button type="button" className="btn btn-default" data-dismiss="modal">OK</button>
                          </div>
                      </div>
                  </div>
       	 	</div>

       	 	 {/* Program creation failed dialog */}
       	 <div className="modal fade" data-backdrop="false" id="programErrorModal" tabIndex="-1" role="dialog" aria-labelledby="programErrorModal">
                  <div className="modal-dialog" role="document">
                      <div className="modal-content">
                          <div className="modal-header">
                              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                              <h4 className="modal-title" id="programErrorTitle"> Program creation failed!</h4>
                          </div>
                          <div className="modal-body">
                              <form id="createProgram">
                                <div className="form-group">
                                    <label className="control-label">Program creation failed!</label>
                                    <label id="programCreationError"></label>
                                </div>
                                
                              </form>
                          </div>
                          <div className="modal-footer">
                              <button type="button" className="btn btn-default" data-dismiss="modal">OK</button>
                          </div>
                      </div>
                  </div>
       	 	</div>
			</div>
		);
	}
}

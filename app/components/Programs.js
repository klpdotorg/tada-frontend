import React from 'react';
import * as actions from '../actions/';
require('bootstrap-datepicker');
import CreateAssessment from './Modals/CreateAssessment';
import EditAssessment from './Modals/EditAssessment';

export default class Programs extends React.Component {

	constructor(props)
	{
		super(props);
		this.state = {
			selectedProgram: 0,
			isCreateAssessmentModalOpen: false,
			isEditAssessmentModalOpen: false,
			selAssessment: -1,
			selectedAssessments: []
		}
		this.handleProgramSelection = this.handleProgramSelection.bind(this);
		this.handleCreateProgram = this.handleCreateProgram.bind(this);
		this.handleDeleteProgram = this.handleDeleteProgram.bind(this);
		this.handleShowEditDialog = this.handleShowEditDialog.bind(this);
		this.editProgram = this.editProgram.bind(this);
		this.openCreateAssessmentModal = this.openCreateAssessmentModal.bind(this);
		this.closeCreateAssessmentModal = this.closeCreateAssessmentModal.bind(this);
		this.handleCreateAssessment = this.handleCreateAssessment.bind(this);
		this.openEditAssessmentModal = this.openEditAssessmentModal.bind(this);
		this.closeEditAssessmentModal = this.closeEditAssessmentModal.bind(this);
		this.handleEditAssessment = this.handleEditAssessment.bind(this);
		this.selectAssessment = this.selectAssessment.bind(this);
		this.deleteAssessments = this.deleteAssessments.bind(this);
		this.activateAssessments = this.activateAssessments.bind(this);
		this.deactivateAssessments = this.deactivateAssessments.bind(this);

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
		console.log("Programs receiving new props");
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
		var isActive = this.isActive.value;
		var instCat = this.instCat.value;
		console.log("Creating program..");
		$('#createProgramModal').modal('hide');
		this.props.dispatch(actions.createNewProgram(programName, desc, start, end, isActive)).then(response =>{
			
			$('#programCreatedName').text(response.name);
			$('#programInfoModal').modal('show');
		}).catch(error => {
			console.log("ERROR in creating program..", JSON.stringify(error));
			$('#programCreationError').text(JSON.stringify(error.response));
			$('#programErrorModal').modal('show');
			//Show error modal for creating programs
		});
	}

	handleCreateAssessment(name, start_date, end_date, isActive, isDoubleEntry, type)
	{
		console.log("Creating assessment");
		this.closeCreateAssessmentModal();
		this.props.dispatch(actions.createAssessment(this.state.selectedProgram,name,start_date,end_date,1,isDoubleEntry));
	}

	handleEditAssessment(id, name, start_date, end_date, isActive, isDoubleEntry, type)
	{
		this.closeEditAssessmentModal();
		this.props.dispatch(actions.editAssessment(this.state.selectedProgram,id,name,start_date,end_date,1,isDoubleEntry));
	}

	openCreateAssessmentModal()
	{
		
			this.setState({
				isCreateAssessmentModalOpen: true
			});
		
	}

	closeCreateAssessmentModal()
	{

		this.setState({
			isCreateAssessmentModalOpen: false
		});
	}

	openEditAssessmentModal(e)
	{
		var trId = $(e.currentTarget).closest('tr').prop('id');
		var selectedAssessment = this.props.assessmentsById[trId];
		console.log("Selected assessment", selectedAssessment);
		this.setState({
			isEditAssessmentModalOpen: true,
			selAssessment: selectedAssessment
		});
	}

	closeEditAssessmentModal()
	{
		this.setState({
			isEditAssessmentModalOpen: false,
			selAssessment: -1
		});
	}
	

	handleDeleteProgram()
	{
		$('#deleteProgramModal').modal('hide');
		console.log("Deleting program -- ", this.state.selectedProgram);
		var deleteId = this.state.selectedProgram;
		this.props.dispatch(actions.deleteProgram(deleteId)).then(response =>{
			
			this.setState({
				selectedProgram: this.selProgram.selectedIndex + 1
			});
			this.selProgram.remove(deleteId);
			// console.log("Fetching all programs");
			// this.props.dispatch(actions.fetchAllPrograms());
		}).catch(error => {
			
		});
	}

	handleShowEditDialog()
	{
		var editProgram = this.props.programsById[this.state.selectedProgram];
		$('#editProgramName').val(editProgram.name);
		$('#editDescription').val(editProgram.description);
		$('#editStartDate').val(editProgram.start_date);
		$('#editEndDate').val(editProgram.end_date);
		$('#editProgramModal').modal('show');

	}

	editProgram(id)
	{
		var programName = this.editProgramName.value;
		var desc = this.editDescription.value;
		var start = this.editStartDate.value;
		var end = this.editEndDate.value;
		var isActive = "yes";
		$('#editProgramModal').modal('hide');
		this.props.dispatch(actions.editProgram(this.state.selectedProgram,programName, desc, start, end, isActive)).then(response =>{
			
			$('#infoTitle').text("Edited program!");
			$('#infoLabel').text("Program edited successfully. Press OK to view!");
			$('#programInfoModal').modal('show');
			

		}).catch(error => {
			console.log("ERROR in editing program..", JSON.stringify(error));
			$('#errorDetails').text(JSON.stringify(error.response));
			$('#errorTitle').text("Edit failed!")
			$('#errorLabel').text("Program could not be edited. Please try again!");
			$('#programErrorModal').modal('show');
			//Show error modal for creating programs
		});
	}

	showConfirmation()
	{
	    this.setState({openConfirmModal: true});
  	}

	closeConfirmModal() 
	{
	    this.setState({openConfirmModal: false});
  	}

  	selectAssessment(e)
  	{
  		var assId = $(e.currentTarget).closest('tr').prop('id');
  		var newSelAssessments = this.state.selectedAssessments.slice();
  		if(e.currentTarget.checked)
  		{
  			newSelAssessments.push(assId);
  		}
  		else
  		{
  			newSelAssessments.splice( $.inArray(assId, newSelAssessments), 1 );
  		}
  		this.setState({
  			selectedAssessments: newSelAssessments
  		});
  	}

  	deleteAssessments()
  	{
  		var itemsToDelete = this.state.selectedAssessments;
  		var programId = this.state.selectedProgram;
  		itemsToDelete.map(assessmentId => {
  			this.props.dispatch(actions.deleteAssessment(programId, assessmentId));
  		});
  	}

  	activateAssessments()
  	{

  	}

  	deactivateAssessments()
  	{

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
			return(
				<tr id={assessment.id}>
					<td>{assessment.name}</td>
					<td>{assessment.start_date}</td>
					<td>{assessment.end_date}</td>
					<td>TBD</td>
					<td>{double_entry}</td>
					<td>{flexi_assessment}</td>
					<td>{active}</td>
					<td><input type="checkbox" className="form-control" onClick={this.selectAssessment}/></td>
					<td><button onClick={this.openEditAssessmentModal}><span className="fa fa-pencil-square-o" onClick={this.openEditAssessmentModal}></span></button></td>
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
						<button type="button" className="btn brand-orange-bg all-padded-btn" onClick={this.openCreateAssessmentModal}>Add Assessments</button>
					</div>
					
						
					
					
				</div>
				<div className="grey-mist-bg">
					<div className="row center-block">
						<div className="col-md-6 pull-left">
							<h4>Program Details</h4>
							<hr/>
						</div>
						<div className="col-md-6 pull-right">
						<button type="button" className="col-sm-2 btn btn-info navbar-btn brand-blue-bg all-padded-btn" onClick={this.handleShowEditDialog}><span className="fa fa-pencil-square-o"></span>Edit</button>
						<button type="button" className="col-sm-2 btn btn-info navbar-btn brand-blue-bg all-padded-btn" data-toggle="modal" data-target="#deleteProgramModal"><span className="fa fa-trash-o"></span>Delete</button>
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
				<div className="col-md-8 pull-right">
						<button type="button" className="col-sm-3 btn btn-info navbar-btn brand-blue-bg all-padded-btn">Make a Copy</button>
						<button type="button" className="col-sm-2 btn btn-info navbar-btn brand-blue-bg all-padded-btn" onClick={this.deleteAssessments}>Delete</button>
						<button type="button" className="col-sm-2 btn btn-info navbar-btn brand-blue-bg all-padded-btn" onClick={this.activateAssessments}>Activate</button>
						<button type="button" className="col-sm-3 btn btn-info navbar-btn brand-blue-bg all-padded-btn" onClick={this.deactivateAssessments}>Deactivate</button>

				</div>
			<CreateAssessment handleSubmit = {this.handleCreateAssessment} isOpen={this.state.isCreateAssessmentModalOpen} onClose= {this.closeCreateAssessmentModal} onCloseModal={this.closeCreateAssessmentModal}/>
			<EditAssessment assessment={this.state.selAssessment} handleEditAssessment={this.handleEditAssessment} handleSubmit = {this.handleEditAssessment} isOpen={this.state.isEditAssessmentModalOpen} onClose= {this.closeEditAssessmentModal} onCloseModal={this.closeEditAssessmentModal}/>

			{/*DELETE program modal dialog*/}
			 <div className="modal fade" data-backdrop="false" id="deleteProgramModal" tabIndex="-1" role="dialog" aria-labelledby="deleteProgramModal">
                  <div className="modal-dialog" role="document">
                      <div className="modal-content">
                          <div className="modal-header">
                              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                              <h4 className="modal-title" id="deleteProgramTitle"> Delete Program?</h4>
                          </div>
                          <div className="modal-body">
                              <form id="deleteProgram">
                              
                                <div className="form-group">
                                    <label>Do you really want to delete this program?</label>
                                </div>
                                
                              </form>
                          </div>
                          <div className="modal-footer">
                              <button type="button" className="btn btn-default" onClick={this.handleDeleteProgram}>Yes</button>
                              <button type="button" className="btn btn-primary" data-dismiss="modal">No</button>
                          </div>
                      </div>
                  </div>
       	 	</div>{/*End of modal*/}
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
                                <div className="form-group">
                                    <label htmlFor="isActive" className="control-label">Active:</label>
                                    <input type="radio" id="isActive" name="isActive" ref={(ref) => this.isActive = ref}/>Yes
		                            <input type="radio" id="isActive" name="isActive" ref={(ref) => this.isActive = ref}/>No
                                </div>
                                <div className="form-group">
                                    <label htmlFor="instCat" className="control-label">Institution Type:</label>
                                    <input type="radio"  name="instCat" ref={(ref) => this.instCat = ref}/>Primary
		                            <input type="radio"  name="instCat" ref={(ref) => this.instCat = ref}/>Pre-School
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
			 <div className="modal fade" data-backdrop="false" id="editProgramModal" tabIndex="-1" role="dialog" aria-labelledby="editProgramModal">
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
                                    <input type="text" className="form-control" required autofocus id="editProgramName" ref={(ref) => this.editProgramName = ref} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description" className="control-label">Description:</label>
                                    <input type="text" className="form-control" required autofocus id="editDescription" ref={(ref) => this.editDescription = ref} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="startDate" className="control-label">Start Date</label>
                                    <input type="date" className="form-control" required autofocus id="editStartDate" ref={(ref) => this.editStartDate = ref} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="endDate" className="control-label">End Date:</label>
                                    <input type="date" className="form-control" required autofocus id="editEndDate" ref={(ref) => this.editEndDate = ref} />
                                </div>
                              </form>
                          </div>
                          <div className="modal-footer">
                              <button type="button" className="btn btn-default" data-dismiss="modal">Discard</button>
                              <button type="button" className="btn btn-primary" onClick={this.editProgram}>Save</button>
                          </div>
                      </div>
                  </div>
       	 	</div>{/*End of edit modal*/}
       	 {/* Info dialog */}
       	 <div className="modal fade" data-backdrop="false" id="programInfoModal" tabIndex="-1" role="dialog" aria-labelledby="programCreatedModal">
                  <div className="modal-dialog" role="document">
                      <div className="modal-content">
                          <div className="modal-header">
                              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                              <h4 className="modal-title" id="infoTitle"> Program Created!</h4>
                          </div>
                          <div className="modal-body">
                              <form id="createProgram">
                                <div className="form-group">
                                    <label id="infoLabel" className="control-label">Program created succcessfully! Name: </label>
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

       	 	 {/* Error dialog */}
       	 <div className="modal fade" data-backdrop="false" id="programErrorModal" tabIndex="-1" role="dialog" aria-labelledby="programErrorModal">
                  <div className="modal-dialog" role="document">
                      <div className="modal-content">
                          <div className="modal-header">
                              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                              <h4 className="modal-title" id="errorTitle"> Program creation failed!</h4>
                          </div>
                          <div className="modal-body">
                              <form id="createProgram">
                                <div className="form-group">
                                    <label id="errorLabel" className="control-label">Program creation failed!</label>
                                    <label id="errorDetails"></label>
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

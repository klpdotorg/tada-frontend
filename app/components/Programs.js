import React from 'react';
import * as actions from '../actions/';
require('bootstrap-datepicker');
import CreateAssessment from './Modals/CreateAssessment';
import EditAssessment from './Modals/EditAssessment';
import { Link } from 'react-router';
import CreateProgram from './Modals/CreateProgram';
import GenericDialog from './Modals/GenericDialog';
import EditProgram from './Modals/EditProgram';
import ConfirmDialog from './Modals/ConfirmDialog';
import { assessmentCreated, assessCreateFailed } from '../actions/notifications';
import Notifications from 'react-notification-system-redux';
export default class Programs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedProgram: 0,
      isCreateAssessmentModalOpen: false,
      isEditAssessmentModalOpen: false,
      isCreateProgramModalOpen: false,
      isEditProgramModalOpen: false,
      selAssessment: -1,
      showSuccessModal: false,
      selectedAssessments: [],
      dialogTitle: '',
      dialogMessage: '',
      isConfirmModalOpen: false,
    };
    this.handleProgramSelection = this.handleProgramSelection.bind(this);
    this.handleCreateProgram = this.handleCreateProgram.bind(this);
    this.handleDeleteProgram = this.handleDeleteProgram.bind(this);
    this.handleShowEditDialog = this.handleShowEditDialog.bind(this);
    this.openCreateAssessmentModal = this.openCreateAssessmentModal.bind(this);
    this.closeCreateAssessmentModal = this.closeCreateAssessmentModal.bind(this);
    this.handleCreateAssessment = this.handleCreateAssessment.bind(this);
    this.openEditAssessmentModal = this.openEditAssessmentModal.bind(this);
    this.closeEditAssessmentModal = this.closeEditAssessmentModal.bind(this);
    this.openCreateProgramModal = this.openCreateProgramModal.bind(this);
    this.closeCreateProgramModal = this.closeCreateProgramModal.bind(this);
    this.handleEditAssessment = this.handleEditAssessment.bind(this);
    this.selectAssessment = this.selectAssessment.bind(this);
    this.deleteAssessments = this.deleteAssessments.bind(this);
    this.activateAssessments = this.activateAssessments.bind(this);
    this.deactivateAssessments = this.deactivateAssessments.bind(this);
    this.openGenericDialog = this.openGenericDialog.bind(this);
    this.closeGenericDialog = this.closeGenericDialog.bind(this);
    this.activateAssessments = this.activateAssessments.bind(this);
    this.deactivateAssessments = this.deactivateAssessments.bind(this);
    this.openEditProgramModal = this.openEditProgramModal.bind(this);
    this.closeEditProgramModal = this.closeEditProgramModal.bind(this);
    this.closeConfirmModal = this.closeConfirmModal.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(actions.fetchAllPrograms());
  }

  // componentDidMount(){
  // 	console.log(sessionStorage.getItem('isAdmin'));
  // 	if(sessionStorage.getItem('isAdmin')){
  //
  // 	}
  // }
  /*
	Setting state here will NOT trigger another render
	*/
  componentWillReceiveProps(nextProps) {
    const programs = nextProps.programsById;
    var selectedProgram = this.state.selectedProgram;
    if (this.props.primarySelected != nextProps.primarySelected) {
      selectedProgram = 0;
    }
    if (Object.keys(programs).length > 0 && selectedProgram == 0) {
      const selectProgram = Object.values(programs)[0];
      this.setState({
        selectedProgram: selectProgram.id,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.selectedProgram != 0 &&
      this.state.selectedProgram != prevState.selectedProgram
    ) {
      this.props.dispatch(actions.fetchAssessmentsForProgram(this.state.selectedProgram));
    }
  }

  /*
	This needs to trigger fetching asessments for that program/type combo
*/
  handleProgramSelection(e) {
    this.setState({
      selectedProgram: this.selProgram.value,
    });
  }

  handleCreateProgram(programName, desc, start, end, isActive, instCat) {
    this.closeCreateProgramModal();
    // var programName = this.createProgramName.value;
    // var desc = this.createDescription.value;
    // var start = this.createStartDate.value;
    // var end = this.createEndDate.value;
    // var isActive = this.isActive.value;
    // var instCat = this.instCat.value;
    //$('#createProgramModal').modal('hide');
    this.props
      .dispatch(actions.createNewProgram(programName, desc, start, end, isActive, instCat))
      .then(response => {
        var programName = response.name;
        var message = 'Program created successfully!';
        this.setState({
          showSuccessModal: true,
          dialogTitle: 'Program Created!',
          dialogMessage: message,
          selectedProgram: response.id,
        });
      })
      .catch(error => {
        'ERROR in creating program..', JSON.stringify(error);
        $('#programCreationError').text(JSON.stringify(error.response));
        $('#programErrorModal').modal('show');
        //Show error modal for creating programs
      });
  }

  openGenericDialog() {
    this.setState({
      showSuccessModal: true,
    });
  }

  closeGenericDialog() {
    this.setState({
      showSuccessModal: false,
    });
  }

  openConfirmModal() {
    this.setState({
      isConfirmModalOpen: true,
    });
  }

  closeConfirmModal() {
    this.setState({
      isConfirmModalOpen: false,
    });
  }

  handleCreateAssessment(name, start_date, end_date, isActive, isDoubleEntry, type) {
    ('Creating assessment');
    this.closeCreateAssessmentModal();
    this.props.dispatch(
      actions.createAssessment(
        this.state.selectedProgram,
        name,
        start_date,
        end_date,
        1,
        isDoubleEntry,
        type,
      ),
    );
  }

  handleEditAssessment(id, name, start_date, end_date, isActive, isDoubleEntry, type) {
    this.closeEditAssessmentModal();
    this.props.dispatch(
      actions.editAssessment(
        this.state.selectedProgram,
        id,
        name,
        start_date,
        end_date,
        1,
        isDoubleEntry,
        type,
      ),
    );
  }

  openEditProgramModal() {
    this.setState({
      isEditProgramModalOpen: true,
    });
  }

  closeEditProgramModal() {
    this.setState({
      isEditProgramModalOpen: false,
    });
  }

  openCreateProgramModal() {
    this.setState({
      isCreateProgramModalOpen: true,
    });
  }

  closeCreateProgramModal() {
    this.setState({
      isCreateProgramModalOpen: false,
    });
  }

  openCreateAssessmentModal() {
    this.setState({
      isCreateAssessmentModalOpen: true,
    });
  }

  closeCreateAssessmentModal() {
    this.setState({
      isCreateAssessmentModalOpen: false,
    });
  }

  openEditAssessmentModal(e) {
    var trId = $(e.currentTarget).closest('tr').prop('id');
    var selectedAssessment = this.props.assessmentsById[trId];
    this.setState({
      isEditAssessmentModalOpen: true,
      selAssessment: selectedAssessment,
    });
  }

  closeEditAssessmentModal() {
    this.setState({
      isEditAssessmentModalOpen: false,
      selAssessment: -1,
    });
  }

  handleDeleteProgram() {
    $('#deleteProgramModal').modal('hide');
    var deleteId = this.state.selectedProgram;
    this.props
      .dispatch(actions.deleteProgram(deleteId))
      .then(response => {
        console.log('Selected index is, ', this.selProgram.selectedIndex);
        this.setState({
          selectedProgram: this.selProgram.value,
        });
        this.selProgram.remove(deleteId);
      })
      .catch(error => {});
  }

  handleShowEditDialog() {
    this.setState({
      isEditProgramModalOpen: true,
    });
  }

  handleEditProgram(programName, desc, start, end, isActive, instCat) {
    this.closeEditProgramModal();
    this.props
      .dispatch(
        actions.editProgram(
          this.state.selectedProgram,
          programName,
          desc,
          start,
          end,
          isActive,
          instCat,
        ),
      )
      .catch(error => {
        'ERROR in editing program..', JSON.stringify(error);
        $('#errorDetails').text(JSON.stringify(error.response));
        $('#errorTitle').text('Edit failed!');
        $('#errorLabel').text('Program could not be edited. Please try again!');
        $('#programErrorModal').modal('show');
        //Show error modal for creating programs
      });
  }

  showConfirmation() {
    this.setState({ openConfirmModal: true });
  }

  closeConfirmation() {
    this.setState({ openConfirmModal: false });
  }

  selectAssessment(e) {
    var assId = $(e.currentTarget).closest('tr').prop('id');
    var newSelAssessments = this.state.selectedAssessments.slice();
    if (e.currentTarget.checked && jQuery.inArray(assId, this.state.selectedAssessments) == -1) {
      newSelAssessments.push(assId);
    } else {
      newSelAssessments.splice($.inArray(assId, newSelAssessments), 1);
    }
    this.setState({
      selectedAssessments: newSelAssessments,
    });
  }

  deleteAssessments() {
    var itemsToDelete = this.state.selectedAssessments;
    var programId = this.state.selectedProgram;
    itemsToDelete.map(assessmentId => {
      this.props.dispatch(actions.deleteAssessment(programId, assessmentId));
    });
    this.setState({
      selectedAssessments: [],
    });
  }

  activateAssessments() {
    for (let i of this.state.selectedAssessments) {
      this.props.dispatch(actions.activateAssessment(this.state.selectedProgram, i));
    }
    this.setState({
      selectedAssessments: [],
    });
  }

  deactivateAssessments() {
    for (let i of this.state.selectedAssessments) {
      this.props.dispatch(actions.deactivateAssessment(this.state.selectedProgram, i));
    }
    this.setState({
      selectedAssessments: [],
    });
  }

  deactivateProgram(id) {
    this.closeConfirmModal();
    this.props.dispatch(actions.deactivateProgram(this.state.selectedProgram)).then(() => {
      this.selProgram.remove(this.state.selectedProgram);
      this.setState({
        selectedProgram: this.selProgram.selectedIndex + 1,
      });
    });
  }

  createCopyAssess() {
    var itemsToCopy = this.state.selectedAssessments;
    var programId = this.state.selectedProgram;
    const makeACopy = itemsToCopy.map(assessmentId => {
      var a = this.props.assessmentsById[assessmentId];
      var copyName = a.name + ' COPY';
      return this.props.dispatch(
        actions.createAssessment(
          this.state.selectedProgram,
          copyName,
          a.start_date,
          a.end_date,
          1,
          a.isDoubleEntry,
          a.type,
        ),
      );
    });
    Promise.all(makeACopy)
      .then(() => {
        this.props.dispatch(Notifications.success(assessmentCreated));
        this.setState({
          selectedAssessments: [],
        });
      })
      .catch(reason => {
        this.props.dispatch(Notifications.error(assessCreateFailed));
      });
  }

  render() {
    var selectedProgram;
    var selectedProgramName = '';
    var programs, assessments;
    var startDate;
    var endDate;
    var instType;
    programs = this.props.programsById;
    assessments = this.props.assessmentsById;
    // console.log(sessionStorage.getItem('isAdmin'));
    if (sessionStorage.getItem('isAdmin') == null) {
      //this.props.redirectTo('/');
      return (
        <div>
          You dont have permissions to access this page<br />
          <Link to="/" className="btn btn-primary padded-btn">GO TO MAIN PAGE</Link>
        </div>
      );
    }
    var programsList = Object.values(programs).map((program, i) => {
      return <option key={program.id} value={program.id}>{program.name}</option>;
    });

    var assessmentsList = Object.values(assessments).map((assessment, i) => {
      var flexi_assessment = 'No';
      var double_entry = 'No';
      var type = '';
      if (assessment.double_entry && assessment.double_entry == true) double_entry = 'Yes';
      if (assessment.flexi_assessment && assessment.flexi_assessment == true)
        flexi_assessment = 'Yes';

      if (assessment.type) {
        if (assessment.type == 1) type = 'Institution';
        else if (assessment.type == 2) type = 'Student Group';
        else if (assessment.type == 3) type = 'Student';
      } else type = 'Unknown';

      return (
        <tr key={assessment.id} id={assessment.id}>
          <td>{assessment.name}</td>
          <td>{assessment.start_date}</td>
          <td>{assessment.end_date}</td>
          <td>{type}</td>
          <td>{double_entry}</td>
          <td>{flexi_assessment}</td>
          <td>
            <input
              type="checkbox"
              className="form-control"
              onChange={this.selectAssessment}
              checked={
                jQuery.inArray(assessment.id.toString(), this.state.selectedAssessments) > -1
              }
            />
          </td>
          <td>
            <button onClick={this.openEditAssessmentModal}>
              <span className="fa fa-pencil-square-o" onClick={this.openEditAssessmentModal} />
            </button>
          </td>
          <td>
            <Link className="btn brand-orange-bg fa fa-question" to={assessment.questionsUrl} />
          </td>

        </tr>
      );
    });

    // if (Object.keys(programs).length > 0 && this.state.selectedProgram == 0 ) {
    // 	selectedProgram = Object.values(programs)[0];
    // } else {
    selectedProgram = programs[this.state.selectedProgram];
    // }
    if (!jQuery.isEmptyObject(selectedProgram)) {
      selectedProgramName = selectedProgram.name;
      startDate = selectedProgram.start_date;
      endDate = selectedProgram.end_date;
      if (selectedProgram.programme_institution_category == 1) instType = 'Primary';
      else instType = 'Pre-School';
    }
    var disabledstate = Object.keys(assessments).length > 0;
    return (
      <div>
        <div className="row center-block">

          <div className="col-md-4 form-inline">
            <label htmlFor="sel1">Programs:</label>
            <select
              ref={ref => (this.selProgram = ref)}
              className="form-control"
              id="sel1"
              onChange={this.handleProgramSelection}
              value={this.state.selectedProgram}
            >
              {programsList}
            </select>
          </div>
          <div className=" col-md-4 form-group">
            {/*<button type="button" className="btn brand-orange-bg all-padded-btn" data-toggle="modal" data-target="#createProgramModal">Add Program</button>*/}
            <button
              type="button"
              className="btn brand-orange-bg all-padded-btn"
              onClick={this.openCreateProgramModal.bind(this)}
            >
              Add Program
            </button>

            <button
              type="button"
              className="btn brand-orange-bg all-padded-btn"
              onClick={this.openCreateAssessmentModal}
            >
              Add Assessments
            </button>
          </div>

        </div>
        <div className="grey-mist-bg">
          <div className="row center-block">
            <div className="col-md-8 pull-left">
              <h4>Program Details</h4>
              <hr />
              <div className="row">
                <label className="col-md-4">Program name: {selectedProgramName} </label>
                <label className="col-md-4">Start Date: {startDate}</label>
              </div>
              <div className="row">
                <label className="col-md-4">Institution: {instType} </label>
                <label className="col-md-4">End Date: {endDate}</label>
              </div>
            </div>

            <div className="col-md-4 pull-right">
              <button
                type="button"
                className="col-sm-6 btn btn-info navbar-btn brand-blue-bg all-padded-btn"
                onClick={this.handleShowEditDialog}
              >
                <span className="fa fa-pencil-square-o" />Edit
              </button>
              <button
                type="button"
                className="col-sm-6 btn btn-info navbar-btn brand-blue-bg all-padded-btn"
                onClick={this.openConfirmModal.bind(this)}
                disabled={disabledstate}
              >
                Deactivate
              </button>
              <button
                type="button"
                className="col-sm-6 btn btn-info navbar-btn brand-blue-bg all-padded-btn"
                data-toggle="modal"
                data-target="#deleteProgramModal"
                disabled={disabledstate}
              >
                <span className="fa fa-trash-o" />Delete
              </button>
            </div>

          </div>

        </div>
        <br />
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
                <th>Select</th>
                <th>Edit</th>
                <th>Questions</th>
              </tr>
              {assessmentsList}
            </tbody>
          </table>
        </div>
        <div className="col-md-8 pull-right">
          <button
            type="button"
            className="col-sm-3 btn btn-info navbar-btn brand-blue-bg all-padded-btn"
            onClick={this.createCopyAssess.bind(this)}
            disabled={this.state.selectedAssessments.length == 0}
          >
            Make a Copy
          </button>
          <button
            type="button"
            className="col-sm-2 btn btn-info navbar-btn brand-blue-bg all-padded-btn"
            onClick={this.deleteAssessments}
            disabled={this.state.selectedAssessments.length == 0}
          >
            Delete
          </button>
          <button
            type="button"
            className="col-sm-3 btn btn-info navbar-btn brand-blue-bg all-padded-btn"
            onClick={this.deactivateAssessments}
            disabled={this.state.selectedAssessments.length == 0}
          >
            Deactivate
          </button>

        </div>
        <CreateAssessment
          handleSubmit={this.handleCreateAssessment}
          isOpen={this.state.isCreateAssessmentModalOpen}
          onCloseModal={this.closeCreateAssessmentModal}
        />
        <EditAssessment
          assessment={this.state.selAssessment}
          handleEditAssessment={this.handleEditAssessment}
          handleSubmit={this.handleEditAssessment}
          isOpen={this.state.isEditAssessmentModalOpen}
          onCloseModal={this.closeEditAssessmentModal}
        />
        <CreateProgram
          isOpen={this.state.isCreateProgramModalOpen}
          onCloseModal={this.closeCreateProgramModal}
          handleSubmit={this.handleCreateProgram}
        />
        <EditProgram
          program={selectedProgram}
          isOpen={this.state.isEditProgramModalOpen}
          onCloseModal={this.closeEditProgramModal}
          handleSubmit={this.handleEditProgram.bind(this)}
        />
        <ConfirmDialog
          entity={selectedProgram}
          message="Are you sure you want to deactivate this program?"
          isOpen={this.state.isConfirmModalOpen}
          onCloseModal={this.closeConfirmModal.bind(this)}
          onYes={this.deactivateProgram.bind(this)}
        />

        <GenericDialog
          isOpen={this.state.showSuccessModal}
          onCloseModal={this.closeGenericDialog}
          title={this.state.dialogTitle}
          message={this.state.dialogMessage}
        />
        {/*DELETE program modal dialog*/}
        <div
          className="modal fade"
          data-backdrop="false"
          id="deleteProgramModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="deleteProgramModal"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
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
                <button
                  type="button"
                  className="btn btn-default"
                  onClick={this.handleDeleteProgram}
                >
                  Yes
                </button>
                <button type="button" className="btn btn-primary" data-dismiss="modal">No</button>
              </div>
            </div>
          </div>
        </div>{/*End of modal*/}

        {/* Error dialog */}
        <div
          className="modal fade"
          data-backdrop="false"
          id="programErrorModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="programErrorModal"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
                <h4 className="modal-title" id="errorTitle"> Program creation failed!</h4>
              </div>
              <div className="modal-body">
                <form id="createProgram">
                  <div className="form-group">
                    <label id="errorLabel" className="control-label">
                      Program creation failed!
                    </label>
                    <label id="errorDetails" />
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

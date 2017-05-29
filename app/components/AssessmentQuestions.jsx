import React from 'react';
import * as actions from '../actions/';
import { Link } from 'react-router';
import CreateQuestion from './Modals/CreateQuestion';


export default class Questions extends React.Component {

	constructor(props)
	{
		super(props);
		this.state = {
			isCreateQuestionModalOpen: false
		}
	}

	componentWillMount(){
		this.props.dispatch(actions.fetchQuestionsForAssessment(this.props.params.programId, this.props.params.assessmentId));
	}

	openCreateQuestionModal()
	{
		this.setState({
			isCreateQuestionModalOpen: true
		});
	}

	closeCreateQuestionModal()
	{
		this.setState({
			isCreateQuestionModalOpen: false
		});
	}

	createQuestion(qnNumber,qnOrder, qnText, type, grade, minMarks, maxMarks, active)
	{
		this.closeCreateQuestionModal();
		this.props.dispatch(actions.createQuestion(this.props.params.programId, this.props.params.assessmentId,qnNumber,qnOrder, qnText, type, grade, minMarks, maxMarks, active))
		.catch(error => {
			console.error("Error while creating question", error);
		});
	}

	deleteQuestion(e) {
		var questionId = $(e.currentTarget).closest('tr').prop('id');
		this.props.dispatch(actions.deleteQuestion(this.props.params.programId, this.props.params.assessmentId,questionId));
	}

	render()
	{
		var questions = this.props.questionsById;
		var num = 0;
		var questionsList = Object.values(questions).map((question,i)=>{
			var type = "Marks";
			if(question.question_type == 2)
				type="Grade";
			return(
				<tr key={question.id} id={question.id}>
					<td>{num++}</td>
					<td>{question.order}</td>
					<td>{question.name}</td>
					<td>{type}</td>
					<td>{question.score_min}</td>
					<td>{question.score_max}</td>
					<td>{question.grade}</td>
					<td><button className="btn btn-primary"><span className="fa fa-pencil-square-o" ></span></button>
					<button className="btn btn-primary padded-btn" onClick={this.deleteQuestion.bind(this)}><span className="fa fa-trash-o" onClick={this.deleteQuestion.bind(this)}></span></button></td>

				</tr>
			);
		});
		return(
				<div className="container-fluid">
					<h4 className="text-primary">Question Details</h4>
					<div className="base-spacing-sm border-base"></div>
					<div className="base-spacing-mid"></div>
					<div className="row">
						<div className="col-md-8">	
							<h5>
								<span className="text-primary"><strong>Program name: </strong></span>
								{this.props.programsById[this.props.params.programId].name}
							</h5>
							<h5>
								<span className="text-primary"><strong>Assessment name: </strong></span>
								{this.props.assessmentsById[this.props.params.assessmentId].name}
							</h5>
						</div>
						
						<div className="col-md-4 pull-right">
							<button type="button" className="btn btn-primary" onClick={this.openCreateQuestionModal.bind(this)}>Add Question</button>
							<Link to="/programs" className="btn btn-info padded-btn">Back to Program</Link>
						</div>
					</div>
				
					<br/>
					<div>
						<h4 className="text-primary text-center"> Questions in this assessment</h4>	
					</div>
					<div>
						<table className="table table-bordered table-striped">
						<tbody>
							<tr className="info">
								<th>Question #</th>
								<th>Order</th>
								<th>Text</th>
								<th>Type</th>
								<th>Min Mk</th>
								<th>Max Mk</th>
								<th>Grade Set</th>							
								<th>Actions</th>
							</tr>
							{questionsList}
						</tbody>
						</table>
					</div>
					<CreateQuestion isOpen={this.state.isCreateQuestionModalOpen} onCloseModal={this.closeCreateQuestionModal.bind(this)} handleSubmit={this.createQuestion.bind(this)}/>
				</div>
			);
	}
}

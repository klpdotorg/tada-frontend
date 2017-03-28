import React from 'react';
import * as actions from '../actions';

const tableStyle = {
    tableLayout: 'fixed',
    width: '310px',
    height: '250px',
    overflow: 'scroll',
}

const tableCellStyle = {
    width: '80%',
    wordWrap: 'break-word',
}
export default class Permissions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            boundaries: [],
            users: [],
            assessments: [],
        }
        this.selectAssessment = this.selectAssessment.bind(this);
        this.selectBoundary = this.selectBoundary.bind(this);
        this.selectUser = this.selectUser.bind(this);
    }

    componentWillMount() {
        this.props.dispatch(actions.fetchAllUsers());
    }
    
    componentWillReceiveProps(nextProps) {
        if (this.props.selectedBoundary != nextProps.selectedBoundary)
        {
            this.props.dispatch(actions.getAssessmentsForBoundary(nextProps.selectedBoundary.id));
        }
    }

    selectUser(e) {
        var userId = $(e.currentTarget).closest('tr').prop('id');
        var newSelUsers = this.state.users.slice();
        if (e.currentTarget.checked && jQuery.inArray(userId, this.state.users) == -1)
        {
            users.push(userId);
        }
    else
    {
    users.splice($.inArray(userId, users), 1);
}
this.setState({
    users: newSelUsers
});
  }

selectBoundary(e) {
    var boundaryId = $(e.currentTarget).closest('tr').prop('id');
    var newSelBoundaries = this.state.boundaries.slice();
    if (e.currentTarget.checked && jQuery.inArray(boundaryId, this.state.boundaries) == -1) {
        newSelBoundaries.push(boundaryId);
    }
    else {
        newSelBoundaries.splice($.inArray(boundaryId, boundaries), 1);
    }
    this.setState({
        boundaries: newSelBoundaries
    });
}

selectAssessment(e) {
    var assessmentId = $(e.currentTarget).closest('tr').prop('id');
    var newSelAssessments = this.state.assessments.slice();
    if (e.currentTarget.checked && jQuery.inArray(assessmentId, this.state.assessments) == -1) {
        assessments.push(assessmentId);
    }
    else {
        assessments.splice($.inArray(assessmentId, assessments), 1);
    }
    this.setState({
        assessments: newSelAssessments
    });
}

render() {
    let selBoundary = this.props.selectedBoundary;
    var children, childrenHTML;
    if (selBoundary) {
        console.log("Selected boundary is: ", selBoundary);
        children = this.props.boundariesByParentId[selBoundary.id];
        if (children) {
            //console.log("Boundary has children ", children);
            childrenHTML = children.map(id => {
                var details = this.props.boundaryDetails[id];
                return (<tr colSpan="2" id={details.id}>
                    <td style={tableCellStyle}>{details.name}</td>
                    <td><input type="checkbox" className="form-control no-border" onChange={this.selectBoundary} /></td>
                </tr>);
            });
        }
        else {
            //console.log("Boundary has no children ", selBoundary);
        }
    }

    let userlist;
    if (this.props.users) {
        userlist = Object.values(this.props.users).map(user => {
            if (user) {
                return (
                    <tr id={user.id}>
                        <td>{user.username}</td>
                        <td><input type="checkbox" className="form-control no-border" onChange={this.selectUser} /></td>

                    </tr>
                );
            }
        });
    }

    let assessmentList;
    if(this.props.assessmentsByBoundary && this.props.selectedBoundary) {
        var selectedAssessments = this.props.assessmentsByBoundary[this.props.selectedBoundary.id];
        if(selectedAssessments) {
            assessmentList = selectedAssessments.map(id => {
                var assess = this.props.assessmentsById[id];
                if(assess) {
                    return (
                        <tr id={assess.id}>
                            <td>{assess.name}</td>
                            <td><input type="checkbox" className="form-control no-border" onChange={this.selectAssessment} /></td>
                        </tr>
                    );
                }
            });
        }
    }
    return (
        <div>

            <div className="col-md-8">
                <h4 className="brand-blue">Assign Permissions</h4>
                <hr className="brand-blue" />
            </div>
            <div className="col-md-12">
                <div className="col-md-4">
                    <table className="table table-bordered table-striped table-responsive table-hover">
                        <tbody>
                            <tr colSpan="2" className="info">
                                <th colSpan="2">Boundary</th>
                            </tr>
                            {!this.props.selectedBoundary ? <tr><td><div className="bg-danger">Please click on a boundary in the left hand side to see boundaries here</div></td></tr> : childrenHTML}
                        </tbody>
                    </table>
                </div>
                <div className="col-md-4">

                    <table className="table table-bordered table-striped table-responsive table-hover">
                        <tbody>
                            <tr className="info" colSpan="2">
                                <th colSpan="2">User</th>
                            </tr>
                            {this.props.isLoading ? <tr><td> <i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>Loading...</td></tr> :
                                userlist}
                        </tbody>
                    </table>
                </div>
                <div className="col-md-4">
                    <table className="table table-bordered table-striped table-responsive table-hover">
                        <tbody>
                            <tr className="info" colSpan="2">
                                <th colSpan="2">Assessments</th>
                            </tr>
                            {!assessmentList ? <tr><td><div className="bg-danger">No assessments available</div></td></tr> : assessmentList}

                        </tbody>
                    </table>
                </div>
                <div className="col-md-12 pull-left">
                    <button type="button" className="btn btn-info all-padded-btn" data-toggle="tooltip">Assign Permissions to Boundaries</button>
                    <button type="button" className="btn btn-info all-padded-btn pull-right" data-toggle="tooltip">Assign Permissions to Assessments</button>
                </div>
               
            </div>
        </div>
    );
}
}

import React from 'react';
import * as actions from '../actions';
import { getEntityType, INSTITUTION, BOUNDARY } from '../reducers/utils';
import { permissionsAssignedToBound, permissionsFailed } from '../actions/notifications';
import Notifications from 'react-notification-system-redux';
import NoPermissions from './NoPermissions'

const theadStyle = {
    "background-color":"#D9EDF7",
}


export default class Permissions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            boundaries: [],
            users: [],
            assessments: [],
            disablePermsBoundaries: true,
            disablePermsAssess: true,
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
            newSelUsers.push(userId);
        }
        else
        {
            newSelUsers.splice($.inArray(userId, newSelUsers), 1);
        }
        var disableButton = true;
        //Check if we should enable the "assign permissions to boundaries" button
        if(newSelUsers.length>0 && this.state.boundaries.length > 0)
        {
            disableButton = false;
        }

        this.setState({
            users: newSelUsers,
            disablePermsBoundaries: disableButton,
            disablePermsAssess: this.enablePermsAssessBtn(newSelUsers, this.state.assessments),
        });
   }

   enablePermsAssessBtn(users, assess) {
       var disableButton = true;
       if(users.length > 0 && assess.length > 0){
           disableButton = false;
       }
       return disableButton;
   }

selectBoundary(e) {
    var boundaryId = $(e.currentTarget).closest('tr').prop('id');
    var newSelBoundaries = this.state.boundaries.slice();
    if (e.currentTarget.checked && jQuery.inArray(boundaryId, this.state.boundaries) == -1) {
        newSelBoundaries.push(boundaryId);
    }
    else {
        newSelBoundaries.splice($.inArray(boundaryId, newSelBoundaries), 1);
    }
     var disableButton = true;
    //Check if we should enable the "assign permissions to boundaries" button
    if(this.state.users.length>0 && newSelBoundaries.length > 0)
    {
        disableButton = false;
    }
    this.setState({
        boundaries: newSelBoundaries,
        disablePermsBoundaries: disableButton,
    });
}

selectAssessment(e) {
    var assessmentId = $(e.currentTarget).closest('tr').prop('id');
    var newSelAssessments = this.state.assessments.slice();
    if (e.currentTarget.checked && jQuery.inArray(assessmentId, this.state.assessments) == -1) {
        newSelAssessments.push(assessmentId);
    }
    else {
        newSelAssessments.splice($.inArray(assessmentId, newSelAssessments), 1);
    }
    this.setState({
        assessments: newSelAssessments,
        disablePermsAssess: this.enablePermsAssessBtn(this.state.users, newSelAssessments),

    });
}

assignPermsToBoundaries()
{
    var users = this.state.users;
    var boundaries = this.state.boundaries;
    const options = {};
    if(getEntityType(boundaries[0] == BOUNDARY)) {
        options.boundary_id = boundaries[0];
    }
    else {
        options.institution_id = boundaries[0];
    }
    const result = users.map(user => {
      return this.props.dispatch(actions.assignPermsToUser(options,user));
    });
  Promise.all(result)
    .then(() => {
      this.props.dispatch(Notifications.success(permissionsAssignedToBound));
      this.setState({
          users:[],
          boundaries:[],
          assessments:[],
      })
    }).catch(reason => {
        this.props.dispatch(Notifications.error(permissionsFailed));
    });
}

assignPermsToAssessments() {
    var users = this.state.users;
    var assess = this.state.assessments;
    const options = {
        assessment_id: assess[0]
    }
    const result = users.map(user => {
        return this.props.dispatch(actions.assignPermsToUser(options, user));
    });
    Promise.all(result)
    .then(() => {
      this.props.dispatch(Notifications.success(permissionsAssignedToBound));
      this.setState({
          users:[],
          boundaries:[],
          assessments:[],
      })
    }).catch(reason => {
        this.props.dispatch(Notifications.error(permissionsFailed));
    });

}

render() {
    if (sessionStorage.getItem('isAdmin') == null) {
      return (
        <NoPermissions />
      );
    }

    let selBoundary = this.props.selectedBoundary;
    var children, childrenHTML;
    if (selBoundary) {
        //console.log("Selected boundary is: ", selBoundary);
        children = this.props.boundariesByParentId[selBoundary.id];
        if (children) {
            //console.log("Boundary has children ", children);
            childrenHTML = children.map(id => {
                var details = this.props.boundaryDetails[id];
                return (<tr colSpan="2" id={details.id}>
                    <td width="70%">{details.name}</td>
                    <td width="30%"><input type="checkbox" className="no-border" onChange={this.selectBoundary} checked={jQuery.inArray(details.id.toString(),this.state.boundaries)>-1} /></td>
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
                        <td width="70%">{user.username}</td>
                        <td width="30%"><input type="checkbox" className=" no-border" onChange={this.selectUser} checked={jQuery.inArray(user.id.toString(),this.state.users)>-1}/></td>

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
                            <td width="70%">{assess.name}</td>
                            <td width="30%"><input type="checkbox" className="no-border" onChange={this.selectAssessment} checked={jQuery.inArray(assess.id.toString(),this.state.assessments)>-1}/></td>
                        </tr>
                    );
                }
            });
        }
    }
    var selectionState = 1;
    var boundaryHelpMessage;
    if(!this.props.selectedBoundary) {
        boundaryHelpMessage = "Please click on a boundary in the left hand side to see boundaries here";
    }
    else if(!childrenHTML || (childrenHTML && childrenHTML.length == 0)) {
        selectionState =2;
        boundaryHelpMessage = "No boundaries or institutions under selected boundary";
    }
    else
        selectionState=3;
    return (
        <div className="container-fluid">

            <div className="col-md-12">
                <h4 className="text-primary">Assign Permissions</h4>
                <div className="base-spacing-sm border-base"></div>
                <div className="base-spacing-mid"></div>
            </div>
            <div className="col-md-12">
                <div className="col-md-4">
                    <table className="table table-fixedheader table-striped table-responsive table-hover">
                        <thead style={theadStyle}>
                            <tr colSpan="2" className="info">
                                <th colSpan="2" width="100%">Boundary</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectionState == 1 ? <tr><td className="danger">{boundaryHelpMessage}</td></tr> : childrenHTML}
                            {selectionState == 2 ? <tr><td className="danger">{boundaryHelpMessage}</td></tr> : childrenHTML}

                        </tbody>
                    </table>
                </div>
                <div className="col-md-4">

                    <table className="table table-fixedheader table-striped table-responsive table-hover">
                        <thead style={theadStyle}>
                            <tr className="info" colSpan="2">
                                <th colSpan="2" width="100%">User</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.isLoading ? <tr><td> <i className="fa fa-cog fa-spin fa-lg fa-fw"></i>Loading...</td></tr> :
                                userlist}
                        </tbody>
                    </table>
                </div>
                <div className="col-md-4">
                    <table className="table table-fixedheader table-striped table-responsive table-hover">
                        <thead style={theadStyle}>
                            <tr className="info" colSpan="2">
                                <th colSpan="2" width="100%">Assessments</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!assessmentList || assessmentList.length == 0 ? <tr><td><div className="bg-danger">No assessments available</div></td></tr> : assessmentList}

                        </tbody>
                    </table>
                </div>
                <div className="col-md-12 pull-left">
                    <button type="button" className="btn btn-info all-padded-btn" data-toggle="tooltip" onClick={this.assignPermsToBoundaries.bind(this)} disabled={this.state.disablePermsBoundaries}>Assign Permissions to Boundaries</button>
                    <button type="button" className="btn btn-info all-padded-btn pull-right" data-toggle="tooltip" onClick={this.assignPermsToAssessments.bind(this)} disabled={this.state.disablePermsAssess}>Assign Permissions to Assessments</button>
                </div>

            </div>
        </div>
    );
}
}

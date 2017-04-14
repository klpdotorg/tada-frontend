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

export default class FilterByProgram extends React.Component {
render(){
		return (
			<div>
        <table className="table table-bordered table-striped">
        <tbody>
          <tr className="info">
            <th style={{width:"10%"}}>StudentID</th>
            <th style={{width:"10%"}}>Name</th>
            <th style={{width:"60%"}}>End Date</th>
            <th style={{width:"10%"}}></th>
            <th style={{width:"10%"}}></th>
          </tr>
        </tbody>
        </table>
			</div>
		);
	}
}

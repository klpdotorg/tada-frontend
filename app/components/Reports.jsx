import React from 'react';
import FRC from 'formsy-react-components';
import Formsy from 'formsy-react';
import  * as actions from '../actions';
import { REPORTS_EMAIL } from 'config';
import Notifications from 'react-notification-system-redux';

const { Input} = FRC;

export default class Reports extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            sendReportEnabled: false,
        }
        this.sendFullMonthReport = this.sendFullMonthReport.bind(this);
    }

    enableSendReportBtn() {
        this.setState({
            sendReportEnabled: true,
        })
    }

    disableSendReportBtn() {
        this.setState({
            sendReportEnabled: false,
        })
    }

    componentDidMount() 
    {
        //init all tooltips
       // $('[data-toggle="tooltip"]').tooltip();
    }

    sendFullMonthReport() {
        console.log("Send full month report");
        this.props.dispatch(actions.sendFullReport(REPORTS_EMAIL)).then(() => {
            this.props.dispatch(Notifications.success({
                ...actions.baseNotification,
                title: 'Report generated',
                message: 'Report has been e-mailed to ' + REPORTS_EMAIL + " ! "
                }));
        }).catch(error => {
            this.props.dispatch(Notifications.error({
                ...actions.baseNotification,
                title: 'Reports error',
                message: 'There was an error with generating and emailing reports. Kindly check logs or talk to support!'
            }));
        });
    }

    sendReportForDateRange() {
        this.props.dispatch(actions.sendFilteredReport(this.startDate.getValue(), this.endDate.getValue(), REPORTS_EMAIL))
        .then(()=> {
             this.props.dispatch(Notifications.success({
                ...actions.baseNotification,
                title: 'Report generated',
                message: 'Report for the selected date range has been e-mailed to ' + REPORTS_EMAIL + " ! "
                }));
        }).catch(error => {
            this.props.dispatch(Notifications.error({
                ...actions.baseNotification,
                title: 'Reports error',
                message: 'There was an error with generating and emailing reports for the selected date range. Kindly check logs or talk to support!'
            }));
        });
    }

    render() {
        let dateicon = (<i className="fa fa-calendar" aria-hidden="true"></i>);

        return (
            <div>
                <h4 className="heading-border-left brand-blue">DEO REPORTS</h4>
                <div className="row">
                    <button className="btn btn-primary all-padded-btn brand-orange-bg" data-toggle="tooltip" data-placement="right" title="Click this to get a full report for the present month for all DEOs"  onClick={this.sendFullMonthReport}>Get Monthly Report</button>
                </div>
                <div className="row">
                    <h4> OR select a date filter to apply to reports </h4>
                </div>
                <div className="row col-md-8">
                <Formsy.Form onValidSubmit={this.getReport}
                                onValid={this.enableSendReportBtn.bind(this)}
                            onInvalid={this.disableSendReportBtn.bind(this)}
                            ref={(ref) => this.myform = ref}>
                        <Input name="startDate"
                            id="startDate"
                            label="Start Date :" type="date"
                            className="form-control col-md-4"
                            required 
                            ref={(input) => {this.startDate = input; }}
                            addonAfter={dateicon}
                            validations="minLength:1"/>
                        <Input name="endDate"
                            id="endDate"
                            label="End Date :" type="date"
                            className="form-control col-md-4"
                            required 
                            ref={(input) => {this.endDate = input; }}
                            addonAfter={dateicon}
                            validations={{
                                dateValidation: function (values, value) {
                                    values; // Other current values in form {foo: 'bar', 'number': 5}
                                    value; // 5
                                    return value > values.startDate ? true : 'End date has to be greater than start date'; // You can return an error
                                }
                            }}
                            validationErrors={{dateValidation: "End date has to be greater than start date"}}/>

                </Formsy.Form>
                </div>
              
                <button className="col-md-2 btn btn-primary brand-orange-bg" disabled={!this.state.sendReportEnabled} onClick={this.sendReportForDateRange.bind(this)}>Get Report</button>

            </div>
        );
    }
}
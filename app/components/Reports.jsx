import React from 'react';
import FRC from 'formsy-react-components';
import Formsy from 'formsy-react';

const { Input} = FRC;

export default class Reports extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            sendReportEnabled: false,
        }
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

    render() {
        let dateicon = (<i className="fa fa-calendar" aria-hidden="true"></i>);

        return (
            <div>
                <h4 className="heading-border-left brand-blue">DEO REPORTS</h4>
                <div className="row">
                    <button className="btn btn-primary all-padded-btn brand-orange-bg" data-toggle="tooltip" data-placement="right" title="Click this to get a full report for the present month for all DEOs">Get Monthly Report</button>
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
                            addonAfter={dateicon}
                            validations="minLength:1"/>
                        <Input name="endDate"
                            id="endDate"
                            label="End Date :" type="date"
                            className="form-control col-md-4"
                            required 
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
              
                <button className="col-md-2 btn btn-primary brand-orange-bg" disabled={!this.state.sendReportEnabled}>Get Report</button>

            </div>
        );
    }
}
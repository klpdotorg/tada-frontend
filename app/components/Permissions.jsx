import React from 'react';
import * as actions from '../actions';

export default class Permissions extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        //Reset the nav tree to a pristine state
       // this.props.dispatch(actions.collapseAllNodes());
    }

    render() {
        return (
            <div>

                <div className="col-md-8">
                    <h4 className="brand-blue">Assign Permissions</h4>
                    <hr className="brand-blue" />
                </div>
                <div className="col-md-12">
                    <div className="col-md-4">
                        <table className="table table-bordered table-striped">
                            <tbody>
                                <tr className="info">
                                    <th>Boundary</th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="col-md-4">
                        <table className="table table-bordered table-striped">
                            <tbody>
                                <tr className="info">
                                    <th>User</th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="col-md-4">
                        <table className="table table-bordered table-striped">
                            <tbody>
                                <tr className="info">
                                    <th>Assessments</th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}
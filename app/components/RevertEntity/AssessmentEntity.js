import React, { Component } from 'react';

class AssessmentEntity extends Component {
  handleAssessmentEntity = () => {
    console.log('Handle Assessment Entity');
  };

  render() {
    return (
      <table className="table table-condensed table-fixedwidth">
        <thead>
          <tr className="text-primary text-uppercase">
            <th>ID</th>
            <th>Name</th>
            <th>Revert</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>12</td>
            <td>Pankaj Thakur</td>
            <td>
              <button
                className="btn btn-primary padded-btn"
                data-toggle="tooltip"
                title="Revert"
                onClick={this.handleAssessmentEntity}
              >
                <i className="fa fa-undo" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default AssessmentEntity;

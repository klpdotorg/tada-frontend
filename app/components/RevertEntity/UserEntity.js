import React, { Component } from 'react';

class UserEntity extends Component {
  handleUserEntity = () => {
    console.log('Handle user entity');
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
                onClick={this.handleUserEntity}
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

export default UserEntity;

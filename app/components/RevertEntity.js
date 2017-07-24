import React, { Component } from 'react';
import RevertEntityTabs from './RevertEntity/RevertEntityTabs';
import ShowSelectedEntity from './RevertEntity/ShowSelectedEntity';

class RevertEntity extends Component {
  componentDidMount = () => {
    console.log(this.props.params);
  };

  render() {
    const { params, dispatch } = this.props;

    return (
      <div>
        <RevertEntityTabs activeTab={params.entityName} />
        <ShowSelectedEntity selectedEntity={params.entityName} dispatch={dispatch} />
      </div>
    );
  }
}

export default RevertEntity;

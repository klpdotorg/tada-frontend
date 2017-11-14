import React from 'react';
import PropTypes from 'prop-types';

import { Loading } from '../../components/common';

const ViewSelectedProgram = (props) => {
  const { selectedProgram } = props;
  if (!selectedProgram) {
    return (
      <div className="row text-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="bg-faded">
      <h4 className="text-primary">Program Details</h4>
      <div className="base-spacing-sm border-base" />
      <div className="base-spacing-mid" />
      <div className="row center-block">
        <div className="col-md-8 pull-left">
          <div className="row">
            <h5 className="col-md-4">
              <span className="text-primary">
                <strong>Program name: </strong>
              </span>
              {selectedProgram.name}
            </h5>
          </div>
          <div className="row">
            <h5 className="col-md-4">
              <span className="text-primary">
                <strong>Description: </strong>
              </span>
              {selectedProgram.description}
            </h5>
          </div>
        </div>

        <div className="col-md-4 pull-right">
          <button type="button" className="btn btn-info" onClick={props.openEditProgramModal}>
            <span className="fa fa-pencil-square-o" />Edit
          </button>
          <button
            type="button"
            className="btn btn-info padded-btn"
            onClick={props.openConfirmModal}
            disabled={false}
          >
            Deactivate
          </button>
          <button
            type="button"
            className="btn btn-info padded-btn"
            onClick={props.showDeleteModal}
            disabled={false}
          >
            <span className="fa fa-trash-o" /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

ViewSelectedProgram.propTypes = {
  openConfirmModal: PropTypes.func,
  showDeleteModal: PropTypes.func,
  openEditProgramModal: PropTypes.func,
  selectedProgram: PropTypes.object,
};

export { ViewSelectedProgram };

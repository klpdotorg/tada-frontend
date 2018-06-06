import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Loading } from '../common';
import {
  AssessmentEntryColHeader,
  AssessmentEntryRow,
  CreateEntryForm,
  CreateEntryRow,
} from '../../containers/AssessmentEntry';

const RenderForm = (props) => {
  const { loading, params, uniqueId, rows, boundaryInfo, elements } = props;

  if (loading) {
    return <tbody />;
  }

  if (!rows.length) {
    return (
      <CreateEntryForm
        assessmentId={params.questionGroupId}
        uniqueId={uniqueId}
        boundaryInfo={boundaryInfo}
      />
    );
  }

  return (
    <tbody>
      {rows.map((rowId) => {
        return (
          <AssessmentEntryRow
            rowId={rowId}
            key={rowId}
            assessmentId={params.questionGroupId}
            uniqueId={uniqueId}
            boundaryInfo={boundaryInfo}
          />
        );
      })}
      {[...Array(elements).keys()].map((element) => {
        return (
          <CreateEntryRow
            key={element}
            assessmentId={params.questionGroupId}
            uniqueId={uniqueId}
            boundaryInfo={boundaryInfo}
          />
        );
      })}
    </tbody>
  );
};

class AssessmentEntryFormView extends Component {
  constructor() {
    super();

    this.state = {
      elements: 0,
    };

    this.addRow = this.addRow.bind(this);
  }

  addRow() {
    this.setState({
      elements: this.state.elements + 1,
    });
  }

  render() {
    const { elements } = this.state;
    const { loading, rows } = this.props;
    const disabled = elements >= 1 || !rows.length;

    return (
      <div>
        <button
          disabled={disabled}
          onClick={() => {
            this.addRow();
          }}
          className="btn btn-primary"
          style={{ float: 'right', marginBottom: 20 }}
        >
          Add Row
        </button>
        <div className="answer-table">
          <table className="table table-striped">
            <thead>
              <AssessmentEntryColHeader />
            </thead>
            <RenderForm {...this.props} elements={elements} />
          </table>
          {loading ? (
            <div style={{ textAlign: 'center', paddingBottom: 10 }}>
              <Loading />
            </div>
          ) : (
            <div />
          )}
        </div>
      </div>
    );
  }
}

AssessmentEntryFormView.propTypes = {
  loading: PropTypes.bool,
  rows: PropTypes.array,
};

RenderForm.propTypes = {
  loading: PropTypes.bool,
  rows: PropTypes.array,
  params: PropTypes.object,
  uniqueId: PropTypes.any,
  boundaryInfo: PropTypes.object,
  elements: PropTypes.number,
};

export { AssessmentEntryFormView };

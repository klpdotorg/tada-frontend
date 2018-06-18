import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Loading, Message } from '../common';
import {
  AssessmentEntryColHeader,
  AssessmentEntryRow,
  CreateEntryForm,
  CreateEntryRow,
} from '../../containers/AssessmentEntry';

const RenderForm = (props) => {
  const { loading, params, uniqueId, rows, boundaryInfo, elements, noQuestions } = props;

  if (loading || noQuestions) {
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
    const { loading, rows, noQuestions } = this.props;
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
          <table className="table table-striped" style={{ marginBottom: 0 }}>
            <thead>
              <AssessmentEntryColHeader />
            </thead>
            <RenderForm {...this.props} elements={elements} />
          </table>
          {loading ? (
            <div style={{ textAlign: 'center', paddingBottom: 10, paddingTop: 10 }}>
              <Loading />
            </div>
          ) : (
            <div />
          )}
          {!loading && noQuestions ? (
            <Message message="This Question group has no questions." style={{ padding: 10 }} />
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
  noQuestions: PropTypes.bool,
};

RenderForm.propTypes = {
  loading: PropTypes.bool,
  rows: PropTypes.array,
  params: PropTypes.object,
  uniqueId: PropTypes.any,
  boundaryInfo: PropTypes.object,
  elements: PropTypes.number,
  noQuestions: PropTypes.bool,
};

export { AssessmentEntryFormView };

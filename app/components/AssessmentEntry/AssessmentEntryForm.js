import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash.isempty';

import { Loading, Message } from '../common';
import {
  AssessmentEntryColHeader,
  AssessmentEntryRow,
  CreateEntryForm,
  CreateEntryRow,
  Header,
} from '../../containers/AssessmentEntry';

const RenderForm = (props) => {
  const { loading, params, uniqueId, rows, boundaryInfo, elements, noQuestions, canView } = props;

  if (loading || noQuestions || !canView) {
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
    const { loading, rows, noQuestions, params, canView, error } = this.props;
    const disabled = elements >= 1 || !rows.length;
    const { districtId, blockId, clusterId, institutionId, studentGroupId } = params;

    return (
      <div>
        <Header
          addRow={this.addRow}
          disabled={disabled}
          entityIds={[districtId, blockId, clusterId, institutionId, studentGroupId]}
        />
        {!isEmpty(error) ? (
          <div className="alert alert-danger">
            {Object.keys(error).map((key) => {
              const value = error[key];
              return (
                <p key={key}>
                  <strong>{key}:</strong> {value[0]}
                </p>
              );
            })}
          </div>
        ) : (
          <span />
        )}
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
          {!loading && !canView ? (
            <Message message="You don't have permission to do this." style={{ padding: 10 }} />
          ) : (
            <div />
          )}
        </div>
      </div>
    );
  }
}

AssessmentEntryFormView.propTypes = {
  error: PropTypes.object,
  loading: PropTypes.bool,
  rows: PropTypes.array,
  noQuestions: PropTypes.bool,
  params: PropTypes.object,
  canView: PropTypes.bool,
};

RenderForm.propTypes = {
  loading: PropTypes.bool,
  rows: PropTypes.array,
  params: PropTypes.object,
  uniqueId: PropTypes.any,
  boundaryInfo: PropTypes.object,
  elements: PropTypes.number,
  noQuestions: PropTypes.bool,
  canView: PropTypes.bool,
};

export { AssessmentEntryFormView };

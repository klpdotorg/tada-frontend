import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash.isempty';
import flatten from 'lodash.flatten';

import { Loading, Message } from '../common';
import { AssessmentEntryColHeader, Header } from '../../containers/AssessmentEntry';
import {
  AssessmentEntryRow,
  CreateEntryRow,
  Pagination,
} from '../../containers/StudentAssessmentEntry';

const RenderForm = (props) => {
  const { loading, params, uniqueId, rows, boundaryInfo, canView, noQuestions } = props;

  if (loading || noQuestions || !canView || isEmpty(boundaryInfo.students)) {
    return <tbody />;
  }
  return (
    <tbody>
      {flatten(boundaryInfo.students.map((Id) => {
          if (!isEmpty(rows[Id])) {
            const keys = Object.keys(rows[Id]);
            return keys.map((rowId) => {
              const row = rows[Id][rowId];
              return (
                <AssessmentEntryRow
                  rowId={rowId}
                  row={row}
                  key={rowId}
                  assessmentId={params.questionGroupId}
                  uniqueId={uniqueId}
                  boundaryInfo={boundaryInfo}
                  boundaryId={row.student}
                />
              );
            });
          }

          return (
            <CreateEntryRow
              key={Id}
              boundaryId={Id}
              assessmentId={params.questionGroupId}
              uniqueId={uniqueId}
              boundaryInfo={boundaryInfo}
            />
          );
        }))}
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
    const { loading, rows, params, noQuestions, canView, error, boundaryInfo } = this.props;
    const { districtId, blockId, clusterId, institutionId, studentGroupId } = params;
    const disabled = elements >= 1 || !rows.length;

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
          <table className="table table-striped header-fixed" style={{ marginBottom: 0 }}>
            <thead>
              <AssessmentEntryColHeader
                assessmentId={params.questionGroupId}
                boundaryType={boundaryInfo.boundaryType}
              />
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
          {!loading && isEmpty(boundaryInfo.students) ? (
            <Message message="This Student Group has no Students" style={{ padding: 10 }} />
          ) : (
            <div />
          )}
        </div>
        <Pagination params={boundaryInfo} />
      </div>
    );
  }
}

AssessmentEntryFormView.propTypes = {
  error: PropTypes.object,
  loading: PropTypes.bool,
  rows: PropTypes.object,
  params: PropTypes.object,
  canView: PropTypes.bool,
  noQuestions: PropTypes.bool,
  boundaryInfo: PropTypes.object,
};

RenderForm.propTypes = {
  loading: PropTypes.bool,
  rows: PropTypes.object,
  params: PropTypes.object,
  uniqueId: PropTypes.any,
  boundaryInfo: PropTypes.object,
  canView: PropTypes.bool,
  noQuestions: PropTypes.bool,
};

export { AssessmentEntryFormView };

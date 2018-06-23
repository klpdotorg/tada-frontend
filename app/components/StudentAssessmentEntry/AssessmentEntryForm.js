import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash.isempty';
import flatten from 'lodash.flatten';

import { Loading } from '../common';
import { AssessmentEntryColHeader, Header } from '../../containers/AssessmentEntry';
import { AssessmentEntryRow, CreateEntryRow } from '../../containers/StudentAssessmentEntry';

const RenderForm = (props) => {
  const { loading, params, uniqueId, rows, boundaryInfo } = props;
  if (loading) {
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
    const { loading, rows, params } = this.props;
    const { districtId, blockId, clusterId, institutionId, studentGroupId } = params;
    const disabled = elements >= 1 || !rows.length;

    return (
      <div>
        <Header
          addRow={this.addRow}
          disabled={disabled}
          entityIds={[districtId, blockId, clusterId, institutionId, studentGroupId]}
        />
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
  rows: PropTypes.object,
  params: PropTypes.object,
};

RenderForm.propTypes = {
  loading: PropTypes.bool,
  rows: PropTypes.object,
  params: PropTypes.object,
  uniqueId: PropTypes.any,
  boundaryInfo: PropTypes.object,
};

export { AssessmentEntryFormView };

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { map } from 'lodash';

const AssessmentEntryColHeaderView = ({ questions }) => {
  const values = Object.keys(questions);

  return (
    <tr className="bg-info">
      <td>UID</td>
      <td colSpan="2">Boundary Name</td>
      <td>Name</td>
      <td>Date of Visit</td>
      {map(values, (id, i) => {
        return <td key={id}>{i + 1}</td>;
      })}
      <td>Edit</td>
      <td>Save</td>
    </tr>
  );
};

AssessmentEntryColHeaderView.propTypes = {
  questions: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    questions: state.questions.questions,
  };
};

const AssessmentEntryColHeader = connect(mapStateToProps)(AssessmentEntryColHeaderView);

export { AssessmentEntryColHeader };

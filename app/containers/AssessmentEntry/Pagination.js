import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { PaginationView } from '../../components/AssessmentEntry';
import { answerPaginationBack, answerPaginationNext, answerPaginationChange } from '../../actions';

class SetCurrent extends Component {
  componentDidMount() {
    this.props.change(1, this.props.params);
  }

  render() {
    return <PaginationView {...this.props} />;
  }
}

SetCurrent.propTypes = {
  change: PropTypes.func,
  params: PropTypes.object,
};

const mapStateToProps = (state) => {
  const { count, current } = state.answerPagination;

  return {
    count,
    current,
  };
};

const Pagination = connect(mapStateToProps, {
  goForward: answerPaginationNext,
  goBack: answerPaginationBack,
  change: answerPaginationChange,
})(PaginationView);

export { Pagination };

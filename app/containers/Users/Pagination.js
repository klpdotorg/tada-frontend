import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { PaginationView } from '../../components/Users';
import { userPaginationBack, userPaginationNext, userPaginationChange } from '../../actions';

class SetCurrent extends Component {
  componentDidMount() {
    this.props.change(1);
  }

  render() {
    return <PaginationView {...this.props} />;
  }
}

SetCurrent.propTypes = {
  change: PropTypes.func,
};

const mapStateToProps = (state) => {
  const { count, current } = state.pagination;

  return {
    count,
    current,
  };
};

const Pagination = connect(mapStateToProps, {
  goForward: userPaginationNext,
  goBack: userPaginationBack,
  change: userPaginationChange,
})(PaginationView);

export { Pagination };

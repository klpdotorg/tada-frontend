import React, { Component } from 'react';
import { getInactiveEntities, revertEntity } from '../../actions';
import { pagination } from './utils';

class Entity extends Component {
  state = {
    isLoading: true,
    entities: [],
    getFrom: 0,
    currentPage: 1,
    entityName: this.props.entityName,
    pageNumbers: 0,
  };

  componentDidMount = () => {
    this.fetchEntities(1, this.state.entityName);
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.entityName !== this.props.entityName) {
      this.setState({
        entityName: nextProps.entityName,
      });

      this.fetchEntities(1, nextProps.entityName);
    }
  };

  getFrom = currentPage => {
    const from = currentPage - 1;
    return from * 20;
  };

  fetchEntities = (currentPage, entityName) => {
    this.setState({
      isLoading: true,
    });

    getInactiveEntities(entityName, this.getFrom(currentPage)).then(response => {
      this.setState({
        entities: response.results,
        isLoading: false,
        pageNumbers: this.getPageNumbers(response.count),
      });
    });
  };

  handleProgramEntity = entity => {
    const { entityName, dispatch } = this.props;
    if (entityName == 'users') {
      entity.is_active = true;
    } else {
      entity.active = 2;
    }

    revertEntity(this.state.entityName, entity, dispatch).then(() => {
      this.fetchEntities(1, this.state.entityName);
    });
  };

  getPageNumbers = totalEntities => {
    const numPages = Math.ceil(totalEntities / 20);
    const pageArray = pagination(this.state.currentPage, numPages);

    return pageArray;
  };

  handlePage = currentPage => {
    this.setState({
      currentPage,
    });

    this.fetchEntities(currentPage, this.state.entityName);
  };

  renderEntity = entity =>
    <tr key={entity.id}>
      <td>
        {entity.id}
      </td>
      <td>
        {entity.name || entity.username || `${entity.first_name} ${entity.last_name}`}
      </td>
      <td>
        <button
          className="btn btn-primary padded-btn"
          data-toggle="tooltip"
          title="Revert"
          onClick={this.handleProgramEntity.bind(null, entity)}
        >
          <i className="fa fa-undo" />
        </button>
      </td>
    </tr>;

  renderLoading = () =>
    <div className="text-center" style={{ marginTop: 30 }}>
      <i className="fa fa-cog fa-spin fa-lg fa-fw" />
      <span className="text-muted">Loading...</span>
    </div>;

  render() {
    if (this.state.isLoading) {
      return this.renderLoading();
    }

    return (
      <div style={{ marginTop: 30 }}>
        <table className="table table-condensed table-bordered table-striped table-fixedwidth">
          <thead>
            <tr className="text-primary text-uppercase">
              <th>ID</th>
              <th>Name</th>
              <th>Revert</th>
            </tr>
          </thead>
          <tbody>
            {this.state.entities.map(entity => this.renderEntity(entity))}
          </tbody>
        </table>
        {this.state.pageNumbers &&
          <nav aria-label="Page navigation" className="text-center">
            <ul className="pagination">
              <li>
                <a
                  onClick={() => this.handlePage(this.state.currentPage - 1)}
                  aria-label="Previous"
                >
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              {this.state.pageNumbers.map((item, i) => {
                if (item === '...') {
                  return (
                    <li key={i}>
                      <a>
                        {item}
                      </a>
                    </li>
                  );
                }

                return (
                  <li key={i}>
                    <a onClick={() => this.handlePage(item)}>
                      {item}
                    </a>
                  </li>
                );
              })}
              <li>
                <a onClick={() => this.handlePage(this.state.currentPage + 1)} aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>}
      </div>
    );
  }
}

export default Entity;

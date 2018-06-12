import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TreeView from 'react-treeview';
import has from 'lodash.has';
import get from 'lodash.get';

import { capitalize } from '../../utils';
import { filterBoundaries } from './utils';
import {
  collapsedProgramEntity,
  getProgramEntities,
  resetProgramNavTree,
  selectProgramAssessment,
  getPrograms,
  selectProgram,
  openFilterByProgramEntity,
} from '../../actions/';
import { Loading, Message } from '../../components/common';

class NavTree extends Component {
  componentDidMount() {
    // this.props.getPrograms();
    if (this.props.selectedProgram) {
      this.props.getProgramEntities([{ depth: 0, uniqueId: '1state' }]);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.selectedProgram !== nextProps.selectedProgram) {
      // this.props.getProgramEntities([{ depth: 0, uniqueId: '1state' }]);
    }
  }

  getTreeNodes(index) {
    const nodes = this.props.entitiesByParentId[index];

    if (nodes) {
      const updatedNodes = nodes.map((node) => {
        return { entity: this.props.entities[node], uniqueId: node };
      });

      if (index !== 0) {
        return updatedNodes;
      }

      const filterEntities = filterBoundaries(updatedNodes, this.props.selectedPrimary);

      return filterEntities;
    }

    return [];
  }

  renderSubTree(node, index, depth) {
    const { entity } = node;
    const newDepth = depth + 1;
    const treeNodes = this.getTreeNodes(newDepth);
    const collapsed = this.props.uncollapsed[newDepth] === node.uniqueId;
    const label =
      capitalize(entity.label) || capitalize(entity.name) || capitalize(entity.first_name);

    const contain = has(entity, ['assessment']);
    if (contain) {
      const id = get(entity, ['assessment', 'id'], '');

      return (
        <button
          key={node.uniqueId}
          onClick={() => {
            this.props.openBoundary(node.uniqueId, newDepth, id);
          }}
          className="filterbyprogram-link"
        >
          {label} ({entity.assessment.name})
        </button>
      );
    }

    return (
      <TreeView
        key={index}
        onClick={() => {
          this.props.getProgramEntities([
            {
              depth: newDepth,
              uniqueId: node.uniqueId,
            },
          ]);
        }}
        nodeLabel={label}
        collapsed={!collapsed}
      >
        {treeNodes.map((child, i) => {
          return this.renderSubTree(child, i + 1, newDepth);
        })}
        {!treeNodes.length && this.props.loading ? <Loading /> : <span />}
      </TreeView>
    );
  }

  renderBoundariesState(nodes) {
    if (this.props.loading && !nodes.length) {
      return <Loading />;
    }

    if (!nodes.length) {
      return <Message message="No Boundaries Found" />;
    }

    return (
      <div>
        {nodes.map((element, i) => {
          return this.renderSubTree(element, i, 0);
        })}
      </div>
    );
  }

  render() {
    const nodes = this.getTreeNodes(0);
    const { programLoading, selectedProgram, programs } = this.props;

    if (programLoading) {
      return <Loading />;
    }

    return (
      <div>
        <div className="form-group">
          <select
            className="form-control"
            onChange={(e) => {
              this.props.selectProgram(e.target.value);
              this.props.getProgramEntities([{ depth: 0, uniqueId: '1state' }]);
            }}
            value={selectedProgram}
          >
            {Object.keys(programs).map((Id) => {
              const program = programs[Id];
              return (
                <option key={program.id} value={program.id}>
                  {program.name}
                </option>
              );
            })}
          </select>
        </div>
        {this.renderBoundariesState(nodes)}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { programs, loading } = state.programs;
  return {
    entities: state.programDetails.programDetails,
    entitiesByParentId: state.programDetails.entitiesByParentId,
    uncollapsed: state.programDetails.uncollapsedEntities,
    selectedProgram: Number(state.programs.selectedProgram),
    loading: state.appstate.loadingBoundary,
    selectedPrimary: state.schoolSelection.primarySchool,
    programs,
    programLoading: loading,
  };
};

NavTree.propTypes = {
  getProgramEntities: PropTypes.func,
  uncollapsed: PropTypes.object,
  entitiesByParentId: PropTypes.object,
  entities: PropTypes.object,
  selectedProgram: PropTypes.number,
  openBoundary: PropTypes.func,
  loading: PropTypes.bool,
  selectedPrimary: PropTypes.bool,
  programLoading: PropTypes.bool,
  programs: PropTypes.object,
  selectProgram: PropTypes.func,
};

const ProgramNavTree = connect(mapStateToProps, {
  collapsedProgramEntity,
  getProgramEntities,
  resetProgramNavTree,
  selectProgramAssessment,
  getPrograms,
  selectProgram,
  openBoundary: openFilterByProgramEntity,
})(NavTree);

export { ProgramNavTree };

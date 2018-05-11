import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TreeView from 'react-treeview';
import { Link } from 'react-router';
import { has, map } from 'lodash';

import { capitalize } from '../../utils';
import { filterBoundaries } from './utils';
import {
  collapsedProgramEntity,
  getFilterByProgramEntites,
  resetProgramNavTree,
  selectProgramAssessment,
  getPrograms,
  selectProgram,
} from '../../actions/';
import { Loading, Message } from '../../components/common';

class NavTree extends Component {
  componentDidMount() {
    this.props.getPrograms();
    if (this.props.selectedProgram) {
      this.props.getFilterByProgramEntites({ depth: 0, uniqueId: 1 });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedProgram !== this.props.selectedProgram) {
      this.props.resetProgramNavTree();
      this.props.getFilterByProgramEntites({ depth: 0, uniqueId: 1 });
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
      const path = `/filterprograms/questiongroups/${entity.assessment
        .id}/institutions/${node.uniqueId}`;

      return (
        <Link key={node.uniqueId} to={path}>
          <span>
            {label} ({entity.assessment.name})
          </span>
          <br />
        </Link>
      );
    }

    return (
      <TreeView
        key={index}
        onClick={() => {
          this.props.getFilterByProgramEntites({
            id: entity.id,
            depth: newDepth,
            uniqueId: node.uniqueId,
          });
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

  renderBoundariesState(length) {
    if (this.props.loading && !length) {
      return <Loading />;
    }

    if (!length) {
      return <Message message="No Boundaries Found" />;
    }

    return <span />;
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
            }}
            value={selectedProgram}
          >
            {map(programs, (program) => {
              return (
                <option key={program.id} value={program.id}>
                  {program.name}
                </option>
              );
            })}
          </select>
        </div>
        {nodes.map((element, i) => {
          return this.renderSubTree(element, i, 0);
        })}
        {this.renderBoundariesState(nodes.length)}
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
  getFilterByProgramEntites: PropTypes.func,
  uncollapsed: PropTypes.object,
  entitiesByParentId: PropTypes.object,
  entities: PropTypes.object,
  selectedProgram: PropTypes.number,
  resetProgramNavTree: PropTypes.func,
  selectProgramAssessment: PropTypes.func,
  getPrograms: PropTypes.func,
  loading: PropTypes.bool,
  selectedPrimary: PropTypes.bool,
  programLoading: PropTypes.bool,
  programs: PropTypes.object,
  selectProgram: PropTypes.func,
};

const ProgramNavTree = connect(mapStateToProps, {
  collapsedProgramEntity,
  getFilterByProgramEntites,
  resetProgramNavTree,
  selectProgramAssessment,
  getPrograms,
  selectProgram,
})(NavTree);

export { ProgramNavTree };

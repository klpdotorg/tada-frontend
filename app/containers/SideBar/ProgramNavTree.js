import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TreeView from 'react-treeview';
import has from 'lodash.has';

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
  selectAssessmentNode,
  selectProgramEntity,
  resetFilterByProgramRoute,
} from '../../actions/';
import { Loading, Message } from '../../components/common';

class NavTree extends Component {
  componentDidMount() {
    const { params, selectedProgram, entityIdentity } = this.props;
    if (selectedProgram) {
      this.props.getProgramEntities([{ depth: 0, uniqueId: '1state' }]);
    }

    if (params.institutionId) {
      this.props.selectAssessmentNode(params[entityIdentity]);
      this.props.selectProgramEntity(`${params.questionGroupId}${params[entityIdentity]}`);
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
    const contain = has(entity, ['assessments']);
    if (contain) {
      const selectedId = Number(this.props.assessmentNode) !== Number(node.uniqueId);
      return (
        <TreeView
          key={node.uniqueId}
          nodeLabel={label}
          onClick={() => {
            this.props.selectAssessmentNode(node.uniqueId);
            this.props.openBoundary(node.uniqueId, newDepth);
          }}
          collapsed={selectedId}
        >
          {!selectedId &&
            node.entity.assessments.map((assessment) => {
              const selected = this.props.selectedEntityId === `${assessment.id}${node.uniqueId}`;

              return (
                <button
                  key={assessment.id}
                  onClick={() => {
                    this.props.openBoundary(node.uniqueId, newDepth, assessment.id);
                  }}
                  className="filterbyprogram-link"
                  style={selected ? { background: '#3379b7', color: 'white' } : {}}
                >
                  {assessment.name}
                </button>
              );
            })}
        </TreeView>
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
          this.props.openBoundary(node.uniqueId, newDepth);
        }}
        nodeLabel={label}
        collapsed={!collapsed}
      >
        {collapsed &&
          treeNodes.map((child, i) => {
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
              this.props.resetFilterByProgramRoute();
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
  const {
    programDetails,
    selectedEntityId,
    entitiesByParentId,
    uncollapsedEntities,
    assessmentNode,
  } = state.programDetails;

  return {
    entities: programDetails,
    entitiesByParentId,
    uncollapsed: uncollapsedEntities,
    selectedProgram: Number(state.programs.selectedProgram),
    loading: state.appstate.loadingBoundary,
    selectedPrimary: state.schoolSelection.primarySchool,
    programs,
    programLoading: loading,
    selectedEntityId,
    assessmentNode,
  };
};

NavTree.propTypes = {
  getProgramEntities: PropTypes.func,
  selectedEntityId: PropTypes.any,
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
  assessmentNode: PropTypes.string,
  selectAssessmentNode: PropTypes.func,
  params: PropTypes.object,
  selectProgramEntity: PropTypes.func,
  entityIdentity: PropTypes.string,
};

const ProgramNavTree = connect(mapStateToProps, {
  collapsedProgramEntity,
  getProgramEntities,
  resetProgramNavTree,
  selectProgramAssessment,
  getPrograms,
  selectProgram,
  selectAssessmentNode,
  openBoundary: openFilterByProgramEntity,
  selectProgramEntity,
  resetFilterByProgramRoute,
})(NavTree);

export { ProgramNavTree };

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TreeView from 'react-treeview';
import { Link } from 'react-router';

import { capitalize, getEntityType } from '../../utils';
import {
  collapsedProgramEntity,
  getFilterByProgramEntites,
  resetProgramNavTree,
  selectProgramAssessment,
} from '../../actions/';
import { Loading } from '../../components/common';

class NavTree extends Component {
  componentDidMount() {
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
      return nodes.map((node) => {
        return { entity: this.props.entities[node], uniqueId: node };
      });
    }

    return [];
  }

  renderSubTree(node, index, depth) {
    const { entity } = node;
    const newDepth = depth + 1;
    const type = getEntityType(entity);
    const treeNodes = this.getTreeNodes(newDepth);
    const collapsed = this.props.uncollapsed[newDepth] === node.uniqueId;
    const label =
      capitalize(entity.label) || capitalize(entity.name) || capitalize(entity.first_name);

    if (type === 'assessment') {
      return (
        <Link key={node.uniqueId}>
          <span
            className="node"
            onClick={() => {
              this.props.selectProgramAssessment(entity.id, depth);
            }}
          >
            {label}
          </span>
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

  render() {
    const nodes = this.getTreeNodes(0);

    return (
      <div>
        {nodes.map((element, i) => {
          return this.renderSubTree(element, i, 0);
        })}
        {!nodes.length && this.props.loading ? <Loading /> : <span />}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    entities: state.programDetails.programDetails,
    entitiesByParentId: state.programDetails.entitiesByParentId,
    uncollapsed: state.programDetails.uncollapsedEntities,
    selectedProgram: Number(state.programs.selectedProgram),
    loading: state.appstate.loadingBoundary,
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
  loading: PropTypes.bool,
};

const ProgramNavTree = connect(mapStateToProps, {
  collapsedProgramEntity,
  getFilterByProgramEntites,
  resetProgramNavTree,
  selectProgramAssessment,
})(NavTree);

export { ProgramNavTree };

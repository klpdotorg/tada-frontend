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
} from '../../actions/';

class NavTree extends Component {
  componentDidMount() {
    if (this.props.selectedProgram) {
      this.props.getFilterByProgramEntites({ depth: 0 });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedProgram !== this.props.selectedProgram) {
      this.props.resetProgramNavTree();
      this.props.getFilterByProgramEntites({ depth: 0, id: 1 });
    }
  }

  getTreeNodes(index) {
    const nodes = this.props.entitiesByParentId[index];

    if (nodes) {
      return nodes.map((node) => {
        return this.props.entities[node];
      });
    }

    return [];
  }

  renderSubTree(node, index, depth) {
    const newDepth = depth + 1;

    const type = getEntityType(node);
    const treeNodes = this.getTreeNodes(newDepth);
    const collapsed = this.props.uncollapsed[newDepth] === node.id;
    const label = capitalize(node.label) || capitalize(node.name) || capitalize(node.first_name);

    if (type === 'assessment') {
      const path = `/filterprograms/${type}/${node.id}`;

      return (
        <Link key={node.name || node.id} to={path}>
          <span
            className="node"
            onClick={() => {
              // this.props.onBoundaryClick(boundary, depth);
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
          // this.props.collapsedProgramEntity(node.id);
          this.props.getFilterByProgramEntites({ id: node.id, depth: newDepth });
        }}
        nodeLabel={label}
        collapsed={!collapsed}
      >
        {treeNodes.map((child, i) => {
          return this.renderSubTree(child, i + 1, newDepth);
        })}
      </TreeView>
    );
  }

  render() {
    return (
      <div>
        {this.getTreeNodes(0).map((element, i) => {
          return this.renderSubTree(element, i, 0);
        })}
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
  };
};

NavTree.propTypes = {
  getFilterByProgramEntites: PropTypes.func,
  uncollapsed: PropTypes.object,
  entitiesByParentId: PropTypes.object,
  entities: PropTypes.object,
  selectedProgram: PropTypes.number,
  resetProgramNavTree: PropTypes.func,
};

const ProgramNavTree = connect(mapStateToProps, {
  collapsedProgramEntity,
  getFilterByProgramEntites,
  resetProgramNavTree,
})(NavTree);

export { ProgramNavTree };

import React, { Component } from 'react';
import TreeView from 'react-treeview';
import { Link } from 'react-router';
import { alphabeticalOrder } from '../utils';
import _ from 'lodash';
import {
  fetchBoundaryDetails,
  boundaryClicked,
  fetchAllPrograms,
  fetchStudents,
  getProgramDetails,
} from '../actions/';
import { getEntityType, getBoundaryType, CLUSTER } from '../reducers/utils';
let programId = '';
let assessmentId = '';
let InstitutionId = '';

export default class PermissionsNavTree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedEntities: [],
      programsById: {},
      programs: [],
      isLoading: true,
    };

    this.onBoundarySelection = this.onBoundarySelection.bind(this);
    this.handleProgramSelection = this.handleProgramSelection.bind(this);
  }

  componentDidMount() {
    this.props
      .dispatch(fetchAllPrograms())
      .then(() => {
        const programs = Object.values(this.props.programsById).map(program => program.id);

        this.setState({
          isLoading: false,
          treeLoading: true,
          programsById: this.props.programsById,
          programs,
          selectedProgram: programs[0],
        });
      })
      .then(() => {
        return this.props.dispatch(getProgramDetails(this.state.selectedProgram));
      })
      .then(() => {
        this.setState({
          treeLoading: false,
        });
      });
  }

  toggleNode(boundary) {
    this.props.dispatch({ type: 'TOGGLE_PROGRAM_NODE', id: boundary.id });
  }

  handleProgramSelection(e) {
    const id = e.target.value;
    this.setState({
      selectedProgram: id,
      treeLoading: true,
    });
    this.props.dispatch(getProgramDetails(id)).then(() => {
      this.setState({
        treeLoading: false,
      });
    });
  }

  onBoundarySelection(id) {
    this.props.dispatch(selectProgramBoundary(id));
  }

  renderSubTree(node, boundaryHierarchy, visitedBoundaries, depth, boundaryDetails) {
    // const boundaryDetails = this.props.boundaryDetails;
    //if boundary details not defined for node, most likely we don't want it rendered in this filtered tree..
    if (!boundaryDetails[node]) {
      console.log('Boundary details undefined for node', node);
      return null;
    }

    if (boundaryDetails[node].collapsed == false && boundaryDetails[node].depth >= 2) {
      // console.log(this.props);
      let assessmentId = boundaryDetails[node].assessment_id;
      // console.log(boundaryDetails[node])
      if (boundaryDetails[node].depth == 3) {
        InstitutionId = boundaryDetails[node].id;
        // console.log("InstitutionId====================>"+InstitutionId);
      }
      if (boundaryDetails[node].depth == 4) {
        console.log('Class Id ==========' + boundaryDetails[node].id);
        return this.props.dispatch(fetchStudents(boundaryDetails[node].id, InstitutionId));
      }
    }

    if (boundaryDetails[node].depth == depth && depth < 6) {
      if (node) {
        var children = boundaryHierarchy[node];
        visitedBoundaries.push(node);

        var boundary = boundaryDetails[node];
        const label = (
          <span
            className="node"
            onClick={() => {
              this.onBoundarySelection(boundary.id);
            }}
          >
            {' '}
            {_.capitalize(boundary.label) ||
              _.capitalize(boundary.name) ||
              _.capitalize(boundary.first_name)}
            {' '}
          </span>
        );
        return (
          <TreeView
            key={Math.random()}
            onClick={() => this.toggleNode(boundary)}
            nodeLabel={label}
            collapsed={boundary.collapsed}
          >
            {(() => {
              if (children && children.length > 0) {
                ++depth;
                return children.map((child, i) => {
                  return this.renderSubTree(
                    child,
                    boundaryHierarchy,
                    visitedBoundaries,
                    depth,
                    boundaryDetails,
                  );
                });
              }
            })()}
          </TreeView>
        );
      }
    }
    return null;
  }

  render() {
    let visitedBoundaries = [];
    const programs = this.state.programsById;
    const { boundaries } = this.props;
    // console.log(this.state.selectedProgram);
    programId = this.state.selectedProgram;
    const programsList = this.state.programs.map(id => {
      return <option key={id} value={id}>{programs[id].name}</option>;
    });
    const { parent, details } = this.props.boundaries;
    let { boundariesByParentId, boundaryDetails } = this.state;
    return this.state.isLoading
      ? <div>Loading...</div>
      : <div className="brand-orange">
          <select
            className="form-control"
            onChange={this.handleProgramSelection}
            value={this.state.selectedProgram}
          >
            {programsList}
          </select>
          {this.state.treeLoading
            ? <div>Loading...</div>
            : alphabeticalOrder(parent, details).map(
                function(element, i) {
                  return this.renderSubTree(element, parent, visitedBoundaries, 0, details);
                }.bind(this),
              )}
        </div>;
  }
}

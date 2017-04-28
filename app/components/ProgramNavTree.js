import React, { Component } from "react";
import TreeView from "react-treeview";
import { Link } from "react-router";
import { alphabeticalOrder } from "../utils";
import _ from "lodash";
import {
  fetchBoundaryDetails,
  boundaryClicked,
  fetchAllPrograms,
  getProgramDetails,
  fetchEntitiesFromServer
} from "../actions/";
import { getEntityType, getBoundaryType, CLUSTER } from "../reducers/utils";

export default class PermissionsNavTree extends React.Component {
  constructor(props) {
    super(props);
    const boundariesByParentId = {
      ...props.boundariesByParentId,
      ...props.boundaries.assessments
    };

    const boundaryDetails = {
      ...props.boundaryDetails,
      ...props.boundaries.assessmentsDetails
    };
    this.state = {
      selectedEntities: [],
      boundariesByParentId,
      boundaryDetails,
      programsById: {},
      programs: [],
      isLoading: true
    };

    this.onBoundarySelection = this.onBoundarySelection.bind(this);
    this.handleProgramSelection = this.handleProgramSelection.bind(this);
  }

  componentDidMount() {
    this.props
      .dispatch(fetchAllPrograms())
      .then(() => {
        const programs = Object.values(this.props.programsById).map(
          program => program.id
        );

        this.setState({
          isLoading: false,
          treeLoading: true,
          programsById: this.props.programsById,
          programs,
          selectedProgram: programs[0]
        });
      })
      .then(() => {
        return this.props.dispatch(
          getProgramDetails(this.state.selectedProgram)
        );
      })
      .then(() => {
        this.setState({
          treeLoading: false
        });
      });
  }

  componentWillReceiveProps(nextProps) {
    const boundariesByParentId = {
      ...nextProps.boundariesByParentId,
      ...nextProps.boundaries.assessments,
      ...this.state.boundariesByParentId
    };

    const boundaryDetails = {
      ...nextProps.boundaryDetails,
      ...nextProps.boundaries.assessmentsDetails,
      ...this.state.boundaryDetails
    };

    this.setState({
      boundariesByParentId,
      boundaryDetails
    });
  }

  toggleNode(boundary) {
    if (boundary.depth !== 4 && boundary.depth !== 3) {
      this.props.dispatch(fetchEntitiesFromServer(boundary.id));
    }
    boundary.collapsed = !boundary.collapsed;
    let { boundaryDetails } = this.state;
    boundaryDetails[boundary.id] = boundary;
    this.setState({
      boundaryDetails
    });
  }

  handleProgramSelection(e) {
    const id = e.target.value;
    this.setState({
      selectedProgram: id,
      treeLoading: true
    });
    this.props.dispatch(getProgramDetails(id)).then(() => {
      this.setState({
        treeLoading: false
      });
    });
  }

  onBoundarySelection(boundary) {}

  renderSubTree(
    node,
    boundaryHierarchy,
    visitedBoundaries,
    depth,
    boundaryDetails
  ) {
    // const boundaryDetails = this.props.boundaryDetails;
    //if boundary details not defined for node, most likely we don't want it rendered in this filtered tree..
    if (!boundaryDetails[node]) {
      console.log("Boundary details undefined for node", node);
      return null;
    }
    if (boundaryDetails[node].depth == depth && depth < 6) {
      if (node) {
        var children = boundaryHierarchy[node];
        visitedBoundaries.push(node);

        var boundary = boundaryDetails[node];

        const label = (
          <a onClick={this.onBoundarySelection.bind(null, boundary)}>
            <span
              className="node"
              onClick={this.onBoundarySelection.bind(this)}
            >
              {" "}
              {_.capitalize(boundary.label) ||
                _.capitalize(boundary.name) ||
                _.capitalize(boundary.first_name)}
              {" "}
            </span>
          </a>
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
                    boundaryDetails
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

  //boundaryDetails={this.state.boundaryDetails} boundaryParentChildMap={this.state.childrenByParentId}
  render() {
    let visitedBoundaries = [];
    const programs = this.state.programsById;
    const { boundaries } = this.props;
    const programsList = this.state.programs.map(id => {
      return <option key={id} value={id}>{programs[id].name}</option>;
    });
    let { boundariesByParentId, boundaryDetails } = this.state;

    // boundariesByParentId = {
    //   ...boundariesByParentId,
    //   ...boundaries.assessments
    // }

    // boundaryDetails = {
    //   ...boundaryDetails,
    //   ...boundaries.assessmentsDetails
    // }

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
            : alphabeticalOrder(boundariesByParentId, boundaryDetails)
                .filter(node => {
                  return _.includes(boundaries.boundaries, node);
                })
                .map(
                  function(element, i) {
                    return this.renderSubTree(
                      element,
                      boundariesByParentId,
                      visitedBoundaries,
                      0,
                      boundaryDetails
                    );
                  }.bind(this)
                )}
        </div>;
  }
}

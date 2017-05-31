import React, { Component } from 'react';
import TreeView from 'react-treeview';
import { Link } from 'react-router';
import { alphabeticalOrder } from '../utils';
import { CLASS } from '../reducers/utils';
import _ from 'lodash';
import {
  fetchBoundaryDetails,
  boundaryClicked,
  fetchAllPrograms,
  getProgramDetails,
  selectProgramBoundary,
  fetchEntitiesFromServer,
  fetchAssessmentsForProgram,
} from '../actions/';
import { getEntityType, getBoundaryType, CLUSTER } from '../reducers/utils';
import { isAssessment } from './utils';

export default class PermissionsNavTree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedEntities: [],
      programsById: {},
      programs: [],
      isLoading: true,
      nodeHierarchy: [],
    };

    this.onBoundarySelection = this.onBoundarySelection.bind(this);
    this.handleProgramSelection = this.handleProgramSelection.bind(this);
    this.findKey = this.findKey.bind(this);
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

  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedProgram != this.state.selectedProgram && this.state.selectedProgram) {
      this.props.dispatch(fetchAssessmentsForProgram(this.state.selectedProgram));
    }
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

  onBoundarySelection(boundary, uniqueId) {
    if (isAssessment(boundary.id, this.props.assessmentsById)) {
      //Fetch students from the student group (parent id)
      //set the selected student group, program, assessment in the store
      //The double entry page should get activated when clicking on the assessment, else it should show a message.
      //Assessment ID is the last piece of the string. See render method for more comments on this.
      var values = uniqueId.split('_');
      let assessId = values[1];
      let studentGroupId = values[0];
      this.props.dispatch(
        selectProgramBoundary(assessId, this.state.selectedProgram, studentGroupId, ''),
      );
    }
  }

  findKey(obj, value) {
    var key;
    _.each(_.keys(obj), function(k) {
      var v = obj[k];
      if (v.indexOf(value) > -1) {
        key = k;
      }
    });

    return key;
  }

  /**
 * Given an array of DFS traversed boundaries and an assessment, this method will return a
 * unique assessment id of the format {studentgroupid_assessmentid}. Reason is that assessment ids
 * are not globally unique and we need a way to find out the studentgroup id of a particular assessment
 * as the user clicks on it in the UI. Relying on DFS algorithm to give us the studentgroup id that this assessment
 * belongs to
 * @param {*} assessment 
 * @param {*} visitedBoundaries 
 */
  createAssessmentId(assessment, visitedBoundaries) {}

  renderSubTree(node, boundaryHierarchy, visitedBoundaries, depth, boundaryDetails) {
    // const boundaryDetails = this.props.boundaryDetails;
    //if boundary details not defined for node, most likely we don't want it rendered in this filtered tree..
    if (!boundaryDetails[node]) {
      console.log('Boundary details undefined for node', node);
      return null;
    }
    if (boundaryDetails[node].depth == depth && depth < 6) {
      if (node) {
        var children = boundaryHierarchy[node];
        var boundary = boundaryDetails[node];

        let nodeId;
        if (boundary) {
          nodeId = boundary.id;
        }
        visitedBoundaries.push(node);
        let uniqueAssessmentId;
        if (boundary) {
          if (isAssessment(nodeId, this.props.assessmentsById)) {
            //This boundary is an assessment. Therefore, we need to be able to identify it uniquely w.r.t to its place in the nav tree (institution/class/assessment combo) so we
            //can fetch the right student set. Note that assessment Id remains the same across student groups.
            let copyVisitedBoundaries = visitedBoundaries.slice();
            if (copyVisitedBoundaries.length > 2) {
              let currentAssessment = copyVisitedBoundaries.pop();
              let lastClass = copyVisitedBoundaries.pop();
              while (isAssessment(lastClass, this.props.assessmentsById)) {
                lastClass = copyVisitedBoundaries.pop();
              }
              let studentGroup = lastClass;
              //Now find the institution id based on student group id
              uniqueAssessmentId = studentGroup + '_' + currentAssessment;
              //boundary.uniqueId = uniqueAssessmentId;
              nodeId = uniqueAssessmentId;
              //console.log("Unique assessment id is: ", uniqueAssessmentId);
            }
          }
        } //End of if

        const label = (
          <span
            className="node"
            id={nodeId}
            onClick={() => {
              this.onBoundarySelection(boundary, nodeId);
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
    const programsList = this.state.programs.map(id => {
      return <option key={id} value={id}>{programs[id].name}</option>;
    });
    const { parent, details } = this.props.boundaries;

    return this.state.isLoading
      ? <div><i className="fa fa-cog fa-spin fa-lg fa-fw" /><span className="text-muted">Loading...</span></div>
      : <div>
          <select
            className="form-control"
            onChange={this.handleProgramSelection}
            value={this.state.selectedProgram}
          >
            {programsList}
          </select>
          {this.state.treeLoading
            ? <div><i className="fa fa-cog fa-spin fa-lg fa-fw" /><span className="text-muted">Loading...</span></div>
            : alphabeticalOrder(parent, details).map(
                function(element, i) {
                  return this.renderSubTree(element, parent, visitedBoundaries, 0, details);
                }.bind(this),
              )}
        </div>;
  }
}

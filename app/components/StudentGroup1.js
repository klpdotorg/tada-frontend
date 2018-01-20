import React, { Component } from 'react';
import { push } from 'react-router-redux';
import {
  saveClass,
  deleteStudentGroup,
  saveNewStudents,
  getBoundaries,
  getInstitutions,
  getStudentGroups,
  selectPreschoolTree,
  openNode,
  fetchEntitiesFromServer,
} from '../actions';
import CreateInstitution from './Modals/CreateInstitution';
import Button from './Button';
import ConfirmModal from './Modals/Confirm';
import BulkAddStudent from './BulkAddStudent';
import { Link } from 'react-router';
import { userHasPermissions } from './utils';

export default class StudentGroupScreen extends Component {
  constructor(props) {
    super(props);
    this.showBulkAdd = this.showBulkAdd.bind(this);
    this.hideBulkAdd = this.hideBulkAdd.bind(this);
    this.addStudents = this.addStudents.bind(this);
    this.state = {
      schoolModalIsOpen: false,
      openConfirmModal: false,
      showBulkAdd: false,
      isLoading: true,
    };
  }

  componentDidMount() {
    const { params, dispatch } = this.props;

    //Choose Preschool Hierarchy
    if (params.circleId) {
      this.props.dispatch(selectPreschoolTree());
    }

    const blockId = params.blockId || params.projectId;
    const clusterId = params.clusterId || params.circleId;
    dispatch(openNode(params.districtId));
    dispatch(fetchEntitiesFromServer(params.districtId));
    dispatch({
      type: 'BOUNDARIES',
      payload: getBoundaries(1),
    }).then(() => {
      dispatch({
        type: 'BOUNDARIES',
        payload: getBoundaries(params.districtId),
      }).then(() => {
        dispatch(openNode(blockId));
        dispatch(fetchEntitiesFromServer(blockId));
        dispatch({
          type: 'BOUNDARIES',
          payload: getBoundaries(blockId),
        }).then(() => {
          dispatch(openNode(clusterId));
          dispatch(fetchEntitiesFromServer(clusterId));
          dispatch({
            type: 'BOUNDARIES',
            payload: getInstitutions(clusterId),
          }).then(() => {
            console.log(params);
            dispatch(openNode(params.institutionId));
            dispatch(fetchEntitiesFromServer(params.institutionId));
            dispatch({
              type: 'BOUNDARIES',
              payload: getStudentGroups(params.institutionId),
            }).then(() => {
              this.setState({
                isLoading: false,
              });
              dispatch(openNode(params.groupId));
              // dispatch(fetchEntitiesFromServer(params.groupId));
            });
          });
        });
      });
    });
  }

  componentWillReceiveProps() {
    this.setState({
      showBulkAdd: false,
    });
  }

  addStudents(values) {
    let options = {};
    let students = Object.values(values);
    students = students.map(student => {
      student.relations = [
        {
          relation_type: 'Mother',
          first_name: student.motherFirstName,
          middle_name: student.motherMiddleName,
          last_name: student.motherLastName,
        },
        {
          relation_type: 'Father',
          first_name: student.fatherFirstName,
          middle_name: student.fatherMiddleName,
          last_name: student.fatherLastName,
        },
      ];

      return student;
    });

    options.institution = this.props.params.institutionId;
    options.class = this.props.params.groupId;

    options.students = students;

    this.props.dispatch(saveNewStudents(options));
  }

  showBulkAdd() {
    this.setState({
      showBulkAdd: true,
    });
  }

  hideBulkAdd() {
    this.setState({
      showBulkAdd: false,
    });
  }

  render() {
    return this.state.isLoading
      ? <div>
          <i className="fa fa-cog fa-spin fa-lg fa-fw" />
          <span className="text-muted">Loading...</span>
        </div>
      : <div>
          {this.state.showBulkAdd
            ? <BulkAddStudent addStudents={this.addStudents} hide={this.hideBulkAdd} />
            : <StudentGroup showBulkAdd={this.showBulkAdd} {...this.props} />}
        </div>;
  }
}

class StudentGroup extends Component {
  constructor(props) {
    super(props);
    this.openSchoolModal = this.openSchoolModal.bind(this);
    this.toggleSchoolModal = this.toggleSchoolModal.bind(this);
    this.saveClass = this.saveClass.bind(this);
    this.deleteClass = this.deleteClass.bind(this);
    this.hideBulkAdd = this.hideBulkAdd.bind(this);
    this.addStudents = this.addStudents.bind(this);
    this.hasPermissions = this.hasPermissions.bind(this);
    this.hasChildren = this.hasChildren.bind(this);

    const { params, boundaries } = this.props;
    this.state = {
      schoolModalIsOpen: false,
      openConfirmModal: false,
      showBulkAdd: false,
      class: boundaries.boundaryDetails[params.groupId],
    };
  }

  setClass(val, key) {
    let values = this.state.class;
    values[key] = val;
    this.setState({
      class: values,
    });
  }

  closeConfirmation = () => {
    this.setState({
      openConfirmModal: false,
    });
  };

  componentWillReceiveProps(nextProps) {
    const { boundaries, params } = nextProps;
    this.setState({
      class: boundaries.boundaryDetails[params.groupId],
    });
  }

  showConfirmation = () => {
    this.setState({
      openConfirmModal: true,
    });
  };

  toggleSchoolModal() {
    this.setState({
      schoolModalIsOpen: false,
    });
  }

  hideBulkAdd() {
    this.setState({
      showBulkAdd: false,
    });
  }

  openSchoolModal() {
    this.setState({
      schoolModalIsOpen: true,
    });
  }

  addStudents(values) {
    const students = Object.values(values);
  }

  saveClass() {
    this.props.dispatch(saveClass(this.state.class));
  }

  deleteClass() {
    // console.log(this.state)
    this.props.dispatch(deleteStudentGroup(this.state.class));
  }

  viewStudent = path => {
    this.props.dispatch(push(`${path}/students`));
  };

  hasPermissions() {
    return userHasPermissions(this.props.permissions, this.props.params.institutionId);
  }

  hasChildren() {
    if (this.props.boundariesByParentId[this.props.params.groupId]) {
      return this.props.boundariesByParentId[this.props.params.groupId].length > 0;
    } else return false;
  }

  render() {
    const { boundaries, params } = this.props;
    const block =
      boundaries.boundaryDetails[params.blockId] || boundaries.boundaryDetails[params.projectId];
    const district = boundaries.boundaryDetails[params.districtId];
    const cluster =
      boundaries.boundaryDetails[params.clusterId] || boundaries.boundaryDetails[params.circleId];
    const institution = boundaries.boundaryDetails[params.institutionId];
    const group = boundaries.boundaryDetails[params.groupId];
    var Displayelement;
    let isSchool = cluster.boundary_type == 1 ? true : false;
    let canModify = sessionStorage.getItem('isAdmin') || this.hasPermissions();
    let disableDeleteBtn = canModify && this.hasChildren();
    return (
      <div>
        <ol className="breadcrumb">
          <li>
            <Link to={district.path}>
              {district.name}
            </Link>
          </li>
          <li>
            <Link to={block.path}>
              {block.name}
            </Link>
          </li>
          <li>
            <Link to={cluster.path}>
              {cluster.name}
            </Link>
          </li>
          <li>
            <Link to={institution.path}>
              {institution.name}
            </Link>
          </li>
          <li>
            <Link className="active">
              {group.name}
            </Link>
          </li>
        </ol>
        <div>
          {!canModify
            ? <div className="alert alert-danger">
                <i className="fa fa-lock fa-lg" aria-hidden="true" /> Insufficient Privileges.
                Please contact the administrator.
              </div>
            : <div />}
          <div>
            <div className="row">
              <div className="col-md-8">
                <h4 className="text-primary">
                  {canModify ? 'Modify Details' : 'View Details'}
                </h4>
              </div>

              {isSchool
                ? <div className="col-md-4 pull-right">
                    <button
                      className="btn btn-orange"
                      onClick={this.props.showBulkAdd}
                      title="Add Students"
                      disabled={!canModify}
                    >
                      Add Students
                    </button>
                    <button
                      className="btn btn-orange padded-btn"
                      onClick={this.viewStudent.bind(null, group.path)}
                    >
                      View Students
                    </button>
                  </div>
                : <div className="col-md-4 pull-right">
                    <button
                      className="btn btn-green"
                      onClick={this.props.showBulkAdd}
                      title="Add Students"
                      disabled={!canModify}
                    >
                      Add Students
                    </button>
                    <button
                      className="btn btn-green padded-btn"
                      onClick={this.viewStudent.bind(null, group.path)}
                    >
                      View Students
                    </button>
                  </div>}
            </div>
          </div>
          <div className="base-spacing-mid border-base" />

          <form className="form-horizontal" role="form">
            <div className="form-group">
              <label className="control-label col-sm-2" htmlFor="class">
                Class
              </label>
              <div className="col-sm-2">
                <input
                  type="text"
                  onChange={e => {
                    this.setClass(e.target.value, 'name');
                  }}
                  className="form-control"
                  id="class"
                  value={this.state.class.name}
                  disabled={!canModify}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="control-label col-sm-2" htmlFor="section">
                Section
              </label>
              <div className="col-sm-2">
                <input
                  type="text"
                  onChange={e => {
                    this.setClass(e.target.value, 'section');
                  }}
                  className="form-control"
                  id="section"
                  value={this.state.class.section}
                  disabled={!canModify}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="control-label col-sm-2" htmlFor="section">
                Type
              </label>
              <div className="col-sm-2">
                <select
                  className="col-sm-2"
                  onChange={e => {
                    this.setClass(e.target.value, 'group_type');
                  }}
                  value={this.state.class.group_type}
                  className="form-control"
                  id="gender"
                  disabled={!canModify}
                >
                  <option value="Class">Class</option>
                  <option value="Center">Center</option>
                </select>
              </div>
            </div>
          </form>
          <div className="col-md-6">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={this.saveClass}
              disabled={!canModify}
            >
              Save
            </button>
            <button
              type="submit"
              className="btn btn-primary padded-btn"
              onClick={this.showConfirmation}
              disabled={disableDeleteBtn}
            >
              Delete
            </button>
            <ConfirmModal
              isOpen={this.state.openConfirmModal}
              onAgree={this.deleteClass}
              onCloseModal={this.closeConfirmation}
              entity={group.label}
            />
          </div>
        </div>
      </div>
    );
  }
}
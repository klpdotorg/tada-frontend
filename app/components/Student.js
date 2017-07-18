import React, { Component } from 'react';
import { Link } from 'react-router';
import Formsy from 'formsy-react';
import FRC from 'formsy-react-components';
import { groupBy, get } from 'lodash';
import Notifications from 'react-notification-system-redux';
import { push } from 'react-router-redux';

import { getLanguages } from './utils';
import ConfirmModal from './Modals/Confirm';
import { deleteStudentAPI, patchStudentAPI } from '../actions/utils';
import { studentSaved, studentDeleted } from '../actions/notifications';

import {
  getBoundaries,
  getInstitutions,
  getStudentGroups,
  selectPreschoolTree,
  openNode,
  fetchEntitiesFromServer,
  getStudent,
  getStudentGroup,
  removeBoundary,
} from '../actions';
const { Input, Textarea, Select } = FRC;

class Student extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      currentStudent: {},
      openConfirmModal: false,
    };
  }

  componentWillReceiveProps = nextProps => {
    if (this.props.params.studentId !== nextProps.params.studentId) {
      this.fetchTree(nextProps.params);
    }
  };

  fetchTree = params => {
    const { dispatch } = this.props;
    if (params.circleId) {
      this.props.dispatch(selectPreschoolTree());
    }
    this.setState({
      isLoading: true,
    });

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
            dispatch(openNode(params.institutionId));
            dispatch(fetchEntitiesFromServer(params.institutionId));
            dispatch({
              type: 'BOUNDARIES',
              payload: getStudentGroups(params.institutionId),
            }).then(res => {
              getStudentGroup({
                institution: params.institutionId,
                studentgroup: params.groupId,
              }).then(response => {
                dispatch({
                  type: 'BOUNDARY_FETECHED',
                  data: response,
                });
                getStudent({
                  institution: params.institutionId,
                  studentgroup: params.groupId,
                  student: params.studentId,
                }).then(response => {
                  dispatch({
                    type: 'BOUNDARY_FETECHED',
                    data: response,
                  });
                  this.setState({
                    isLoading: false,
                  });
                });
              });
            });
          });
        });
      });
    });
  };

  componentDidMount = () => {
    this.fetchTree(this.props.params);
  };

  saveStudent = student => {
    //save Student
    let relations = [];
    relations.push(student.Father, student.Mother);
    student.relations = relations;
    patchStudentAPI(student, this.props.params.groupId).then(res => {
      this.props.dispatch({
        type: 'STUDENTS_FULFILLED',
        payload: res,
      });

      this.props.dispatch(Notifications.success(studentSaved));
    });
  };

  deleteStudent = () => {
    deleteStudentAPI(this.state.currentStudent.id).then(() => {
      this.setState({
        openConfirmModal: false,
      });

      this.props.dispatch(Notifications.success(studentDeleted));
      this.props.dispatch(push('/'));
    });
  };

  deleteStudentConfirm = student => {
    this.setState({
      currentStudent: {
        id: student.id,
      },
      openConfirmModal: true,
    });
  };

  renderLoading = () =>
    <div>
      <i className="fa fa-cog fa-spin fa-lg fa-fw" />
      <span className="text-muted">Loading...</span>
    </div>;

  render() {
    if (this.state.isLoading) {
      return this.renderLoading();
    }

    const { boundaryDetails, boundariesByParentId } = this.props.boundaries;
    const { params } = this.props;
    const block = boundaryDetails[params.blockId] || boundaryDetails[params.projectId];
    const district = boundaryDetails[params.districtId];
    const cluster = boundaryDetails[params.clusterId] || boundaryDetails[params.circleId];
    const institution = boundaryDetails[params.institutionId];
    const group = boundaryDetails[params.groupId];
    const student = boundaryDetails[params.studentId];

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
            <Link to={group.path}>
              {group.label}
            </Link>
          </li>
          <li>
            {student.first_name}
          </li>
        </ol>

        <div>
          <h4 className="text-primary col-md-10">Modify Details</h4>
          <div className="base-spacing-mid border-base" />
          <EditStudent
            student={student}
            saveStudent={this.saveStudent}
            deleteStudentConfirm={this.deleteStudentConfirm}
          />
        </div>
        <ConfirmModal
          isOpen={this.state.openConfirmModal}
          onAgree={this.deleteStudent}
          onCloseModal={this.closeConfirmation}
          entity={student.name}
        />
      </div>
    );
  }
}

class EditStudent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      canSubmit: false,
      languages: {
        isLoading: true,
        list: [],
      },
    };
  }

  componentDidMount = () => {
    getLanguages().then(languages => {
      const langs = languages.results.map(language => ({
        value: language.id,
        label: language.name,
      }));

      this.setState({
        languages: {
          isLoading: false,
          list: langs,
        },
      });
    });
  };

  enableSubmitButton = () => {
    this.setState({
      canSubmit: true,
    });
  };

  disableSubmitButton = () => {
    this.setState({
      canSubmit: false,
    });
  };

  saveStudent = () => {
    const myform = this.myform.getModel();
    const data = this.getStudentData();
    const student = {
      id: data.id,
      first_name: myform.firstName,
      middle_name: myform.middleName,
      last_name: myform.lastName,
      uid: myform.uid,
      dob: myform.dob,
      gender: myform.gender,
      mt: myform.language,
      active: data.active,
      Father: {
        first_name: myform.fatherFirstName,
        id: data.Father.id,
        last_name: myform.fatherLastName,
        middle_name: myform.fatherMiddleName,
        relation_type: data.Father.relation_type,
      },
      Mother: {
        first_name: myform.motherFirstName,
        id: data.Mother.id,
        last_name: myform.motherLastName,
        middle_name: myform.motherMiddleName,
        relation_type: data.Mother.relation_type,
      },
    };

    this.props.saveStudent(student);
  };

  getStudentData() {
    const { student } = this.props;
    let relations;

    if (student) {
      relations = groupBy(student.relations, 'relation_type');
      relations = {
        Father: get(relations, 'Father[0]'),
        Mother: get(relations, 'Mother[0]'),
      };
    }
    return {
      ...student,
      ...relations,
    };
  }

  render() {
    const student = this.getStudentData();
    const {
      first_name,
      middle_name,
      last_name,
      uid,
      mt,
      gender,
      language,
      dob,
      Father,
      Mother,
    } = student;
    const selectGender = [{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }];
    const { languages } = this.state;

    return (
      <Formsy.Form
        onValidSubmit={this.saveStudent}
        onValid={this.enableSubmitButton}
        onInvalid={this.disableSubmitButton}
        ref={ref => (this.myform = ref)}
      >
        <div className="col-sm-12">
          <Input
            name="firstName"
            id="firstName"
            value={first_name || ''}
            label="First Name:"
            type="text"
            className="form-control"
            validations="minLength:1"
            required={true}
          />
        </div>
        <div className="col-sm-12">
          <Input
            name="middleName"
            id="middleName"
            value={middle_name || ''}
            label="Middle Name:"
            type="text"
            className="form-control"
            validations="minLength:1"
          />
        </div>
        <div className="col-sm-12">
          <Input
            name="lastName"
            id="lastName"
            value={last_name || ''}
            label="Last Name:"
            type="text"
            className="form-control"
            validations="minLength:1"
          />
        </div>
        <div className="col-sm-12">
          <Input
            name="uid"
            id="uid"
            value={uid || ''}
            label="Government student ID:"
            type="text"
            className="form-control"
            validations="minLength:1"
          />
        </div>
        <div className="col-sm-12">
          <Select name="gender" label="Gender" value={gender} options={selectGender} />
        </div>
        <div className="col-sm-12">
          <Select name="language" label="language" value={mt} options={languages.list} />
        </div>
        <div className="col-sm-12">
          <Input
            name="dob"
            id="date"
            value={dob || ''}
            label="DOB:"
            type="date"
            className="form-control"
            validations="minLength:1"
          />
        </div>
        <div className="col-sm-12">
          <Input
            name="fatherFirstName"
            id="fatherFirstName"
            value={Father ? Father.first_name || '' : ''}
            label="Father First Name:"
            type="text"
            className="form-control"
            validations="minLength:1"
            required={true}
          />
        </div>
        <div className="col-sm-12">
          <Input
            name="fatherMiddleName"
            id="fatherMiddleName"
            value={Father ? Father.middle_name || '' : ''}
            label="Father Middle Name:"
            type="text"
            className="form-control"
            validations="minLength:1"
          />
        </div>
        <div className="col-sm-12">
          <Input
            name="fatherLastName"
            id="fatherLastName"
            value={Father ? Father.last_name || '' : ''}
            label="Father Last Name:"
            type="text"
            className="form-control"
            validations="minLength:1"
          />
        </div>
        <div className="col-sm-12">
          <Input
            name="motherFirstName"
            id="motherFirstName"
            value={Mother ? Mother.first_name || '' : ''}
            label="Mother First Name:"
            type="text"
            className="form-control"
            validations="minLength:1"
            required={true}
          />
        </div>
        <div className="col-sm-12">
          <Input
            name="motherMiddleName"
            id="motherMiddleName"
            value={Mother ? Mother.middle_name || '' : ''}
            label="Mother Middle Name:"
            type="text"
            className="form-control"
            validations="minLength:1"
          />
        </div>
        <div className="col-sm-12">
          <Input
            name="motherLastName"
            id="motherLastName"
            value={Mother ? Mother.last_name || '' : ''}
            label="Mother Last Name:"
            type="text"
            className="form-control"
            validations="minLength:1"
          />
        </div>
        <div className="col-md-8">
          <button
            type="submit"
            className="btn btn-primary padded-btn"
            disabled={!this.state.canSubmit}
          >
            Save
          </button>
          <button
            type="button"
            className="btn btn-primary padded-btn"
            onClick={this.props.deleteStudentConfirm.bind(null, student)}
          >
            Delete
          </button>
        </div>
      </Formsy.Form>
    );
  }
}

export default Student;

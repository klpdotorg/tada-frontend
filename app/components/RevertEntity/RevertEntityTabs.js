import React, { Component } from 'react';
import { Link } from 'react-router';

class RevertEntityTabs extends Component {
  render() {
    switch (this.props.activeTab) {
      case 'students':
        return <StudentTab />;
      case 'programmes':
        return <ProgramTab />;
      case 'users':
        return <UserTab />;
      case 'assessments':
        return <AssessementTab />;
      default:
        return <StudentTab />;
    }
  }
}

const StudentTab = () => {
  return (
    <ul className="nav nav-tabs nav-justified">
      <li role="presentation" className="active">
        <Link to="/revert-entity/students">Students</Link>
      </li>
      <li role="presentation">
        <Link to="/revert-entity/programmes">Programs</Link>
      </li>
      <li role="presentation">
        <Link to="/revert-entity/users">Users</Link>
      </li>
      <li role="presentation">
        <Link to="/revert-entity/assessments">Assessments</Link>
      </li>
    </ul>
  );
};

const ProgramTab = () => {
  return (
    <ul className="nav nav-tabs nav-justified">
      <li role="presentation">
        <Link to="/revert-entity/students">Students</Link>
      </li>
      <li role="presentation" className="active">
        <Link to="/revert-entity/programmes">Programs</Link>
      </li>
      <li role="presentation">
        <Link to="/revert-entity/users">Users</Link>
      </li>
      <li role="presentation">
        <Link to="/revert-entity/assessments">Assessments</Link>
      </li>
    </ul>
  );
};

const UserTab = () => {
  return (
    <ul className="nav nav-tabs nav-justified">
      <li role="presentation">
        <Link to="/revert-entity/students">Students</Link>
      </li>
      <li role="presentation">
        <Link to="/revert-entity/programmes">Programs</Link>
      </li>
      <li role="presentation" className="active">
        <Link to="/revert-entity/users">Users</Link>
      </li>
      <li role="presentation">
        <Link to="/revert-entity/assessments">Assessments</Link>
      </li>
    </ul>
  );
};

const AssessementTab = () => {
  return (
    <ul className="nav nav-tabs nav-justified">
      <li role="presentation">
        <Link to="/revert-entity/students">Students</Link>
      </li>
      <li role="presentation">
        <Link to="/revert-entity/programmes">Programs</Link>
      </li>
      <li role="presentation">
        <Link to="/revert-entity/users">Users</Link>
      </li>
      <li role="presentation" className="active">
        <Link to="/revert-entity/assessments">Assessments</Link>
      </li>
    </ul>
  );
};

export { RevertEntityTabs };

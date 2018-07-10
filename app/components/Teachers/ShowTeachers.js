import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import { Loading } from '../common';
import { CreateTeacher, EditTeacher } from '../../containers/Teachers';
import { TeacherList } from './index';

const TeacherScreen = (props) => {
  const {
    district,
    block,
    cluster,
    institution,
    teacherIds,
    isLoading,
    teacherLoading,
    hasPermissions,
    paths,
  } = props;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <ol className="breadcrumb">
        <li>
          <Link to={paths[0]}>{district.name}</Link>
        </li>
        <li>
          <Link to={paths[1]}>{block.name}</Link>
        </li>
        <li>
          <Link to={paths[2]}>{cluster.name}</Link>
        </li>
        <li>
          <Link to={paths[3]}>{institution.name}</Link>
        </li>
        <li>Teachers</li>
      </ol>
      <TeacherList
        teacherIds={teacherIds}
        showAddTeacherPopup={props.showAddTeacherPopup}
        loading={teacherLoading}
        hasPermissions={hasPermissions}
      />
      <EditTeacher institution={institution.id} hasPermissions={hasPermissions} />
      <CreateTeacher institution={institution.id} />
    </div>
  );
};

TeacherScreen.propTypes = {
  isLoading: PropTypes.bool,
  district: PropTypes.object,
  block: PropTypes.object,
  cluster: PropTypes.object,
  institution: PropTypes.object,
  teacherIds: PropTypes.array,
  teacherLoading: PropTypes.bool,
  showAddTeacherPopup: PropTypes.func,
  hasPermissions: PropTypes.bool,
  paths: PropTypes.array,
};

export default TeacherScreen;

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import { Loading } from '../common';
import { CreateTeacher, EditTeacher } from '../../containers/Teachers';
import { TeacherList } from './index';

const TeacherScreen = (props) => {
  const { district, block, cluster, institution, teacherIds, isLoading, teacherLoading } = props;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <ol className="breadcrumb">
        <li>
          <Link to={district.path}>{district.name}</Link>
        </li>
        <li>
          <Link to={block.path}>{block.name}</Link>
        </li>
        <li>
          <Link to={cluster.path}>{cluster.name}</Link>
        </li>
        <li>
          <Link to={institution.path}>{institution.name}</Link>
        </li>
        <li>Teachers</li>
      </ol>
      <TeacherList
        teacherIds={teacherIds}
        showAddTeacherPopup={props.showAddTeacherPopup}
        loading={teacherLoading}
      />
      <EditTeacher institution={institution.id} />
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
};

export { TeacherScreen };

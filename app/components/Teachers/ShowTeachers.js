import React from 'react';
import PropTypes from 'prop-types';
import { CreateTeacher, ModifyTeacher } from '../../containers/Teachers';
import { TeacherList } from './TeacherList';

const TeacherScreen = (props) => {
  const { district, block, cluster, institution, teacherIds } = props;
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
      <TeacherList teachers={teacherIds} showAddTeacherPopup={props.showAddTeacherPopup} />
      <CreateTeacher institution={institution.id} />
      <ModifyTeacher institution={institution.id} />
    </div>
  );
};

TeacherScreen.propTypes = {
  district: PropTypes.object,
  block: PropTypes.object,
  cluster: PropTypes.object,
  institution: PropTypes.object,
  teacherIds: PropTypes.object,
  showAddTeacherPopup: PropTypes.func,
};

export { TeacherScreen };

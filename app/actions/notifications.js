export const baseNotification = {
  position: 'tc',
  autoDismiss: 5,
};
export const studentStudentGroupMap = {
  ...baseNotification,
  title: 'Students Successfully Modified',
  message: 'Students Successfully Modified',
};

export const syncError = error => {
  return {
    ...baseNotification,
    title: 'Sync failed!',
    message: error.toString(),
  };
};

export const permissionsAssignedToBound = {
  ...baseNotification,
  title: 'Permissions assigned',
  message: 'Permissions assigned to user(s) successfully',
};

export const permissionsFailed = {
  ...baseNotification,
  title: 'Permissions error',
  message: 'Errow while assigning permissions! Please check console.log for more details!',
};

export const assessmentCreated = {
  ...baseNotification,
  title: 'Assessments created',
  message: 'Copy of selected assessments has been created!',
};

export const assessCreateFailed = {
  ...baseNotification,
  title: 'Failed to create assessments',
  message:
    'Something went wrong and we couldn not create a copy of the assessments. Please check logs.',
};

export const answersSaved = {
  ...baseNotification,
  title: 'Answers Saved',
  message: 'Answers for student saved!',
};

export const answersNotSaved = {
  ...baseNotification,
  title: 'Error!',
  message: 'Answers could not be saved for student!',
};

export const institutionSaved = {
  ...baseNotification,
  title: 'Institution Saved',
  message: 'Institution modified successfully.',
};

export const institutionNotSaved = {
  ...baseNotification,
  title: 'Error!',
  message: 'Institution could not be modified.',
};

export const teacherCreated = {
  ...baseNotification,
  title: 'Teacher Saved',
  message: 'Teacher created successfully.',
};

export const teacherUpdated = {
  ...baseNotification,
  title: 'Teacher Updated',
  message: 'Teacher updated successfully',
};

export const teacherDeleted = {
  ...baseNotification,
  title: 'Teacher Deleted',
  message: 'Teacher deleted successfully',
};

export const teacherNotDeleted = {
  ...baseNotification,
  title: 'Error!',
  message: 'Teacher could not be deleted.',
};

export const teacherNotUpdated = {
  ...baseNotification,
  title: 'Error!',
  message: 'Teacher could not be updated.',
};

export const teacherNotCreated = {
  ...baseNotification,
  title: 'Error!',
  title: 'Teacher could not be created.',
};

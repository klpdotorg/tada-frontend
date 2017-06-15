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

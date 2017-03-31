export const baseNotification = {
  position: 'tr',
  autoDismiss: 5,

};
export const studentStudentGroupMap = {
  ...baseNotification,
  title: 'Students Successfully Modified',
  message: 'Students Successfully Modified',
};

export const syncError = (error) => {
  return {
    ...baseNotification,
    title: 'Sync failed!',
    message: error.toString(),
  }
}

export const permissionsAssignedToBound = {
  ...baseNotification,
  title: 'Permissions assigned',
  message: 'Permissions assigned to user(s) successfully'
}

export const permissionsFailed = {
  ...baseNotification,
  title: "Permissions error",
  message: 'Errow while assigning permissions! Please check console.log for more details!'
}



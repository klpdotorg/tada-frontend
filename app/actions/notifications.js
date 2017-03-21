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
    message: error,
  }
}



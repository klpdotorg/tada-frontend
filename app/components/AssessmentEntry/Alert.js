import React from 'react';

const Alert = () => {
  return (
    <div className="alert alert-danger alert-dismissible" role="alert">
      <button type="button" className="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
      <p>
        <strong>Warning!</strong>
        {`You have entered values which don't match existing answers.
        Please check the red-colored boxes and correct the answer if needed. Then, press "Save".
        Your answer will overwrite existing answer`}.
      </p>
    </div>
  );
};

export { Alert };

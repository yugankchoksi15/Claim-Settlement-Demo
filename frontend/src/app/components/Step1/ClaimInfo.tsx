// ClaimInfo.jsx
import React from 'react';
import { Field } from 'formik';

const ClaimInfo = ({ issueDescriptionName }) => {
  return (
    <div className="w-1/2">
      <h4 className="font-semibold mb-2">Claim Info</h4>
      <div className="mb-4">
        <label
          htmlFor={issueDescriptionName}
          className="block text-sm font-medium text-gray-700 mb-2 p-1"
        >
          Issue Description
        </label>
        <Field
          as="textarea"
          id={issueDescriptionName}
          name={issueDescriptionName}
          placeholder="Enter issue description"
          className="w-full border rounded-lg p-2"
          rows="13"
        />
      </div>
    </div>
  );
};

export default ClaimInfo;

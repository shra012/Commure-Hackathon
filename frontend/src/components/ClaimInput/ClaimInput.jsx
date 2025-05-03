// src/components/ClaimInput/ClaimInput.jsx
import React from 'react';
import JSONInput from './JSONInput';
import FileUpload from './FileUpload';
import ClaimTableDisplay from './ClaimTableDisplay';
import { useSelector } from 'react-redux';

const ClaimInput = () => {
  // Make sure we have a default empty array if claims is undefined
  const { parsedClaims = [] } = useSelector(
    (state) => state.claims
  );

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">
        Submit Claims
      </h2>
      <FileUpload />
      <div className="my-4 flex items-center">
        <div className="flex-1 h-px bg-gray-200"></div>
        <p className="px-3 text-gray-500 text-sm">
          OR
        </p>
        <div className="flex-1 h-px bg-gray-200"></div>
      </div>
      <JSONInput />

      {/* The table will render conditionally inside this component */}
      <ClaimTableDisplay />
    </div>
  );
};

export default ClaimInput;

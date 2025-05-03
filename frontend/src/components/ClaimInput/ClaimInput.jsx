// src/components/ClaimInput/ClaimInput.jsx

import React from 'react';
import JSONInput from './JSONInput';
import FileUpload from './FileUpload';
import TestValidationButton from './TestValidationButton';

const ClaimInput = () => {
  return (
    <div>
      <div className="flex items-center mb-4">
        <h2 className="text-xl font-bold text-gray-900">
          Submit Claims
        </h2>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 transition-all duration-300 hover:shadow-md">
        <div className="mb-2">
          <h3 className="text-sm font-medium text-gray-700 uppercase tracking-wider">
            Upload File
          </h3>
          <p className="text-xs text-gray-500 mt-1 mb-3">
            Upload a CSV or JSON file containing
            claim data
          </p>
        </div>

        <FileUpload />

        <div className="my-6 flex items-center">
          <div className="flex-1 h-px bg-gray-200"></div>
          <div className="px-4 py-1 rounded-full bg-gray-100 text-gray-500 text-sm font-medium">
            OR
          </div>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        <JSONInput />

        {/* Test Button for Development */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 mb-2">
            Development Tools
          </p>
          <TestValidationButton />
        </div>
      </div>
    </div>
  );
};

export default ClaimInput;

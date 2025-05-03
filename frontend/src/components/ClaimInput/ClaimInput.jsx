// src/components/ClaimInput/ClaimInput.jsx

import React from 'react';
import '../../index.css';
import JSONInput from './JSONInput';
import FileUpload from './FileUpload';
import TestValidationButton from './TestValidationButton';
import ClaimTableDisplay from './ClaimTableDisplay';

const ClaimInput = () => {
  return (
    <div>
      <div className="flex items-center mb-4">
        <h2 className="text-xl font-bold text-gray-900">
          Submit Claims
        </h2>
      </div>
      <div className="card">
        <div className="mb-2">
          <h3 className="text-sm font-medium text-gray-700 uppercase tracking-wider">
            Upload File
          </h3>
          <p className="text-xs text-gray-500 mt-1 mb-3">
            Upload a CSV or JSON file containing
            claim data
          </p>
        </div>
        <div className="flex flex-col space-y-6">
          <FileUpload />
          <div className="divider">
            <span>OR</span>
          </div>
          <JSONInput />
          {/* Preview Claims Section */}
          <div className="parsed-claims-scroll custom-scrollbar mt-6">
            <h3 className="section-header">Preview Claims</h3>
            <ClaimTableDisplay />
          </div>
        </div>
        {/* Test Button for Development */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 mb-2">
            Development Tools
          </p>
          <TestValidationButton />
        </div>
      </div>
      <ClaimTableDisplay/>
    </div>
  );
};

export default ClaimInput;

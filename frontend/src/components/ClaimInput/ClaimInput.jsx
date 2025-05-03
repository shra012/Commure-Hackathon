// src/components/ClaimInput/ClaimInput.jsx

import React from 'react';
import JSONInput from './JSONInput';
import FileUpload from './FileUpload';

const ClaimInput = () => {
  return (
    <div>
      <div className="flex items-center mb-4">
        <svg
          className="w-6 h-6 text-blue-600 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
          ></path>
        </svg>
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
      </div>
    </div>
  );
};

export default ClaimInput;

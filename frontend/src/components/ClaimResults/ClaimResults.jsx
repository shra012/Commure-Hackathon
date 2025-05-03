// src/components/ClaimResults/ClaimResults.jsx
import React from 'react';
import ClaimCard from './ClaimCard';
import { useSelector } from 'react-redux';

const ClaimResults = () => {
  // Destructure with default values to prevent undefined errors
  const {
    processedClaims = [],
    loading = false,
    processError = null,
  } = useSelector((state) => state.claims || {});

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full p-6">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-600">
            Processing claims...
          </p>
        </div>
      </div>
    );
  }

  if (processError) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-5 rounded-md shadow-sm">
          <div className="flex items-center mb-2">
            <svg
              className="w-6 h-6 text-red-600 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <p className="font-bold">
              Error Processing Claims
            </p>
          </div>
          <p>{processError}</p>
        </div>
      </div>
    );
  }

  // Make sure to check if processedClaims exists and has length
  if (
    !processedClaims ||
    processedClaims.length === 0
  ) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center">
        <div className="rounded-full bg-gray-100 p-6 mb-4">
          <svg
            className="w-12 h-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            ></path>
          </svg>
        </div>
        <p className="text-xl text-gray-500 font-medium">
          No Claims Processed Yet
        </p>
        <p className="mt-2 text-gray-500 max-w-sm">
          Submit claims using the form on the left
          to see results here.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 h-full overflow-y-auto">
      <div className="flex items-center mb-6 sticky top-0 bg-white p-3 z-10 border-b border-gray-200 rounded-lg shadow-sm">
        <svg
          className="w-5 h-5 text-green-600 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <h2 className="text-lg font-bold text-gray-800">
          Processed Claims
          <span className="ml-2 text-sm font-normal text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
            {processedClaims.length}
          </span>
        </h2>
      </div>
      <div className="space-y-5 pb-6">
        {processedClaims.map((claim, index) => (
          <div
            key={claim.claimId || index}
            className="fadeIn"
            style={{
              animationDelay: `${index * 0.05}s`,
            }}
          >
            <ClaimCard claim={claim} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClaimResults;

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

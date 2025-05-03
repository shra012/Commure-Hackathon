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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (processError) {
    return (
      <div className="p-6">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
          <p className="font-bold">Error</p>
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
        <p className="text-xl text-gray-400">
          No Claims Processed Yet
        </p>
        <p className="mt-2 text-gray-500">
          Submit claims using the form on the left
          to see results here.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 h-full overflow-y-auto">
      <h2 className="text-xl font-bold mb-4 sticky top-0 bg-white p-3 z-10 border-b border-gray-200">
        Processed Claims ({processedClaims.length}
        )
      </h2>
      <div className="space-y-4 pb-6">
        {processedClaims.map((claim, index) => (
          <ClaimCard
            key={claim.claimId || index}
            claim={claim}
          />
        ))}
      </div>
    </div>
  );
};

export default ClaimResults;

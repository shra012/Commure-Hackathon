// src/components/ClaimResults/ValidationResults.jsx
import React, { useEffect } from 'react';
import ValidationResultsCard from './ValidationResultsCard';
import { useSelector } from 'react-redux';

const ValidationResults = () => {
  // Get validation results from Redux store
  const {
    validationResults = null,
    validating = false,
    validationError = null,
  } = useSelector((state) => state.claims || {});

  // Debug logging
  useEffect(() => {
    console.log('Validation Results Component:', {
      validationResults,
      validating,
      validationError,
      hasResults: !!(
        validationResults &&
        validationResults.claims &&
        validationResults.claims.length > 0
      ),
    });
  }, [
    validationResults,
    validating,
    validationError,
  ]);

  if (validating) {
    return (
      <div className="flex justify-center items-center h-full p-6">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-600">
            Validating claims...
          </p>
        </div>
      </div>
    );
  }

  if (validationError) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-5 rounded-md shadow-sm">
          <div className="flex items-center mb-2">
            <p className="font-bold">
              Error Validating Claims
            </p>
          </div>
          <p>{validationError}</p>
        </div>
      </div>
    );
  }

  // Check if we have results to display
  if (
    !validationResults ||
    !validationResults.claims ||
    validationResults.claims.length === 0
  ) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center">
        <div className="rounded-full bg-gray-100 p-6 mb-4"></div>
        <p className="text-xl text-gray-500 font-medium">
          No Validation Results Yet
        </p>
        <p className="mt-2 text-gray-500 max-w-sm">
          Submit claims using the form on the left
          to see validation results here.
        </p>
        {validationResults && (
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md text-left max-w-md">
            <p className="text-sm text-yellow-800 font-medium">
              Debug Info:
            </p>
            <pre className="text-xs text-yellow-700 mt-2 bg-yellow-100 p-2 rounded overflow-auto max-h-32">
              {JSON.stringify(
                validationResults,
                null,
                2
              )}
            </pre>
          </div>
        )}
      </div>
    );
  }

  // Calculate approval statistics
  const totalClaims =
    validationResults.claims.length;
  const approvedClaims =
    validationResults.claims.filter(
      (claim) => claim.approved
    ).length;
  const rejectedClaims =
    totalClaims - approvedClaims;

  return (
    <div className="p-6 h-full overflow-y-auto">
      <div className="flex items-center mb-6 sticky top-0 bg-white p-3 z-10 border-b border-gray-200 rounded-lg shadow-sm">
        <h2 className="text-lg font-bold text-gray-800">
          Validation Results
          <span className="ml-2 text-sm font-normal text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
            {validationResults.claims.length}
          </span>
        </h2>
      </div>

      {/* Stats summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <p className="text-sm text-gray-500 mb-1">
            Total Claims
          </p>
          <p className="text-2xl font-bold">
            {totalClaims}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 border border-green-200">
          <p className="text-sm text-gray-500 mb-1">
            Approved
          </p>
          <p className="text-2xl font-bold text-green-600">
            {approvedClaims}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 border border-red-200">
          <p className="text-sm text-gray-500 mb-1">
            Rejected
          </p>
          <p className="text-2xl font-bold text-red-600">
            {rejectedClaims}
          </p>
        </div>
      </div>

      <div className="space-y-5 pb-6">
        {validationResults.claims.map(
          (claim, index) => (
            <div
              key={claim.claim_id || index}
              className="fadeIn"
              style={{
                animationDelay: `${
                  index * 0.05
                }s`,
              }}
            >
              <ValidationResultsCard
                claim={claim}
              />
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ValidationResults;

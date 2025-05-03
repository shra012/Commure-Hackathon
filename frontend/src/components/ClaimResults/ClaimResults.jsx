// src/components/ClaimResults/ClaimResults.jsx
import React, {
  useState,
  useEffect,
} from 'react';
import ClaimCard from './ClaimCard';
import ValidationResults from './ValidationResults';
import {
  useSelector,
  useDispatch,
} from 'react-redux';

const ClaimResults = () => {
  const [activeTab, setActiveTab] =
    useState('processed'); // 'processed' or 'validation'
  const dispatch = useDispatch();

  // Destructure with default values to prevent undefined errors
  const {
    processedClaims = [],
    loading = false,
    processError = null,
    validationResults = null,
    validating = false,
  } = useSelector((state) => state.claims || {});

  const hasValidationResults =
    validationResults &&
    validationResults.claims &&
    validationResults.claims.length > 0;

  // Log state for debugging
  console.log('Redux State in ClaimResults:', {
    processedClaims,
    validationResults,
    loading,
    validating,
    hasValidationResults,
  });

  // Auto-switch to validation tab when validation results are available
  useEffect(() => {
    if (hasValidationResults) {
      setActiveTab('validation');
    }
  }, [hasValidationResults]);

  if (loading || validating) {
    return (
      <div className="flex justify-center items-center h-full p-6">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-600">
            {loading
              ? 'Processing claims...'
              : 'Validating claims...'}
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

  // If no results of any kind
  if (
    (!processedClaims ||
      processedClaims.length === 0) &&
    !hasValidationResults
  ) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center">
        <div className="rounded-full bg-gray-100 p-6 mb-4"></div>
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
    <div className="p-6 h-full flex flex-col">
      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() =>
            setActiveTab('processed')
          }
          className={`py-3 px-6 font-medium text-sm focus:outline-none 
            ${
              activeTab === 'processed'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
        >
          Processed Claims
          {processedClaims.length > 0 && (
            <span className="ml-2 bg-gray-100 text-gray-700 py-0.5 px-2 rounded-full text-xs">
              {processedClaims.length}
            </span>
          )}
        </button>
        <button
          onClick={() =>
            setActiveTab('validation')
          }
          className={`py-3 px-6 font-medium text-sm focus:outline-none
            ${
              activeTab === 'validation'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
        >
          Validation Results
          {hasValidationResults && (
            <span className="ml-2 bg-gray-100 text-gray-700 py-0.5 px-2 rounded-full text-xs">
              {validationResults.claims.length}
            </span>
          )}
        </button>
      </div>

      {/* Content area */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'processed' ? (
          <div className="h-full overflow-y-auto">
            {processedClaims.length > 0 ? (
              <div className="space-y-5 pb-6">
                {processedClaims.map(
                  (claim, index) => (
                    <div
                      key={claim.claimId || index}
                      className="fadeIn"
                      style={{
                        animationDelay: `${
                          index * 0.05
                        }s`,
                      }}
                    >
                      <ClaimCard claim={claim} />
                    </div>
                  )
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                <p className="text-xl text-gray-500 font-medium">
                  No Processed Claims Yet
                </p>
                <p className="mt-2 text-gray-500 max-w-sm">
                  Submit and process claims to see
                  results here.
                </p>
              </div>
            )}
          </div>
        ) : (
          <ValidationResults />
        )}
      </div>
    </div>
  );
};

export default ClaimResults;

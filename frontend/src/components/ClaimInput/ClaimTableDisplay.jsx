// src/components/ClaimInput/ClaimTableDisplay.jsx
import '../../index.css';

import React, { useState } from 'react';
import {
  useSelector,
  useDispatch,
} from 'react-redux';
import {
  clearClaims,
  setValidationResults,
} from '../../redux/slices/claimSlice';
import api from '../../utils/api';

const ClaimTableDisplay = () => {
  const { parsedClaims, parseError } =
    useSelector((state) => state.claims);
  const [expandedClaims, setExpandedClaims] =
    useState({});
  const [isSubmitting, setIsSubmitting] =
    useState(false);
  const dispatch = useDispatch();

  const toggleClaimExpanded = (claimId) => {
    setExpandedClaims((prev) => ({
      ...prev,
      [claimId]: !prev[claimId],
    }));
  };

  const isClaimExpanded = (claimId) =>
    !!expandedClaims[claimId];

  const formatModifiers = (modifiers) => {
    if (typeof modifiers === 'string')
      return modifiers === '0'
        ? 'None'
        : modifiers;
    if (
      Array.isArray(modifiers) &&
      modifiers.length > 0
    )
      return modifiers.join(', ');
    return 'None';
  };

  const handleClearTable = () => {
    dispatch(clearClaims());
    setExpandedClaims({});
  };

  const handleSubmitClaim = async (claim) => {
    try {
      setIsSubmitting(true);
      // Format the data for the single claim API
      const singleClaimData = {
        claim_id: claim.claimId,
        codes: claim.procedureCodes,
        modifier:
          typeof claim.modifiers === 'string'
            ? claim.modifiers
            : Array.isArray(claim.modifiers) &&
              claim.modifiers.length > 0
            ? claim.modifiers[0]
            : '0',
      };

      console.log(
        'Submitting single claim:',
        singleClaimData
      );

      // Use validateSingleClaim for individual submissions
      const result =
        await api.validateSingleClaim(
          singleClaimData
        );
      console.log(
        'Single claim validation result:',
        result
      );

      // Update the Redux store with the validation results
      dispatch(setValidationResults(result));

      setIsSubmitting(false);
      alert(
        `Claim ${claim.claimId} submitted successfully!`
      );
    } catch (error) {
      console.error(
        'Error submitting claim:',
        error
      );
      setIsSubmitting(false);
      alert(
        `Error submitting claim: ${
          error.message || 'Unknown error'
        }`
      );
    }
  };

  const handleSubmitAllClaims = async () => {
    if (
      !parsedClaims ||
      parsedClaims.length === 0
    ) {
      alert('No claims to submit.');
      return;
    }

    try {
      setIsSubmitting(true);
      const apiData = parsedClaims.map(
        (claim) => ({
          claim_id: claim.claimId,
          codes: claim.procedureCodes,
          modifier:
            typeof claim.modifiers === 'string'
              ? claim.modifiers
              : Array.isArray(claim.modifiers) &&
                claim.modifiers.length > 0
              ? claim.modifiers[0]
              : '0',
        })
      );

      console.log(
        'Submitting batch claims:',
        apiData
      );

      // Continue using validateClaims for batch submissions
      const result = await api.validateClaims(
        apiData
      );
      console.log(
        'Batch claims validation result:',
        result
      );

      // Update the Redux store with the validation results
      dispatch(setValidationResults(result));

      setIsSubmitting(false);
      alert('All claims submitted successfully!');
    } catch (error) {
      console.error('Submit all failed:', error);
      setIsSubmitting(false);
      alert(
        `Error submitting claims: ${
          error.message || 'Unknown error'
        }`
      );
    }
  };

  if (parseError) {
    return (
      <div className="mt-4 p-4 bg-red-100 border border-red-300 rounded">
        <p className="text-red-700 font-semibold">
          Error Parsing Claims
        </p>
        <p className="text-red-600 text-sm mt-1">
          {parseError}
        </p>
        <button
          onClick={handleClearTable}
          className="btn btn-outline mt-2 text-sm"
        >
          Clear
        </button>
      </div>
    );
  }

  if (!parsedClaims || parsedClaims.length === 0)
    return null;

  return (
    <div className="card" style={{ height: 600 }}>
      {/* Header */}
      <div className="card-header">
        <h3 className="text-lg font-semibold">
          Parsed Claims
        </h3>
        <div className="flex items-center space-x-3">
          <span className="text-sm text-gray-600">
            {parsedClaims.length} claims
          </span>
          <button
            onClick={handleClearTable}
            className="btn btn-outline text-sm"
          >
            Clear All
          </button>
          <button
            onClick={handleSubmitAllClaims}
            disabled={isSubmitting}
            className="btn btn-primary text-sm flex items-center"
            style={isSubmitting ? { opacity: 0.7, cursor: 'not-allowed' } : {}}
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Submitting...
              </>
            ) : (
              'Submit Claims'
            )}
          </button>
        </div>
      </div>

      {/* Scrollable list of cards */}
      <div className="h-[520px] overflow-y-auto p-3 space-y-3">
        {parsedClaims.map((claim, index) => {
          const isExpanded = isClaimExpanded(
            claim.claimId || `claim-${index}`
          );

          return (
            <div
              key={
                claim.claimId || `claim-${index}`
              }
              className={`p-4 border rounded-md shadow-sm transition-all ${
                claim.isValid
                  ? 'bg-white border-gray-200'
                  : 'bg-red-50 border-red-300'
              }`}
            >
              {/* Header */}
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-lg font-medium">
                    {claim.claimId ||
                      'Missing ID'}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {claim.patientName
                      ? `Patient: ${claim.patientName}`
                      : 'Unknown Patient'}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  {!claim.isValid && (
                    <span className="badge badge-error">
                      Invalid
                    </span>
                  )}
                  <button
                    onClick={() =>
                      toggleClaimExpanded(
                        claim.claimId ||
                          `claim-${index}`
                      )
                    }
                    className="btn btn-outline text-sm"
                    style={{ padding: '0.25rem 0.75rem' }}
                  >
                    {isExpanded
                      ? 'Hide'
                      : 'Details'}
                  </button>
                </div>
              </div>

              {/* Expanded Content */}
              {isExpanded && (
                <div className="mt-4 space-y-3 border-t pt-3">
                  <div>
                    <p className="text-sm font-semibold text-gray-600 mb-1">
                      Procedure Codes:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {claim.procedureCodes
                        ?.length > 0 ? (
                        claim.procedureCodes.map(
                          (code, i) => (
                            <span
                              key={i}
                              className="badge badge-info"
                            >
                              {code}
                            </span>
                          )
                        )
                      ) : (
                        <p className="text-sm text-gray-500">
                          None
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-600 mb-1">
                      Modifiers:
                    </p>
                    <p className="input" style={{ background: '#f3f4f6', padding: '0.5rem 0.75rem', fontSize: '0.95rem' }}>
                      {formatModifiers(
                        claim.modifiers
                      )}
                    </p>
                  </div>

                  {!claim.isValid && (
                    <div>
                      <p className="text-sm font-semibold text-gray-600 mb-1">
                        Errors:
                      </p>
                      <p className="badge badge-error" style={{ display: 'block', padding: '0.6em 1em', marginTop: '0.3em' }}>
                        {claim.errors.join(', ')}
                      </p>
                    </div>
                  )}

                  <div className="text-right">
                    <button
                      onClick={() =>
                        handleSubmitClaim(claim)
                      }
                      disabled={
                        !claim.isValid ||
                        isSubmitting
                      }
                      className={`btn btn-primary text-sm ml-auto`}
                      style={
                        !claim.isValid || isSubmitting
                          ? { opacity: 0.7, cursor: 'not-allowed' }
                          : {}
                      }
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Submitting...
                        </>
                      ) : (
                        'Submit Claim'
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ClaimTableDisplay;

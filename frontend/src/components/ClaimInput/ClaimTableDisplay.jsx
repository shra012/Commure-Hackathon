// src/components/ClaimInput/ClaimTableDisplay.jsx
import React from 'react';
import {
  useSelector,
  useDispatch,
} from 'react-redux';
import {
  processClaims,
  clearClaims,
} from '../../redux/slices/claimSlice';
import ClaimTableRow from './ClaimTableRow';

const ClaimTableDisplay = () => {
  const { parsedClaims, parseError, loading } =
    useSelector((state) => state.claims);
  const dispatch = useDispatch();

  const handleProcessClaims = () => {
    // Filter out any metadata we added for display purposes
    const claimsForProcessing = parsedClaims.map(
      ({ isValid, errors, index, ...claim }) =>
        claim
    );
    dispatch(processClaims(claimsForProcessing));
  };

  const handleClearTable = () => {
    dispatch(clearClaims());
  };

  if (parseError) {
    return (
      <div className="mt-4 p-4 bg-red-50 border border-red-300 rounded">
        <h3 className="text-lg font-medium text-red-800">
          Error Parsing Claims
        </h3>
        <p className="text-red-600">
          {parseError}
        </p>
        <button
          onClick={handleClearTable}
          className="mt-2 bg-red-100 hover:bg-red-200 text-red-800 py-1 px-3 rounded-md text-sm transition-colors"
        >
          Clear
        </button>
      </div>
    );
  }

  if (
    !parsedClaims ||
    parsedClaims.length === 0
  ) {
    return null;
  }

  const hasInvalidClaims = parsedClaims.some(
    (claim) => !claim.isValid
  );

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-medium">
          Claims Preview
        </h3>
        <button
          onClick={handleClearTable}
          className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded text-sm"
        >
          Clear Table
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">
                Claim ID
              </th>
              <th className="border px-4 py-2">
                Procedure Code
              </th>
              <th className="border px-4 py-2">
                Modifiers
              </th>
              <th className="border px-4 py-2">
                Patient Name
              </th>
              <th className="border px-4 py-2">
                Issues
              </th>
            </tr>
          </thead>
          <tbody>
            {parsedClaims.map((claim) => (
              <ClaimTableRow
                key={claim.claimId || claim.index}
                claim={claim}
              />
            ))}
          </tbody>
        </table>
      </div>

      {hasInvalidClaims && (
        <div className="mt-4 p-2 bg-yellow-50 border border-yellow-300 rounded">
          <p className="text-yellow-700">
            Some claims have issues that may cause
            processing problems.
          </p>
        </div>
      )}

      <div className="mt-4 flex space-x-4">
        <button
          onClick={handleProcessClaims}
          disabled={loading}
          className={`flex-1 ${
            loading
              ? 'bg-blue-300'
              : 'bg-blue-500 hover:bg-blue-600'
          } text-white py-2 px-4 rounded-md transition-colors`}
        >
          {loading
            ? 'Processing...'
            : 'Process Claims'}
        </button>
      </div>
    </div>
  );
};

export default ClaimTableDisplay;

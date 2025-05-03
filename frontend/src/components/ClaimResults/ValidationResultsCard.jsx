// src/components/ClaimResults/ValidationResultsCard.jsx
import React, {
  useState,
  useEffect,
} from 'react';

const ValidationResultsCard = ({ claim }) => {
  const [expanded, setExpanded] = useState(false);

  // Debug logging
  useEffect(() => {
    console.log(
      'ValidationResultsCard received claim:',
      claim
    );
  }, [claim]);

  if (!claim) {
    console.error(
      'ValidationResultsCard: No claim provided'
    );
    return (
      <div className="bg-yellow-50 rounded-xl shadow-sm p-5 mb-4 border-l-4 border-yellow-500">
        <p className="text-yellow-800">
          Error: No claim data available
        </p>
      </div>
    );
  }

  const getStatusStyles = (approved) => {
    if (approved) {
      return {
        bg: 'bg-green-100',
        text: 'text-green-800',
        border: 'border-green-500',
        icon: '✅',
      };
    } else {
      return {
        bg: 'bg-red-100',
        text: 'text-red-800',
        border: 'border-red-500',
        icon: '❌',
      };
    }
  };

  const statusStyles = getStatusStyles(
    claim.approved
  );

  return (
    <div
      className={`bg-white rounded-xl shadow-sm p-5 mb-4 border-l-4 ${statusStyles.border} transform transition-all duration-200 hover:shadow-md hover:translate-y-[-2px]`}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-lg text-gray-900 flex items-center">
            Claim ID:{' '}
            {claim.claim_id || 'Unknown'}
          </h3>
          <div className="flex items-center mt-1.5">
            <div
              className={`px-3 py-1 rounded-full text-sm font-medium flex items-center ${statusStyles.bg} ${statusStyles.text}`}
            >
              {statusStyles.icon}{' '}
              {claim.approved
                ? 'Approved'
                : 'Rejected'}
            </div>
          </div>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {expanded ? 'Less' : 'More'}
        </button>
      </div>

      <div className="mt-4">
        <div className="bg-gray-50 p-4 rounded-md">
          <p className="text-gray-700">
            {claim.summary ||
              'No validation summary available'}
          </p>
        </div>
      </div>

      {expanded && (
        <div className="mt-4">
          <p className="text-gray-500 text-xs uppercase font-semibold mb-2">
            Validation Results
          </p>
          {claim.results &&
          claim.results.length > 0 ? (
            <div className="space-y-3">
              {claim.results.map(
                (result, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-md ${
                      result.result &&
                      result.result.includes('✅')
                        ? 'bg-green-50'
                        : 'bg-red-50'
                    }`}
                  >
                    <div className="flex flex-wrap gap-2 mb-2">
                      {result.code1 && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-blue-50 text-blue-700">
                          Code 1: {result.code1}
                        </span>
                      )}
                      {result.code2 && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-blue-50 text-blue-700">
                          Code 2: {result.code2}
                        </span>
                      )}
                      {result.modifier &&
                        result.modifier !==
                          '0' && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-purple-50 text-purple-700">
                            Modifier:{' '}
                            {result.modifier}
                          </span>
                        )}
                    </div>
                    <p className="text-sm">
                      {result.result ||
                        'No result information'}
                    </p>
                  </div>
                )
              )}
            </div>
          ) : (
            <div className="p-3 bg-gray-50 rounded-md">
              <p className="text-sm text-gray-600">
                No detailed validation results
                available
              </p>
            </div>
          )}
        </div>
      )}

      <div className="mt-4 flex justify-end space-x-2">
        <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          View Details
        </button>
        <button
          className={`inline-flex items-center px-3 py-1.5 border border-transparent shadow-sm text-xs font-medium rounded text-white ${
            claim.approved
              ? 'bg-green-600 hover:bg-green-700'
              : 'bg-red-600 hover:bg-red-700'
          } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
        >
          {claim.approved
            ? 'Process Claim'
            : 'Review Errors'}
        </button>
      </div>
    </div>
  );
};

export default ValidationResultsCard;

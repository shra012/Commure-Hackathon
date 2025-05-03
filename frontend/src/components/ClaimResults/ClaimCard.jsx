import React, { useState } from 'react';

const ClaimCard = ({ claim }) => {
  const [expanded, setExpanded] = useState(false);

  const getStatusStyles = (status) => {
    switch (status) {
      case 'Approved':
        return {
          bg: 'bg-green-100',
          text: 'text-green-800',
          border: 'border-green-500',
          icon: (
            <svg
              className="w-5 h-5 mr-1.5"
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
          ),
        };
      case 'Denied':
        return {
          bg: 'bg-red-100',
          text: 'text-red-800',
          border: 'border-red-500',
          icon: (
            <svg
              className="w-5 h-5 mr-1.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          ),
        };
      case 'Pending Review':
        return {
          bg: 'bg-yellow-100',
          text: 'text-yellow-800',
          border: 'border-yellow-500',
          icon: (
            <svg
              className="w-5 h-5 mr-1.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          ),
        };
      case 'Needs Information':
        return {
          bg: 'bg-orange-100',
          text: 'text-orange-800',
          border: 'border-orange-500',
          icon: (
            <svg
              className="w-5 h-5 mr-1.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          ),
        };
      default:
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-800',
          border: 'border-gray-500',
          icon: (
            <svg
              className="w-5 h-5 mr-1.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          ),
        };
    }
  };

  const statusStyles = getStatusStyles(
    claim.status
  );

  const formattedAmount =
    typeof claim.amount === 'number'
      ? `$${claim.amount.toFixed(2)}`
      : claim.amount;

  return (
    <div
      className={`bg-white rounded-xl shadow-sm p-5 mb-4 border-l-4 ${statusStyles.border} transform transition-all duration-200 hover:shadow-md hover:translate-y-[-2px]`}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-lg text-gray-900 flex items-center">
            {claim.patientName ||
              'Unknown Patient'}
            {claim.claimId && (
              <span className="ml-2 text-sm font-normal text-gray-500">
                (ID: {claim.claimId})
              </span>
            )}
          </h3>
          <div className="flex items-center mt-1.5">
            <div
              className={`px-3 py-1 rounded-full text-sm font-medium flex items-center ${statusStyles.bg} ${statusStyles.text}`}
            >
              {statusStyles.icon}
              {claim.status}
            </div>
          </div>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {expanded ? (
            <>
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 15l7-7 7 7"
                ></path>
              </svg>
              Less
            </>
          ) : (
            <>
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
              More
            </>
          )}
        </button>
      </div>

      <div
        className={`mt-4 grid grid-cols-2 gap-4 text-sm ${
          expanded ? '' : 'hidden'
        }`}
      >
        <div className="bg-gray-50 p-3 rounded-md">
          <p className="text-gray-500 text-xs uppercase font-semibold mb-1">
            Amount
          </p>
          <p className="font-medium text-gray-900">
            {formattedAmount || 'N/A'}
          </p>
        </div>
        <div className="bg-gray-50 p-3 rounded-md">
          <p className="text-gray-500 text-xs uppercase font-semibold mb-1">
            Service Date
          </p>
          <p className="font-medium text-gray-900">
            {claim.serviceDate || 'N/A'}
          </p>
        </div>
      </div>

      <div
        className={`mt-4 ${
          expanded ? '' : 'hidden'
        }`}
      >
        <div className="bg-gray-50 p-4 rounded-md">
          <p className="text-gray-500 text-xs uppercase font-semibold mb-2">
            Notes
          </p>
          <p className="text-sm text-gray-700">
            {claim.notes || 'No notes available'}
          </p>
        </div>
      </div>

      {!expanded && (
        <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500 text-xs uppercase font-semibold">
              Amount
            </p>
            <p className="font-medium text-gray-900">
              {formattedAmount || 'N/A'}
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-xs uppercase font-semibold">
              Service Date
            </p>
            <p className="font-medium text-gray-900">
              {claim.serviceDate || 'N/A'}
            </p>
          </div>
        </div>
      )}

      {!expanded && claim.notes && (
        <div className="mt-3 text-sm">
          <p className="text-gray-500 text-xs uppercase font-semibold">
            Notes
          </p>
          <p className="text-sm text-gray-700 truncate">
            {claim.notes}
          </p>
        </div>
      )}

      {/* Procedure codes section - always visible */}
      <div className="mt-4 pt-3 border-t border-gray-100">
        <p className="text-gray-500 text-xs uppercase font-semibold mb-2 flex items-center">
          <svg
            className="w-3 h-3 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            ></path>
          </svg>
          Procedure Codes
        </p>
        <div className="flex flex-wrap gap-2 mt-1">
          {claim.procedureCodes &&
          claim.procedureCodes.length > 0 ? (
            claim.procedureCodes.map(
              (code, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-blue-50 text-blue-700"
                >
                  {code}
                </span>
              )
            )
          ) : (
            <span className="text-xs text-gray-500">
              No procedure codes
            </span>
          )}
        </div>
      </div>

      {/* Action buttons */}
      <div className="mt-4 flex justify-end space-x-2">
        <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            ></path>
          </svg>
          Edit
        </button>
        <button className="inline-flex items-center px-3 py-1.5 border border-transparent shadow-sm text-xs font-medium rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
          Process
        </button>
      </div>
    </div>
  );
};

export default ClaimCard;

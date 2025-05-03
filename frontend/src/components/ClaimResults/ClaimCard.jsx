import React from 'react';

const ClaimCard = ({ claim }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'Denied':
        return 'bg-red-100 text-red-800';
      case 'Pending Review':
        return 'bg-yellow-100 text-yellow-800';
      case 'Needs Information':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 border-l-4 border-blue-500">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-lg">
            {claim.patientName ||
              'Unknown Patient'}
          </h3>
          <p className="text-gray-600 text-sm">
            Claim ID: {claim.claimId || 'N/A'}
          </p>
        </div>
        <div
          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
            claim.status
          )}`}
        >
          {claim.status}
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
        <div>
          <p className="text-gray-500">Amount</p>
          <p>
            $
            {typeof claim.amount === 'number'
              ? claim.amount.toFixed(2)
              : claim.amount}
          </p>
        </div>
        <div>
          <p className="text-gray-500">
            Service Date
          </p>
          <p>{claim.serviceDate || 'N/A'}</p>
        </div>
      </div>

      <div className="mt-3">
        <p className="text-gray-500 text-sm">
          Notes
        </p>
        <p className="text-sm">{claim.notes}</p>
      </div>
    </div>
  );
};

export default ClaimCard;

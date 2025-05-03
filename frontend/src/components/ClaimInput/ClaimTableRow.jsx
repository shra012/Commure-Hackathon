// src/components/ClaimInput/ClaimTableRow.jsx
import React from 'react';

const ClaimTableRow = ({ claim }) => {
  // For claims with multiple procedures, generate multiple rows
  if (
    claim.procedures &&
    claim.procedures.length > 0
  ) {
    return (
      <>
        {claim.procedures.map(
          (procedure, index) => (
            <tr
              key={`${
                claim.claimId || claim.index
              }-${index}`}
              className={
                claim.isValid ? '' : 'bg-red-50'
              }
            >
              {/* Only show claimId in first row of multi-procedure claim */}
              <td className="border px-4 py-2">
                {index === 0
                  ? claim.claimId || 'Missing ID'
                  : ''}
              </td>

              <td className="border px-4 py-2">
                {procedure.code || 'Missing Code'}
              </td>

              <td className="border px-4 py-2">
                {procedure.modifiers &&
                procedure.modifiers.length > 0
                  ? procedure.modifiers.join(', ')
                  : 'None'}
              </td>

              {/* Only show patient name in first row */}
              <td className="border px-4 py-2">
                {index === 0
                  ? claim.patientName || 'Unknown'
                  : ''}
              </td>

              {/* Only show errors in first row */}
              <td className="border px-4 py-2 text-red-500">
                {index === 0 && !claim.isValid
                  ? claim.errors.join(', ')
                  : ''}
              </td>
            </tr>
          )
        )}
      </>
    );
  }

  // Fallback for claims without procedures
  return (
    <tr
      className={claim.isValid ? '' : 'bg-red-50'}
    >
      <td className="border px-4 py-2">
        {claim.claimId || 'Missing ID'}
      </td>
      <td className="border px-4 py-2">None</td>
      <td className="border px-4 py-2">None</td>
      <td className="border px-4 py-2">
        {claim.patientName || 'Unknown'}
      </td>
      <td className="border px-4 py-2 text-red-500">
        {!claim.isValid
          ? claim.errors.join(', ')
          : ''}
      </td>
    </tr>
  );
};

export default ClaimTableRow;

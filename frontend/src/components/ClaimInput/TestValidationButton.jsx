// src/components/ClaimInput/TestValidationButton.jsx
import '../../index.css';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setValidationResults } from '../../redux/slices/claimSlice';

const TestValidationButton = () => {
  const dispatch = useDispatch();

  // Sample validation results for testing
  const sampleValidationResults = {
    claims: [
      {
        claim_id: '1000000',
        approved: false,
        results: [
          {
            claim_id: '1000000',
            code1: '0003A',
            code2: '0051A',
            modifier: '0',
            result:
              '❌ Combination not allowed for 0003A+0051A',
          },
          {
            claim_id: '1000000',
            code1: null,
            code2: null,
            modifier: '0',
            result:
              '✅ No single rule errors found',
          },
        ],
        summary:
          'For claim 1000000, the combination of modifiers 0003A and 0051A with modifier 0 is not allowed.',
      },
      {
        claim_id: '1000001',
        approved: true,
        results: [
          {
            claim_id: '1000001',
            code1: '0001A',
            code2: '99281',
            modifier: '1',
            result:
              '✅ No pair rule errors found',
          },
          {
            claim_id: '1000001',
            code1: null,
            code2: null,
            modifier: '1',
            result:
              '✅ No single rule errors found',
          },
        ],
        summary:
          'No billing violations detected.',
      },
    ],
  };

  const loadTestData = () => {
    dispatch(
      setValidationResults(
        sampleValidationResults
      )
    );
  };

  return (
    <button
      onClick={loadTestData}
      className="btn btn-primary w-full mt-4"
    >
      Load Test Validation Results
    </button>
  );
};

export default TestValidationButton;

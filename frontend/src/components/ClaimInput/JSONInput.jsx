// src/components/ClaimInput/JSONInput.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  setParsedClaims,
  setParseError,
} from '../../redux/slices/claimSlice';
import {
  parseJSON,
  validateClaims,
} from '../../utils/parseHelper';

const JSONInput = () => {
  const [jsonText, setJsonText] = useState('');
  const [isProcessing, setIsProcessing] =
    useState(false);
  const [hasProcessed, setHasProcessed] =
    useState(false);
  const dispatch = useDispatch();

  const handleParse = () => {
    try {
      if (!jsonText.trim()) {
        dispatch(
          setParseError('Please enter JSON data')
        );
        return;
      }

      setIsProcessing(true);

      // Parse the JSON
      const data = parseJSON(jsonText);

      // Validate the claims using the helper function
      const validatedData = validateClaims(data);

      console.log(
        'Validated data:',
        validatedData
      );

      // Set parsed claims in Redux store
      dispatch(setParsedClaims(validatedData));
      setIsProcessing(false);
      setHasProcessed(true);

      // Reset the "processed" state after 3 seconds
      setTimeout(() => {
        setHasProcessed(false);
      }, 3000);
    } catch (error) {
      console.error('Parse error:', error);
      dispatch(setParseError(error.message));
      setIsProcessing(false);
    }
  };

  const handlePaste = () => {
    navigator.clipboard
      .readText()
      .then((text) => {
        setJsonText(text);
      })
      .catch((err) => {
        console.error(
          'Failed to read clipboard:',
          err
        );
      });
  };

  const clearText = () => {
    setJsonText('');
    setHasProcessed(false);
    dispatch(setParsedClaims([]));
  };

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center">
          <h3 className="text-lg font-medium text-gray-800">
            Paste JSON Claims Data
          </h3>
        </div>
        <div className="space-x-2">
          <button
            onClick={handlePaste}
            className="bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-md text-sm transition-colors duration-200 flex items-center focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
          >
            Paste
          </button>
          <button
            onClick={clearText}
            className="bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-md text-sm transition-colors duration-200 flex items-center focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
          >
            Clear
          </button>
        </div>
      </div>
      <div className="relative">
        <textarea
          className="w-full h-56 border border-gray-300 rounded-lg p-4 font-mono text-sm bg-gray-50 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-200"
          placeholder='[{"claim_id": "C1", "codes": ["0001A", "0591T"], "modifier": "1"}]'
          value={jsonText}
          onChange={(e) =>
            setJsonText(e.target.value)
          }
        />

        {jsonText && (
          <span className="absolute bottom-2 right-2 text-xs text-gray-500">
            {jsonText.length} characters
          </span>
        )}
      </div>

      <button
        onClick={handleParse}
        disabled={
          isProcessing || !jsonText.trim()
        }
        className={`w-full mt-3 py-2.5 px-4 rounded-md transition-colors duration-200 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
          isProcessing || !jsonText.trim()
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : hasProcessed
            ? 'bg-green-500 hover:bg-green-600 text-white'
            : 'bg-blue-600 hover:bg-blue-700 text-white'
        }`}
      >
        {isProcessing ? (
          <>
            Processing...
          </>
        ) : hasProcessed ? (
          <>
            Processed Successfully
          </>
        ) : (
          <>
            Parse Claims
          </>
        )}
      </button>
    </div>
  );
};

export default JSONInput;

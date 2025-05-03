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
          <svg
            className="w-5 h-5 text-blue-600 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
            ></path>
          </svg>
          <h3 className="text-lg font-medium text-gray-800">
            Paste JSON Claims Data
          </h3>
        </div>
        <div className="space-x-2">
          <button
            onClick={handlePaste}
            className="bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-md text-sm transition-colors duration-200 flex items-center focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
          >
            <svg
              className="w-4 h-4 mr-1.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
              ></path>
            </svg>
            Paste
          </button>
          <button
            onClick={clearText}
            className="bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-md text-sm transition-colors duration-200 flex items-center focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
          >
            <svg
              className="w-4 h-4 mr-1.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              ></path>
            </svg>
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
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
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
            Processing...
          </>
        ) : hasProcessed ? (
          <>
            <svg
              className="w-4 h-4 mr-1.5"
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
            Processed Successfully
          </>
        ) : (
          <>
            <svg
              className="w-4 h-4 mr-1.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              ></path>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            Parse Claims
          </>
        )}
      </button>
    </div>
  );
};

export default JSONInput;

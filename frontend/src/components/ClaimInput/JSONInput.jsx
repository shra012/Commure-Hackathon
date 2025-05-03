// src/components/ClaimInput/JSONInput.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  setParsedClaims,
  setParseError,
} from '../../redux/slices/claimSlice';
import { parseJSON } from '../../utils/parseHelper';

const JSONInput = () => {
  const [jsonText, setJsonText] = useState('');
  const dispatch = useDispatch();

  const handleParse = () => {
    try {
      if (!jsonText.trim()) {
        dispatch(
          setParseError('Please enter JSON data')
        );
        return;
      }

      const data = parseJSON(jsonText);
      dispatch(setParsedClaims(data));
    } catch (error) {
      dispatch(setParseError(error.message));
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
    dispatch(setParsedClaims([]));
  };

  return (
    <div className="mt-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-medium">
          Paste JSON Claims Data
        </h3>
        <div className="space-x-2">
          <button
            onClick={handlePaste}
            className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded text-sm"
          >
            Paste
          </button>
          <button
            onClick={clearText}
            className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded text-sm"
          >
            Clear
          </button>
        </div>
      </div>
      <textarea
        className="w-full h-64 border border-gray-300 rounded-md p-3 font-mono text-sm"
        placeholder='[{"claimId": "CL12345", "patientName": "John Doe", "procedureCodes": ["99213", "85025"], "modifiers": ["25"]}]'
        value={jsonText}
        onChange={(e) =>
          setJsonText(e.target.value)
        }
      />
      <button
        onClick={handleParse}
        className="w-full mt-2 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md transition-colors"
      >
        Parse Claims
      </button>
    </div>
  );
};

export default JSONInput;

// src/components/ClaimInput/FileUpload.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  setParsedClaims,
  setParseError,
  validateClaimsApi,
} from '../../redux/slices/claimSlice';
import {
  parseCSV,
  validateClaims,
} from '../../utils/parseHelper';

const FileUpload = () => {
  const [dragActive, setDragActive] =
    useState(false);
  const [isUploading, setIsUploading] =
    useState(false);
  const [fileName, setFileName] = useState('');
  const dispatch = useDispatch();

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (
      e.type === 'dragenter' ||
      e.type === 'dragover'
    ) {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (
      e.dataTransfer.files &&
      e.dataTransfer.files[0]
    ) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    const fileType = file.type;
    const reader = new FileReader();
    setIsUploading(true);
    setFileName(file.name);

    reader.onload = async (e) => {
      try {
        let data;
        if (fileType === 'application/json') {
          data = JSON.parse(e.target.result);
        } else if (fileType === 'text/csv') {
          data = await parseCSV(file);
        } else {
          throw new Error(
            'Unsupported file type. Please upload a JSON or CSV file.'
          );
        }

        // Use the validateClaims helper function for consistent validation
        const validatedData =
          validateClaims(data);

        // Set validated data in store
        dispatch(setParsedClaims(validatedData));

        // Also send to API if needed
        dispatch(
          validateClaimsApi(validatedData)
        );

        setIsUploading(false);
      } catch (error) {
        setIsUploading(false);
        dispatch(
          setParseError(
            `Error processing file: ${error.message}`
          )
        );
      }
    };

    reader.readAsText(file);
  };

  return (
    <div
      className={`border-2 border-dashed rounded-xl h-48 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
        dragActive
          ? 'border-blue-500 bg-blue-50'
          : isUploading
          ? 'border-yellow-400 bg-yellow-50'
          : fileName
          ? 'border-green-400 bg-green-50'
          : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
      }`}
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
    >
      {isUploading ? (
        <div className="flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mb-3"></div>
          <p className="text-blue-600 font-medium">
            Processing {fileName}...
          </p>
        </div>
      ) : fileName ? (
        <div className="flex flex-col items-center justify-center">
          <div className="mb-3 text-green-600">
            <svg
              className="w-12 h-12"
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
          </div>
          <p className="text-green-600 font-medium">
            File processed successfully!
          </p>
          <p className="text-sm text-gray-600 mt-1">
            {fileName}
          </p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setFileName('');
            }}
            className="mt-2 text-xs text-blue-600 hover:text-blue-800 font-medium"
          >
            Upload another file
          </button>
        </div>
      ) : (
        <>
          <div className="mb-3 text-blue-500">
            <svg
              className="w-12 h-12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              ></path>
            </svg>
          </div>
          <p className="text-gray-600 mb-2 text-center">
            Drag & drop a CSV or JSON file here,
            or
            <br />
            click to browse
          </p>
          <input
            type="file"
            id="file-upload"
            className="hidden"
            accept=".json,.csv"
            onChange={handleChange}
          />
          <label
            htmlFor="file-upload"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md cursor-pointer transition-colors shadow-sm flex items-center"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
              ></path>
            </svg>
            Browse Files
          </label>
        </>
      )}
    </div>
  );
};

export default FileUpload;

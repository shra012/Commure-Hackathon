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
            Browse Files
          </label>
        </>
      )}
    </div>
  );
};

export default FileUpload;

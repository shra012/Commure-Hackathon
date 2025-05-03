// src/components/ClaimInput/FileUpload.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  setParsedClaims,
  setParseError,
} from '../../redux/slices/claimSlice';
import { parseCSV } from '../../utils/parseHelper';

const FileUpload = () => {
  const [dragActive, setDragActive] =
    useState(false);
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

        dispatch(setParsedClaims(data));
      } catch (error) {
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
      className={`border-2 border-dashed p-6 rounded-lg text-center h-40 flex flex-col items-center justify-center cursor-pointer ${
        dragActive
          ? 'border-blue-500 bg-blue-50'
          : 'border-gray-300 hover:border-blue-400'
      }`}
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
    >
      <p className="text-gray-600 mb-2">
        Drag & drop a CSV or JSON file here, or
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
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md cursor-pointer transition-colors"
      >
        Browse Files
      </label>
    </div>
  );
};

export default FileUpload;

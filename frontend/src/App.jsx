// src/App.jsx

import React from 'react';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import ClaimInput from './components/ClaimInput/ClaimInput';
import ClaimTableDisplay from './components/ClaimInput/ClaimTableDisplay';
import ClaimResults from './components/ClaimResults/ClaimResults';
import { useSelector } from 'react-redux';
import './App.css';

const App = () => {
  const { parsedClaims = [] } = useSelector(
    (state) => state.claims
  );

  return (
    <div className="app-container">
      <Header />

      <main className="main-content">
        {/* LEFT COLUMN: Input and claim preview */}
        <div className="left-column">
          {/* Input section with fixed height */}
          <div className="input-section">
            <ClaimInput />
          </div>

          {/* Parsed claims section (scrollable) */}
          <div className="parsed-claims-scroll custom-scrollbar">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-blue-600"
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
              Preview Claims
            </h3>

            {parsedClaims.length > 0 ? (
              <ClaimTableDisplay />
            ) : (
              <div className="text-center py-10 bg-gray-50 rounded-lg border border-gray-200">
                <svg
                  className="w-12 h-12 mx-auto text-gray-400 mb-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  ></path>
                </svg>
                <p className="text-gray-500">
                  No claims to preview
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  Upload or paste claim data to
                  see preview
                </p>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Processed claims results */}
        <div className="right-column">
          <div className="validated-claims-scroll custom-scrollbar">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-green-600"
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
              Processed Results
            </h3>
            <ClaimResults />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;

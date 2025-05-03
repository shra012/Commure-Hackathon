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
              Preview Claims
            </h3>

            {parsedClaims.length > 0 ? (
              <ClaimTableDisplay />
            ) : (
              <div className="text-center py-10 bg-gray-50 rounded-lg border border-gray-200">
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

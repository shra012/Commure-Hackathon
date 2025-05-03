import React from 'react';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import ClaimInput from './components/ClaimInput/ClaimInput';
import ClaimResults from './components/ClaimResults/ClaimResults';
import './App.css';

const App = () => {
  return (
    <div className="app-container">
      <Header />
      
      <main className="main-content">
        {/* Left Column - Input */}
        <div className="left-column">
          <ClaimInput />
        </div>
        
        {/* Right Column - Results */}
        <div className="right-column">
          <ClaimResults />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default App;
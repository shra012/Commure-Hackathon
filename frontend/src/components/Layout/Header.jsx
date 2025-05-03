import React from 'react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 shadow-lg w-full">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <div>
            <h1 className="text-2xl font-bold">
              HealthClaim Processor
            </h1>
            <p className="text-blue-100 text-sm">
              Medical Claims Management System
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="bg-white text-blue-700 px-4 py-2 rounded-md font-medium text-sm hover:bg-blue-50 transition duration-200 shadow-sm flex items-center">
            Help
          </button>

          <div className="bg-blue-500 hover:bg-blue-600 rounded-full p-2 cursor-pointer transition duration-200">
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white w-full">
      <div className="max-w-7xl mx-auto py-5 px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-center md:justify-start space-x-6">
            <a
              href="#"
              className="text-gray-400 hover:text-gray-300 transition duration-150"
            >
              <span className="sr-only">
                Terms
              </span>
              <span className="text-sm">
                Terms of Service
              </span>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-gray-300 transition duration-150"
            >
              <span className="sr-only">
                Privacy
              </span>
              <span className="text-sm">
                Privacy Policy
              </span>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-gray-300 transition duration-150"
            >
              <span className="sr-only">
                Support
              </span>
              <span className="text-sm">
                Support
              </span>
            </a>
          </div>

          <div className="mt-4 md:mt-0">
            <p className="text-center md:text-right text-sm text-gray-400">
              &copy; 2025 HealthClaim Processor.
              All rights reserved.
            </p>
          </div>
        </div>

        <div className="mt-4 border-t border-gray-700 pt-4 flex items-center justify-center">
          <p className="text-xs text-gray-400">
            Designed for efficient medical claims
            processing and validation
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React from "react";
import Link from "next/link";

/**
 * Footer component
 * Renders the site footer with copyright information.
 *
 * @component
 * @returns {JSX.Element} Footer element
 */
const Footer = () => {
  return (
    <footer className="w-screen bg-gray-100 dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-center">
          {/* You can add logo or navigation links here if needed */}
          <p className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400 lg:mt-0 lg:text-right">
            {/* Display current year dynamically */}
            &copy; {new Date().getFullYear()}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

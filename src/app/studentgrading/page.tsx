import React from 'react';
import Head from 'next/head';
import GradingInterface from '@/app/components/gradinginterface';
import 'core-js/full/promise/with-resolvers.js';
import { polyfillPromiseWithResolvers } from '../utils/PromiseWithResolvers';

polyfillPromiseWithResolvers();
const GradingPage = () => {
  return (
    <>
      <Head>
        <title>Math Remote Assessment - Grading for Demos</title>
        <meta name="description" content="Grading interface for math remote assessments" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-gray-100">

        <div className=" mx-auto py-6 sm:px-6 lg:px-8">
          {/* Top bar */}
          <div className="bg-white shadow-sm mb-6 p-4 flex justify-between items-center">
            <div className="flex space-x-4">
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Filter evaluations
              </button>
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
                Shortcuts
              </button>
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
                Help
              </button>
            </div>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
              Overview grid
            </button>
          </div>

          {/* Grading Interface */}
          <GradingInterface />
        </div>
      </main>
    </>
  );
};

export default GradingPage;

import React from 'react';
import SpeechToText from '@/components/SpeechToText';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-purple-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent mb-3">
            Speak It, Scribe It
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
            Your voice, instantly transformed into text. Start speaking and watch your words appear on screen.
          </p>
        </header>
        
        <SpeechToText />
        
        <footer className="text-center mt-16 text-sm text-gray-500 dark:text-gray-400">
          <p>Uses the Web Speech API. Best experienced in Chrome or Edge browsers.</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;

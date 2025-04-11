
import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import TranscriptionDisplay from './TranscriptionDisplay';
import RecordButton from './RecordButton';

const SpeechToText = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const recognitionRef = useRef<any>(null);
  
  useEffect(() => {
    // Check if browser supports the Web Speech API
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast.error('Your browser does not support speech recognition. Try Chrome or Edge.');
      return;
    }
    
    // Create speech recognition object
    const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    
    // Configure recognition
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = 'en-US';
    
    // Set up event handlers
    recognitionRef.current.onresult = (event: any) => {
      let interim = '';
      let final = '';
      
      for (let i = 0; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          final += event.results[i][0].transcript + ' ';
        } else {
          interim += event.results[i][0].transcript;
        }
      }
      
      setTranscript(final);
      setInterimTranscript(interim);
    };
    
    recognitionRef.current.onerror = (event: any) => {
      console.error('Speech recognition error', event);
      if (event.error === 'not-allowed') {
        toast.error('Microphone access denied. Please allow microphone access to use speech recognition.');
      } else {
        toast.error(`Error occurred: ${event.error}`);
      }
      setIsRecording(false);
    };
    
    recognitionRef.current.onend = () => {
      // Don't reset recording state if we want it to continue
      if (isRecording) {
        try {
          recognitionRef.current.start();
        } catch (e) {
          console.error('Error restarting recognition', e);
          setIsRecording(false);
        }
      }
    };
    
    return () => {
      // Clean up
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [isRecording]);
  
  const toggleRecording = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
      // Add final interim transcript to transcript
      if (interimTranscript) {
        setTranscript((prev) => prev + interimTranscript);
        setInterimTranscript('');
      }
      toast.success('Recording stopped');
    } else {
      try {
        recognitionRef.current?.start();
        setIsRecording(true);
        toast.success('Recording started');
      } catch (err) {
        console.error('Error starting recognition', err);
        toast.error('Failed to start recording. Please try again.');
      }
    }
  };
  
  const clearTranscript = () => {
    setTranscript('');
    setInterimTranscript('');
    toast.success('Transcript cleared');
  };
  
  const copyToClipboard = () => {
    const fullText = transcript + interimTranscript;
    if (fullText) {
      navigator.clipboard.writeText(fullText).then(
        () => {
          toast.success('Copied to clipboard!');
        },
        () => {
          toast.error('Failed to copy to clipboard');
        }
      );
    } else {
      toast.info('Nothing to copy');
    }
  };
  
  return (
    <div className="speech-container max-w-3xl mx-auto p-6">
      <div className="flex flex-col gap-8">
        <RecordButton 
          isRecording={isRecording} 
          toggleRecording={toggleRecording} 
        />
        
        <TranscriptionDisplay 
          transcript={transcript}
          interimTranscript={interimTranscript}
          clearTranscript={clearTranscript}
          copyToClipboard={copyToClipboard}
        />
      </div>
    </div>
  );
};

export default SpeechToText;


import React from 'react';
import { Mic, MicOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface RecordButtonProps {
  isRecording: boolean;
  toggleRecording: () => void;
}

const RecordButton = ({ isRecording, toggleRecording }: RecordButtonProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className="relative">
        <Button
          onClick={toggleRecording}
          className={cn(
            "h-24 w-24 rounded-full flex items-center justify-center transition-all duration-300",
            isRecording 
              ? "bg-red-500 hover:bg-red-600 shadow-lg pulse-animation" 
              : "bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
          )}
          aria-label={isRecording ? "Stop recording" : "Start recording"}
        >
          {isRecording ? (
            <MicOff size={36} />
          ) : (
            <Mic size={36} />
          )}
        </Button>
        {isRecording && (
          <div className="recording-indicator absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-ping" />
        )}
      </div>
      <p className="text-lg font-medium">
        {isRecording ? 'Recording...' : 'Tap to Record'}
      </p>
      {isRecording && (
        <p className="text-sm text-gray-500">
          Tap again to stop
        </p>
      )}
    </div>
  );
};

export default RecordButton;

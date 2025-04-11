
import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Copy, Trash2, Download } from 'lucide-react';

interface TranscriptionDisplayProps {
  transcript: string;
  interimTranscript: string;
  clearTranscript: () => void;
  copyToClipboard: () => void;
}

const TranscriptionDisplay = ({
  transcript,
  interimTranscript,
  clearTranscript,
  copyToClipboard
}: TranscriptionDisplayProps) => {
  const fullText = transcript + interimTranscript;
  
  const downloadTranscript = () => {
    if (!fullText) return;
    
    const element = document.createElement('a');
    const file = new Blob([fullText], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `transcript-${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Transcription</h2>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={copyToClipboard}
            disabled={!fullText}
            title="Copy to clipboard"
            className="flex items-center gap-1"
          >
            <Copy size={16} />
            <span className="hidden sm:inline">Copy</span>
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={downloadTranscript}
            disabled={!fullText}
            title="Download as text file"
            className="flex items-center gap-1"
          >
            <Download size={16} />
            <span className="hidden sm:inline">Download</span>
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={clearTranscript}
            disabled={!fullText}
            title="Clear transcript"
            className="text-destructive hover:text-destructive flex items-center gap-1"
          >
            <Trash2 size={16} />
            <span className="hidden sm:inline">Clear</span>
          </Button>
        </div>
      </div>
      
      <ScrollArea className="h-[300px] border border-gray-200 dark:border-gray-700 rounded-md p-4 bg-gray-50 dark:bg-gray-900">
        <div className="transcript-text min-h-[280px]">
          {transcript && <p className="mb-2 whitespace-pre-wrap">{transcript}</p>}
          {interimTranscript && (
            <p className="text-gray-500 italic whitespace-pre-wrap">{interimTranscript}</p>
          )}
          {!fullText && (
            <p className="text-gray-400 dark:text-gray-500 italic">
              Start recording to see transcription here...
            </p>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default TranscriptionDisplay;

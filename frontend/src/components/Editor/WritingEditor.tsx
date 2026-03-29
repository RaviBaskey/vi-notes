import React, { useState, useRef, useEffect } from 'react';
import './WritingEditor.css';

export const WritingEditor = () => {
  const [content, setContent] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize the textarea to feel like a seamless document
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    
  };

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  return (
    <div className="editor-container animate-fade-in">
      <textarea
        ref={textareaRef}
        className="writing-area"
        value={content}
        onChange={handleInput}
        placeholder="Start writing..."
        spellCheck="false"
      />
    </div>
  );
};

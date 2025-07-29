import React from 'react';

interface VibePromptProps {
  prompt: string;
  emoji: string;
}

const VibePrompt: React.FC<VibePromptProps> = ({ prompt, emoji }) => {
  return (
    <div className="vibe-prompt">
      <div className="prompt-emoji">{emoji}</div>
      <h2 className="prompt-text">{prompt}</h2>
    </div>
  );
};

export default VibePrompt;
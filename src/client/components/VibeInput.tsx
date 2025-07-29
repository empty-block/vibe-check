import React, { useState, useRef } from 'react';

interface VibeInputProps {
  onSubmit: (vibe: { emojis: string; text?: string }) => void;
}

const VibeInput: React.FC<VibeInputProps> = ({ onSubmit }) => {
  const [emojis, setEmojis] = useState('');
  const [text, setText] = useState('');
  const [showTextInput, setShowTextInput] = useState(false);
  const emojiInputRef = useRef<HTMLInputElement>(null);

  const handleEmojiInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmojis(e.target.value);
  };

  const handleTextInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emojis.trim() || text.trim()) {
      onSubmit({ emojis: emojis.trim(), text: text.trim() || undefined });
      setEmojis('');
      setText('');
      setShowTextInput(false);
    }
  };

  return (
    <form className="vibe-input" onSubmit={handleSubmit}>
      <div className="emoji-input-container">
        <input
          ref={emojiInputRef}
          type="text"
          className="emoji-input"
          placeholder="Tap to add emojis 🔥"
          value={emojis}
          onChange={handleEmojiInput}
          autoComplete="off"
        />
        <button
          type="button"
          className="text-toggle"
          onClick={() => setShowTextInput(!showTextInput)}
          aria-label={showTextInput ? "Hide text input" : "Add text"}
        >
          {showTextInput ? '−' : 'Aa'}
        </button>
      </div>
      
      {showTextInput && (
        <textarea
          className="text-input"
          placeholder="Add some words to your vibe..."
          value={text}
          onChange={handleTextInput}
          rows={3}
        />
      )}
      
      <button
        type="submit"
        className="submit-button"
        disabled={!emojis.trim() && !text.trim()}
      >
        Share Vibe
      </button>
    </form>
  );
};

export default VibeInput;
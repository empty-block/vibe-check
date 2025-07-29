import React, { useState, useRef } from 'react';
import EmojiPicker, { type EmojiClickData } from 'emoji-picker-react';

interface VibeInputProps {
  onSubmit: (vibe: { emojis: string; text?: string }) => void;
}

const VibeInput: React.FC<VibeInputProps> = ({ onSubmit }) => {
  const [input, setInput] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setInput(prev => prev + emojiData.emoji);
    setShowEmojiPicker(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      // Parse emojis vs text (simple approach - emojis are typically unicode characters > 127)
      const emojiRegex = /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu;
      const emojis = input.match(emojiRegex)?.join('') || '';
      const text = input.replace(emojiRegex, '').trim();
      
      onSubmit({ 
        emojis: emojis || input.trim(), // fallback to full input if no emojis detected
        text: text || undefined 
      });
      setInput('');
    }
  };

  return (
    <form className="vibe-input" onSubmit={handleSubmit}>
      <div className="input-container">
        <input
          ref={inputRef}
          type="text"
          className="vibe-text-input"
          placeholder="Share your vibe with emojis and words... 🔥"
          value={input}
          onChange={handleInputChange}
          autoComplete="off"
        />
        <button
          type="button"
          className="emoji-picker-button"
          onClick={handleEmojiPicker}
          aria-label="Open emoji picker"
        >
          😊
        </button>
      </div>
      
      {showEmojiPicker && (
        <div className="emoji-picker-container">
          <EmojiPicker
            onEmojiClick={handleEmojiClick}
            width={300}
            height={350}
            searchDisabled={false}
            skinTonesDisabled={true}
            previewConfig={{ showPreview: false }}
          />
        </div>
      )}
      
      <button
        type="submit"
        className="submit-button"
        disabled={!input.trim()}
      >
        Share Vibe
      </button>
    </form>
  );
};

export default VibeInput;
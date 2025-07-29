import React, { useState, useEffect } from 'react';
import { useFarcaster } from '../contexts/FarcasterContext';
import VibePrompt from './VibePrompt';
import VibeInput from './VibeInput';
import CommunityVibes from './CommunityVibes';
import { mockPostVibe, mockGetRecentVibes, mockGetTodayPrompt } from '../services/mockFarcaster';

const VibePage: React.FC = () => {
  const { user } = useFarcaster();
  const [prompt, setPrompt] = useState({ prompt: '', emoji: '' });
  const [vibes, setVibes] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    // Load today's prompt
    mockGetTodayPrompt().then(setPrompt);
    
    // Load recent vibes
    mockGetRecentVibes().then(setVibes);
  }, []);

  const handleVibeSubmit = async (vibe: { emojis: string; text?: string }) => {
    if (!user) return;
    
    setIsSubmitting(true);
    try {
      const newVibe = await mockPostVibe(vibe, user);
      setVibes([newVibe, ...vibes]);
      
      // Show success feedback
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Failed to post vibe:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="vibe-page">
        <div className="auth-message">
          <p>Signing in with Farcaster is the vibe!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="vibe-page">
      <VibePrompt prompt={prompt.prompt} emoji={prompt.emoji} />
      
      <div className="vibe-input-section">
        <VibeInput onSubmit={handleVibeSubmit} />
        
        {isSubmitting && (
          <div className="submission-feedback">
            <span className="loading-spinner">⏳</span>
            Sharing your vibe...
          </div>
        )}
        
        {showSuccess && (
          <div className="submission-feedback success">
            <span className="success-icon">✅</span>
            Vibe shared!
          </div>
        )}
      </div>
      
      <CommunityVibes vibes={vibes} />
    </div>
  );
};

export default VibePage;
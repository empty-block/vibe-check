import React from 'react';

interface VibePost {
  id: string;
  author: {
    fid: number;
    username: string;
    displayName: string;
    pfp: string;
  };
  content: {
    emojis: string;
    text?: string;
  };
  timestamp: Date;
}

interface CommunityVibesProps {
  vibes: VibePost[];
}

const formatTimeAgo = (date: Date): string => {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  
  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
};

const CommunityVibes: React.FC<CommunityVibesProps> = ({ vibes }) => {
  return (
    <div className="community-vibes">
      <h3 className="community-title">Community Vibes</h3>
      <div className="vibes-list">
        {vibes.map((vibe) => (
          <div key={vibe.id} className="vibe-item">
            <img 
              src={vibe.author.pfp} 
              alt={vibe.author.displayName}
              className="author-pfp"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/identicon/svg?seed=${vibe.author.username}`;
              }}
            />
            <div className="vibe-content">
              <div className="vibe-header">
                <span className="author-name">{vibe.author.displayName}</span>
                <span className="timestamp">{formatTimeAgo(vibe.timestamp)}</span>
              </div>
              <div className="vibe-message">
                <span className="vibe-emojis">{vibe.content.emojis}</span>
                {vibe.content.text && <span className="vibe-text">{vibe.content.text}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityVibes;
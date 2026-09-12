import { useState, useRef, useEffect } from 'react';
import { Play, ExternalLink } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

function extractVideoId(url) {
  const patterns = [
    /youtu\.be\/([a-zA-Z0-9_-]+)/,
    /youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

export default function VideoEmbed({ url, title, className = '' }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const { ref, isVisible } = useScrollAnimation();
  const videoId = extractVideoId(url);
  const playButtonRef = useRef(null);

  useEffect(() => {
    if (isLoaded && playButtonRef.current) {
      playButtonRef.current.focus();
    }
  }, [isLoaded]);

  if (!videoId) return null;

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  const videoTitle = title || 'YouTube video';

  return (
    <div
      ref={ref}
      className={`relative rounded-xl overflow-hidden shadow-lg ${className} ${
        isVisible ? 'animate-fade-in-up' : 'opacity-0'
      }`}
    >
      {!isLoaded ? (
        // Thumbnail with play button
        <div
          className="relative aspect-video bg-gray-900 cursor-pointer group"
          onClick={() => setIsLoaded(true)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setIsLoaded(true);
            }
          }}
          role="button"
          tabIndex={0}
          aria-label={`Play video: ${videoTitle}`}
        >
          <img
            src={thumbnailUrl}
            alt={`${videoTitle} — video thumbnail`}
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
            loading="lazy"
          />
          <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary/90 hover:bg-primary rounded-full flex items-center justify-center transition-all group-hover:scale-110 shadow-xl">
              <Play className="w-8 h-8 sm:w-10 sm:h-10 text-white ml-1" fill="white" />
            </div>
          </div>
          {title && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4" aria-hidden="true">
              <p className="text-white font-medium text-sm sm:text-base">{title}</p>
            </div>
          )}
        </div>
      ) : (
        // YouTube iframe
        <div className="aspect-video" role="region" aria-label={`Video: ${videoTitle}`}>
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
            title={videoTitle}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      )}
    </div>
  );
}

export function VideoLinks({ urls, title }) {
  return (
    <nav aria-label="Video links" className="space-y-4">
      {urls.map((url, index) => (
        <div key={index} className="flex items-center space-x-3">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-primary dark:text-green-400 hover:underline text-sm"
            aria-label={`Watch ${title ? `${title} ${index + 1}` : `video ${index + 1}`} on YouTube (opens in new tab)`}
          >
            <Play className="w-4 h-4 mr-2" aria-hidden="true" />
            {title ? `${title} ${index + 1}` : `Watch Video ${index + 1}`}
            <ExternalLink className="w-3 h-3 ml-1 opacity-50" aria-hidden="true" />
          </a>
        </div>
      ))}
    </nav>
  );
}

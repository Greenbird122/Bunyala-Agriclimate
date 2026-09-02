import { useState, useRef, useEffect } from 'react';
import { Play } from 'lucide-react';

export default function LocalVideoEmbed({ src, poster, title, className = '' }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const playButtonRef = useRef(null);
  const videoRef = useRef(null);

  const videoTitle = title || 'Local video';

  useEffect(() => {
    if (isPlaying && videoRef.current) {
      videoRef.current.focus();
    }
  }, [isPlaying]);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <div
      className={`relative rounded-xl overflow-hidden shadow-lg ${className}`}
      role="region"
      aria-label={`Video: ${videoTitle}`}
    >
      {!isPlaying ? (
        <div
          className="relative aspect-video bg-gray-900 cursor-pointer group"
          onClick={handlePlay}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handlePlay();
            }
          }}
          role="button"
          tabIndex={0}
          aria-label={`Play video: ${videoTitle}`}
        >
          {poster ? (
            <img
              src={poster}
              alt={`${videoTitle} — video thumbnail`}
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
              loading="lazy"
            />
          ) : (
            <div className="absolute inset-0 bg-gray-800" aria-hidden="true" />
          )}
          <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
            <div className="w-16 h-16 bg-white/90 dark:bg-dark-card/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Play className="w-7 h-7 text-gray-900 ml-1" fill="currentColor" aria-hidden="true" />
            </div>
          </div>
          {title && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <p className="text-white text-sm font-medium">{title}</p>
            </div>
          )}
        </div>
      ) : (
        <div className="aspect-video bg-black">
          <video
            ref={videoRef}
            src={src}
            controls
            autoPlay
            className="w-full h-full"
            aria-label={videoTitle}
            tabIndex={0}
          >
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
}

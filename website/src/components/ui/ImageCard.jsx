import { useState } from 'react';
import { ZoomIn } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export default function ImageCard({ 
  src, 
  alt, 
  caption, 
  className = '', 
  aspectRatio = 'aspect-[4/3]',
  showCaption = true 
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { ref, isVisible } = useScrollAnimation();

  return (
    <>
      <div 
        ref={ref}
        className={`group relative overflow-hidden rounded-xl ${className} ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={`${aspectRatio} overflow-hidden bg-neutral dark:bg-dark-card`}>
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>
        
        {/* Overlay on hover */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6`}>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors"
          >
            <ZoomIn className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Caption */}
        {caption && showCaption && (
          <div className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <p className="text-white text-sm font-medium text-center">{caption}</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-8 cursor-pointer"
          onClick={() => setIsModalOpen(false)}
        >
          <img
            src={src}
            alt={alt}
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
          {caption && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full">
              <p className="text-white text-sm">{caption}</p>
            </div>
          )}
        </div>
      )}
    </>
  );
}

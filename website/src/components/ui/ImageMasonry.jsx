import { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export default function ImageMasonry({ images, title = 'Gallery' }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const { ref, isVisible } = useScrollAnimation();
  const closeButtonRef = useRef(null);
  const dialogRef = useRef(null);

  if (!images || images.length === 0) return null;

  const openLightbox = (index) => {
    setLightboxIndex(index);
  };
  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const goNext = useCallback(() => {
    setLightboxIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  const goPrev = useCallback(() => {
    setLightboxIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  // Keyboard navigation + focus trap inside lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKey = (e) => {
      switch (e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowRight':
          goNext();
          break;
        case 'ArrowLeft':
          goPrev();
          break;
        default:
          break;
      }
    };

    // Focus close button when lightbox opens
    setTimeout(() => closeButtonRef.current?.focus(), 50);

    document.addEventListener('keydown', handleKey);
    // Prevent body scroll when lightbox is open
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [lightboxIndex, goNext, goPrev]);

  // Split into columns for masonry effect
  const columns = 3;
  const columnImages = Array.from({ length: columns }, (_, i) =>
    images.filter((_, idx) => idx % columns === i)
  );

  const lightboxImage = lightboxIndex !== null ? images[lightboxIndex] : null;

  return (
    <>
      <div
        ref={ref}
        className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
      >
        {columnImages.map((col, colIdx) => (
          <div key={colIdx} className="flex flex-col gap-4">
            {col.map((img, imgIdx) => {
              const actualIndex = colIdx + imgIdx * columns;
              const isLarge = imgIdx === 0 && colIdx === 1;
              const aspectClass = isLarge ? 'aspect-[4/5]' : 'aspect-[4/3]';

              return (
                <div
                  key={actualIndex}
                  className={`group relative overflow-hidden rounded-xl cursor-pointer transition-all duration-500 hover:z-10 ${aspectClass}`}
                  onClick={() => openLightbox(actualIndex)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      openLightbox(actualIndex);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`View image${img.caption ? `: ${img.caption}` : ''} ${actualIndex + 1} of ${images.length}`}
                >
                  <img
                    src={img.src}
                    alt={img.alt || `${title} ${actualIndex + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  {/* Hover overlay */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    aria-hidden="true"
                  >
                    {img.caption && (
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <p className="text-white text-sm font-medium">{img.caption}</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && lightboxImage && (
        <div
          ref={dialogRef}
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={`Image viewer: ${lightboxImage.caption || `${title} ${lightboxIndex + 1} of ${images.length}`}`}
        >
          {/* Close button */}
          <button
            ref={closeButtonRef}
            onClick={closeLightbox}
            className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            aria-label="Close image viewer"
          >
            <X className="w-6 h-6 text-white" aria-hidden="true" />
          </button>

          {/* Previous */}
          <button
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-8 h-8 text-white" aria-hidden="true" />
          </button>

          {/* Image */}
          <div
            className="max-w-5xl max-h-[85vh] px-8"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightboxImage.src}
              alt={lightboxImage.alt || `${title} ${lightboxIndex + 1}`}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
            {lightboxImage.caption && (
              <p className="text-white/80 text-center mt-4 text-lg" id="lightbox-caption">
                {lightboxImage.caption}
              </p>
            )}
          </div>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            aria-label="Next image"
          >
            <ChevronRight className="w-8 h-8 text-white" aria-hidden="true" />
          </button>

          {/* Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/10 rounded-full" aria-live="polite" aria-atomic="true">
            <span className="text-white text-sm">
              {lightboxIndex + 1} / {images.length}
            </span>
          </div>
        </div>
      )}
    </>
  );
}

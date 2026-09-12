import { useState, useRef, useEffect } from 'react';

export default function OptimizedImage({
  src,
  alt,
  className = '',
  width,
  height,
  loading = 'lazy',
  objectFit = 'cover',
  fallbackColor = 'bg-gray-200 dark:bg-dark-card',
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsLoaded(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    observer.observe(img);
    return () => observer.disconnect();
  }, []);

  const objectFitClass = {
    cover: 'object-cover',
    contain: 'object-contain',
    fill: 'object-fill',
  }[objectFit] || 'object-cover';

  return (
    <div
      ref={imgRef}
      className={`relative overflow-hidden ${fallbackColor} ${className}`}
      style={{ width, height }}
    >
      {!hasError && (
        <img
          src={isLoaded ? src : undefined}
          alt={alt}
          width={width}
          height={height}
          loading={loading}
          decoding="async"
          className={`w-full h-full ${objectFitClass} transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
        />
      )}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-600">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      )}
    </div>
  );
}

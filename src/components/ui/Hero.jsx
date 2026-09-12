import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { ArrowRight } from 'lucide-react';

export default function Hero({
  headline,
  subtitle,
  primaryCTA,
  primaryCTALink,
  secondaryCTA,
  secondaryCTALink,
  backgroundImage,
  overlay = true,
  height = 'full',
}) {
  const { ref, isVisible } = useScrollAnimation();

  const heightClass = height === 'full' ? 'min-h-screen' : height === 'large' ? 'min-h-[70vh]' : 'min-h-[50vh]';

  return (
    <section
      ref={ref}
      className={`relative ${heightClass} flex items-center justify-center overflow-hidden`}
      role="banner"
      aria-label={headline ? `Hero: ${headline}` : 'Site banner'}
    >
      {/* Background Image — decorative, hidden from screen readers */}
      {backgroundImage && (
        <div className="absolute inset-0" aria-hidden="true">
          <img
            src={backgroundImage}
            alt=""
            className="w-full h-full object-cover"
            loading="eager"
            decoding="async"
          />
          {overlay && (
            <div
              className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70 dark:from-black/80 dark:via-black/70 dark:to-black/80"
              aria-hidden="true"
            />
          )}
        </div>
      )}

      {/* Fallback gradient if no image */}
      {!backgroundImage && (
        <div
          className="absolute inset-0 bg-gradient-to-br from-primary-dark via-primary to-primary-dark dark:from-dark-bg dark:via-dark-surface dark:to-dark-bg"
          aria-hidden="true"
        />
      )}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div
          className={`${
            isVisible ? 'animate-fade-in-up' : 'opacity-0'
          }`}
        >
          {headline && (
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 leading-tight tracking-tight" style={{textShadow: '0 2px 20px rgba(0,0,0,0.3)'}}>
              {headline}
            </h1>
          )}
          {subtitle && (
            <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed font-light" style={{textShadow: '0 1px 10px rgba(0,0,0,0.2)'}}>
              {subtitle}
            </p>
          )}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            {primaryCTA && primaryCTALink && (
              <Link
                to={primaryCTALink}
                className="inline-flex items-center px-8 py-4 bg-accent hover:bg-accent-light text-white font-bold rounded-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl text-base sm:text-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-light focus-visible:ring-offset-2"
              >
                {primaryCTA}
                <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
              </Link>
            )}
            {secondaryCTA && secondaryCTALink && (
              <Link
                to={secondaryCTALink}
                className="inline-flex items-center px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg border border-white/30 transition-all duration-300 hover:scale-105 backdrop-blur-sm text-base sm:text-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2"
              >
                {secondaryCTA}
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Decorative bottom wave — decorative */}
      <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" role="presentation">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            className="fill-neutral dark:fill-dark-bg"
          />
        </svg>
      </div>
    </section>
  );
}

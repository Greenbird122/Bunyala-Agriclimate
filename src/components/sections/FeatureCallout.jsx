import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export default function FeatureCallout({ 
  image, 
  imageAlt, 
  title, 
  description, 
  reverse = false,
  minHeight = 'min-h-[60vh]'
}) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section 
      ref={ref}
      className={`relative ${minHeight} flex items-center ${reverse ? 'md:flex-row-reverse' : ''}`}
    >
      {/* Background Image with Parallax Effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className={`absolute inset-0 scale-110 transition-transform duration-700 ${isVisible ? 'scale-100' : 'scale-125'}`}
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className={`max-w-xl ${reverse ? 'md:ml-auto' : ''} ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white mb-6 leading-tight">
            {title}
          </h2>
          <p className="text-lg sm:text-xl text-white/90 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}

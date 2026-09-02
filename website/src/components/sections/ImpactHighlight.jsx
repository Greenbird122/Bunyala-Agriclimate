import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { useI18n } from '../../i18n';

export default function ImpactHighlight({ 
  image, 
  imageAlt,
  stats = []
}) {
  const { ref, isVisible } = useScrollAnimation();
  const { t } = useI18n();

  return (
    <section ref={ref} className="py-20 bg-white dark:bg-dark-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className={`relative ${isVisible ? 'animate-slide-in-left' : 'opacity-0'}`}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={image}
                alt={imageAlt}
                className="w-full h-auto"
              />
              {/* Floating stat overlay */}
              <div className="absolute -bottom-6 -right-6 bg-white dark:bg-dark-card rounded-xl shadow-xl p-4 border border-gray-100 dark:border-dark-border">
                <p className="text-3xl font-bold text-primary dark:text-green-400">15+</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Tonnes Waste Recycled</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className={`${isVisible ? 'animate-slide-in-right' : 'opacity-0'}`}>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Measuring What Matters
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Our circular economy approach turns environmental challenges into economic opportunities, 
              creating measurable impact for communities across the Lake Victoria Basin.
            </p>
            
            {/* Mini stats grid */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, i) => (
                <div key={i} className="p-4 bg-neutral dark:bg-dark-card rounded-xl">
                  <p className="text-2xl sm:text-3xl font-bold text-primary dark:text-green-400 mb-1">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

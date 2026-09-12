import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { useI18n } from '../../i18n';
import { UtensilsCrossed, Briefcase, RefreshCw, CloudSun, Waves } from 'lucide-react';

const iconMap = {
  UtensilsCrossed,
  Briefcase,
  RefreshCw,
  CloudSun,
  Waves,
};

function SDGCard({ sdg, index, isVisible }) {
  const { t } = useI18n();
  const Icon = iconMap[sdg.icon];

  return (
    <div
      className={`flex items-start space-x-4 p-4 rounded-xl bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border ${
        isVisible ? 'animate-fade-in-up' : 'opacity-0'
      }`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div
        className="flex-shrink-0 w-14 h-14 rounded-lg flex items-center justify-center text-white font-bold text-lg"
        style={{ backgroundColor: sdg.color }}
      >
        {Icon ? <Icon className="w-7 h-7" /> : sdg.number}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2 mb-1">
          <span
            className="inline-flex items-center justify-center w-6 h-6 rounded text-white text-xs font-bold"
            style={{ backgroundColor: sdg.color }}
          >
            {sdg.number}
          </span>
          <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
            SDG {sdg.number}
          </h4>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {t(sdg.titleKey)}
        </p>
      </div>
    </div>
  );
}

export default function SDGBadge({ sdgs }) {
  const { ref, isVisible } = useScrollAnimation();
  const { t } = useI18n();

  return (
    <section ref={ref} className="py-16 lg:py-24 bg-neutral dark:bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-4">
            {t('sdgs.title')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {t('sdgs.subtitle')}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sdgs.map((sdg, index) => (
            <SDGCard
              key={sdg.number}
              sdg={sdg}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

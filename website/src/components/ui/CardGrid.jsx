import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { ArrowRight, Bug, Fish, Leaf, Recycle, Sun, Sprout } from 'lucide-react';
import { useI18n } from '../../i18n';

const iconMap = {
  Bug,
  Fish,
  Leaf,
  Recycle,
  Sun,
  Sprout,
};

function SolutionCard({ solution, index, isVisible }) {
  const { t } = useI18n();
  const Icon = iconMap[solution.icon];

  return (
    <Link
      to={`/solutions/${solution.slug}`}
      className={`group bg-white dark:bg-dark-card rounded-xl shadow-sm hover:shadow-xl border border-gray-200 dark:border-dark-border p-6 transition-all duration-300 hover:-translate-y-1 card-hover ${
        isVisible ? 'animate-fade-in-up' : 'opacity-0'
      }`}
      style={{ animationDelay: `${index * 100}ms` }}
      aria-label={`Learn more about ${t(solution.titleKey)}`}
    >
      <div className={`w-14 h-14 ${solution.color} ${solution.darkColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
        {Icon && <Icon className="w-7 h-7" />}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-primary dark:group-hover:text-green-400 transition-colors leading-snug">
        {t(solution.titleKey)}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 leading-relaxed text-[0.9375rem]">
        {t(solution.shortKey)}
      </p>
      <div className="flex items-center text-primary dark:text-green-400 font-medium text-sm group-hover:gap-2 transition-all">
        <span>{t('solutions.view_details')}</span>
        <ArrowRight className="w-4 h-4 ml-1 group-hover:ml-2 transition-all" />
      </div>
    </Link>
  );
}

export default function CardGrid({ items, columns = 3, type = 'solutions' }) {
  const { ref, isVisible } = useScrollAnimation();

  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div ref={ref} className={`grid grid-cols-1 ${gridCols[columns]} gap-6`}>
      {items.map((item, index) => (
        type === 'solutions' ? (
          <SolutionCard
            key={item.id}
            solution={item}
            index={index}
            isVisible={isVisible}
          />
        ) : (
          <div key={item.id || index}>
            {item}
          </div>
        )
      ))}
    </div>
  );
}

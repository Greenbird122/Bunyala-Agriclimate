import { useState, useEffect, useRef } from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { Recycle, Users, Tractor, Globe, TrendingDown } from 'lucide-react';
import { useI18n } from '../../i18n';

const iconMap = {
  Recycle,
  Users,
  Tractor,
  Globe,
  TrendingDown,
};

function AnimatedCounter({ value, suffix, isVisible }) {
  const [count, setCount] = useState(0);
  const duration = 2000;
  const startTime = useRef(null);
  const animationFrame = useRef(null);

  useEffect(() => {
    if (!isVisible) return;

    const animate = (timestamp) => {
      if (!startTime.current) startTime.current = timestamp;
      const progress = Math.min((timestamp - startTime.current) / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * value));

      if (progress < 1) {
        animationFrame.current = requestAnimationFrame(animate);
      }
    };

    animationFrame.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [isVisible, value]);

  const formatNumber = (num) => {
    if (num >= 1000) {
      return num.toLocaleString();
    }
    return num.toString();
  };

  return (
    <span className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-primary dark:text-green-400 tabular-nums tracking-tight">
      {formatNumber(count)}{suffix}
    </span>
  );
}

export default function StatsCounter({ stats }) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const { t } = useI18n();

  return (
    <section
      ref={ref}
      className="py-16 lg:py-24 bg-white dark:bg-dark-surface"
      aria-label="Impact statistics"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12">
          {stats.map((stat, index) => {
            const Icon = iconMap[stat.icon];
            return (
              <div
                key={stat.id}
                className={`text-center ${
                  isVisible ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {Icon && (
                  <div className="w-12 h-12 bg-primary/10 dark:bg-green-400/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-primary dark:text-green-400" />
                  </div>
                )}
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  isVisible={isVisible}
                />
                <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 font-medium leading-snug">
                  {t(stat.labelKey)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

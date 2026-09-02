import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { useI18n } from '../../i18n';
import { Eye, Target, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function VisionSection() {
  const { ref, isVisible } = useScrollAnimation();
  const { t } = useI18n();

  return (
    <section ref={ref} className="py-16 lg:py-24 bg-white dark:bg-dark-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-12 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-4">
            Our Purpose
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Vision */}
          <div
            className={`bg-gradient-to-br from-primary/5 to-primary/10 dark:from-green-400/5 dark:to-green-400/10 rounded-2xl p-8 border border-primary/20 dark:border-green-400/20 ${
              isVisible ? 'animate-slide-in-left' : 'opacity-0'
            }`}
          >
            <div className="w-14 h-14 bg-primary dark:bg-green-400/20 rounded-xl flex items-center justify-center mb-6">
              <Eye className="w-7 h-7 text-white dark:text-green-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 leading-snug">
              {t('about.vision_title')}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-[1.0625rem]">
              {t('about.vision_text')}
            </p>
          </div>

          {/* Mission */}
          <div
            className={`bg-gradient-to-br from-accent/5 to-accent/10 rounded-2xl p-8 border border-accent/20 ${
              isVisible ? 'animate-slide-in-right' : 'opacity-0'
            }`}
            style={{ animationDelay: '200ms' }}
          >
            <div className="w-14 h-14 bg-accent rounded-xl flex items-center justify-center mb-6">
              <Target className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 leading-snug">
              {t('about.mission_title')}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-[1.0625rem]">
              {t('about.mission_text')}
            </p>
          </div>
        </div>

        <div className={`text-center mt-12 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '400ms' }}>
          <Link
            to="/about"
            className="inline-flex items-center px-6 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors"
          >
            Learn More About Us
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

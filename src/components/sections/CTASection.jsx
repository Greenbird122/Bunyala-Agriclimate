import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { useI18n } from '../../i18n';
import { Handshake, DollarSign, Briefcase, Mail } from 'lucide-react';

const ctaButtons = [
  { labelKey: 'cta.partner', link: '/contact', icon: Handshake, color: 'bg-primary hover:bg-primary-dark' },
  { labelKey: 'cta.invest', link: '/contact', icon: DollarSign, color: 'bg-accent hover:bg-accent-light' },
  { labelKey: 'cta.work', link: '/contact', icon: Briefcase, color: 'bg-primary-dark hover:bg-primary' },
  { labelKey: 'cta.contact', link: '/contact', icon: Mail, color: 'bg-gray-700 hover:bg-gray-800' },
];

export default function CTASection() {
  const { ref, isVisible } = useScrollAnimation();
  const { t } = useI18n();

  return (
    <section
      ref={ref}
      className="py-16 lg:py-24 bg-gradient-to-br from-primary-dark via-primary to-primary-dark dark:from-dark-bg dark:via-dark-surface dark:to-dark-bg text-white relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-12 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-6 tracking-tight">
            {t('cta.title')}
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed font-light">
            {t('cta.text')}
          </p>
          <p className="text-2xl font-semibold text-accent-light mb-8 italic">
            {t('cta.tagline')}
          </p>
        </div>

        {/* Impact statements */}
        <div className={`grid md:grid-cols-2 gap-6 mb-12 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '200ms' }}>
          {[t('cta.every_tonne'), t('cta.every_farmer'), t('cta.every_youth'), t('cta.every_innovation')].map((text, i) => (
            <div key={i} className="flex items-start space-x-3 bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
              <p className="text-white/90">{text}</p>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className={`flex flex-col sm:flex-row flex-wrap justify-center gap-4 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '400ms' }}>
          {ctaButtons.map((btn, i) => (
            <Link
              key={i}
              to={btn.link}
              className={`inline-flex items-center justify-center px-6 py-3 ${btn.color} text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 shadow-lg text-[0.9375rem]`}
            >
              <btn.icon className="w-5 h-5 mr-2" />
              {t(btn.labelKey)}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

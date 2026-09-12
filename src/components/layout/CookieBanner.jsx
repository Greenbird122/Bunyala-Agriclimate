import { useState, useEffect } from 'react';
import { Cookie, X } from 'lucide-react';
import { useI18n } from '../../i18n';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useI18n();

  useEffect(() => {
    const consent = localStorage.getItem('bunyala-cookie-consent');
    if (!consent) {
      // Show banner after a short delay
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('bunyala-cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('bunyala-cookie-consent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 no-print"
      role="dialog"
      aria-label="Cookie consent"
      aria-modal="false"
    >
      <div className="max-w-4xl mx-auto bg-white dark:bg-dark-surface rounded-xl shadow-2xl border border-gray-200 dark:border-dark-border p-6 animate-fade-in-up">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
            <Cookie className="w-6 h-6 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Cookie Preferences
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
              {t('common.cookie_text')}
            </p>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
              <button
                onClick={handleAccept}
                className="px-6 py-2.5 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors text-sm"
              >
                {t('common.accept_cookies')}
              </button>
              <button
                onClick={handleDecline}
                className="px-6 py-2.5 bg-gray-200 dark:bg-dark-card hover:bg-gray-300 dark:hover:bg-dark-border text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-colors text-sm"
              >
                {t('common.decline_cookies')}
              </button>
            </div>
          </div>
          <button
            onClick={handleDecline}
            className="flex-shrink-0 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
            aria-label="Close cookie banner"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

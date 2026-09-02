import { useState } from 'react';
import { Mail, CheckCircle, AlertCircle } from 'lucide-react';
import { useI18n } from '../../i18n';

export default function NewsletterForm({ variant = 'footer' }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const { t } = useI18n();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');

    // Mailchimp integration placeholder
    // In production, this would POST to Mailchimp's subscribe endpoint
    // or use a serverless function / third-party service
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For now, just show success
      // In production: const response = await fetch('/api/subscribe', { method: 'POST', body: JSON.stringify({ email }) });
      setStatus('success');
      setEmail('');
      
      // Reset after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  if (variant === 'inline') {
    return (
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
        <div className="relative flex-1">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('newsletter.placeholder')}
            required
            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-dark-card border border-gray-300 dark:border-dark-border rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 newsletter-input transition-all text-[0.9375rem]"
            aria-label="Email address for newsletter"
          />
        </div>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-6 py-3 bg-accent hover:bg-accent-light text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap text-[0.9375rem]"
        >
          {status === 'loading' ? '...' : t('newsletter.button')}
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('newsletter.placeholder')}
            required
            className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 newsletter-input transition-all focus:bg-white/15 text-[0.9375rem]"
            aria-label="Email address for newsletter"
          />
        </div>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-6 py-3 bg-accent hover:bg-accent-light text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap text-[0.9375rem]"
        >
          {status === 'loading' ? '...' : t('newsletter.button')}
        </button>
      </div>
      
      {/* Status messages */}
      {status === 'success' && (
        <div className="mt-3 flex items-center space-x-2 text-green-400 text-sm animate-fade-in">
          <CheckCircle className="w-4 h-4" />
          <span>{t('newsletter.success')}</span>
        </div>
      )}
      {status === 'error' && (
        <div className="mt-3 flex items-center space-x-2 text-red-400 text-sm animate-fade-in">
          <AlertCircle className="w-4 h-4" />
          <span>{t('newsletter.error')}</span>
        </div>
      )}
    </form>
  );
}

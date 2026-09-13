import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { FacebookIcon, LinkedInIcon } from '../ui/SocialIcons';
import { useI18n } from '../../i18n';
import NewsletterForm from '../ui/NewsletterForm';
import logoImg from '../../assets/images/logo/primary-logo.jpeg';

const quickLinks = [
  { path: '/', labelKey: 'nav.home' },
  { path: '/about', labelKey: 'nav.about' },
  { path: '/solutions', labelKey: 'nav.solutions' },
  { path: '/impact', labelKey: 'nav.impact' },
  { path: '/team', labelKey: 'nav.team' },
  { path: '/contact', labelKey: 'nav.contact' },
];

const socialLinks = [
  {
    name: 'Facebook',
    url: 'https://facebook.com/profile.php?id=61563433792168',
    icon: FacebookIcon,
    handle: 'BunyalaAgriClimatePark',
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/bunyala-agri-climate-action-impact-industrial-park-company-limited-4b4278272',
    icon: LinkedInIcon,
    handle: 'BunyalaAgriAction',
  },
];

export default function Footer() {
  const { t } = useI18n();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-dark dark:bg-dark-bg text-white" role="contentinfo">
      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-semibold mb-2">{t('newsletter.title')}</h3>
            <p className="text-white/70 mb-6 leading-relaxed font-light">{t('newsletter.subtitle')}</p>
            <NewsletterForm />
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-white/10 p-2 flex items-center justify-center">
                <img 
                  src={logoImg} 
                  alt="Bunyala Agri-Climate Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <div className="font-semibold text-white leading-tight">Bunyala Agri-Climate</div>
                <div className="text-xs text-white/60 leading-tight">Industrial Park Limited</div>
              </div>
            </div>
            <p className="text-white/70 text-sm mb-4">{t('footer.tagline')}</p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                  aria-label={`Follow us on ${social.name}`}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('footer.quick_links')}</h4>
            <nav aria-label="Footer navigation">
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-white/70 hover:text-white text-sm transition-colors"
                    >
                      {t(link.labelKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('footer.contact_info')}</h4>
            <div className="space-y-3">
              <a
                href="mailto:bunyalaagrclimate@gmail.com"
                className="flex items-start space-x-3 text-white/70 hover:text-white text-sm transition-colors group"
              >
                <Mail className="w-5 h-5 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span>bunyalaagrclimate@gmail.com</span>
              </a>
              <a
                href="tel:0720060431"
                className="flex items-start space-x-3 text-white/70 hover:text-white text-sm transition-colors group"
              >
                <Phone className="w-5 h-5 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span>0720 060 431 / 0721 137 003</span>
              </a>
              <div className="flex items-start space-x-3 text-white/70 text-sm">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span>{t('contact.location_value')}</span>
              </div>
            </div>
          </div>

          {/* Social & Connect */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('footer.follow_us')}</h4>
            <div className="space-y-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-white/70 hover:text-white text-sm transition-colors group"
                >
                  <social.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>{social.handle}</span>
                  <ExternalLink className="w-3 h-3 opacity-50" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
            <p className="text-white/60 text-sm">{t('footer.copyright')}</p>
            <p className="text-white/60 text-xs">
              Powered by Blue-Green Circular Economy Innovation
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

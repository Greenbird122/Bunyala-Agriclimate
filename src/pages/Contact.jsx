import { Helmet } from 'react-helmet-async';
import Hero from '../components/ui/Hero';
import NewsletterForm from '../components/ui/NewsletterForm';
import { useI18n } from '../i18n';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Mail, Phone, MapPin, Globe, MessageCircle, ExternalLink } from 'lucide-react';
import { FacebookIcon, LinkedInIcon, WhatsAppIcon } from '../components/ui/SocialIcons';
import contactHero from '../assets/images/shared/community-elders.jpeg';

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
  {
    name: 'WhatsApp',
    url: 'https://wa.me/254720060431',
    icon: WhatsAppIcon,
    handle: 'Chat with us',
  },
];

export default function Contact() {
  const { t } = useI18n();
  const { ref: infoRef, isVisible: infoVisible } = useScrollAnimation();
  const { ref: formRef, isVisible: formVisible } = useScrollAnimation();

  return (
    <>
      <Helmet>
        <title>Contact Us | Bunyala Agri-Climate Industrial Park Limited</title>
        <meta name="description" content="Contact Bunyala Agri-Climate Industrial Park Limited. Located in Busia County, Western Kenya. Email: bunyalaagrclimate@gmail.com, Phone: 0720060431" />
        <meta property="og:title" content="Contact Us | Bunyala Agri-Climate Industrial Park Limited" />
        <meta property="og:description" content="Let's Build the Blue-Green Circular Economy Together. Get in touch with us." />
        <link rel="canonical" href="https://bunyala-agriclimate.org/contact" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Contact Bunyala Agri-Climate Industrial Park Limited",
            "url": "https://bunyala-agriclimate.org/contact",
            "mainEntity": {
              "@type": "Organization",
              "name": "Bunyala Agri-Climate Industrial Park Limited",
              "telephone": "+254720060431",
              "email": "bunyalaagrclimate@gmail.com",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Busia",
                "addressRegion": "Western Kenya",
                "addressCountry": "KE"
              }
            }
          })}
        </script>
      </Helmet>

      <main id="main-content">
        {/* Hero */}
        <Hero
          headline={t('contact.title')}
          subtitle={t('contact.subtitle')}
          backgroundImage={contactHero}
          height="large"
        />

        {/* Contact Information */}
        <section ref={infoRef} className="py-16 lg:py-24 bg-white dark:bg-dark-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Details */}
              <div className={`${infoVisible ? 'animate-slide-in-left' : 'opacity-0'}`}>
                <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white mb-8 leading-tight">
                  Get in Touch
                </h2>
                
                <div className="space-y-6">
                  <a
                    href="mailto:bunyalaagrclimate@gmail.com"
                    className="flex items-start space-x-4 p-4 bg-neutral dark:bg-dark-card rounded-xl border border-gray-200 dark:border-dark-border hover:border-primary dark:hover:border-green-400 transition-colors group"
                  >
                    <div className="w-12 h-12 bg-primary/10 dark:bg-green-400/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Mail className="w-6 h-6 text-primary dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{t('contact.email')}</p>
                      <p className="text-gray-900 dark:text-white font-medium text-[0.9375rem]">bunyalaagrclimate@gmail.com</p>
                    </div>
                  </a>

                  <a
                    href="tel:0720060431"
                    className="flex items-start space-x-4 p-4 bg-neutral dark:bg-dark-card rounded-xl border border-gray-200 dark:border-dark-border hover:border-primary dark:hover:border-green-400 transition-colors group"
                  >
                    <div className="w-12 h-12 bg-primary/10 dark:bg-green-400/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Phone className="w-6 h-6 text-primary dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{t('contact.phone')}</p>
                      <p className="text-gray-900 dark:text-white font-medium text-[0.9375rem]">0720 060 431 / 0721 137 003</p>
                    </div>
                  </a>

                  <div className="flex items-start space-x-4 p-4 bg-neutral dark:bg-dark-card rounded-xl border border-gray-200 dark:border-dark-border">
                    <div className="w-12 h-12 bg-primary/10 dark:bg-green-400/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-primary dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{t('contact.location')}</p>
                      <p className="text-gray-900 dark:text-white font-medium">{t('contact.location_value')}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-4 bg-neutral dark:bg-dark-card rounded-xl border border-gray-200 dark:border-dark-border">
                    <div className="w-12 h-12 bg-primary/10 dark:bg-green-400/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Globe className="w-6 h-6 text-primary dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{t('contact.region')}</p>
                      <p className="text-gray-900 dark:text-white font-medium">{t('contact.region_value')}</p>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t('contact.connect')}</h3>
                  <div className="flex flex-wrap gap-3">
                    {socialLinks.map((social) => (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 px-4 py-2 bg-neutral dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-lg hover:border-primary dark:hover:border-green-400 transition-colors"
                      >
                        <social.icon className="w-5 h-5 text-primary dark:text-green-400" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{social.handle}</span>
                        <ExternalLink className="w-3 h-3 text-gray-400" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Partnership Areas */}
              <div
                className={`${infoVisible ? 'animate-slide-in-right' : 'opacity-0'}`}
                style={{ animationDelay: '200ms' }}
              >
                <div className="bg-gradient-to-br from-primary/5 to-primary/10 dark:from-green-400/5 dark:to-green-400/10 rounded-2xl p-8 border border-primary/20 dark:border-green-400/20 mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 leading-snug">
                    {t('contact.partnership_areas')}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {t('contact.partnership_list').split(' • ').map((area, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 bg-white dark:bg-dark-card rounded-lg border border-gray-200 dark:border-dark-border text-gray-700 dark:text-gray-300 font-medium"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Newsletter */}
                <div ref={formRef} className={`bg-white dark:bg-dark-card rounded-2xl p-8 border border-gray-200 dark:border-dark-border ${
                  formVisible ? 'animate-fade-in-up' : 'opacity-0'
                }`}>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 leading-snug">
                    {t('newsletter.title')}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    {t('newsletter.subtitle')}
                  </p>
                  <NewsletterForm variant="inline" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map placeholder */}
        <section className="h-96 bg-gray-200 dark:bg-dark-card relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-primary dark:text-green-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400 font-medium">
                Busia County, Western Kenya
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                Lake Victoria Basin, East Africa
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

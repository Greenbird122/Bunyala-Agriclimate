import { Award, ExternalLink } from 'lucide-react';
import { FacebookIcon, LinkedInIcon } from './SocialIcons';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { useI18n } from '../../i18n';
import founderImg from '../../assets/images/shared/founder-headshot.jpeg';

export default function FounderCard({ member }) {
  const { t } = useI18n();
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div 
      ref={ref}
      className={`bg-white dark:bg-dark-card rounded-2xl shadow-lg overflow-hidden ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
    >
      <div className="grid md:grid-cols-2 gap-0">
        {/* Image Side */}
        <div className="relative h-64 md:h-auto overflow-hidden">
          <img
            src={founderImg}
            alt={member.name}
            className="w-full h-full object-cover"
          />
          {/* Decorative corner */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-accent/20 rounded-bl-full" />
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-primary/20 rounded-tr-full" />
        </div>

        {/* Content Side */}
        <div className="p-8 flex flex-col justify-center">
          <div className="mb-4">
            <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-sm font-medium rounded-full mb-4">
              Founder & Director
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {member.name}
            </h3>
            <p className="text-primary dark:text-green-400 font-medium">
              {t(member.roleKey)}
            </p>
          </div>

          <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
            {t(member.bioKey)}
          </p>

          {/* Credentials */}
          {member.credentials && (
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center">
                <Award className="w-4 h-4 mr-2 text-accent" />
                Credentials
              </h4>
              <div className="flex flex-wrap gap-2">
                {member.credentials.map((cred, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center px-3 py-1 bg-neutral dark:bg-dark-surface text-gray-700 dark:text-gray-300 text-sm rounded-full"
                  >
                    {cred}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Social Links */}
          {member.social && (
            <div className="flex items-center space-x-3">
              {member.social.linkedin && (
                <a
                  href={member.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 bg-gray-100 dark:bg-dark-surface hover:bg-primary hover:text-white rounded-full flex items-center justify-center transition-colors"
                >
                  <LinkedInIcon className="w-5 h-5" />
                </a>
              )}
              {member.social.facebook && (
                <a
                  href={member.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 bg-gray-100 dark:bg-dark-surface hover:bg-primary hover:text-white rounded-full flex items-center justify-center transition-colors"
                >
                  <FacebookIcon className="w-5 h-5" />
                </a>
              )}
              <a
                href="/contact"
                className="inline-flex items-center px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-full text-sm font-medium transition-colors"
              >
                Get in Touch
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

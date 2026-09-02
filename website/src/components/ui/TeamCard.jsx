import { Award } from 'lucide-react';
import { FacebookIcon, LinkedInIcon } from './SocialIcons';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { useI18n } from '../../i18n';
import founderImg from '../../assets/images/shared/founder-headshot.jpeg';

export default function TeamCard({ member, isVisible, index = 0 }) {
  const { t } = useI18n();

  return (
    <div
      className={`bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-200 dark:border-dark-border overflow-hidden card-hover ${
        isVisible ? 'animate-fade-in-up' : 'opacity-0'
      }`}
      style={{ animationDelay: `${index * 150}ms` }}
    >
      {/* Photo */}
      <div className="h-64 bg-gradient-to-br from-primary to-primary-dark dark:from-dark-surface dark:to-dark-bg relative overflow-hidden">
        <img
          src={founderImg}
          alt={member.name}
          className="w-full h-full object-cover object-center"
        />
        {/* Decorative elements */}
        <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-white/5 rounded-full" />
        <div className="absolute -top-4 -left-4 w-24 h-24 bg-white/5 rounded-full" />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1 leading-snug">
          {member.name}
        </h3>
        <p className="text-primary dark:text-green-400 font-medium mb-3 text-[0.9375rem]">
          {t(member.roleKey)}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-4 leading-relaxed">
          {t(member.bioKey)}
        </p>

        {/* Credentials */}
        {member.credentials && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {member.credentials.slice(0, 3).map((cred, i) => (
                <span
                  key={i}
                  className="inline-flex items-center px-2.5 py-1 bg-primary/10 dark:bg-green-400/10 text-primary dark:text-green-400 text-xs font-medium rounded-full"
                >
                  <Award className="w-3 h-3 mr-1" />
                  {cred}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Social Links */}
        {member.social && (
          <div className="flex space-x-3 pt-4 border-t border-gray-200 dark:border-dark-border">
            {member.social.linkedin && (
              <a
                href={member.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-100 dark:bg-dark-surface hover:bg-primary hover:text-white rounded-full flex items-center justify-center transition-colors"
                aria-label={`${member.name} on LinkedIn`}
              >
                <LinkedInIcon className="w-5 h-5" />
              </a>
            )}
            {member.social.facebook && (
              <a
                href={member.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-100 dark:bg-dark-surface hover:bg-primary hover:text-white rounded-full flex items-center justify-center transition-colors"
                aria-label={`${member.name} on Facebook`}
              >
                <FacebookIcon className="w-5 h-5" />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

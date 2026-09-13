import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { sanityImageUrl } from '../../lib/imageUrl';

export default function TeamCard({ member, index, isVisible }) {
  return (
    <Link
      to={`/team/${member.slug.current}`}
      className={`group bg-white dark:bg-dark-card rounded-xl shadow-sm hover:shadow-xl border border-gray-200 dark:border-dark-border overflow-hidden card-hover ${
        isVisible ? 'animate-fade-in-up' : 'opacity-0'
      }`}
      style={{ animationDelay: `${index * 100}ms` }}
      aria-label={`View profile of ${member.name}`}
    >
      {/* Headshot */}
      <div className="relative h-64 overflow-hidden bg-gray-200 dark:bg-dark-surface">
        {member.headshot ? (
          <img
            src={sanityImageUrl(member.headshot, { width: 600, quality: 75 })}
            srcSet={`${sanityImageUrl(member.headshot, { width: 300, quality: 75 })} 300w, ${sanityImageUrl(member.headshot, { width: 600, quality: 75 })} 600w`}
            sizes="(max-width: 768px) 100vw, 33vw"
            alt={member.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-primary dark:text-green-400">
            {member.name.charAt(0)}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute bottom-4 left-4 right-4 translate-y-2 group-hover:translate-y-0 transition-transform">
          <h3 className="text-lg font-bold text-white drop-shadow">
            {member.name}
          </h3>
          <p className="text-sm text-white/80 drop-shadow">
            {member.role}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center justify-between">
          <span className="inline-block px-3 py-1 bg-primary/10 dark:bg-green-400/10 text-primary dark:text-green-400 text-xs font-medium rounded-full">
            {member.credentials?.length || 0} Credentials
          </span>
          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary dark:group-hover:text-green-400 group-hover:translate-x-1 transition-all" />
        </div>
      </div>
    </Link>
  );
}
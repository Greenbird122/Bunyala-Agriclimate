import { Helmet } from 'react-helmet-async';
import Hero from '../components/ui/Hero';
import TeamCard from '../components/ui/TeamCard';
import FounderCard from '../components/ui/FounderCard';
import { useI18n } from '../i18n';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { sanityClient, queries } from '../lib/sanity';
import { useState, useEffect } from 'react';
import { team, teamDescription } from '../data/team';
import teamHero from '../assets/images/shared/planning-meeting-fips.webp';

export default function Team() {
  const { t } = useI18n();
  const { ref: descRef, isVisible: descVisible } = useScrollAnimation();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      if (!sanityClient) {
        if (isMounted) setLoading(false);
        return;
      }
      try {
        const data = await sanityClient.fetch(queries.allTeamMembers);
        if (isMounted) {
          setMembers(data || []);
        }
      } catch (err) {
        // Silently fallback without crashing
        if (isMounted) {
          setMembers([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  const founder = team[0];

  return (
    <>
      <Helmet>
        <title>Our Team | Bunyala Agri-Climate Industrial Park Limited</title>
        <meta name="description" content="Meet the people behind Bunyala Agri-Climate Industrial Park Limited - a multidisciplinary team combining technical knowledge with community-level implementation." />
        <meta property="og:title" content="Our Team | Bunyala Agri-Climate Industrial Park Limited" />
        <meta property="og:description" content="People Behind the Innovation — a multidisciplinary team driving circular economy solutions." />
        <link rel="canonical" href="https://bunyala-agriclimate.org/team" />
      </Helmet>

      {/* Hero */}
      <Hero
        headline={t('team.title')}
        subtitle={t('team.subtitle')}
        backgroundImage={teamHero}
        height="large"
      />

      {/* Founder Profile Section */}
      <section className="py-16 lg:py-24 bg-white dark:bg-dark-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-4 leading-tight">
              Leadership
            </h2>
            <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
          </div>

          <div className="max-w-4xl mx-auto">
            <FounderCard member={founder} />
          </div>
        </div>
      </section>

      {/* Team Grid */}
      {(loading || members.length > 0) && (
        <section className="py-16 lg:py-24 bg-neutral dark:bg-dark-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-4 leading-tight">
                Our Team
              </h2>
              <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">Loading team members...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {members.map((member, index) => (
                  <TeamCard
                    key={member._id}
                    member={member}
                    index={index}
                    isVisible={true}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Team Description & Capabilities */}
      <section ref={descRef} className="py-16 lg:py-24 bg-neutral dark:bg-dark-bg border-t border-gray-200 dark:border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`max-w-3xl mx-auto text-center ${descVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-6 leading-tight">
              Our Capabilities
            </h2>
            <p className="text-[1.0625rem] text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
              {t(teamDescription.descriptionKey)}
            </p>

            {/* Capabilities */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {teamDescription.capabilities.map((cap, i) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-primary/10 dark:bg-green-400/10 text-primary dark:text-green-400 font-medium rounded-full text-sm"
                >
                  {cap}
                </span>
              ))}
            </div>

            <blockquote className="text-xl italic text-gray-600 dark:text-gray-400 border-l-4 border-accent pl-6 text-left bg-white dark:bg-dark-card p-6 rounded-r-xl leading-relaxed font-light shadow-sm">
              "{t(teamDescription.quoteKey)}"
            </blockquote>
          </div>
        </div>
      </section>
    </>
  );
}
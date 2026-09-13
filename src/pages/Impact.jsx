import { Helmet } from 'react-helmet-async';
import Hero from '../components/ui/Hero';
import StatsCounter from '../components/ui/StatsCounter';
import SDGBadge from '../components/ui/SDGBadge';
import FeatureCallout from '../components/sections/FeatureCallout';
import ImageMasonry from '../components/ui/ImageMasonry';
import { useI18n } from '../i18n';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { impactStats, circularImpact } from '../data/impact-stats';
import { sdgs } from '../data/sdgs';
import { TreePine, TrendingUp, Heart, ArrowRight } from 'lucide-react';
import impactHero from '../assets/images/shared/outdoor-community-meeting.webp';
import communityEldersImg from '../assets/images/shared/community-elders.webp';
import treePlantingImg from '../assets/images/shared/tree-planting-ceremony.webp';
import studentsImg from '../assets/images/shared/students-watering-tree.webp';
import planningImg from '../assets/images/shared/planning-meeting-fips.webp';
import useGalleryImages from '../hooks/useGalleryImages';

const iconMap = {
  TreePine,
  TrendingUp,
  Heart,
};

export default function Impact() {
  const { t } = useI18n();
  const { ref: circularRef, isVisible: circularVisible } = useScrollAnimation();
  const { ref: womenRef, isVisible: womenVisible } = useScrollAnimation();
  const { images: impactGalleryImages, loading: galleryLoading } = useGalleryImages('impact');

  return (
    <>
      <Helmet>
        <title>Our Impact | Bunyala Agri-Climate Industrial Park Limited</title>
        <meta name="description" content="See our impact: 15+ tonnes of organic waste recycled, 400 green jobs, 500+ farmers benefiting, and 10,000 people reached through circular economy initiatives." />
        <meta property="og:title" content="Our Impact | Bunyala Agri-Climate Industrial Park Limited" />
        <meta property="og:description" content="Measuring what matters — where commercial success and environmental impact reinforce each other." />
        <link rel="canonical" href="https://bunyala-agriclimate.org/impact" />
      </Helmet>

      <main id="main-content">
        {/* Hero */}
        <Hero
          headline={t('impact.title')}
          subtitle={t('impact.text')}
          backgroundImage={impactHero}
          height="large"
        />

        {/* Stats */}
        <StatsCounter stats={impactStats} />

        {/* Circular Impact Model */}
        <section ref={circularRef} className="py-16 lg:py-24 bg-white dark:bg-dark-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`text-center mb-12 ${circularVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
              <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-4 leading-tight">
                {t('impact.circular_title')}
              </h2>
              <p className="text-[1.0625rem] text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
                {t('impact.circular_text')}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {Object.entries(circularImpact).map(([key, item], index) => {
                const Icon = iconMap[item.icon];
                const items = t(item.itemsKey);
                return (
                  <div
                    key={key}
                    className={`bg-neutral dark:bg-dark-card rounded-2xl p-8 border border-gray-200 dark:border-dark-border ${
                      circularVisible ? 'animate-fade-in-up' : 'opacity-0'
                    }`}
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${
                      key === 'environmental' ? 'bg-green-100 dark:bg-green-900/30' :
                      key === 'economic' ? 'bg-blue-100 dark:bg-blue-900/30' :
                      'bg-purple-100 dark:bg-purple-900/30'
                    }`}>
                      {Icon && (
                        <Icon className={`w-7 h-7 ${
                          key === 'environmental' ? 'text-green-600 dark:text-green-400' :
                          key === 'economic' ? 'text-blue-600 dark:text-blue-400' :
                          'text-purple-600 dark:text-purple-400'
                        }`} />
                      )}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 leading-snug">
                      {t(item.titleKey)}
                    </h3>
                    <ul className="space-y-2">
                      {(Array.isArray(items) ? items : []).map((itemText, i) => (
                        <li key={i} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-primary dark:bg-green-400 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-gray-600 dark:text-gray-400 text-sm">{itemText}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Feature Callout - Community */}
        <FeatureCallout
          image={communityEldersImg}
          imageAlt="Community empowerment"
          title="Empowering Communities"
          description="Our programs focus on women and youth, providing training, resources, and opportunities for sustainable livelihoods."
        />

        {/* Impact Gallery */}
        <section className="py-16 lg:py-24 bg-neutral dark:bg-dark-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-4 leading-tight">
                Our Work in Action
              </h2>
              <p className="text-[1.0625rem] text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                See how we're making a difference in communities across Western Kenya.
              </p>
            </div>
            {galleryLoading ? (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                Loading gallery...
              </div>
            ) : (
              <ImageMasonry images={impactGalleryImages} title="Our Impact" />
            )}
          </div>
        </section>

        {/* Women & Youth Section */}
        <section ref={womenRef} className="py-16 lg:py-24 bg-primary dark:bg-dark-bg text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`max-w-3xl mx-auto text-center ${womenVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
              <h2 className="text-3xl sm:text-4xl font-semibold mb-6 leading-tight">
                {t('women_youth.title')}
              </h2>
              <p className="text-[1.0625rem] text-white/80 mb-6 leading-relaxed">
                {t('women_youth.text')}
              </p>
              <div className="inline-block px-6 py-3 bg-accent rounded-full text-white font-semibold text-xl mb-6">
                {t('women_youth.ambition')}
              </div>
              <blockquote className="text-xl italic text-white/90 border-l-4 border-accent pl-6 text-left leading-relaxed font-light">
                "{t('women_youth.quote')}"
              </blockquote>
            </div>
          </div>
        </section>

        {/* SDGs */}
        <SDGBadge sdgs={sdgs} />

        {/* Business Model */}
        <section className="py-16 lg:py-24 bg-white dark:bg-dark-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-4 leading-tight">
                Our Business Model
              </h2>
              <p className="text-[1.0625rem] text-gray-600 dark:text-gray-400 leading-relaxed">
                Turning Environmental Challenges into Economic Opportunities
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Feed Products', desc: 'Fish, poultry and livestock feed and sustainable feed ingredients' },
                { title: 'BSF Products', desc: 'Protein biomass and related products' },
                { title: 'Organic Fertilizer', desc: 'BSF frass and other soil amendments' },
                { title: 'Waste Management', desc: 'Organic waste recovery and processing services' },
                { title: 'Renewable Energy', desc: 'Distribution of productive-use renewable energy solutions' },
                { title: 'Training & Advisory', desc: 'Technical training and circular economy capacity building' },
              ].map((item, i) => (
                <div key={i} className="p-6 bg-neutral dark:bg-dark-card rounded-xl border border-gray-200 dark:border-dark-border">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Market Expansion */}
        <section className="py-16 lg:py-24 bg-neutral dark:bg-dark-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-4 leading-tight">
                Our Market
              </h2>
              <p className="text-[1.0625rem] text-gray-600 dark:text-gray-400 leading-relaxed">
                Starting in Western Kenya. Building for East Africa.
              </p>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 max-w-3xl mx-auto">
              {['Kenya', 'Uganda', 'Tanzania', 'East Africa', 'African Markets'].map((market, i) => (
                <div key={i} className="flex items-center">
                  <div className="px-6 py-3 bg-white dark:bg-dark-card rounded-lg border border-gray-200 dark:border-dark-border font-medium text-gray-900 dark:text-white">
                    {market}
                  </div>
                  {i < 4 && (
                    <ArrowRight className="w-5 h-5 text-primary dark:text-green-400 mx-2 flex-shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

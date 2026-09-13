import { Helmet } from 'react-helmet-async';
import Hero from '../components/ui/Hero';
import StatsCounter from '../components/ui/StatsCounter';
import CardGrid from '../components/ui/CardGrid';
import ImpactHighlight from '../components/sections/ImpactHighlight';
import FeatureCallout from '../components/sections/FeatureCallout';
import ImageMasonry from '../components/ui/ImageMasonry';
import VisionSection from '../components/sections/VisionSection';
import CTASection from '../components/sections/CTASection';
import VideoEmbed from '../components/ui/VideoEmbed';
import { useI18n } from '../i18n';
import { impactStats } from '../data/impact-stats';
import { solutions } from '../data/solutions';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import useGalleryImages from '../hooks/useGalleryImages';

// Images
import heroImg from '../assets/images/shared/individual-planting.jpeg';
import wasteImg from '../assets/images/shared/waste-feedstock.jpeg';
import communityImg from '../assets/images/shared/community-elders.jpeg';
import treeImg from '../assets/images/shared/tree-seedlings.jpeg';

const videos = [
  'https://youtu.be/waCHqaHLxWQ',
  'https://youtu.be/Ttu9zkmtlts',
];

export default function Home() {
  const { t } = useI18n();
  const { ref: videoRef, isVisible: videoVisible } = useScrollAnimation();
  const { images: homeGalleryImages, loading: galleryLoading } = useGalleryImages('home');

  return (
    <>
      <Helmet>
        <title>Bunyala Agri-Climate Industrial Park Limited | Turning Waste into Wealth</title>
        <meta name="description" content="Bunyala Agri-Climate Industrial Park Limited is a Kenyan social enterprise pioneering Blue Circular Economy and ClimateTech solutions in the Lake Victoria Basin." />
        <meta property="og:title" content="Bunyala Agri-Climate Industrial Park Limited" />
        <meta property="og:description" content="Turning Waste into Wealth through Blue-Green Circular Economy Innovation" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://bunyala-agriclimate.org/" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Bunyala Agri-Climate Industrial Park Limited",
            "description": "Kenyan social enterprise pioneering Blue Circular Economy and ClimateTech solutions in the Lake Victoria Basin",
            "url": "https://bunyala-agriclimate.org",
            "logo": "https://bunyala-agriclimate.org/logo.png",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Busia",
              "addressRegion": "Western Kenya",
              "addressCountry": "KE"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+254720060431",
              "email": "shikukuwabwire30@gmail.com",
              "contactType": "customer service"
            },
            "sameAs": [
              "https://facebook.com/profile.php?id=61563433792168",
              "https://linkedin.com/in/bunyala-agri-climate-action-impact-industrial-park-company-limited-4b4278272"
            ]
          })}
        </script>
      </Helmet>

      <main id="main-content">
        {/* Hero Section */}
        <Hero
          headline={t('hero.headline')}
          subtitle={t('hero.subtitle')}
          primaryCTA={t('hero.cta_solutions')}
          primaryCTALink="/solutions"
          secondaryCTA={t('hero.cta_partner')}
          secondaryCTALink="/contact"
          backgroundImage={heroImg}
          height="full"
        />

        {/* Stats Section */}
        <StatsCounter stats={impactStats} />

        {/* Impact Highlight */}
        <ImpactHighlight 
          image={wasteImg}
          imageAlt="Organic waste bioconversion process"
          stats={[
            { value: '400+', label: 'Green Jobs Created' },
            { value: '500+', label: 'Farmers Benefiting' },
            { value: '10,000+', label: 'People Reached' },
            { value: '6', label: 'Circular Solutions' },
          ]}
        />

        {/* Solutions Preview */}
        <section className="py-16 lg:py-24 bg-white dark:bg-dark-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {t('solutions.title')}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                {t('solutions.subtitle')}
              </p>
            </div>
            <CardGrid items={solutions} columns={3} type="solutions" />
          </div>
        </section>

        {/* Feature Callout - Circular Economy */}
        <FeatureCallout
          image={communityImg}
          imageAlt="Community engagement in action"
          title="Building a Circular Economy"
          description="We transform organic waste into valuable resources—protein for aquaculture, fertilizer for agriculture, and economic opportunities for rural communities."
        />

        {/* Vision/Mission Section */}
        <VisionSection />

        {/* Gallery Section */}
        <section className="py-16 lg:py-24 bg-neutral dark:bg-dark-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Our Work in Pictures
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                See our circular economy solutions in action across Western Kenya.
              </p>
            </div>
            {galleryLoading ? (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                Loading gallery...
              </div>
            ) : (
              <ImageMasonry images={homeGalleryImages} title="Our Solutions" />
            )}
          </div>
        </section>

        {/* Featured Video */}
        <section ref={videoRef} className="py-16 lg:py-24 bg-white dark:bg-dark-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`text-center mb-12 ${videoVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                See Our Innovation in Action
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Watch how we're transforming waste into valuable resources for sustainable agriculture and aquaculture.
              </p>
            </div>
            <div className="max-w-4xl mx-auto">
              <VideoEmbed
                url={videos[0]}
                title="Bunyala Agri-Climate Industrial Park - Our Innovation"
                className={`${videoVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <CTASection />
      </main>
    </>
  );
}

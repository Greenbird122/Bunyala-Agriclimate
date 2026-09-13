import { Helmet } from 'react-helmet-async';
import Hero from '../components/ui/Hero';
import CardGrid from '../components/ui/CardGrid';
import FeatureCallout from '../components/sections/FeatureCallout';
import { useI18n } from '../i18n';
import { solutions } from '../data/solutions';
import solutionsHero from '../assets/images/shared/lysis-technology-banner.webp';
import organicWasteImg from '../assets/images/shared/organic-waste-feedstock.webp';
import ImageMasonry from '../components/ui/ImageMasonry';
import useGalleryImages from '../hooks/useGalleryImages';

export default function Solutions() {
  const { t } = useI18n();
  const { images: facilityImages, loading: galleryLoading } = useGalleryImages('solutions');

  return (
    <>
      <Helmet>
        <title>Our Solutions | Bunyala Agri-Climate Industrial Park Limited</title>
        <meta name="description" content="Explore our sustainable solutions: BSF Bioconversion, Sustainable Fish Feed, Organic Fertilizer, Waste Management, Renewable Energy, and Climate-Smart Agriculture." />
        <meta property="og:title" content="Our Solutions | Bunyala Agri-Climate Industrial Park Limited" />
        <meta property="og:description" content="Sustainable Aquaculture, Climate-Smart Agriculture, Circular Manufacturing, Renewable Energy, and Green Jobs." />
        <link rel="canonical" href="https://bunyala-agriclimate.org/solutions" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Our Solutions",
            "description": "Sustainable solutions for circular economy, aquaculture, and climate-smart agriculture.",
            "url": "https://bunyala-agriclimate.org/solutions",
            "mainEntity": {
              "@type": "ItemList",
              "itemListElement": solutions.map((s, i) => ({
                "@type": "ListItem",
                "position": i + 1,
                "url": `https://bunyala-agriclimate.org/solutions/${s.slug}`
              }))
            }
          })}
        </script>
      </Helmet>

      <main id="main-content">
        {/* Hero */}
        <Hero
          headline={t('solutions.title')}
          subtitle={t('solutions.subtitle')}
          backgroundImage={solutionsHero}
          height="large"
        />

        {/* Solutions Grid */}
        <section className="py-16 lg:py-24 bg-white dark:bg-dark-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Our Circular Economy Solutions
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                From waste to value — discover how we transform organic resources into sustainable products for aquaculture, agriculture, and rural livelihoods.
              </p>
            </div>
            <CardGrid items={solutions} columns={3} type="solutions" />
          </div>
        </section>

        {/* Process Flow */}
        <section className="py-16 lg:py-24 bg-neutral dark:bg-dark-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Our Circular Process
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                {t('model.text')}
              </p>
            </div>
            
            {/* Process Flow Visualization */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-2 max-w-4xl mx-auto">
              {['Waste', 'Bioconversion', 'Value', 'Farmers', 'Food', 'Livelihoods'].map((step, i) => (
                <div key={i} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-primary dark:bg-green-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {i + 1}
                    </div>
                    <span className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
                      {step}
                    </span>
                  </div>
                  {i < 5 && (
                    <div className="hidden md:block w-12 h-0.5 bg-primary/30 dark:bg-green-400/30 mx-2" />
                  )}
                  {i < 5 && (
                    <div className="md:hidden w-0.5 h-8 bg-primary/30 dark:bg-green-400/30 my-2" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Feature Callout */}
        <FeatureCallout
          image={organicWasteImg}
          imageAlt="Organic waste conversion"
          title="Turning Waste into Wealth"
          description="Our Black Soldier Fly bioconversion technology transforms organic waste into high-protein feed ingredients and organic fertilizer, creating value from what was once discarded."
        />

        {/* Facility Gallery */}
        <section className="py-16 lg:py-24 bg-neutral dark:bg-dark-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Our Facility
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                The Bunyala Agri-Climate Industrial Park — home to our bioconversion operations, processing lines, and climate-smart agriculture demonstrations.
              </p>
            </div>
            {galleryLoading ? (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                Loading gallery...
              </div>
            ) : (
              <ImageMasonry images={facilityImages} title="Industrial Park" />
            )}
          </div>
        </section>
      </main>
    </>
  );
}

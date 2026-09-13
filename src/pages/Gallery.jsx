import { Helmet } from 'react-helmet-async';
import Hero from '../components/ui/Hero';
import ImageMasonry from '../components/ui/ImageMasonry';
import { useI18n } from '../i18n';
import useGalleryImages from '../hooks/useGalleryImages';
import { useState } from 'react';
import galleryHero from '../assets/images/shared/tree-planting-ceremony.webp';

const SITE_URL = 'https://bunyala-agriclimate.org';

const CATEGORIES = [
  { id: 'all', label: 'All Photos' },
  { id: 'events', label: 'Events' },
  { id: 'solutions', label: 'Solutions / Facility' },
  { id: 'impact', label: 'Impact' },
  { id: 'about', label: 'About Us' },
  { id: 'home', label: 'Community' },
];

export default function Gallery() {
  const { t } = useI18n();
  const [activeCategory, setActiveCategory] = useState('all');
  const { images, loading } = useGalleryImages(activeCategory);

  return (
    <>
      <Helmet>
        <title>Gallery | Bunyala Agri-Climate Industrial Park Limited</title>
        <meta
          name="description"
          content="Photo gallery of Bunyala Agri-Climate Industrial Park — community events, tree plantings, our facility, and circular economy solutions across Western Kenya."
        />
        <meta property="og:title" content="Gallery | Bunyala Agri-Climate Industrial Park" />
        <meta
          property="og:description"
          content="A visual journey through our community events, facility, and climate solutions."
        />
        <link rel="canonical" href={`${SITE_URL}/gallery`} />
      </Helmet>

      <main id="main-content">
        <Hero
          headline="Gallery"
          subtitle="A visual journey through our community events, facility, and circular economy solutions across Western Kenya."
          backgroundImage={galleryHero}
          height="large"
        />

        <section className="py-16 lg:py-24 bg-white dark:bg-dark-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Category filter tabs */}
            <div
              className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12"
              role="tablist"
              aria-label="Filter gallery by category"
            >
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={activeCategory === cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                    activeCategory === cat.id
                      ? 'bg-primary text-white dark:bg-green-400 dark:text-dark-bg'
                      : 'bg-neutral text-gray-700 dark:bg-dark-card dark:text-gray-300 hover:bg-primary/10 dark:hover:bg-green-400/10'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Gallery grid */}
            {loading ? (
              <div className="text-center py-12">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">Loading photos...</p>
              </div>
            ) : images.length === 0 ? (
              <div className="text-center py-16 border-2 border-dashed border-gray-300 dark:border-dark-border rounded-xl">
                <p className="text-gray-500 dark:text-gray-400">
                  No photos in this category yet — check back soon.
                </p>
              </div>
            ) : (
              <>
                <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-8">
                  {images.length} {images.length === 1 ? 'photo' : 'photos'}
                </p>
                <ImageMasonry images={images} title="Gallery" />
              </>
            )}
          </div>
        </section>
      </main>
    </>
  );
}

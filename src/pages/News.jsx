import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Hero from '../components/ui/Hero';
import { useI18n } from '../i18n';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Calendar, ArrowRight, Clock } from 'lucide-react';
import newsHero from '../assets/images/shared/students-watering-tree.webp';
import organicWasteImg from '../assets/images/shared/organic-waste-feedstock.webp';
import treePlantingImg from '../assets/images/shared/tree-planting-ceremony.webp';
import planningImg from '../assets/images/shared/planning-meeting-fips.webp';
import ImageMasonry from '../components/ui/ImageMasonry';
import useGalleryImages from '../hooks/useGalleryImages';
import { sanityClient, queries } from '../lib/sanity';
import { useState, useEffect } from 'react';
import { sanityImageUrl, sanityImageSrcSet, sanityRefToUrl } from '../lib/imageUrl';

// Placeholder articles shown only while the CMS has no published articles yet
const placeholderArticles = [
  {
    _id: 'placeholder-1',
    title: 'Bunyala Agri-Climate Launches BSF Bioconversion Facility',
    excerpt: 'Our new Black Soldier Fly bioconversion facility is now operational, transforming organic waste into valuable protein and fertilizer for local farmers.',
    publishedAt: '2026-08-15',
    readTime: '5 min read',
    category: 'Innovation',
    imageUrl: organicWasteImg,
  },
  {
    _id: 'placeholder-2',
    title: 'Women & Youth Skilling Program Reaches 200 Participants',
    excerpt: 'Our BACIS community program has trained 200 women and youth in circular economy entrepreneurship, waste management, and sustainable agriculture.',
    publishedAt: '2026-08-01',
    readTime: '4 min read',
    category: 'Community',
    imageUrl: treePlantingImg,
  },
  {
    _id: 'placeholder-3',
    title: 'Partnership with FIPS Africa for Sustainable Agriculture',
    excerpt: 'Bunyala Agri-Climate partners with Farm Inputs Promotions Africa to promote sustainable agricultural practices in the Lake Victoria Basin.',
    publishedAt: '2026-07-20',
    readTime: '3 min read',
    category: 'Partnerships',
    imageUrl: planningImg,
  },
];

// ~200 words per minute average reading speed
function estimateReadTime(text) {
  if (!text) return null;
  const words = typeof text === 'string' ? text.split(/\s+/).length : 0;
  if (!words) return null;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

function ArticleCard({ article, index, isVisible }) {
  const isPlaceholder = article._id.startsWith('placeholder-');
  const to = isPlaceholder ? null : `/news/${article.slug.current}`;

  const cardBody = (
    <>
      <div className="relative overflow-hidden h-48">
        <img
          src={sanityImageUrl(article.imageUrl, { width: 800, quality: 70 })}
          srcSet={sanityImageSrcSet(article.imageUrl, { widths: [400, 800], quality: 70 })}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/90 dark:bg-dark-card/90 backdrop-blur-sm text-primary dark:text-green-400 text-xs font-medium rounded-full">
            {article.category}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center space-x-3 mb-3 text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center">
            <Calendar className="w-3 h-3 mr-1" />
            {new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </div>
          {article.readTime && (
            <>
              <span>•</span>
              <div className="flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                {article.readTime}
              </div>
            </>
          )}
        </div>

        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 leading-snug">
          {article.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 leading-relaxed">
          {article.excerpt}
        </p>

        <div className="flex items-center justify-end">
          <span className="inline-flex items-center text-primary dark:text-green-400 text-sm font-medium group-hover:gap-2 transition-all">
            {isPlaceholder ? 'Coming Soon' : 'Read More'}
            {!isPlaceholder && <ArrowRight className="w-4 h-4 ml-1" />}
          </span>
        </div>
      </div>
    </>
  );

  const cardClass = `group bg-neutral dark:bg-dark-card rounded-xl overflow-hidden border border-gray-200 dark:border-dark-border card-hover ${
    isVisible ? 'animate-fade-in-up' : 'opacity-0'
  }`;

  // Placeholder cards aren't clickable — there's no detail page for them
  if (!to) {
    return (
      <article className={cardClass} style={{ animationDelay: `${index * 150}ms` }}>
        {cardBody}
      </article>
    );
  }

  return (
    <Link
      to={to}
      className={cardClass}
      style={{ animationDelay: `${index * 150}ms` }}
      aria-label={`Read article: ${article.title}`}
    >
      {cardBody}
    </Link>
  );
}

export default function News() {
  const { t } = useI18n();
  const { ref: articlesRef, isVisible: articlesVisible } = useScrollAnimation();
  const { images: eventImages, loading: galleryLoading } = useGalleryImages('events');
  const [articles, setArticles] = useState(null); // null = loading
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      if (!sanityClient) {
        if (isMounted) setLoading(false);
        return;
      }
      try {
        const data = await sanityClient.fetch(queries.allArticles);
        if (isMounted) setArticles(data || []);
      } catch (err) {
        // Fall back to placeholders without crashing
        if (isMounted) setArticles([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    load();
    return () => {
      isMounted = false;
    };
  }, []);

  const cmsArticles = (articles || []).map((a) => ({
    ...a,
    // Resolve the main image even if the asset join came back as a bare ref
    imageUrl: a.imageUrl || sanityRefToUrl(a.mainImageRef, sanityClient?.config().projectId, sanityClient?.config().dataset),
    readTime: estimateReadTime(a.excerpt),
  }));
  const usingPlaceholders = !loading && cmsArticles.length === 0;
  const displayedArticles = usingPlaceholders ? placeholderArticles : cmsArticles;

  return (
    <>
      <Helmet>
        <title>News & Stories | Bunyala Agri-Climate Industrial Park Limited</title>
        <meta name="description" content="Stay updated with the latest news, stories, and developments from Bunyala Agri-Climate Industrial Park Limited." />
        <meta property="og:title" content="News & Stories | Bunyala Agri-Climate Industrial Park Limited" />
        <meta property="og:description" content="Latest news and stories from our circular economy initiatives." />
        <link rel="canonical" href="https://bunyala-agriclimate.org/news" />
      </Helmet>

      <main id="main-content">
        {/* Hero */}
        <Hero
          headline={t('nav.news')}
          subtitle="Stay updated with our latest news, stories, and developments in circular economy and climate action."
          backgroundImage={newsHero}
          height="large"
        />

        {/* Articles Grid */}
        <section ref={articlesRef} className="py-16 lg:py-24 bg-white dark:bg-dark-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="text-center py-12">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">Loading articles...</p>
              </div>
            ) : (
              <>
                {usingPlaceholders && (
                  <div className="mb-8 p-4 bg-accent/10 border border-accent/20 rounded-xl">
                    <p className="text-sm text-accent font-medium">
                      📝 Fresh stories are being prepared. Check back soon — or explore our journey in pictures below.
                    </p>
                  </div>
                )}

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {displayedArticles.map((article, index) => (
                    <ArticleCard
                      key={article._id}
                      article={article}
                      index={index}
                      isVisible={articlesVisible}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        {/* Event Timeline Gallery */}
        <section className="py-16 lg:py-24 bg-neutral dark:bg-dark-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-4">
                Our Journey in Pictures
              </h2>
              <p className="text-[1.0625rem] text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                From community workshops to mass tree plantings — a visual timeline of our work across Western Kenya.
              </p>
            </div>
            {galleryLoading ? (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                Loading gallery...
              </div>
            ) : (
              <ImageMasonry images={eventImages} title="Event Timeline" />
            )}
          </div>
        </section>
      </main>
    </>
  );
}

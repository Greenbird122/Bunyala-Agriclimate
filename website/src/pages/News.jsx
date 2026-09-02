import { Helmet } from 'react-helmet-async';
import Hero from '../components/ui/Hero';
import ImageCard from '../components/ui/ImageCard';
import { useI18n } from '../i18n';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Calendar, ArrowRight, Clock } from 'lucide-react';
import newsHero from '../assets/images/shared/students-watering-tree.jpeg';
import organicWasteImg from '../assets/images/shared/organic-waste-feedstock.jpeg';
import treePlantingImg from '../assets/images/shared/tree-planting-ceremony.jpeg';
import planningImg from '../assets/images/shared/planning-meeting-fips.jpeg';
import ImageMasonry from '../components/ui/ImageMasonry';
import { eventImages } from '../data/gallery';

// Placeholder news articles - will be replaced by Sanity CMS
const placeholderArticles = [
  {
    id: 1,
    title: 'Bunyala Agri-Climate Launches BSF Bioconversion Facility',
    excerpt: 'Our new Black Soldier Fly bioconversion facility is now operational, transforming organic waste into valuable protein and fertilizer for local farmers.',
    date: '2026-08-15',
    readTime: '5 min read',
    category: 'Innovation',
    image: organicWasteImg,
  },
  {
    id: 2,
    title: 'Women & Youth Skilling Program Reaches 200 Participants',
    excerpt: 'Our BACIS community program has trained 200 women and youth in circular economy entrepreneurship, waste management, and sustainable agriculture.',
    date: '2026-08-01',
    readTime: '4 min read',
    category: 'Community',
    image: treePlantingImg,
  },
  {
    id: 3,
    title: 'Partnership with FIPS Africa for Sustainable Agriculture',
    excerpt: 'Bunyala Agri-Climate partners with Farm Inputs Promotions Africa to promote sustainable agricultural practices in the Lake Victoria Basin.',
    date: '2026-07-20',
    readTime: '3 min read',
    category: 'Partnerships',
    image: planningImg,
  },
];

export default function News() {
  const { t } = useI18n();
  const { ref: articlesRef, isVisible: articlesVisible } = useScrollAnimation();

  return (
    <>
      <Helmet>
        <title>News & Stories | Bunyala Agri-Climate Industrial Park Limited</title>
        <meta name="description" content="Stay updated with the latest news, stories, and developments from Bunyala Agri-Climate Industrial Park Limited." />
        <meta property="og:title" content="News & Stories | Bunyala Agri-Climate Industrial Park Limited" />
        <meta property="og:description" content="Latest news and stories from our circular economy initiatives." />
        <link rel="canonical" href="https://bunyalaagriclimate.org/news" />
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
            {/* CMS Notice */}
            <div className="mb-8 p-4 bg-accent/10 border border-accent/20 rounded-xl">
              <p className="text-sm text-accent font-medium">
                📝 This section will be powered by Sanity CMS. Content below is placeholder.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {placeholderArticles.map((article, index) => (
                <article
                  key={article.id}
                  className={`bg-neutral dark:bg-dark-card rounded-xl overflow-hidden border border-gray-200 dark:border-dark-border card-hover ${
                    articlesVisible ? 'animate-fade-in-up' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  {/* Article Image - elegant hover effect */}
                  <div className="relative overflow-hidden h-48">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
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
                        {new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                      <span>•</span>
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {article.readTime}
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 leading-snug">
                      {article.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 leading-relaxed">
                      {article.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-end">
                      <span className="inline-flex items-center text-primary dark:text-green-400 text-sm font-medium hover:gap-2 transition-all">
                        Read More
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Placeholder message */}
            <div className="text-center mt-12 py-12 border-2 border-dashed border-gray-300 dark:border-dark-border rounded-xl">
              <p className="text-gray-500 dark:text-gray-400 mb-2">
                More articles will appear here once Sanity CMS is integrated.
              </p>
              <p className="text-sm text-gray-400 dark:text-gray-500">
                Content management will be handled through Sanity Studio.
              </p>
            </div>
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
            <ImageMasonry images={eventImages} title="Event Timeline" />
          </div>
        </section>
      </main>
    </>
  );
}

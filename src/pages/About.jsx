import { Helmet } from 'react-helmet-async';
import Hero from '../components/ui/Hero';
import SDGBadge from '../components/ui/SDGBadge';
import FeatureCallout from '../components/sections/FeatureCallout';
import ImageMasonry from '../components/ui/ImageMasonry';
import LocalVideoEmbed from '../components/ui/LocalVideoEmbed';
import { useI18n } from '../i18n';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { sdgs } from '../data/sdgs';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Lightbulb, Recycle, Globe } from 'lucide-react';
import aboutHero from '../assets/images/shared/strategy-workshop.jpeg';
import workshopImg from '../assets/images/shared/workshop-flipchart.jpeg';
import planningImg from '../assets/images/shared/planning-meeting-fips.jpeg';
import groupImg from '../assets/images/shared/group-discussion.jpeg';
import { aboutGalleryImages as baseAboutGallery } from '../data/gallery';

const aboutGalleryImages = [
  { src: workshopImg, alt: 'Workshop session with flipchart', caption: 'Strategic Planning' },
  { src: planningImg, alt: 'Meeting with partners', caption: 'Partner Engagement' },
  { src: groupImg, alt: 'Group discussion', caption: 'Team Collaboration' },
];

const expandedAboutGallery = [
  ...aboutGalleryImages,
  baseAboutGallery[0],
  baseAboutGallery[1],
  baseAboutGallery[2],
  baseAboutGallery[3],
].filter(img => img?.src);

export default function About() {
  const { t } = useI18n();
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation();
  const { ref: bacisRef, isVisible: bacisVisible } = useScrollAnimation();

  return (
    <>
      <Helmet>
        <title>About Us | Bunyala Agri-Climate Industrial Park Limited</title>
        <meta name="description" content="Learn about Bunyala Agri-Climate Industrial Park Limited - a Kenyan social enterprise working at the intersection of climate action, circular economy, agriculture, aquaculture, waste management, and renewable energy." />
        <meta property="og:title" content="About Us | Bunyala Agri-Climate Industrial Park Limited" />
        <meta property="og:description" content="A Kenyan social enterprise based in Busia County, Western Kenya, pioneering Blue Circular Economy solutions." />
        <link rel="canonical" href="https://bunyalaagriclimate.org/about" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "name": "About Bunyala Agri-Climate Industrial Park Limited",
            "description": "Learn about our mission, vision, and work in circular economy and climate action.",
            "url": "https://bunyalaagriclimate.org/about"
          })}
        </script>
      </Helmet>

      <main id="main-content">
        {/* Hero */}
        <Hero
          headline={t('about.title')}
          subtitle="A Kenyan social enterprise pioneering Blue Circular Economy and ClimateTech solutions in the Lake Victoria Basin"
          backgroundImage={aboutHero}
          height="large"
        />

        {/* Who We Are */}
        <section ref={contentRef} className="py-16 lg:py-24 bg-white dark:bg-dark-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className={`${contentVisible ? 'animate-slide-in-left' : 'opacity-0'}`}>
                <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-6 leading-tight">
                  {t('about.who_we_are')}
                </h2>
                <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed text-[1.0625rem]">
                  <p>{t('about.who_we_are_text')}</p>
                  <p>{t('about.our_work')}</p>
                  <p>{t('about.waste_as_resource')}</p>
                </div>
              </div>

              <div
                className={`${contentVisible ? 'animate-slide-in-right' : 'opacity-0'}`}
                style={{ animationDelay: '200ms' }}
              >
                {/* Key focus areas */}
                <div className="bg-neutral dark:bg-dark-card rounded-2xl p-8 border border-gray-200 dark:border-dark-border">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Key Focus Areas</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { icon: Recycle, label: 'Blue Circular Economy' },
                      { icon: Globe, label: 'Waste Management' },
                      { icon: Users, label: 'Youth & Women Skilling' },
                      { icon: Lightbulb, label: 'Entrepreneurship Training' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center space-x-3 p-3 bg-white dark:bg-dark-surface rounded-lg">
                        <div className="w-10 h-10 bg-primary/10 dark:bg-green-400/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <item.icon className="w-5 h-5 text-primary dark:text-green-400" />
                        </div>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="py-16 lg:py-24 bg-neutral dark:bg-dark-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-dark-card rounded-2xl p-8 border border-gray-200 dark:border-dark-border">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 leading-snug">{t('about.vision_title')}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-[1.0625rem]">{t('about.vision_text')}</p>
              </div>
              <div className="bg-white dark:bg-dark-card rounded-2xl p-8 border border-gray-200 dark:border-dark-border">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 leading-snug">{t('about.mission_title')}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-[1.0625rem]">{t('about.mission_text')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Callout */}
        <FeatureCallout
          image={planningImg}
          imageAlt="Planning and collaboration"
          title="Working with Partners"
          description="We collaborate with communities, county governments, research institutions, and development partners to scale circular economy solutions."
        />

        {/* BACIS Section */}
        <section id="bacis" ref={bacisRef} className="py-16 lg:py-24 bg-white dark:bg-dark-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`bg-gradient-to-br from-accent/5 to-accent/10 rounded-2xl p-8 lg:p-12 border border-accent/20 ${
              bacisVisible ? 'animate-fade-in-up' : 'opacity-0'
            }`}>
              <div className="max-w-3xl">
                <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-6 leading-tight">
                  {t('about.bacis_title')}
                </h2>
                <p className="text-[1.0625rem] text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  {t('about.bacis_text')}
                </p>
                <div className="flex flex-wrap gap-3">
                  {['Youth Skilling', 'Women Empowerment', 'Entrepreneurship Training', 'Community Empowerment'].map((tag, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 bg-accent/10 text-accent font-medium rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Facility Video */}
        <section className="py-16 lg:py-24 bg-neutral dark:bg-dark-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-4">
                See the Industrial Park
              </h2>
              <p className="text-[1.0625rem] text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Take a look inside the Bunyala Agri-Climate Industrial Park — where organic waste is transformed into protein, fertilizer, and economic opportunity.
              </p>
            </div>
            <div className="max-w-4xl mx-auto">
              <LocalVideoEmbed
                src="/videos/VID_20260813_162859.mp4"
                poster="/videos/VID_20260813_162859.mp4"
                title="Inside the Bunyala Industrial Park"
              />
            </div>
          </div>
        </section>

        {/* Team Gallery */}
        <section className="py-16 lg:py-24 bg-neutral dark:bg-dark-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-4 leading-tight">
                Our Team in Action
              </h2>
              <p className="text-[1.0625rem] text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                From workshops to community meetings, see how we work with partners and communities.
              </p>
            </div>
            <ImageMasonry images={expandedAboutGallery} title="Team Activities" />
          </div>
        </section>

        {/* Problem We Solve */}
        <section className="py-16 lg:py-24 bg-white dark:bg-dark-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-4 leading-tight">
                {t('problem.title')}
              </h2>
              <p className="text-2xl font-semibold text-accent mb-6 italic">
                {t('problem.headline')}
              </p>
              <p className="text-[1.0625rem] text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
                {t('problem.text')}
              </p>
            </div>
            <div className="bg-neutral dark:bg-dark-card rounded-2xl p-8 border border-gray-200 dark:border-dark-border max-w-3xl mx-auto">
              <p className="text-gray-600 dark:text-gray-300 mb-6">{t('problem.solution_intro')}</p>
              <ul className="space-y-3">
                {t('problem.goals').map((goal, i) => (
                  <li key={i} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary dark:bg-green-400 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{goal}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* SDGs */}
        <SDGBadge sdgs={sdgs} />

        {/* Partners CTA */}
        <section className="py-16 lg:py-24 bg-primary dark:bg-dark-surface text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-semibold mb-6 leading-tight">{t('partnerships.title')}</h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed font-light">
              {t('partnerships.cta')}
            </p>
            <Link
              to="/about/partners"
              className="inline-flex items-center px-8 py-4 bg-accent hover:bg-accent-light text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 text-[1.0625rem]"
            >
              View Our Partners
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

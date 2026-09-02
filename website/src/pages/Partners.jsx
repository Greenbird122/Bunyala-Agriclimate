import { Helmet } from 'react-helmet-async';
import Hero from '../components/ui/Hero';
import { useI18n } from '../i18n';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Link } from 'react-router-dom';
import { ArrowLeft, Handshake, Building2, GraduationCap, Landmark, Leaf, Users, Sun, Recycle } from 'lucide-react';
import partnersHero from '../assets/images/shared/group-discussion.jpeg';

const partnerCategories = [
  {
    icon: Users,
    title: 'Farmers & Cooperatives',
    description: 'Smallholder farmers, farmer cooperatives, and producer groups in the Lake Victoria Basin',
  },
  {
    icon: Building2,
    title: 'County Governments',
    description: 'Local government authorities in Western Kenya and East Africa',
  },
  {
    icon: GraduationCap,
    title: 'Research Institutions',
    description: 'Universities, research centers, and academic institutions',
  },
  {
    icon: Landmark,
    title: 'Development Partners',
    description: 'Investors, development partners, climate funds, and NGOs',
  },
  {
    icon: Leaf,
    title: 'Environmental Organizations',
    description: 'Environmental organizations and climate action partners',
  },
  {
    icon: Sun,
    title: 'Renewable Energy Companies',
    description: 'Clean energy technology providers and distributors',
  },
  {
    icon: Recycle,
    title: 'Waste Management Organizations',
    description: 'Waste collection, recovery, and processing organizations',
  },
  {
    icon: Handshake,
    title: 'Technology Providers',
    description: 'Technology partners supporting circular economy innovation',
  },
];

export default function Partners() {
  const { t } = useI18n();
  const { ref: partnersRef, isVisible: partnersVisible } = useScrollAnimation();
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation();

  return (
    <>
      <Helmet>
        <title>Partnerships | Bunyala Agri-Climate Industrial Park Limited</title>
        <meta name="description" content="Partner with Bunyala Agri-Climate Industrial Park Limited to build a cleaner, more resilient and inclusive Lake Victoria Basin." />
        <meta property="og:title" content="Partnerships | Bunyala Agri-Climate Industrial Park Limited" />
        <meta property="og:description" content="We Cannot Build a Circular Economy Alone. Join us in scaling circular solutions." />
        <link rel="canonical" href="https://bunyalaagriclimate.org/about/partners" />
      </Helmet>

      <main id="main-content">
        {/* Hero */}
        <Hero
          headline={t('partnerships.title')}
          subtitle={t('partnerships.subtitle')}
          backgroundImage={partnersHero}
          height="large"
        />

        {/* Partnership Categories */}
        <section ref={partnersRef} className="py-16 lg:py-24 bg-white dark:bg-dark-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Back link */}
            <Link
              to="/about"
              className="inline-flex items-center text-primary dark:text-green-400 hover:underline mb-8"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to About
            </Link>

            <div className={`mb-12 ${partnersVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
              <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-6 leading-tight">
                Who We Partner With
              </h2>
              <p className="text-[1.0625rem] text-gray-600 dark:text-gray-400 max-w-3xl leading-relaxed">
                {t('partnerships.text')}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {partnerCategories.map((partner, index) => (
                <div
                  key={index}
                  className={`bg-neutral dark:bg-dark-card rounded-xl p-6 border border-gray-200 dark:border-dark-border card-hover ${
                    partnersVisible ? 'animate-fade-in-up' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-12 h-12 bg-primary/10 dark:bg-green-400/10 rounded-xl flex items-center justify-center mb-4">
                    <partner.icon className="w-6 h-6 text-primary dark:text-green-400" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{partner.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{partner.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Existing Partners */}
        <section className="py-16 lg:py-24 bg-neutral dark:bg-dark-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-4 leading-tight">
                Our Partners in Action
              </h2>
              <p className="text-[1.0625rem] text-gray-600 dark:text-gray-400 leading-relaxed">
                Field engagement has already included work with partners such as FIPS Africa, county-level community forums, and school-based tree-planting outreach.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: 'FIPS Africa',
                  description: 'Farm Inputs Promotions Africa — supporting agricultural input access and farmer training',
                  type: 'Development Partner',
                },
                {
                  name: 'County Community Forums',
                  description: 'Local government and community engagement for circular economy initiatives',
                  type: 'Government Partnership',
                },
                {
                  name: 'School Tree-Planting',
                  description: 'Community outreach through school-based environmental education and tree planting',
                  type: 'Community Program',
                },
              ].map((partner, i) => (
                <div key={i} className="bg-white dark:bg-dark-card rounded-xl p-6 border border-gray-200 dark:border-dark-border">
                  <span className="inline-block px-3 py-1 bg-primary/10 dark:bg-green-400/10 text-primary dark:text-green-400 text-xs font-medium rounded-full mb-3">
                    {partner.type}
                  </span>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{partner.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{partner.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section ref={ctaRef} className={`py-16 lg:py-24 bg-primary dark:bg-dark-surface text-white ${
          ctaVisible ? 'animate-fade-in-up' : 'opacity-0'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-semibold mb-6 leading-tight">
              {t('partnerships.cta')}
            </h2>
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 bg-accent hover:bg-accent-light text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 text-[1.0625rem]"
            >
              <Handshake className="w-5 h-5 mr-2" />
              Partner With Us
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

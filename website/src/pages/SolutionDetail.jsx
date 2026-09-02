import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/ui/Hero';
import ImageCard from '../components/ui/ImageCard';
import { useI18n } from '../i18n';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { solutions } from '../data/solutions';
import { ArrowLeft, CheckCircle, ArrowRight, Bug, Fish, Leaf, Recycle, Sun, Sprout } from 'lucide-react';

const iconMap = {
  Bug,
  Fish,
  Leaf,
  Recycle,
  Sun,
  Sprout,
};

export default function SolutionDetail() {
  const { slug } = useParams();
  const { t } = useI18n();
  const { ref: featuresRef, isVisible: featuresVisible } = useScrollAnimation();

  const solution = solutions.find(s => s.slug === slug);

  if (!solution) {
    return <Navigate to="/solutions" replace />;
  }

  const Icon = iconMap[solution.icon];
  const solutionIndex = solutions.findIndex(s => s.slug === slug);
  const nextSolution = solutions[(solutionIndex + 1) % solutions.length];
  const prevSolution = solutions[(solutionIndex - 1 + solutions.length) % solutions.length];

  return (
    <>
      <Helmet>
        <title>{t(solution.titleKey)} | Bunyala Agri-Climate Industrial Park Limited</title>
        <meta name="description" content={t(solution.shortKey)} />
        <meta property="og:title" content={`${t(solution.titleKey)} | Bunyala Agri-Climate`} />
        <meta property="og:description" content={t(solution.shortKey)} />
        <link rel="canonical" href={`https://bunyalaagriclimate.org/solutions/${slug}`} />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": t(solution.titleKey),
            "description": t(solution.shortKey),
            "provider": {
              "@type": "Organization",
              "name": "Bunyala Agri-Climate Industrial Park Limited"
            },
            "url": `https://bunyalaagriclimate.org/solutions/${slug}`
          })}
        </script>
      </Helmet>

      <main id="main-content">
        {/* Hero */}
        <Hero
          headline={t(solution.titleKey)}
          subtitle={t(solution.shortKey)}
          backgroundImage={solution.heroImage}
          height="large"
        />

        {/* Solution Content */}
        <section className="py-16 lg:py-24 bg-white dark:bg-dark-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              {/* Back link */}
              <Link
                to="/solutions"
                className="inline-flex items-center text-primary dark:text-green-400 hover:underline mb-8"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Solutions
              </Link>

              {/* Description */}
              <div className="mb-12">
                <div className="flex items-center space-x-4 mb-6">
                  <div className={`w-14 h-14 ${solution.color} ${solution.darkColor} rounded-xl flex items-center justify-center`}>
                    {Icon && <Icon className="w-7 h-7" />}
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white leading-snug">
                    {t(solution.titleKey)}
                  </h2>
                </div>
                <p className="text-[1.0625rem] text-gray-600 dark:text-gray-300 leading-relaxed">
                  {t(solution.descriptionKey)}
                </p>
              </div>

              {/* Feature Images - elegant grid */}
              {solution.images && solution.images.length > 0 && (
                <div className="mb-12">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Gallery</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {solution.images.map((img, idx) => (
                      <ImageCard 
                        key={idx}
                        src={img}
                        alt={`${t(solution.titleKey)} image ${idx + 1}`}
                        caption={idx === 0 ? 'In Action' : undefined}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Features */}
              <div ref={featuresRef} className={`mb-12 ${featuresVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Key Features</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {solution.features.map((feature, i) => (
                    <div key={i} className="flex items-start space-x-3 p-4 bg-neutral dark:bg-dark-card rounded-lg">
                      <CheckCircle className="w-5 h-5 text-primary dark:text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Outputs (for BSF) */}
              {solution.outputs && solution.outputs.length > 0 && (
                <div className="mb-12">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Key Outputs</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {solution.outputs.map((output, i) => (
                      <div key={i} className="p-4 bg-accent/5 border border-accent/20 rounded-lg">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{output.name}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{output.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Navigation between solutions */}
              <div className="flex flex-col sm:flex-row justify-between gap-4 pt-8 border-t border-gray-200 dark:border-dark-border">
                <Link
                  to={`/solutions/${prevSolution.slug}`}
                  className="flex items-center text-primary dark:text-green-400 hover:underline"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {t(prevSolution.titleKey)}
                </Link>
                <Link
                  to={`/solutions/${nextSolution.slug}`}
                  className="flex items-center text-primary dark:text-green-400 hover:underline"
                >
                  {t(nextSolution.titleKey)}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

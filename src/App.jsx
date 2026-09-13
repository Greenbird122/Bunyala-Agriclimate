import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { I18nProvider } from './i18n';
import { DarkModeProvider } from './hooks/useDarkMode';
import { lazy, Suspense, useEffect } from 'react';

// Layout Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import CookieBanner from './components/layout/CookieBanner';
import WhatsAppButton from './components/layout/WhatsAppButton';
import BackToTop from './components/layout/BackToTop';

// Pages — Home stays eager (first paint on landing); the rest are code-split
// so each page's JS only loads when visited
import Home from './pages/Home';
const About = lazy(() => import('./pages/About'));
const Solutions = lazy(() => import('./pages/Solutions'));
const SolutionDetail = lazy(() => import('./pages/SolutionDetail'));
const Impact = lazy(() => import('./pages/Impact'));
const Team = lazy(() => import('./pages/Team'));
const TeamMemberDetail = lazy(() => import('./pages/TeamMemberDetail'));
const Contact = lazy(() => import('./pages/Contact'));
const Partners = lazy(() => import('./pages/Partners'));
const News = lazy(() => import('./pages/News'));
const ArticleDetail = lazy(() => import('./pages/ArticleDetail'));
const Gallery = lazy(() => import('./pages/Gallery'));

function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

// Layout wrapper with landmark regions
function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg focus:outline-none"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className="flex-1" tabIndex={-1}>
        {children}
      </main>
      <Footer />
      <CookieBanner />
      <WhatsAppButton />
      <BackToTop />
    </div>
  );
}

function App() {
  return (
    <HelmetProvider>
      <I18nProvider>
        <DarkModeProvider>
          <Router>
            <ScrollToTop />
            <Layout>
              <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/about/partners" element={<Partners />} />
                <Route path="/solutions" element={<Solutions />} />
                <Route path="/solutions/:slug" element={<SolutionDetail />} />
                <Route path="/impact" element={<Impact />} />
                <Route path="/team" element={<Team />} />
                <Route path="/team/:slug" element={<TeamMemberDetail />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/news" element={<News />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/news/:slug" element={<ArticleDetail />} />
                {/* 404 Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
              </Suspense>
            </Layout>
          </Router>
        </DarkModeProvider>
      </I18nProvider>
    </HelmetProvider>
  );
}

function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary dark:text-green-400 mb-4">404</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">Page not found</p>
        <a
          href="/"
          className="inline-flex items-center px-6 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light focus-visible:ring-offset-2"
        >
          Go Home
        </a>
      </div>
    </div>
  );
}

export default App;

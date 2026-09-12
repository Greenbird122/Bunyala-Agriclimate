import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { I18nProvider } from './i18n';
import { DarkModeProvider } from './hooks/useDarkMode';
import { useEffect } from 'react';

// Layout Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import CookieBanner from './components/layout/CookieBanner';
import WhatsAppButton from './components/layout/WhatsAppButton';
import BackToTop from './components/layout/BackToTop';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Solutions from './pages/Solutions';
import SolutionDetail from './pages/SolutionDetail';
import Impact from './pages/Impact';
import Team from './pages/Team';
import Contact from './pages/Contact';
import Partners from './pages/Partners';
import News from './pages/News';

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
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/about/partners" element={<Partners />} />
                <Route path="/solutions" element={<Solutions />} />
                <Route path="/solutions/:slug" element={<SolutionDetail />} />
                <Route path="/impact" element={<Impact />} />
                <Route path="/team" element={<Team />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/news" element={<News />} />
                {/* 404 Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
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

import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, Globe, ChevronDown } from 'lucide-react';
import { useI18n } from '../../i18n';
import { useDarkMode } from '../../hooks/useDarkMode';
import logoImg from '../../assets/images/logo/primary-logo.jpeg';

const navLinks = [
  { path: '/', labelKey: 'nav.home' },
  { path: '/about', labelKey: 'nav.about' },
  { path: '/about/partners', labelKey: 'nav.partners' },
  { path: '/solutions', labelKey: 'nav.solutions' },
  { path: '/impact', labelKey: 'nav.impact' },
  { path: '/team', labelKey: 'nav.team' },
  { path: '/news', labelKey: 'nav.news' },
  { path: '/contact', labelKey: 'nav.contact' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const location = useLocation();
  const { t, language, setLanguage, languages } = useI18n();
  const { isDark, toggleDark } = useDarkMode();

  const mobileMenuRef = useRef(null);
  const langMenuRef = useRef(null);
  const menuButtonRef = useRef(null);
  const langButtonRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setLangOpen(false);
  }, [location]);

  // Close language menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        langOpen &&
        langMenuRef.current &&
        !langMenuRef.current.contains(e.target) &&
        !langButtonRef.current.contains(e.target)
      ) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [langOpen]);

  // Keyboard trap and handling for mobile menu
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    // Prevent body scroll when mobile menu is open
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    if (path === '/about') return location.pathname === '/about';
    return location.pathname.startsWith(path);
  };

  const handleLanguageSelect = (langCode) => {
    setLanguage(langCode);
    setLangOpen(false);
  };

  const currentLang = languages.find(l => l.code === language);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 no-print ${
        isScrolled
          ? 'bg-white/95 dark:bg-dark-surface/95 backdrop-blur-md shadow-md'
          : 'bg-white dark:bg-dark-surface'
      }`}
      role="banner"
    >
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="skip-to-content"
      >
        Skip to main content
      </a>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-3 group"
            aria-label="Bunyala Agri-Climate Industrial Park — Go to homepage"
          >
            <img
              src={logoImg}
              alt="Bunyala Agri-Climate logo"
              className="h-16 w-16 lg:h-20 lg:w-20 rounded-2xl object-cover shadow-md ring-1 ring-primary/10 hover:scale-105 transition-transform"
              width={64}
              height={64}
            />
            <div className="hidden sm:block">
              <div className="text-sm lg:text-base font-semibold text-primary dark:text-green-400 leading-tight">
                Bunyala Agri-Climate
              </div>
              <div className="text-[0.6875rem] text-gray-500 dark:text-gray-400 leading-tight tracking-wide uppercase">
                Industrial Park Limited
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1" role="navigation" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 text-[0.8125rem] font-medium rounded-md transition-colors tracking-wide ${
                  isActive(link.path)
                    ? 'text-primary dark:text-green-400 bg-primary/10 dark:bg-green-400/10'
                    : 'text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-green-400 hover:bg-gray-100 dark:hover:bg-dark-card'
                }`}
                aria-current={isActive(link.path) ? 'page' : undefined}
              >
                {t(link.labelKey)}
              </Link>
            ))}
          </nav>

          {/* Right side controls */}
          <div className="flex items-center space-x-2">
            {/* Language Switcher */}
            <div className="relative" ref={langMenuRef}>
              <button
                ref={langButtonRef}
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center space-x-1 px-2 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-green-400 rounded-md hover:bg-gray-100 dark:hover:bg-dark-card transition-colors"
                aria-label={`Language: ${currentLang?.nativeName || language}. Click to change.`}
                aria-expanded={langOpen}
                aria-haspopup="listbox"
              >
                <Globe className="w-4 h-4" aria-hidden="true" />
                <span className="hidden sm:inline uppercase">{language}</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${langOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
              </button>
              {langOpen && (
                <ul
                  ref={langMenuRef}
                  className="absolute top-full right-0 mt-1 bg-white dark:bg-dark-card rounded-lg shadow-lg border border-gray-200 dark:border-dark-border py-1 min-w-[140px] animate-fade-in"
                  role="listbox"
                  aria-label="Select language"
                >
                  {languages.map((lang) => (
                    <li key={lang.code}>
                      <button
                        onClick={() => handleLanguageSelect(lang.code)}
                        className={`w-full text-left px-4 py-2 text-sm transition-colors flex items-center justify-between ${
                          language === lang.code
                            ? 'text-primary dark:text-green-400 bg-primary/10 dark:bg-green-400/10 font-medium'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-surface'
                        }`}
                        role="option"
                        aria-selected={language === lang.code}
                      >
                        {lang.nativeName}
                        {language === lang.code && (
                          <span className="sr-only" aria-label="(current language)">(current)</span>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDark}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-green-400 rounded-md hover:bg-gray-100 dark:hover:bg-dark-card transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              aria-pressed={isDark}
            >
              {isDark ? (
                <Sun className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Moon className="w-5 h-5" aria-hidden="true" />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              ref={menuButtonRef}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-green-400 rounded-md hover:bg-gray-100 dark:hover:bg-dark-card transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
              aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Menu className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav
          id="mobile-menu"
          ref={mobileMenuRef}
          className="lg:hidden bg-white dark:bg-dark-surface border-t border-gray-200 dark:border-dark-border animate-fade-in"
          role="navigation"
          aria-label="Mobile navigation"
        >
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-4 py-3 text-base font-medium rounded-md transition-colors ${
                  isActive(link.path)
                    ? 'text-primary dark:text-green-400 bg-primary/10 dark:bg-green-400/10'
                    : 'text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-green-400 hover:bg-gray-100 dark:hover:bg-dark-card'
                }`}
                aria-current={isActive(link.path) ? 'page' : undefined}
              >
                {t(link.labelKey)}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}

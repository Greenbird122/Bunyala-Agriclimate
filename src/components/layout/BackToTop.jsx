import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Move focus to top of page after scroll for accessibility
    document.body.focus();
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-24 left-4 sm:left-6 z-40 w-12 h-12 bg-primary hover:bg-primary-dark text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 no-print focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light focus-visible:ring-offset-2"
      aria-label="Scroll back to top of page"
    >
      <ArrowUp className="w-5 h-5" aria-hidden="true" />
    </button>
  );
}

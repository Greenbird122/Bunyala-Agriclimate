import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const WHATSAPP_PHONE = '254720060431';
const WHATSAPP_MESSAGE = encodeURIComponent(
  'Hello! I would like to learn more about Bunyala Agri-Climate Industrial Park.'
);

// WhatsApp icon — geometric approximation of the official brand mark
// Green circle background + white phone handset inside
function WhatsAppIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      className="w-full h-full"
      aria-hidden="true"
    >
      {/* Green circular background */}
      <circle cx="24" cy="24" r="24" fill="#25D363" />
      {/* White phone handset — simplified but instantly recognizable */}
      <path
        fill="white"
        d="M24.12 13.5c-5.04 0-9.12 4.08-9.12 9.12 0 2.02.66 3.9 1.78 5.46l-.9 3.18 3.42-1.32c1.44.96 3.18 1.56 5.04 1.56 5.04 0 9.12-4.08 9.12-9.12S29.16 13.5 24.12 13.5zM18.3 20.4c.48-.9.9-1.02 1.26-1.02.3 0 .6.06.96.06 1.68 0 4.08-1.02 4.98-3.72.36-1.02.18-2.1-.36-2.82-.54-.72-1.86-1.44-3.12-2.22-1.02-.66-2.04-.96-2.88-.96-.84 0-1.68.18-2.22.3-.24.06-.54.06-.78-.06-.24-.12-.54-.42-.6-.78-.18-.72-.42-2.04-.72-3.48-.18-.9-.18-1.68.12-2.34.3-.72.84-1.2 1.38-1.38.54-.18 1.2-.18 1.98-.06.48.06.96.06 1.38-.06.36-.12.78-.42 1.08-.78.3-.36.6-.66.96-.78.42-.12 1.02-.06 1.62.36.78.54 1.68 1.56 2.22 3 .54 1.44 1.02 2.7 1.2 3 .12.3.24.84.06 1.38-.18.54-.3 1.02-.36 1.32-.06.3-.12.6-.06.84.12.24.3.48.66.72.18.12.42.3.66.48.24.18.42.36.48.48.18.3.12.72-.06 1.32-.18.6-.9 1.56-1.92 2.52-1.02.96-1.86 1.44-2.4 1.62-.54.18-.96.12-1.32-.12-.36-.24-.72-.6-.96-.9-.24-.3-.54-.54-.9-.42-.36.12-.6.3-.84.48z"
      />
    </svg>
  );
}

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed bottom-24 right-4 sm:right-6 z-40 no-print"
      role="region"
      aria-label="WhatsApp chat"
    >
      {isOpen && (
        <div
          className="mb-3 bg-white dark:bg-dark-surface rounded-xl shadow-xl border border-gray-200 dark:border-dark-border p-4 animate-fade-in-up max-w-[280px]"
          role="dialog"
          aria-label="WhatsApp chat — start a conversation"
        >
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
              Chat with us
            </h4>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded"
              aria-label="Close chat"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
            Hi there! How can we help you today?
          </p>
          <a
            href={`https://wa.me/${WHATSAPP_PHONE}?text=${WHATSAPP_MESSAGE}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full px-4 py-2.5 bg-[#25D366] hover:bg-[#128C7E] text-white text-center font-medium rounded-lg transition-colors text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]/50"
            aria-label="Start WhatsApp chat (opens in new tab)"
          >
            Start Chat
          </a>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]/50 focus-visible:ring-offset-2 overflow-hidden ${
          isOpen ? 'bg-gray-500 hover:bg-gray-600' : 'bg-[#25D366] hover:bg-[#128C7E] hover:scale-110'
        }`}
        aria-label={isOpen ? 'Close WhatsApp chat' : 'Open WhatsApp chat'}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" aria-hidden="true" />
        ) : (
          <WhatsAppIcon />
        )}
      </button>
    </div>
  );
}

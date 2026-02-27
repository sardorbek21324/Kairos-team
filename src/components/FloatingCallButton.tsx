import { Phone } from 'lucide-react';

export default function FloatingCallButton() {
  return (
    <a
      href="tel:+48503413651"
      aria-label="Call us at +48 503 413 651"
      className="fixed bottom-3 right-3 z-[110] inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-3 text-white shadow-lg shadow-blue-900/30 transition-all duration-200 hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-200 sm:bottom-4 sm:right-4 sm:gap-2.5 sm:px-5 md:bottom-6 md:right-6"
    >
      <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
      <span className="text-sm font-semibold leading-none sm:text-base">Call Us</span>
    </a>
  );
}

import { Phone } from 'lucide-react';

export default function FloatingCallButton() {
  return (
    <a
      href="tel:+48503413651"
      aria-label="Call us at +48 503 413 651"
      className="fixed right-4 top-1/2 -translate-y-1/2 z-[110] inline-flex items-center gap-3 rounded-full bg-[#242734] px-6 py-4 text-white shadow-[0_12px_30px_rgba(0,0,0,0.35)] transition-all duration-200 hover:scale-[1.02] hover:bg-[#2c3040] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
    >
      <Phone className="h-5 w-5" />
      <span className="text-3xl leading-none font-semibold tracking-wide">Call Us</span>
    </a>
  );
}

import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'pl' | 'ru';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => any;
  isChanging: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    nav: {
      home: 'Home',
      services: 'Services',
      portfolio: 'Case Studies',
      industries: 'Industries',
      about: 'About',
      contact: 'Contact',
      audit: 'Free audit',
      book: 'Book a consultation'
    },
    hero: {
      kicker: 'All your online marketing in one place',
      title: 'We build awareness and sales through content, social media, and ads.',
      lead: 'We produce premium content, manage your profiles, and run campaigns. Fast, process-driven, and focused on outcomes: traffic, bookings, orders, and revenue — across Poland.',
      points: ['Nationwide (Poland)', 'Fast execution', 'One team (photo/video/SMM/ads/design)'],
      scope: {
        title: 'Example monthly scope',
        items: [
          'Content plan & schedule',
          'Production (photo/video) + editing',
          'Publishing + moderation',
          'Meta/Google ads + optimization'
        ]
      }
    },
    stats: {
      title: 'Trust in numbers',
      brands: 'brands in 2 years',
      assets: 'content assets produced',
      years: 'years of excellence'
    },
    whatWeDo: {
      title: 'What we do',
      intro: 'Best model is a monthly package (retainer). Final scope after consultation.',
      packages: {
        title: 'Monthly packages (most popular)',
        desc: 'Consistent marketing every month. Packages: Starter / Growth / Performance. Scope tailored after the call.',
        items: ['Content + publishing', 'Ads (Meta/Google)', 'Google Business Profile', 'Report + next-month plan']
      },
      production: {
        title: 'Content production',
        desc: 'Photo & video for social platforms. Production days, reels, photo sessions, editing — premium quality.',
        items: ['Shorts (Reels/TikTok/YouTube)', 'Product & interior photos', 'Editing for formats', 'Asset library']
      },
      ads: {
        title: 'Performance ads',
        desc: 'Leads, bookings, and sales. Meta/Google campaigns with tracking and regular optimization.',
        items: ['Setup + tracking', 'Retargeting', 'Creative testing', 'CPL/CPA control']
      }
    },
    howWeWork: {
      title: 'How we work',
      intro: 'Clear steps, no chaos.',
      steps: [
        { title: 'Inquiry', desc: 'You leave your contact details and goal.' },
        { title: '10–15 min call', desc: 'We clarify priorities and scope.' },
        { title: '30-day plan', desc: 'You receive a concrete plan and we pick a package.' },
        { title: 'Launch', desc: 'Content plan, production/editing, profiles, ads launch.' },
        { title: 'Control', desc: 'Optimization and monthly report.' }
      ]
    },
    cta: {
      title: 'Need a tailored plan and scope?',
      desc: 'Book a consultation or request a free audit. We’ll tell you directly what works and what to fix.',
      audit: 'Free audit',
      book: 'Book a consultation'
    },
    footer: {
      desc: 'All-in-one growth partner for local businesses across Poland: content production, social media management, and performance ads.',
      location: 'Warsaw • Poland (nationwide)',
      phone: 'Phone',
      email: 'Email (last)',
      rights: '© 2026 Kairos Team. All rights reserved.'
    },
    services: {
      title: 'Services',
      intro: 'We don’t publish prices on the site — after a consultation we tailor the scope and the package to your goals.',
      retainerTitle: 'Monthly packages (retainer)',
      retainerIntro: 'Clear scope, channels and reporting — built for consistent growth.',
      starter: {
        tag: 'Starter',
        title: 'For smaller businesses that want a stable, professional start.',
        desc: 'Consistent content + basic marketing actions to improve brand and generate first results.',
        items: ['1 production day (up to 6 hours)', 'Up to 4 short videos', 'Instagram + Facebook: 1 post/week + stories', 'Ads on 1 platform (Meta or Google): 2–3 campaigns', 'Google profile optimization', 'Monthly report + recommendations']
      },
      growth: {
        tag: 'Growth',
        title: 'For businesses that want faster reach, traffic, and sales growth.',
        desc: 'More content, higher publishing frequency, and ads on 2 platforms — outcome-driven.',
        items: ['Up to 10 hours of filming per month', 'Up to 6 videos', 'Instagram + Facebook: 2 posts/week + stories', 'Ads on 2 platforms (Meta + Google) + retargeting', 'Google profile management', 'Report + consultation']
      },
      performance: {
        tag: 'Performance',
        title: 'For chains (2+ locations) and brands focused on maximum growth.',
        desc: 'Wider scope: more production + stronger performance marketing and creative tests.',
        items: ['Up to 2 full production days', 'Up to 8 videos + food & interior photo session', 'Managing 2–3 channels (Instagram, Facebook, TikTok)', 'Meta + Google ads: performance, retargeting, booking/delivery campaigns, creative tests', 'Active Google profile management', 'Extended report with analysis + growth plan']
      },
      productionTitle: 'Content production (photo & video)',
      productionIntro: 'Clear deliverables: how many shorts you get and the format.',
      prodItems: [
        { title: 'Production day — up to 6 hours (1 location)', desc: '4–5 high-quality shorts (Reels / TikTok / YouTube Shorts)', items: ['Vertical filming (short format)', 'Editing + export for publishing', 'Same asset can be posted on all 3 platforms'] },
        { title: 'Half-day shoot — up to 3 hours (1 location)', desc: '2–3 high-quality shorts (Reels / TikTok / YouTube Shorts)', items: ['Vertical filming (short format)', 'Editing + export for publishing', 'Ready for 3 platforms'] },
        { title: 'Vertical video — up to 40s (our footage)', desc: 'Script + shoot + edit', items: ['We define goal and style', 'We write a simple script', 'We shoot and edit up to 40 seconds'] },
        { title: 'Vertical video — up to 40s (client footage)', desc: 'Edit to your vision (footage sent 2 days in advance)', items: ['Client sends footage at least 2 days before', 'We align edit to your request', 'Final short ready to publish'] },
        { title: 'Food & interior photo session — 2 hours', desc: '30–40 edited photos (food + interior)', items: ['Food and interior shots', 'Selection + editing', 'Ready for socials and Google'] }
      ],
      additionalTitle: 'Additional services',
      additionalIntro: 'If you don’t need a full retainer, we can deliver specific digital marketing components.',
      social: { title: 'Social media & Google', items: ['SMM Basic: 1 channel, 4 posts, up to 8 stories / month', 'SMM Standard: Instagram + Facebook, 8 posts, up to 12 stories', 'SMM Intensive: 2–3 channels, 8–12 posts + active stories + moderation', 'Google Business Profile: management + optimization'] },
      ads: { title: 'Ads', items: ['Ad account audit', 'One-time campaign setup (up to 3 campaigns, Meta or Google)', 'Ad management (1 platform) — ongoing optimization', 'Ad management (2 platforms) — ongoing optimization', 'Extended ad management — creative tests + reporting'] },
      design: { title: 'Design', items: ['Single post design: static visual + basic copy', '8-post package: consistent look', 'Menu design A4 (1 page)', 'Multi-page menu design', 'Simple logo / brand refresh'] },
      tailored: { title: 'Want a scope tailored to your business?', desc: 'Book a consultation — we’ll propose scope options and a 30-day plan.' }
    },
    portfolio: {
      title: 'Case studies',
      intro: 'Examples of cooperation. Results are presented without sensitive data.',
      cases: [
        { 
          name: 'Maya Halal Market', 
          title: '2-year partnership: content + social + campaigns', 
          links: { site: { label: 'Website', url: 'https://halal-market.pl/' }, ig: { label: 'Instagram', url: 'https://www.instagram.com/maya.halal.market?igsh=MXg4cWwzbGt2MG1oYw==' } }, 
          items: ['Consistent content pipeline (photo/video)', 'Profile management', 'Campaigns supporting sales and in-store traffic'], 
          results: ['Sales growth: multi‑x', 'Reach & engagement growth'],
          chart: {
            label: 'Revenue Growth',
            growthText: '+733%',
            data: [
              { name: 'Start', value: 12, tooltip: '1,200 PLN / day' },
              { name: 'Now', value: 100, tooltip: '10,000 PLN / day' }
            ]
          }
        },
        { 
          name: 'Turan Halal Restaurant', 
          title: 'Stabilization & growth: content, IG activity, delivery process improvement', 
          links: { ig: { label: 'Instagram', url: 'https://www.instagram.com/_turan_restaurant_?igsh=ZDh3ODRvajR0YjAz' } }, 
          items: ['Solved a critical delivery-system issue', 'Menu + offer communication', 'Higher engagement and sales'], 
          results: ['Delivery profitability improved', 'Higher IG activity'],
          chart: {
            label: 'Monthly Profit',
            growthText: 'From Deficit to Profit',
            data: [
              { name: 'Before', value: -35, tooltip: '-3,500 PLN deficit' },
              { name: 'Now', value: 20, tooltip: '+2,000 PLN profit' }
            ]
          }
        },
        { 
          name: 'Restauracja SZAFRAN', 
          title: 'From scratch: Instagram + content + Google Ads', 
          links: { ig: { label: 'Instagram', url: 'https://www.instagram.com/restauracja_szafran_warszawa?igsh=MXRxaTdrcmxvYnl6Nw==' } }, 
          items: ['IG rebuild/setup', 'Photo/video + consistent publishing', 'Google Ads + optimization'], 
          results: ['Daily sales growth: 3×+', 'Ongoing contract'],
          chart: {
            label: 'Daily Revenue',
            growthText: '+220%',
            data: [
              { name: 'Start', value: 25, tooltip: '2,500 PLN / day' },
              { name: 'Now', value: 80, tooltip: '8,000 PLN / day' }
            ]
          }
        },
        { 
          name: 'La Cantino', 
          title: 'One-off project: photo + video', 
          links: { map: { label: 'Google Maps', url: 'https://maps.app.goo.gl/qiZ6wHSYH1iqKNn3A' } }, 
          items: ['Photo/video production', 'Ready-to-publish assets'], 
          results: ['Full content set for socials'],
          chart: {
            label: 'Content Volume',
            growthText: '3x Content Quality',
            data: [
              { name: 'Before', value: 20, tooltip: '2-3 phone videos / mo' },
              { name: 'After', value: 100, tooltip: '6 pro videos + 30 photos' }
            ]
          }
        },
        { 
          name: 'Lukma Kebab Pizza', 
          title: 'Longer cooperation: promotion & marketing', 
          links: { map: { label: 'Google Maps', url: 'https://maps.app.goo.gl/K2LcEBy13TnQxKit7' } }, 
          items: ['Content + publishing', 'Promotion and campaigns', 'Brand communication support'], 
          results: ['Reach and sales growth'],
          chart: {
            label: 'Monthly Reach',
            growthText: '50,000+',
            data: [
              { name: 'Start', value: 0, tooltip: '0 reach (no social)' },
              { name: 'Now', value: 100, tooltip: '50,000 viewers / mo' }
            ]
          }
        }
      ],
      otherBrands: { title: 'Other brands', items: ['Ozbegim Restaurant', 'Alif Restaurant', 'Sultan', 'Sakura Sushi'] },
      similar: { title: 'Want a similar system?', desc: 'Send your social links — we’ll reply with a quick audit and scope proposal.' }
    },
    industries: {
      title: 'Industries',
      intro: 'We focus on local businesses across Poland: restaurants, cafés, markets, and small chains.',
      items: [
        { title: 'Restaurants & cafés', desc: 'Content that sells taste', text: 'Reels, product shots, atmosphere and consistent posting for bookings and delivery.', items: ['Reels / short-form', 'Photo & video sessions', 'Booking/delivery campaigns'] },
        { title: 'Retail & markets', desc: 'Premium product visuals', text: 'Consistent creatives + ads that turn into real traffic and inquiries.', items: ['Offer-focused creatives', 'Local targeting', 'Campaign optimization'] },
        { title: 'Local services', desc: 'Leads and calls', text: 'Google Ads + landing + tracking to measure and scale.', items: ['Search intent', 'Call & form tracking', 'CPL/CPA control'] }
      ],
      different: { title: 'Different industry?', desc: 'Tell us what you do — we’ll tell you if and how to scale it.' }
    },
    about: {
      title: 'About Us',
      intro: 'Kairos Team is a boutique growth marketing agency. We’re not a corporation — we’re your partner in scaling your business.',
      approach: {
        title: 'Our Approach',
        items: [
          { title: 'All-in-one', desc: 'We take care of everything: from content production to performance ads and Google profile management.' },
          { title: 'Local Focus', desc: 'We understand the Polish market and how to drive local customers to your physical locations.' },
          { title: 'Data Driven', desc: 'Every campaign is tracked, measured, and optimized for the best possible ROI.' }
        ]
      },
      why: {
        title: 'Why it works?',
        desc: 'We don’t just "run ads". We build a presence that people trust. By combining high-quality vertical content with precision targeting, we create a machine that consistently brings in new customers.',
        stats: {
          growth: '300%',
          growthLabel: 'Avg. Sales Growth',
          brands: '30+',
          brandsLabel: 'Brands Scaled'
        }
      },
      cta: {
        title: 'Ready to scale?',
        desc: "Let's talk about your business and how we can help you reach your goals in the next 90 days.",
        button: 'Book a Consultation'
      }
    },
    contact: {
      title: 'Contact',
      intro: 'Fastest contact: phone or booking. Email is the fallback option.',
      audit: {
        title: 'Free audit (diagnostic call)',
        desc: 'We start by understanding your situation. During the audit we collect business context, review your current online presence, and point out what to improve. Then we propose a service or a tailored scope (package). If needed, we agree on test shoots/reels to start fast.',
        items: ['Quick discovery: goals, offer, location, budget', 'Review of profiles / messaging / ads (if any)', 'Recommendations: what to do in 30 days', 'Scope proposal: Starter / Growth / Performance (or custom)'],
        labels: { 
          name: 'Name', 
          namePlaceholder: 'Your name',
          email: 'Email', 
          company: 'Company / link', 
          companyPlaceholder: 'Company name + socials/website link',
          message: 'Message', 
          messagePlaceholder: 'What do you want to achieve in 30–90 days?',
          send: 'Send (email)', 
          slow: 'Email is the slowest channel — for speed use phone or calendar.' 
        }
      },
      book: {
        title: 'Book an online consultation',
        desc: 'Click and pick a time. This is the fastest way to start.',
        cover: { title: 'What we cover', items: ['Goals: awareness / sales / bookings', 'Scope: Starter / Growth / Performance (or custom)', 'First steps: plan + optional test shoot'] },
        btns: { calendar: 'Open calendar', call: 'Call now' },
        info: { phone: 'Phone:', ig: 'Instagram:', li: 'LinkedIn:' }
      },
      socials: 'Social Channels'
    },
    privacy: {
      title: 'Privacy Policy',
      intro: 'Replace this with your official policy text (GDPR/cookies/tracking).',
      collect: { title: 'What we collect', desc: 'Typically: form data, contact details, and analytics events (if enabled).' },
      why: { title: 'Why', desc: 'To respond to inquiries, improve the website, and measure marketing performance.' }
    }
  },
  pl: {
    nav: {
      home: 'Start',
      services: 'Usługi',
      portfolio: 'Realizacje',
      industries: 'Branże',
      about: 'O nas',
      contact: 'Kontakt',
      audit: 'Darmowy audyt',
      book: 'Umów konsultację'
    },
    hero: {
      kicker: 'Wszystkie działania online w jednych rękach',
      title: 'Budujemy rozpoznawalność i sprzedaż — przez treści, social media i reklamy.',
      lead: 'Tworzymy premium content, prowadzimy profile i uruchamiamy kampanie. Działamy szybko, procesowo i z naciskiem na wynik: ruch, rezerwacje, zamówienia i sprzedaż — w całej Polsce.',
      points: ['Cała Polska', 'Szybka realizacja', 'Jeden zespół (foto/wideo/SMM/ads/design)'],
      scope: {
        title: 'Przykładowy zakres miesięczny',
        items: [
          'Plan treści i harmonogram',
          'Produkcja (foto/wideo) + montaż',
          'Publikacja + moderacja',
          'Reklamy Meta/Google + optymalizacja'
        ]
      }
    },
    stats: {
      title: 'Zaufanie w liczbach',
      brands: 'marek w 2 lata',
      assets: 'materiałów contentowych (wideo + foto)',
      years: 'lata działania Kairos Team'
    },
    whatWeDo: {
      title: 'Co robimy',
      intro: 'Najbardziej opłacalny model to abonament (miesięczna współpraca). Zakres dopasowujemy po konsultacji.',
      packages: {
        title: 'Abonamenty (najczęściej wybierane)',
        desc: 'Stały content i marketing co miesiąc. Pakiety: Starter / Growth / Performance. Zakres dopasowujemy po rozmowie.',
        items: ['Treści + publikacje', 'Reklamy (Meta/Google)', 'Google Business Profile', 'Raport i plan na kolejny miesiąc']
      },
      production: {
        title: 'Produkcja treści',
        desc: 'Foto i wideo pod social media. Dni zdjęciowe, reels, sesje foto, montaż — w jakości premium.',
        items: ['Shorty (Reels/TikTok/YouTube)', 'Foto produktów i wnętrz', 'Montaż pod formaty', 'Biblioteka materiałów']
      },
      ads: {
        title: 'Reklamy performance',
        desc: 'Leady, rezerwacje i sprzedaż. Kampanie Meta/Google z trackingiem i regularną optymalizacją.',
        items: ['Konfiguracja + tracking', 'Retargeting', 'Testy kreacji', 'Kontrola CPL/CPA']
      }
    },
    howWeWork: {
      title: 'Jak wygląda współpraca',
      intro: 'Jasne kroki, bez chaosu.',
      steps: [
        { title: 'Zgłoszenie', desc: 'Zostawiasz kontakt i cel.' },
        { title: 'Rozmowa 10–15 min', desc: 'Doprecyzujemy branżę, priorytety i zakres.' },
        { title: 'Plan na 30 dni', desc: 'Dostajesz konkretny plan i wybieramy pakiet.' },
        { title: 'Start', desc: 'Plan treści, nagrania/montaż, uporządkowanie profili, start reklam.' },
        { title: 'Kontrola', desc: 'Optymalizacja i raport na koniec miesiąca.' }
      ]
    },
    cta: {
      title: 'Chcesz dopasowany plan i zakres?',
      desc: 'Umów konsultację albo poproś o darmowy audyt. Powiemy wprost: co działa, co nie i co poprawić.',
      audit: 'Darmowy audyt',
      book: 'Umów konsultację'
    },
    footer: {
      desc: 'Partner wzrostu „wszystko w jednym” dla firm lokalnych w całej Polsce: produkcja treści, prowadzenie social mediów i reklamy performance.',
      location: 'Warszawa • Polska (cała Polska)',
      phone: 'Telefon',
      email: 'Email (awaryjnie)',
      rights: '© 2026 Kairos Team. Wszelkie prawa zastrzeżone.'
    },
    services: {
      title: 'Usługi',
      intro: 'Nie pokazujemy cen na stronie — po konsultacji dopasowujemy zakres i pakiet do Twoich celów.',
      retainerTitle: 'Abonamenty (miesięczna współpraca)',
      retainerIntro: 'Pakiety dla firm, które chcą rosnąć miesiąc po miesiącu. Jasny zakres, kanały i raport.',
      starter: {
        tag: 'Starter',
        title: 'Dla firm, które chcą zacząć stabilnie i profesjonalnie.',
        desc: 'Stały content + podstawowe działania marketingowe pod rozpoznawalność i pierwsze wyniki.',
        items: ['1 dzień zdjęciowy (do 6 godzin)', 'Do 4 krótkich filmów', 'Instagram + Facebook: 1 post / tydzień + relacje', 'Reklama na 1 platformie (Meta lub Google): 2–3 kampanie', 'Optymalizacja profilu Google', 'Raport miesięczny + rekomendacje']
      },
      growth: {
        tag: 'Growth',
        title: 'Dla firm, które chcą szybciej zwiększać zasięg, ruch i sprzedaż.',
        desc: 'Więcej treści, częstsze publikacje i reklamy na 2 platformach — pod wynik.',
        items: ['Do 10 godzin nagrań miesięcznie', 'Do 6 filmów', 'Instagram + Facebook: 2 posty / tydzień + relacje', 'Reklamy na 2 platformach (Meta + Google) + retargeting', 'Prowadzenie profilu Google', 'Raport + konsultacja']
      },
      performance: {
        tag: 'Performance',
        title: 'Dla sieci (2+ lokalizacje) i marek nastawionych na maksymalny wzrost.',
        desc: 'Szeroki zakres: więcej produkcji + performance marketing + testy kreacji.',
        items: ['Do 2 pełnych dni zdjęciowych', 'Do 8 filmów + sesja foto jedzenia i wnętrza', 'Prowadzenie 2–3 kanałów (Instagram, Facebook, TikTok)', 'Reklamy Meta + Google: performance, retargeting, kampanie na rezerwacje/dostawy, testy kreacji', 'Aktywne prowadzenie profilu Google', 'Rozszerzony raport z analizą i planem rozwoju']
      },
      productionTitle: 'Produkcja treści (foto i wideo)',
      productionIntro: 'Jasne deliverables: ile shortów dostajesz i w jakim formacie.',
      prodItems: [
        { title: 'Dzień zdjęciowy — do 6 godzin (1 lokalizacja)', desc: '4–5 jakościowych shortów (Reels / TikTok / YouTube Shorts)', items: ['Nagrania w pionie (short format)', 'Montaż i przygotowanie do publikacji', 'Ten sam materiał publikujesz na IG, TikTok i YouTube'] },
        { title: 'Pół dnia zdjęciowego — do 3 godzin (1 lokalizacja)', desc: '2–3 jakościowe shorty (Reels / TikTok / YouTube Shorts)', items: ['Nagrania w pionie (short format)', 'Montaż i przygotowanie do publikacji', 'Gotowe do wrzucenia na 3 platformy'] },
        { title: 'Wideo pionowe — do 40 sek (nasz materiał)', desc: 'Scenariusz + realizacja + montaż', items: ['Ustalamy cel i styl', 'Piszemy prosty scenariusz', 'Realizujemy ujęcia i montujemy do 40 sek'] },
        { title: 'Wideo pionowe — do 40 sek (materiały klienta)', desc: 'Montaż pod Twoją wizję (materiały min. 2 dni wcześniej)', items: ['Klient wysyła materiały min. 2 dni przed', 'Dopasowujemy montaż do Twojej „chcę”', 'Finalny short gotowy do publikacji'] },
        { title: 'Sesja foto: jedzenie + wnętrze — 2 godziny', desc: '30–40 obrobionych zdjęć', items: ['Zdjęcia jedzenia i wnętrza', 'Selekcja + obróbka', 'Gotowe do social mediów i Google'] }
      ],
      additionalTitle: 'Usługi dodatkowe',
      additionalIntro: 'Jeśli nie potrzebujesz pełnego abonamentu, możemy wykonać pojedyncze elementy digital marketingu.',
      social: { title: 'Social media i Google', items: ['SMM Basic: 1 kanał, 4 posty, do 8 relacji / miesiąc', 'SMM Standard: Instagram + Facebook, 8 postów, do 12 relacji', 'SMM Intensive: 2–3 kanały, 8–12 postów + aktywne relacje + moderacja', 'Google Business Profile: prowadzenie i optymalizacja'] },
      ads: { title: 'Reklamy', items: ['Audyt konta reklamowego', 'Jednorazowa konfiguracja kampanii (do 3 kampanii, Meta lub Google)', 'Prowadzenie reklam (1 platforma) — stała optymalizacja', 'Prowadzenie reklam (2 platformy) — stała optymalizacja', 'Prowadzenie reklam (rozszerzone) — testy kreacji + raportowanie'] },
      design: { title: 'Design', items: ['Projekt posta: statyczna grafika + podstawowy tekst', 'Pakiet 8 postów: spójny wygląd', 'Projekt menu A4 (1 strona)', 'Projekt menu wielostronicowego', 'Proste logo / odświeżenie brandu'] },
      tailored: { title: 'Chcesz dopasować zakres pod Twój biznes?', desc: 'Umów konsultację — przygotujemy propozycję i plan na 30 dni.' }
    },
    portfolio: {
      title: 'Realizacje',
      intro: 'Przykłady współpracy. Wyniki pokazujemy bez wrażliwych danych.',
      cases: [
        { 
          name: 'Maya Halal Market', 
          title: '2 lata współpracy: content + social media + kampanie', 
          links: { site: { label: 'Strona', url: 'https://halal-market.pl/' }, ig: { label: 'Instagram', url: 'https://www.instagram.com/maya.halal.market?igsh=MXg4cWwzbGt2MG1oYw==' } }, 
          items: ['Stały pipeline treści (foto/wideo)', 'Prowadzenie profili', 'Kampanie wspierające sprzedaż i ruch w sklepie'], 
          results: ['Wzrost sprzedaży: multi‑x', 'Wzrost zasięgu i aktywności'],
          chart: {
            label: 'Wzrost przychodów',
            growthText: '+733%',
            data: [
              { name: 'Start', value: 12, tooltip: '1,200 PLN / dzień' },
              { name: 'Teraz', value: 100, tooltip: '10,000 PLN / dzień' }
            ]
          }
        },
        { 
          name: 'Turan Halal Restaurant', 
          title: 'Stabilizacja i wzrost: content, IG aktywność, poprawa procesu dostaw', 
          links: { ig: { label: 'Instagram', url: 'https://www.instagram.com/_turan_restaurant_?igsh=ZDh3ODRvajR0YjAz' } }, 
          items: ['Rozwiązanie krytycznego problemu в systemie dostaw', 'Menu + komunikacja oferty', 'Wzrost aktywności i sprzedaży'], 
          results: ['Poprawa rentowności dostaw', 'Wyższa aktywność na IG'],
          chart: {
            label: 'Miesięczny zysk',
            growthText: 'Od deficytu do zysku',
            data: [
              { name: 'Przed', value: -35, tooltip: '-3,500 PLN deficytu' },
              { name: 'Teraz', value: 20, tooltip: '+2,000 PLN zysku' }
            ]
          }
        },
        { 
          name: 'Restauracja SZAFRAN', 
          title: 'Od zera: nowy Instagram + content + Google Ads', 
          links: { ig: { label: 'Instagram', url: 'https://www.instagram.com/restauracja_szafran_warszawa?igsh=MXRxaTdrcmxvYnl6Nw==' } }, 
          items: ['Stworzenie/odbudowa profilu IG', 'Foto/wideo + regularne publikacje', 'Google Ads + optymalizacja'], 
          results: ['Wzrost sprzedaży dziennej: 3×+', 'Stała współpraca (kontrakt)'],
          chart: {
            label: 'Dzienny przychód',
            growthText: '+220%',
            data: [
              { name: 'Start', value: 25, tooltip: '2,500 PLN / dzień' },
              { name: 'Teraz', value: 80, tooltip: '8,000 PLN / dzień' }
            ]
          }
        },
        { 
          name: 'La Cantino', 
          title: 'Jednorazowa realizacja: sesja foto + wideo', 
          links: { map: { label: 'Google Maps', url: 'https://maps.app.goo.gl/qiZ6wHSYH1iqKNn3A' } }, 
          items: ['Produkcja materiałów foto/wideo', 'Gotowe materiały do publikacji'], 
          results: ['Komplet contentu do social mediów'],
          chart: {
            label: 'Objętość treści',
            growthText: '3x Jakość contentu',
            data: [
              { name: 'Przed', value: 20, tooltip: '2-3 filmy z telefonu' },
              { name: 'Po', value: 100, tooltip: '6 pro filmów + 30 zdjęć' }
            ]
          }
        },
        { 
          name: 'Lukma Kebab Pizza', 
          title: 'Dłuższa współpraca: promocja i marketing', 
          links: { map: { label: 'Google Maps', url: 'https://maps.app.goo.gl/K2LcEBy13TnQxKit7' } }, 
          items: ['Content + publikacje', 'Promocja i kampanie', 'Wsparcie komunikacji marki'], 
          results: ['Wzrost zasięgu i sprzedaży'],
          chart: {
            label: 'Miesięczny zasięg',
            growthText: '50,000+',
            data: [
              { name: 'Start', value: 0, tooltip: '0 zasięgu (brak social)' },
              { name: 'Teraz', value: 100, tooltip: '50,000 widzów / mies.' }
            ]
          }
        }
      ],
      otherBrands: { title: 'Inne marki', items: ['Ozbegim Restaurant', 'Alif Restaurant', 'Sultan', 'Sakura Sushi'] },
      similar: { title: 'Chcesz podobny system u siebie?', desc: 'Zostaw link do social mediów — wrócimy z krótkim audytem i propozycją zakresu.' }
    },
    industries: {
      title: 'Branże',
      intro: 'Specjalizujemy się w biznesie lokalnym w całej Polsce: restauracje, kawiarnie, markety i małe sieci.',
      items: [
        { title: 'Restauracje i kawiarnie', desc: 'Treści, które sprzedają smak', text: 'Reels, zdjęcia produktów, klimat miejsca i regularny posting pod rezerwacje i dostawy.', items: ['Reels / short-form', 'Sesje foto i wideo', 'Kampanie na rezerwacje/dostawy'] },
        { title: 'Markety i retail', desc: 'Premium wizual produktu', text: 'Spójne kreacje + reklamy, które zamieniają się w realny ruch i zapytania.', items: ['Kreacje pod ofertę', 'Targetowanie lokalne', 'Optymalizacja kampanii'] },
        { title: 'Usługi lokalne', desc: 'Leady i telefony', text: 'Google Ads + landing + tracking, żeby mierzyć i skalować.', items: ['Search intent', 'Tracking połączeń i formularzy', 'Kontrola CPL/CPA'] }
      ],
      different: { title: 'Twoja branża jest inna?', desc: 'Powiedz nam, czym się zajmujesz — powiemy, czy i jak to skalować.' }
    },
    about: {
      title: 'O nas',
      intro: 'Kairos Team to butikowa agencja growth marketingu. Nie jesteśmy korporacją — jesteśmy Twoim partnerem w skalowaniu biznesu.',
      approach: {
        title: 'Nasze podejście',
        items: [
          { title: 'Wszystko w jednym', desc: 'Zajmujemy się wszystkim: od produkcji treści po reklamy efektywnościowe i zarządzanie profilem Google.' },
          { title: 'Lokalne podejście', desc: 'Rozumiemy polski rynek i wiemy, jak przyciągnąć lokalnych klientów do Twoich placówek.' },
          { title: 'Oparte na danych', desc: 'Każda kampania jest śledzona, mierzona i optymalizowana pod kątem najlepszego możliwego zwrotu z inwestycji (ROI).' }
        ]
      },
      why: {
        title: 'Dlaczego to działa?',
        desc: 'Nie tylko „puszczamy reklamy”. Budujemy obecność, której ludzie ufają. Łącząc wysokiej jakości treści pionowe z precyzyjnym targetowaniem, tworzymy maszynę, która stale pozyskuje nowych klientów.',
        stats: {
          growth: '300%',
          growthLabel: 'Średni wzrost sprzedaży',
          brands: '30+',
          brandsLabel: 'Przeskalowanych marek'
        }
      },
      cta: {
        title: 'Gotowy na wzrost?',
        desc: 'Porozmawiajmy o Twoim biznesie i o tym, jak możemy pomóc Ci osiągnąć cele w ciągu najbliższych 90 dni.',
        button: 'Umów konsultację'
      }
    },
    contact: {
      title: 'Kontakt',
      intro: 'Najszybszy kontakt: telefon lub rezerwacja konsultacji. Email traktujemy jako opcję awaryjną.',
      audit: {
        title: 'Darmowy audyt (rozmowa diagnostyczna)',
        desc: 'Najpierw rozumiemy problem. W trakcie audytu zbieramy informacje o Twoim biznesie, analizujemy obecne działania online i wskazujemy, co poprawić. Na końcu proponujemy usługę lub dopasowany zakres (pakiet), a jeśli trzeba — ustalamy testowe nagrania/rolki, żeby szybko ruszyć.',
        items: ['Krótki wywiad: cele, oferta, lokalizacja, budżet', 'Analiza profili / komunikacji / reklamy (jeśli jest)', 'Rekomendacje: co zrobić w 30 dni', 'Propozycja zakresu: Starter / Growth / Performance (lub custom)'],
        labels: { 
          name: 'Imię', 
          namePlaceholder: 'Twoje imię',
          email: 'Email', 
          company: 'Firma / link', 
          companyPlaceholder: 'Nazwa firmy + link do social mediów/strony',
          message: 'Wiadomość', 
          messagePlaceholder: 'Co chcesz osiągnąć w ciągu 30–90 dni?',
          send: 'Wyślij (email)', 
          slow: 'Email jest najwolniejszą opcją — jeśli zależy Ci na czasie, wybierz telefon lub kalendarz.' 
        }
      },
      book: {
        title: 'Umów konsultację online',
        desc: 'Kliknij i wybierz termin. To najszybsza ścieżka startu.',
        cover: { title: 'Co omówimy', items: ['Cele: rozpoznawalność / sprzedaż / rezerwacje', 'Zakres: Starter / Growth / Performance (lub custom)', 'Pierwsze kroki: plan + ewentualne testowe nagrania'] },
        btns: { calendar: 'Otwórz kalendarz', call: 'Zadzwoń teraz' },
        info: { phone: 'Telefon:', ig: 'Instagram:', li: 'LinkedIn:' }
      },
      socials: 'Kanały Social Media'
    },
    privacy: {
      title: 'Polityka prywatności',
      intro: 'Wstaw tutaj oficjalny tekst (RODO/cookies/tracking).',
      collect: { title: 'Co zbieramy', desc: 'Najczęściej: dane z formularzy, dane kontaktowe oraz zdarzenia analityczne (jeśli włączone).' },
      why: { title: 'Po co', desc: 'Aby odpowiedzieć na zapytania, poprawiać stronę i mierzyć skuteczność marketingu.' }
    }
  },
  ru: {
    nav: {
      home: 'Главная',
      services: 'Услуги',
      portfolio: 'Кейсы',
      industries: 'Сферы',
      about: 'О нас',
      contact: 'Контакты',
      audit: 'Бесплатный аудит',
      book: 'Записаться на консультацию'
    },
    hero: {
      kicker: 'Все онлайн-задачи в одних руках',
      title: 'Повышаем узнаваемость и продажи через контент, соцсети и рекламу.',
      lead: 'Мы снимаем premium-контент, ведём профили и запускаем кампании. Быстро, процессно и с фокусом на результат: трафик, брони, заказы и продажи — по всей Польше.',
      points: ['По всей Польше', 'Быстрая реализация', 'Одна команда (фото/видео/SMM/ads/design)'],
      scope: {
        title: 'Пример месячного объёма',
        items: [
          'Контент-план и график',
          'Продакшн (фото/видео) + монтаж',
          'Публикации + модерация',
          'Реклама Meta/Google + оптимизация'
        ]
      }
    },
    stats: {
      title: 'Доверие в цифрах',
      brands: 'брендов за 2 года',
      assets: 'контент-материалов (видео + фото)',
      years: 'года работы Kairos Team'
    },
    whatWeDo: {
      title: 'Что делаем',
      intro: 'Лучший формат — ежемесячные пакеты (retainer). Объём подбираем после консультации.',
      packages: {
        title: 'Пакеты на месяц (топ-продукт)',
        desc: 'Стабильный маркетинг каждый месяц. Пакеты: Starter / Growth / Performance. Финальный объём — после консультации.',
        items: ['Контент + публикации', 'Реклама (Meta/Google)', 'Google Business Profile', 'Отчёт + план на следующий месяц']
      },
      production: {
        title: 'Продакшн контента',
        desc: 'Фото и видео под соцплатформы. Съёмочные дни, reels, фотосессии, монтаж — premium качество.',
        items: ['Shorts (Reels/TikTok/YouTube)', 'Фото продукта и интерьера', 'Монтаж под форматы', 'Библиотека материалов']
      },
      ads: {
        title: 'Performance-реклама',
        desc: 'Лиды, брони и продажи. Кампании Meta/Google с трекингом и регулярной оптимизацией.',
        items: ['Настройка + трекинг', 'Ретаргетинг', 'Тесты креативов', 'Контроль CPL/CPA']
      }
    },
    howWeWork: {
      title: 'Как мы работаем',
      intro: 'Понятные шаги, без хаоса.',
      steps: [
        { title: 'Заявка', desc: 'Вы оставляете контакт и цель.' },
        { title: 'Созвон 10–15 минут', desc: 'Уточняем приоритеты и объём.' },
        { title: 'План на 30 дней', desc: 'Даём план и выбираем пакет.' },
        { title: 'Старт', desc: 'Контент-план, съёмка/монтаж, профили, запуск рекламы.' },
        { title: 'Контроль', desc: 'Оптимизация и отчёт по итогам месяца.' }
      ]
    },
    cta: {
      title: 'Нужен план и объём под ваш бизнес?',
      desc: 'Запишитесь на консультацию или запросите бесплатный аудит. Скажем прямо: что работает и что нужно исправить.',
      audit: 'Бесплатный аудит',
      book: 'Записаться на консультацию'
    },
    footer: {
      desc: 'Партнёр роста «всё в одном» для локального бизнеса по всей Польше: продакшн контента, ведение соцсетей и performance-реклама.',
      location: 'Варшава • Польша (по всей Польше)',
      phone: 'Телефон',
      email: 'Email (крайний)',
      rights: '© 2026 Kairos Team. Все права защищены.'
    },
    services: {
      title: 'Услуги',
      intro: 'Цены на сайте не публикуем — после консультации подбираем объём и пакет под ваши цели.',
      retainerTitle: 'Пакеты на месяц (retainer)',
      retainerIntro: 'Чёткий объём, каналы и отчётность — для стабильного роста.',
      starter: {
        tag: 'Starter',
        title: 'Для небольших бизнесов, которым нужен стабильный, профессиональный старт.',
        desc: 'Стабильный контент + базовые маркетинговые действия под узнаваемость и первые результаты.',
        items: ['1 съёмочный день (до 6 часов)', 'До 4 коротких видео', 'Instagram + Facebook: 1 пост/нед + сторис', 'Реклама на 1 платформе (Meta или Google): 2–3 кампании', 'Оптимизация профиля Google', 'Ежемесячный отчёт + рекомендации']
      },
      growth: {
        tag: 'Growth',
        title: 'Для бизнесов, которым нужен более быстрый рост охватов, трафика и продаж.',
        desc: 'Больше контента, чаще публикации и реклама на 2 платформах — под результат.',
        items: ['До 10 часов съёмок в месяц', 'До 6 видео', 'Instagram + Facebook: 2 поста/нед + сторис', 'Реклама на 2 платформах (Meta + Google) + ретаргетинг', 'Ведение профиля Google', 'Отчёт + консультация']
      },
      performance: {
        tag: 'Performance',
        title: 'Для сетей (2+ локации) и брендов с фокусом на максимальный рост.',
        desc: 'Расширенный объём: больше продакшна + сильнее performance и тесты креативов.',
        items: ['До 2 полных съёмочных дней', 'До 8 видео + фотосессия еды и интерьера', 'Ведение 2–3 каналов (Instagram, Facebook, TikTok)', 'Реклама Meta + Google: performance, ретаргетинг, кампании на брони/доставку, тесты креативов', 'Активное ведение профиля Google', 'Расширенный отчёт с анализом и планом роста']
      },
      productionTitle: 'Продакшн контента (фото и видео)',
      productionIntro: 'Чёткие deliverables: сколько short‑роликов вы получите и в каком формате.',
      prodItems: [
        { title: 'Съёмочный день — до 6 часов (1 локация)', desc: '4–5 качественных short‑видео (Reels / TikTok / YouTube Shorts)', items: ['Вертикальная съёмка (short формат)', 'Монтаж и подготовка к публикации', 'Один ролик можно публиковать на всех 3 платформах'] },
        { title: 'Полдня съёмки — до 3 часов (1 локация)', desc: '2–3 качественных short‑видео (Reels / TikTok / YouTube Shorts)', items: ['Вертикальная съёмка (short формат)', 'Монтаж и подготовка к публикации', 'Готово для 3 платформ'] },
        { title: 'Вертикальное видео — до 40 сек (наш футаж)', desc: 'Сценарий + съёмка + монтаж', items: ['Фиксируем цель и стиль', 'Пишем простой сценарий', 'Снимаем и монтируем до 40 секунд'] },
        { title: 'Вертикальное видео — до 40 сек (футаж клиента)', desc: 'Монтаж под хотелку (материал за 2 дня)', items: ['Клиент отправляет материал минимум за 2 дня', 'Подстраиваем монтаж под запрос', 'Финальный short готов к публикации'] },
        { title: 'Фотосессия: еда + интерьер — 2 часа', desc: '30–40 обработанных фото', items: ['Съёмка еды и интерьера', 'Отбор + обработка', 'Готово для соцсетей и Google'] }
      ],
      additionalTitle: 'Дополнительные услуги',
      additionalIntro: 'Если не нужен полный пакет, можем сделать отдельные элементы digital‑маркетинга.',
      social: { title: 'Соцсети и Google', items: ['SMM Basic: 1 канал, 4 поста, до 8 сторис / месяц', 'SMM Standard: Instagram + Facebook, 8 постов, до 12 сторис', 'SMM Intensive: 2–3 канала, 8–12 постов + активные сторис + модерация', 'Google Business Profile: ведение и оптимизация'] },
      ads: { title: 'Реклама', items: ['Аудит рекламного кабинета', 'Разовая настройка кампаний (до 3 кампаний, Meta или Google)', 'Ведение рекламы (1 платформа) — регулярная оптимизация', 'Ведение рекламы (2 платформы) — регулярная оптимизация', 'Расширенное ведение — тесты креативов + отчётность'] },
      design: { title: 'Дизайн', items: ['Дизайн поста: статичная графика + базовый текст', 'Пакет 8 постов: единый стиль', 'Дизайн меню A4 (1 страница)', 'Дизайн многостраничного меню', 'Простое лого / обновление бренда'] },
      tailored: { title: 'Нужно подобрать объём под ваш бизнес?', desc: 'Запишитесь на консультацию — предложим варианты объёма и план на 30 дней.' }
    },
    portfolio: {
      title: 'Кейсы',
      intro: 'Примеры сотрудничества. Результаты показываем без чувствительных данных.',
      cases: [
        { 
          name: 'Maya Halal Market', 
          title: '2 года работы: контент + соцсети + кампании', 
          links: { site: { label: 'Сайт', url: 'https://halal-market.pl/' }, ig: { label: 'Instagram', url: 'https://www.instagram.com/maya.halal.market?igsh=MXg4cWwzbGt2MG1oYw==' } }, 
          items: ['Стабильный контент‑пайплайн (фото/видео)', 'Ведение профилей', 'Кампании под продажи и трафик в магазин'], 
          results: ['Рост продаж: multi‑x', 'Рост охватов и активности'],
          chart: {
            label: 'Рост выручки',
            growthText: '+733%',
            data: [
              { name: 'Старт', value: 12, tooltip: '1,200 PLN / день' },
              { name: 'Сейчас', value: 100, tooltip: '10,000 PLN / день' }
            ]
          }
        },
        { 
          name: 'Turan Halal Restaurant', 
          title: 'Стабилизация и рост: контент, активность IG, улучшение доставки', 
          links: { ig: { label: 'Instagram', url: 'https://www.instagram.com/_turan_restaurant_?igsh=ZDh3ODRvajR0YjAz' } }, 
          items: ['Закрыли критическую проблему в системе доставки', 'Меню и упаковка оффера', 'Рост активности и продаж'], 
          results: ['Доставка: улучшение рентабельности', 'Рост активности в IG'],
          chart: {
            label: 'Месячная прибыль',
            growthText: 'Из дефицита в прибыль',
            data: [
              { name: 'До', value: -35, tooltip: '-3,500 PLN дефицит' },
              { name: 'Сейчас', value: 20, tooltip: '+2,000 PLN прибыль' }
            ]
          }
        },
        { 
          name: 'Restauracja SZAFRAN', 
          title: 'С нуля: новый Instagram + контент + Google Ads', 
          links: { ig: { label: 'Instagram', url: 'https://www.instagram.com/restauracja_szafran_warszawa?igsh=MXRxaTdrcmxvYnl6Nw==' } }, 
          items: ['Создание/перезапуск IG', 'Фото/видео + регулярные публикации', 'Google Ads + оптимизация'], 
          results: ['Рост дневных продаж: 3×+', 'Постоянный контракт'],
          chart: {
            label: 'Дневная выручка',
            growthText: '+220%',
            data: [
              { name: 'Старт', value: 25, tooltip: '2,500 PLN / день' },
              { name: 'Сейчас', value: 80, tooltip: '8,000 PLN / день' }
            ]
          }
        },
        { 
          name: 'La Cantino', 
          title: 'Разовый проект: фото + видео', 
          links: { map: { label: 'Google Maps', url: 'https://maps.app.goo.gl/qiZ6wHSYH1iqKNn3A' } }, 
          items: ['Продакшн фото/видео', 'Готовые материалы для публикации'], 
          results: ['Полный набор контента'],
          chart: {
            label: 'Объем контента',
            growthText: '3x Качество контента',
            data: [
              { name: 'До', value: 20, tooltip: '2-3 видео с телефона' },
              { name: 'После', value: 100, tooltip: '6 профи видео + 30 фото' }
            ]
          }
        },
        { 
          name: 'Lukma Kebab Pizza', 
          title: 'Долгая работа: продвижение и маркетинг', 
          links: { map: { label: 'Google Maps', url: 'https://maps.app.goo.gl/K2LcEBy13TnQxKit7' } }, 
          items: ['Контент + публикации', 'Продвижение и кампании', 'Поддержка коммуникации бренда'], 
          results: ['Рост охвата и продаж'],
          chart: {
            label: 'Месячный охват',
            growthText: '50,000+',
            data: [
              { name: 'Старт', value: 0, tooltip: '0 охвата (без соцсетей)' },
              { name: 'Сейчас', value: 100, tooltip: '50,000 зрителей / мес' }
            ]
          }
        }
      ],
      otherBrands: { title: 'Другие бренды', items: ['Ozbegim Restaurant', 'Alif Restaurant', 'Sultan', 'Sakura Sushi'] },
      similar: { title: 'Нужен такой же системный подход?', desc: 'Пришли ссылки на соцсети — вернёмся с быстрым аудитом и предложением объёма.' }
    },
    industries: {
      title: 'Сферы',
      intro: 'Фокусируемся на локальном бизнесе по всей Польше: рестораны, кафе, маркеты и небольшие сети.',
      items: [
        { title: 'Контент, который продаёт вкус', desc: 'Рестораны и кафе', text: 'Reels, фото продукта, атмосфера и регулярный постинг под брони и доставку.', items: ['Reels / short-form', 'Фото/видео-сессии', 'Кампании на брони/доставку'] },
        { title: 'Premium-визуал продукта', desc: 'Ритейл и маркеты', text: 'Консистентные креативы + реклама, которая приводит трафик и обращения.', items: ['Креативы под оффер', 'Локальный таргетинг', 'Оптимизация кампаний'] },
        { title: 'Лиды и звонки', desc: 'Локальные услуги', text: 'Google Ads + лендинг + трекинг для измеримости и масштабирования.', items: ['Поисковый интент', 'Трекинг звонков и форм', 'Контроль CPL/CPA'] }
      ],
      different: { title: 'У вас другая сфера?', desc: 'Расскажите, чем занимаетесь — скажем, как масштабировать.' }
    },
    about: {
      title: 'О нас',
      intro: 'Kairos Team — бутиковое агентство growth-маркетинга. Мы не корпорация, мы ваш партнёр по масштабированию.',
      approach: {
        title: 'Наш подход',
        items: [
          { title: 'Всё в одном', desc: 'Мы берем на себя всё: от продакшна контента до performance-рекламы и управления профилем Google.' },
          { title: 'Локальный фокус', desc: 'Мы понимаем польский рынок и знаем, как привести локальных клиентов в ваши точки продаж.' },
          { title: 'Опора на данные', desc: 'Каждая кампания отслеживается, измеряется и оптимизируется для достижения наилучшего ROI.' }
        ]
      },
      why: {
        title: 'Почему это работает?',
        desc: 'Мы не просто «запускаем рекламу». Мы выстраиваем присутствие, которому люди доверяют. Сочетая качественный вертикальный контент с точным таргетингом, мы создаем машину, которая стабильно приносит новых клиентов.',
        stats: {
          growth: '300%',
          growthLabel: 'Средний рост продаж',
          brands: '30+',
          brandsLabel: 'Брендов масштабировано'
        }
      },
      cta: {
        title: 'Готовы к масштабированию?',
        desc: 'Давайте обсудим ваш бизнес и то, как мы можем помочь вам достичь целей в ближайшие 90 дней.',
        button: 'Записаться на консультацию'
      }
    },
    contact: {
      title: 'Контакты',
      intro: 'Самый быстрый контакт: телефон или запись в календарь. Email — крайний вариант.',
      audit: {
        title: 'Бесплатный аудит (диагностическая консультация)',
        desc: 'Сначала мы понимаем проблему. Во время аудита собираем вводные по бизнесу, анализируем текущие онлайн-действия и показываем, что улучшить. Затем предлагаем услугу или подбираем объём (пакет). Если нужно — обсуждаем тестовые съёмки/ролики, чтобы быстро стартовать.',
        items: ['Короткий бриф: цели, оффер, локация, бюджет', 'Разбор профилей / коммуникации / рекламы (если есть)', 'Рекомендации: что сделать за 30 дней', 'Предложение объёма: Starter / Growth / Performance (или custom)'],
        labels: { 
          name: 'Имя', 
          namePlaceholder: 'Ваше имя',
          email: 'Email', 
          company: 'Компания / ссылка', 
          companyPlaceholder: 'Название компании + ссылка на соцсети/сайт',
          message: 'Сообщение', 
          messagePlaceholder: 'Чего вы хотите достичь за 30–90 дней?',
          send: 'Отправить (email)', 
          slow: 'Email — самый медленный канал. Если нужно быстро — телефон или календарь.' 
        }
      },
      book: {
        title: 'Онлайн-запись на консультацию',
        desc: 'Нажмите и выберите время. Это самый быстрый старт.',
        cover: { title: 'Что обсудим', items: ['Цели: узнаваемость / продажи / брони', 'Объём: Starter / Growth / Performance (или custom)', 'Первые шаги: план + возможная тестовая съёмка'] },
        btns: { calendar: 'Открыть календарь', call: 'Позвонить' },
        info: { phone: 'Телефон:', ig: 'Instagram:', li: 'LinkedIn:' }
      },
      socials: 'Социальные сети'
    },
    privacy: {
      title: 'Политика конфиденциальности',
      intro: 'Замените на официальный текст (GDPR/cookies/tracking).',
      collect: { title: 'Что мы собираем', desc: 'Обычно: данные формы, контактные данные и события аналитики (если включено).' },
      why: { title: 'Зачем', desc: 'Чтобы отвечать на запросы, улучшать сайт и измерять эффективность маркетинга.' }
    }
  }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('pl');
  const [isChanging, setIsChanging] = useState(false);

  const setLanguage = (lang: Language) => {
    if (lang === language) return;
    
    setIsChanging(true);
    // Wait for fade out animation to complete before switching text
    setTimeout(() => {
      setLanguageState(lang);
      // Small delay to ensure the new language is rendered before starting fade in
      setTimeout(() => {
        setIsChanging(false);
      }, 50);
    }, 400); // This should match the CSS transition duration
  };

  const t = (path: string) => {
    const keys = path.split('.');
    let current: any = translations[language];
    for (const key of keys) {
      if (current[key] === undefined) return path;
      current = current[key];
    }
    return current;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isChanging }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

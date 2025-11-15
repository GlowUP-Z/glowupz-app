'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Language } from '@/lib/types';

export default function WelcomePage() {
  const router = useRouter();
  const { language, setLanguage, t } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleStart = () => {
    router.push('/login');
  };

  const languages: { code: Language; label: string }[] = [
    { code: 'pt', label: 'PT' },
    { code: 'en', label: 'EN' },
    { code: 'es', label: 'ES' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-pink-200/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-rose-200/30 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-200/20 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      {/* Language selector */}
      <div className="absolute top-6 right-6 flex gap-2 z-10">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              language === lang.code
                ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg scale-110'
                : 'bg-white/80 text-gray-700 hover:bg-white hover:shadow-md'
            }`}
          >
            {lang.label}
          </button>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center space-y-8 max-w-2xl animate-fade-in">
        {/* Logo */}
        <div className="space-y-4">
          <h1 className="text-7xl md:text-8xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 bg-clip-text text-transparent">
              GlowUp
            </span>
            <span className="text-8xl md:text-9xl bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
              Z
            </span>
          </h1>
          
          {/* Tagline */}
          <p className="text-2xl md:text-3xl font-light text-gray-700 animate-slide-up">
            {t.welcome.tagline}
          </p>
        </div>

        {/* Decorative icons */}
        <div className="flex justify-center gap-6 text-4xl animate-bounce-slow">
          <span className="animate-spin-slow">✨</span>
          <span className="animate-pulse">💅</span>
          <span className="animate-spin-slow delay-500">👗</span>
          <span className="animate-pulse delay-700">💖</span>
        </div>

        {/* Start button */}
        <Button
          onClick={handleStart}
          size="lg"
          className="px-12 py-6 text-xl font-semibold bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white rounded-full shadow-2xl hover:shadow-pink-500/50 transition-all duration-300 hover:scale-110 animate-fade-in-up"
        >
          {t.welcome.start}
        </Button>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 1s ease-out 0.3s both;
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out 0.6s both;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }

        .delay-500 {
          animation-delay: 0.5s;
        }

        .delay-700 {
          animation-delay: 0.7s;
        }

        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
}

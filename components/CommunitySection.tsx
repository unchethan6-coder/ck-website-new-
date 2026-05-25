'use client';

import { MessageCircle, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CommunitySection() {
  // International flags data
  const flags = [
    { code: 'GB', name: 'United Kingdom', emoji: '🇬🇧' },
    { code: 'SA', name: 'Saudi Arabia', emoji: '🇸🇦' },
    { code: 'CN', name: 'China', emoji: '🇨🇳' },
    { code: 'ES', name: 'Spain', emoji: '🇪🇸' },
    { code: 'AU', name: 'Australia', emoji: '🇦🇺' },
    { code: 'PH', name: 'Philippines', emoji: '🇵🇭' },
    { code: 'ZA', name: 'South Africa', emoji: '🇿🇦' },
    { code: 'NG', name: 'Nigeria', emoji: '🇳🇬' },
    { code: 'IN', name: 'India', emoji: '🇮🇳' },
    { code: 'CA', name: 'Canada', emoji: '🇨🇦' },
    { code: 'US', name: 'United States', emoji: '🇺🇸' },
    { code: 'FR', name: 'France', emoji: '🇫🇷' },
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-40 h-40 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left side - Content */}
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-3 sm:space-y-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-balance">
                Let&apos;s Win Together
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed max-w-lg">
                Join CK Capital communities to share our wins together – Us vs Us
              </p>
              <p className="text-xs sm:text-sm text-gray-400">
                Connect with 50,000+ traders worldwide and grow together
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button
                className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold px-6 sm:px-8 py-2.5 sm:py-3 rounded-full flex items-center gap-2 transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/50 text-sm sm:text-base"
                asChild
              >
                <a href="https://discord.gg/ckcapital" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Join Our Discord</span>
                </a>
              </Button>
              <Button
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold px-6 sm:px-8 py-2.5 sm:py-3 rounded-full flex items-center gap-2 transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/50 text-sm sm:text-base"
                asChild
              >
                <a href="https://twitter.com/ckcapital" target="_blank" rel="noopener noreferrer">
                  <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Join Our X</span>
                </a>
              </Button>
            </div>

            {/* Stats */}
            <div className="pt-4 sm:pt-6 border-t border-gray-700">
              <div className="grid grid-cols-3 gap-4 sm:gap-6">
                <div>
                  <p className="text-2xl sm:text-3xl font-bold text-white">50K+</p>
                  <p className="text-xs sm:text-sm text-gray-400">Active Traders</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-bold text-white">120+</p>
                  <p className="text-xs sm:text-sm text-gray-400">Countries</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-bold text-white">24/7</p>
                  <p className="text-xs sm:text-sm text-gray-400">Support</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Flags Grid */}
          <div className="hidden md:flex items-center justify-center">
            <div className="relative w-full h-96">
              {/* Flags displayed in a scattered grid pattern */}
              <div className="relative w-full h-full">
                {flags.map((flag, index) => (
                  <div
                    key={flag.code}
                    className="absolute transform -rotate-12 hover:rotate-0 transition-transform duration-300 hover:scale-110 cursor-pointer"
                    style={{
                      left: `${(index % 4) * 25 + 5}%`,
                      top: `${Math.floor(index / 4) * 35 + 10}%`,
                      animation: `float ${3 + index * 0.2}s ease-in-out infinite`,
                    }}
                  >
                    <div className="relative group">
                      <div className="text-4xl sm:text-5xl md:text-6xl drop-shadow-lg">{flag.emoji}</div>
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {flag.name}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add floating animation */}
              <style>{`
                @keyframes float {
                  0%, 100% { transform: translateY(0px) rotate(-12deg); }
                  50% { transform: translateY(-20px) rotate(-12deg); }
                }
              `}</style>
            </div>
          </div>

          {/* Mobile flags - horizontal scroll */}
          <div className="md:hidden overflow-x-auto pb-4">
            <div className="flex gap-3 min-w-min">
              {flags.map((flag) => (
                <div key={flag.code} className="flex-shrink-0 text-center group">
                  <div className="text-4xl mb-1 hover:scale-125 transition-transform cursor-pointer">{flag.emoji}</div>
                  <p className="text-xs text-gray-400 group-hover:text-gray-200 transition-colors">{flag.code}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

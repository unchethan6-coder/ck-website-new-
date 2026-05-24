import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 px-4 py-24 md:py-40">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center">
          <div className="mb-8 inline-flex items-center rounded-full bg-yellow-400/20 px-4 py-2 border border-yellow-400/50">
            <span className="text-sm font-semibold text-yellow-300">⭐ 50,000+ Traders | $5B+ Volume</span>
          </div>

          <h1 className="text-balance mb-6 text-5xl md:text-7xl font-bold text-white leading-tight">
            Trade Smarter.<br />Scale Faster.
          </h1>

          <p className="text-balance mb-10 text-lg md:text-xl text-blue-100 leading-relaxed max-w-2xl mx-auto">
            Get funded with up to $1.2M capital. Enjoy up to 100% profit splits, flexible payouts, and trade 50+ instruments with CK Capital.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold text-base rounded-lg">
              Start Your Evaluation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-base rounded-lg">
              Learn More
            </Button>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-4 md:gap-8 pt-8 border-t border-blue-700">
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-yellow-400">$1.2M</p>
              <p className="text-sm text-blue-200 mt-1">Max Account Size</p>
            </div>
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-yellow-400">100%</p>
              <p className="text-sm text-blue-200 mt-1">Profit Split</p>
            </div>
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-yellow-400">24/7</p>
              <p className="text-sm text-blue-200 mt-1">Support Mon-Fri</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ProductsComparison() {
  const products = [
    {
      name: '1-Step Challenge',
      price: '$99',
      description: 'Perfect for beginners',
      features: [
        { name: 'Account Size', value: '$10K' },
        { name: 'Profit Target', value: '10%' },
        { name: 'Max Daily Loss', value: '5%' },
        { name: 'Max Overall Loss', value: '10%' },
        { name: 'Scaling Plan', included: true },
        { name: '50% Profit Split', included: true },
        { name: 'Lifetime Account', included: true },
        { name: 'Instant Funding', included: false },
      ],
      popular: false,
    },
    {
      name: '2-Step Challenge',
      price: '$199',
      description: 'Verify your skills further',
      features: [
        { name: 'Account Size', value: '$10K' },
        { name: 'Profit Target', value: '10% per step' },
        { name: 'Max Daily Loss', value: '5%' },
        { name: 'Max Overall Loss', value: '10%' },
        { name: 'Scaling Plan', included: true },
        { name: '50% Profit Split', included: true },
        { name: 'Lifetime Account', included: true },
        { name: 'Instant Funding', included: false },
      ],
      popular: true,
    },
    {
      name: 'Instant Funded',
      price: '$799',
      description: 'Get funded immediately',
      features: [
        { name: 'Account Size', value: '$50K' },
        { name: 'Profit Target', value: 'Unlimited' },
        { name: 'Max Daily Loss', value: '5%' },
        { name: 'Max Overall Loss', value: '10%' },
        { name: 'Scaling Plan', included: true },
        { name: '60% Profit Split', included: true },
        { name: 'Lifetime Account', included: true },
        { name: 'Instant Funding', included: true },
      ],
      popular: false,
    },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-[#F5F7FA] to-white">
      <style>{`
        @keyframes slideUpFade {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes popScale {
          0% {
            opacity: 0;
            transform: scale(0.95) translateY(20px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(244, 217, 87, 0.1);
          }
          50% {
            box-shadow: 0 0 0 8px rgba(244, 217, 87, 0);
          }
        }

        @keyframes slideInTable {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .product-card {
          animation: slideUpFade 0.6s ease-out forwards;
          opacity: 0;
        }

        .product-card:nth-child(1) {
          animation-delay: 0.1s;
        }

        .product-card:nth-child(2) {
          animation-delay: 0.2s;
        }

        .product-card:nth-child(3) {
          animation-delay: 0.3s;
        }

        .product-popular {
          animation: popScale 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          opacity: 0;
        }

        .popular-badge {
          animation: glow 2s infinite;
        }

        .product-card:hover {
          animation: none;
        }

        .product-card:not(.product-popular):hover {
          transform: translateY(-4px);
          transition: all 0.3s ease-out;
        }

        .feature-item {
          animation: slideInTable 0.5s ease-out forwards;
          opacity: 0;
        }

        .feature-item:nth-child(1) { animation-delay: 0.1s; }
        .feature-item:nth-child(2) { animation-delay: 0.15s; }
        .feature-item:nth-child(3) { animation-delay: 0.2s; }
        .feature-item:nth-child(4) { animation-delay: 0.25s; }
        .feature-item:nth-child(5) { animation-delay: 0.3s; }
        .feature-item:nth-child(6) { animation-delay: 0.35s; }
        .feature-item:nth-child(7) { animation-delay: 0.4s; }
        .feature-item:nth-child(8) { animation-delay: 0.45s; }

        .cta-button {
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease-out;
        }

        .cta-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.3);
          transition: left 0.5s ease-out;
        }

        .cta-button:hover::before {
          left: 100%;
        }

        .cta-button:active {
          transform: scale(0.98);
        }

        .table-row {
          animation: slideInTable 0.5s ease-out forwards;
          opacity: 0;
        }

        .table-row:nth-child(1) { animation-delay: 0.2s; }
        .table-row:nth-child(2) { animation-delay: 0.25s; }
        .table-row:nth-child(3) { animation-delay: 0.3s; }
        .table-row:nth-child(4) { animation-delay: 0.35s; }
        .table-row:nth-child(5) { animation-delay: 0.4s; }
        .table-row:nth-child(6) { animation-delay: 0.45s; }
        .table-row:nth-child(7) { animation-delay: 0.5s; }

        .table-row:hover {
          background-color: rgba(244, 217, 87, 0.05);
          transition: background-color 0.3s ease-out;
        }

        .heading-fade {
          animation: slideUpFade 0.6s ease-out;
        }

        .check-icon {
          animation: popScale 0.4s ease-out;
        }
      `}</style>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 heading-fade">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0A1628] mb-4 text-balance">
            Our Trading Challenges
          </h2>
          <p className="text-lg text-[#4B5563] max-w-2xl mx-auto">
            Choose the challenge that fits your trading style and experience level. Start small and scale up to earn real profits.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {products.map((product, idx) => (
            <div
              key={idx}
              className={`product-card ${product.popular ? 'product-popular' : ''} relative rounded-xl overflow-hidden transition-all duration-300 ${
                product.popular
                  ? 'border-2 border-[#F4D957] shadow-xl scale-105 md:scale-110'
                  : 'border border-[#E0E6F0] shadow-md hover:shadow-lg'
              } ${product.popular ? 'bg-white' : 'bg-white'}`}
            >
              {/* Popular Badge */}
              {product.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                  <span className="popular-badge bg-[#F4D957] text-[#0A1628] text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider inline-block">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Card Content */}
              <div className={`p-6 sm:p-8 ${product.popular ? 'pt-10 sm:pt-12' : ''}`}>
                {/* Title & Price */}
                <div className="mb-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#0A1628] mb-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-[#4B5563] mb-4">{product.description}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl sm:text-5xl font-bold text-[#0A1628]">
                      {product.price}
                    </span>
                    <span className="text-[#4B5563] text-sm">one-time</span>
                  </div>
                </div>

                {/* CTA Button */}
                <Button
                  className={`cta-button w-full font-semibold py-3 rounded-lg transition-all mb-8 ${
                    product.popular
                      ? 'bg-[#F4D957] hover:bg-[#F0C738] text-[#0A1628]'
                      : 'bg-[#0A2463] hover:bg-[#051A41] text-white'
                  }`}
                  asChild
                >
                  <a href="https://app.ckcapital.co.uk/signup">Start Challenge</a>
                </Button>

                {/* Features List */}
                <div className="space-y-3">
                  {product.features.map((feature, fidx) => (
                    <div key={fidx} className="feature-item flex items-start gap-3 pb-3 border-b border-[#E0E6F0] last:border-b-0 last:pb-0">
                      <div className="flex-shrink-0 mt-1">
                        {feature.included ? (
                          <Check className="check-icon w-5 h-5 text-[#F4D957]" />
                        ) : (
                          <div className="w-5 h-5 rounded-full border-2 border-[#D0D8E2]" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[#0A1628]">{feature.name}</p>
                        {feature.value && (
                          <p className="text-xs text-[#4B5563]">{feature.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="mt-16 sm:mt-20 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-[#D0D8E2]">
                <th className="text-left py-4 px-4 font-semibold text-[#0A1628]">Feature</th>
                <th className="text-center py-4 px-4 font-semibold text-[#0A1628]">1-Step</th>
                <th className="text-center py-4 px-4 font-semibold text-[#0A1628] bg-[#FFF9E6] rounded-t-lg">2-Step</th>
                <th className="text-center py-4 px-4 font-semibold text-[#0A1628]">Instant</th>
              </tr>
            </thead>
            <tbody>
              {[
                { label: 'Account Sizes', oneStep: '10K-100K', twoStep: '10K-100K', instant: '50K-500K' },
                { label: 'Max Daily Loss', oneStep: '5%', twoStep: '5%', instant: '5%' },
                { label: 'Max Overall Loss', oneStep: '10%', twoStep: '10%', instant: '10%' },
                { label: 'Scaling Plan', oneStep: '✓', twoStep: '✓', instant: '✓' },
                { label: 'Profit Split', oneStep: '50%', twoStep: '50%', instant: '60%' },
                { label: 'Trading Days', oneStep: 'Unlimited', twoStep: 'Unlimited', instant: 'Unlimited' },
                { label: 'Lifetime Access', oneStep: '✓', twoStep: '✓', instant: '✓' },
              ].map((row, idx) => (
                <tr key={idx} className="table-row border-b border-[#E0E6F0]">
                  <td className="py-4 px-4 font-medium text-[#0A1628]">{row.label}</td>
                  <td className="text-center py-4 px-4 text-[#4B5563]">{row.oneStep}</td>
                  <td className="text-center py-4 px-4 text-[#4B5563] bg-[#FFFCF0]">{row.twoStep}</td>
                  <td className="text-center py-4 px-4 text-[#4B5563]">{row.instant}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 sm:mt-16 heading-fade">
          <p className="text-[#4B5563] mb-6">
            All challenges include live market trading on real instruments during simulated evaluation periods.
          </p>
          <Button
            className="cta-button bg-[#0A2463] hover:bg-[#051A41] text-white font-semibold px-8 py-3 text-lg rounded-lg transition-all"
            asChild
          >
            <a href="https://app.ckcapital.co.uk/signup">View All Products</a>
          </Button>
        </div>
      </div>
    </section>
  );
}

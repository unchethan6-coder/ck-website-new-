'use client';

import { Button } from '@/components/ui/button';
import { Check, Star } from 'lucide-react';

const milestones = [
  {
    date: 'Jul 4',
    title: 'Evaluation',
    subtitle: 'Purchased',
    value: '$399',
    label: '$100K 2 Step Pro',
    status: null,
  },
  {
    date: 'Jul 4',
    title: 'Phase 1',
    subtitle: 'Passed',
    value: 'Same day',
    label: 'Status:',
    status: 'Clear',
  },
  {
    date: 'Jul 9',
    title: 'Phase 2 passed',
    subtitle: '5 days after Phase 1',
    value: null,
    label: 'Master account funded',
    status: 'Funded',
  },
  {
    date: 'Jul 21',
    title: 'First reward in',
    subtitle: '12 days after funded',
    value: '$4,050',
    valueSmall: '.90',
    label: 'Via Rise in 9 hrs',
    status: null,
  },
];

export default function TraderJourney() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10 lg:gap-16">
          {/* Left Content - Timeline */}
          <div className="flex-1">
            {/* Header */}
            <div className="mb-10 sm:mb-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0A1628] mb-3">
                Trader&apos;s Journey
              </h2>
              <p className="text-sm sm:text-base text-[#8A94A6]">
                Case study{' '}
                <span className="mx-2">•</span>
                <span className="text-[#0A1628]">4 Jul</span>
                <span className="mx-2 text-[#10B981]">→</span>
                <span className="text-[#0A1628]">21 Jul</span>
                <span className="mx-2">•</span>
                <span className="text-[#0A1628] font-medium">$100K 2 Step Pro</span>
              </p>
            </div>

            {/* Timeline Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="relative">
                  {/* Date */}
                  <p className="text-sm font-medium text-[#10B981] mb-3">{milestone.date}</p>
                  
                  {/* Title & Subtitle */}
                  <div className="mb-4">
                    <p className="text-base sm:text-lg font-semibold text-[#0A1628]">{milestone.title}</p>
                    <p className="text-sm text-[#8A94A6]">{milestone.subtitle}</p>
                  </div>

                  {/* Value */}
                  {milestone.value && (
                    <p className="text-2xl sm:text-3xl font-bold text-[#0A1628] mb-1">
                      {milestone.value}
                      {milestone.valueSmall && (
                        <span className="text-lg sm:text-xl">{milestone.valueSmall}</span>
                      )}
                    </p>
                  )}

                  {/* Status Badge */}
                  {milestone.status && (
                    <div className="flex items-center gap-1.5 mb-1">
                      <Check className="w-4 h-4 text-[#10B981]" />
                      <span className="text-lg sm:text-xl font-bold text-[#10B981]">{milestone.status}</span>
                    </div>
                  )}

                  {/* Label */}
                  <p className="text-xs sm:text-sm text-[#8A94A6]">{milestone.label}</p>

                  {/* Connector Line (except last) */}
                  {index < milestones.length - 1 && (
                    <div className="hidden sm:block absolute top-[30px] right-0 w-full h-[2px] bg-gradient-to-r from-[#E8EAEF] to-transparent" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Success Card */}
          <div className="lg:w-[340px] flex-shrink-0">
            {/* Review Quote */}
            <div className="mb-6">
              <div className="flex items-center gap-0.5 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#10B981] text-[#10B981]" />
                ))}
              </div>
              <p className="text-sm text-[#4B5563] italic">
                &quot;Best of the best, I&apos;ve been with them for 2 years now&quot;
              </p>
              <p className="text-sm font-medium text-[#0A1628] mt-1">Majed M.</p>
            </div>

            {/* Stats Card */}
            <div className="bg-[#0A1628] rounded-2xl p-6 sm:p-8 text-center shadow-xl">
              {/* Badge */}
              <div className="inline-block bg-[#1F2D42] text-[#F4D957] text-xs font-semibold px-3 py-1 rounded-full mb-4">
                9 Total Rewards
              </div>

              {/* ROI Percentage */}
              <p className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#10B981] mb-2">
                6,477%
              </p>

              {/* Investment to Return */}
              <div className="flex items-center justify-center gap-2 text-sm text-[#B0BCC9] mb-6">
                <span className="line-through">$399</span>
                <span className="text-[#10B981]">→</span>
                <span className="text-white font-semibold">$26,242</span>
              </div>

              {/* CTA Button */}
              <Button
                className="w-full bg-white text-[#0A1628] hover:bg-gray-100 font-bold py-3 rounded-lg transition-all"
                asChild
              >
                <a href="https://app.ckcapital.co.uk/buy-challenge">Buy Challenge</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

'use client'

import React from 'react'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

export function ScalingJourney() {
  const milestones = [
    { capital: '$2.5K', label: 'Start', profit: '4x Growth' },
    { capital: '$10K', label: 'Building Momentum', profit: '10x Growth' },
    { capital: '$25K', label: 'Growth Stage', profit: '20x Growth' },
    { capital: '$50K', label: 'Scaling Journey', profit: '40x Growth' },
    { capital: '$100K', label: 'Top Performer', profit: '90x Growth' },
  ]

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-4xl font-bold text-black mb-3 md:mb-4">
            Your Path to Growth
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto px-2">
            Track your progress from $2.5K to $1.2M.
          </p>
        </div>

        {/* Desktop Scaling Path */}
        <div className="hidden md:block">
          <div className="flex items-center justify-between gap-2">
            {milestones.map((milestone, idx) => (
              <React.Fragment key={idx}>
                <div className="flex-1 text-center">
                  <div className="bg-muted rounded-2xl p-6 mb-4 border border-border">
                    <div className="text-3xl font-bold text-black mb-2">{milestone.capital}</div>
                    <div className="text-sm font-semibold text-gray-700 mb-2">{milestone.label}</div>
                    <div className="flex items-center justify-center gap-1 text-green-600 font-bold text-sm">
                      {milestone.profit}
                    </div>
                  </div>
                  <div className="w-full h-1 rounded-full" style={{ backgroundImage: 'linear-gradient(90deg, rgb(216, 154, 46) 0%, rgb(232, 190, 76) 25%, rgb(252, 225, 123) 50%, rgb(232, 190, 76) 75%, rgb(215, 153, 48) 100%)' }}></div>
                </div>
                {idx < milestones.length - 1 && (
                  <div className="flex-shrink-0 mb-8">
                    <ArrowRight className="w-6 h-6 text-blue-600" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Mobile Scaling Path */}
        <div className="md:hidden space-y-3">
          {milestones.map((milestone, idx) => (
            <div key={idx} className="flex gap-3 items-start">
              <div className="flex-shrink-0 mt-1">
                <CheckCircle2 className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1 bg-muted rounded-lg p-4 border border-border">
                <div className="text-xl font-bold text-black">{milestone.capital}</div>
                <div className="text-xs font-semibold text-gray-700 mt-1">{milestone.label}</div>
                <div className="text-green-600 font-bold text-sm mt-2">{milestone.profit}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

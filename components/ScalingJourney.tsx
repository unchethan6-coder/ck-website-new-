'use client'

import React from 'react'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

export function ScalingJourney() {
  const milestones = [
    { capital: '$10K', label: 'Start', profit: '+13%' },
    { capital: '$50K', label: 'First Scale', profit: '+25%' },
    { capital: '$165K', label: 'Growth Phase', profit: '+45%' },
    { capital: '$500K', label: 'Scaling', profit: '+62%' },
    { capital: '$2M', label: 'Prime Capital', profit: '+89%' },
  ]

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-4xl font-bold text-black mb-3 md:mb-4">
            Your Scaling Journey
          </h2>
          <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto px-2">
            Watch your capital grow from evaluation to prime account with real rewards
          </p>
        </div>

        {/* Desktop Scaling Path */}
        <div className="hidden md:block">
          <div className="flex items-center justify-between gap-2">
            {milestones.map((milestone, idx) => (
              <React.Fragment key={idx}>
                <div className="flex-1 text-center">
                  <div className="bg-gray-50 rounded-2xl p-6 mb-4 border border-gray-200">
                    <div className="text-3xl font-bold text-blue-600 mb-2">{milestone.capital}</div>
                    <div className="text-sm font-semibold text-gray-700 mb-2">{milestone.label}</div>
                    <div className="flex items-center justify-center gap-1 text-green-600 font-bold text-sm">
                      <ArrowRight className="w-4 h-4" />
                      {milestone.profit}
                    </div>
                  </div>
                  <div className="w-full h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"></div>
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
              <div className="flex-1 bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="text-xl font-bold text-blue-600">{milestone.capital}</div>
                <div className="text-xs font-semibold text-gray-700 mt-1">{milestone.label}</div>
                <div className="text-green-600 font-bold text-sm mt-2">{milestone.profit} Growth</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

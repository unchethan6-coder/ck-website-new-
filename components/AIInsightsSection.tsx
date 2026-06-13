'use client'

import React from 'react'
import { Brain, TrendingUp, Zap } from 'lucide-react'

export function AIInsightsSection() {
  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-4xl font-bold text-black mb-3 md:mb-4">
            AI-Powered Trading Intelligence
          </h2>
          <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto px-2">
            Leverage advanced artificial intelligence to analyze market trends, optimize your trading strategy, and maximize profits
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* AI Market Analysis */}
          <div className="bg-white rounded-xl md:rounded-2xl p-6 md:p-8 border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mb-4 md:mb-6">
              <Brain className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-black mb-2 md:mb-3">Market Analysis</h3>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">Real-time AI analysis of market conditions, price movements, and trading opportunities</p>
          </div>

          {/* Performance Optimization */}
          <div className="bg-white rounded-xl md:rounded-2xl p-6 md:p-8 border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-4 md:mb-6">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-black mb-2 md:mb-3">Performance Insights</h3>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">AI-driven insights to optimize your trading performance and make data-backed decisions</p>
          </div>

          {/* Smart Automation */}
          <div className="bg-white rounded-xl md:rounded-2xl p-6 md:p-8 border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-yellow-100 mb-4 md:mb-6">
              <Zap className="w-6 h-6 text-yellow-600" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-black mb-2 md:mb-3">Smart Execution</h3>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">Automated trading with AI-optimized entry and exit points to maximize efficiency</p>
          </div>
        </div>
      </div>
    </section>
  )
}

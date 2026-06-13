'use client'

import React from 'react'
import { Brain, TrendingUp, Zap } from 'lucide-react'

export function AIInsightsSection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-black mb-4">
            AI-Powered Trading Intelligence
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Leverage advanced artificial intelligence to analyze market trends, optimize your trading strategy, and maximize profits
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* AI Market Analysis */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mb-6">
              <Brain className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-black mb-3">Market Analysis</h3>
            <p className="text-gray-600">Real-time AI analysis of market conditions, price movements, and trading opportunities powered by machine learning algorithms</p>
          </div>

          {/* Performance Optimization */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-6">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-black mb-3">Performance Insights</h3>
            <p className="text-gray-600">AI-driven insights to optimize your trading performance, identify patterns, and make data-backed decisions</p>
          </div>

          {/* Smart Automation */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-yellow-100 mb-6">
              <Zap className="w-6 h-6 text-yellow-600" />
            </div>
            <h3 className="text-xl font-bold text-black mb-3">Smart Execution</h3>
            <p className="text-gray-600">Automated trading execution with AI-optimized entry and exit points to maximize efficiency and reduce manual errors</p>
          </div>
        </div>
      </div>
    </section>
  )
}

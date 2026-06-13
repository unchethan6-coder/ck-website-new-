'use client'

import { useState } from 'react'
import { ModalHeader } from '@/components/ModalHeader'
import { Button } from '@/components/ui/button'
import { CheckCircle2 } from 'lucide-react'

interface ScalingPageProps {
  title: string
  description: string
  features: string[]
  pricing?: {
    price: string
    period: string
  }
}

export function ScalingPageTemplate({ title, description, features, pricing }: ScalingPageProps) {
  const [showModal, setShowModal] = useState(true)

  if (!showModal) {
    return null
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setShowModal(false)}>
      <div className="fixed inset-0 z-50 overflow-y-auto pt-0">
        <ModalHeader onClose={() => setShowModal(false)} />
        
        <div className="pt-24 pb-12 px-4 md:px-6">
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8 md:p-12" onClick={(e) => e.stopPropagation()}>
            {/* Title Section */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-[#15161a] mb-4">{title}</h1>
              <p className="text-lg text-gray-600">{description}</p>
            </div>

            {/* Pricing Section */}
            {pricing && (
              <div className="bg-gradient-to-r from-[#f4c430]/10 to-[#d4a020]/10 rounded-lg p-6 mb-8 border border-[#f4c430]/20">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">Investment Amount</p>
                  <p className="text-3xl font-bold text-[#15161a] mb-2">{pricing.price}</p>
                  <p className="text-sm text-gray-500">{pricing.period}</p>
                </div>
              </div>
            )}

            {/* Features Section */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-[#15161a] mb-4">What's Included</h2>
              <div className="space-y-3">
                {features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-[#f4c430] flex-shrink-0 mt-1" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button className="flex-1 bg-[#f4c430] text-[#15161a] hover:bg-[#d4a020] font-semibold py-6">
                Start Challenge
              </Button>
              <Button 
                variant="outline" 
                className="flex-1 border-[#15161a] text-[#15161a] hover:bg-gray-50 font-semibold py-6"
                onClick={() => setShowModal(false)}
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

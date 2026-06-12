'use client'

import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

export default function EventsPage() {
  const upcomingEvents = [
    { title: 'Friday Night Rumble', date: 'Every Friday', time: '8 PM GMT', description: 'Discord community game night with prizes' },
    { title: 'Trading Masterclass', date: 'March 15', time: '7 PM GMT', description: 'Technical analysis deep dive with top traders' },
  ]

  const pastEvents = [
    { title: 'CK Capital Summit 2024', date: 'February 2024' },
    { title: 'Trader Roundtable Discussion', date: 'January 2024' },
    { title: 'Advanced Risk Management Workshop', date: 'December 2023' },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#070A18] via-[#0C1024] to-[#070A18]" />
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(110, 84, 255, 0.1) 0%, transparent 50%)',
        }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 text-center">
          <h1 className="hero-title text-white mb-6 text-balance">
            CK Capital <span className="gradient-text">Events</span>
          </h1>
          <p className="text-lg text-foreground max-w-2xl mx-auto">
            Join our community events and connect with fellow traders worldwide.
          </p>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Upcoming Events</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {upcomingEvents.map((event, idx) => (
              <div key={idx} className="glow-card">
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 rounded-full bg-primary/20 border border-primary/40 text-primary text-xs font-semibold">
                    UPCOMING
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                <p className="text-foreground text-sm mb-4">{event.description}</p>
                <div className="flex gap-4 text-sm text-muted-foreground">
                  <span>{event.date}</span>
                  <span>{event.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section className="py-16 bg-card/20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Past Events</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pastEvents.map((event, idx) => (
              <div key={idx} className="glow-card text-center">
                <h3 className="text-lg font-bold text-white mb-2">{event.title}</h3>
                <p className="text-sm text-muted-foreground">{event.date}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

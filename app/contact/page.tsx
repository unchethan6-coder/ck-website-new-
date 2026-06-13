'use client'

import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { MessageCircle, MapPin, Clock } from 'lucide-react'

export default function ContactPage() {
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
            Get In <span className="gradient-text">Touch</span>
          </h1>
          <p className="text-lg text-foreground max-w-2xl mx-auto">
            Have questions? Our support team is here to help. Reach out anytime.
          </p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Discord */}
            <div className="glow-card text-center">
              <MessageCircle className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Discord Support</h3>
              <p className="text-foreground text-sm mb-6">
                Join our Discord community for instant support and connect with fellow traders.
              </p>
              <a
                href="https://discord.gg/ckcapital"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-[#7C5CFF] transition-colors font-semibold"
              >
                Join Discord →
              </a>
            </div>

            {/* Office */}
            <div className="glow-card text-center">
              <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Office Address</h3>
              <p className="text-foreground text-sm">
                6-7 Waterside Station Road<br />
                Harpenden, AL5 4US<br />
                United Kingdom
              </p>
            </div>

            {/* Hours */}
            <div className="glow-card text-center">
              <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Support Hours</h3>
              <p className="text-foreground text-sm">
                Monday - Friday<br />
                8am - 8pm GMT<br />
                <span className="text-primary">24/7 Community Support</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-card/20">
        <div className="max-w-2xl mx-auto px-4 md:px-6">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Send us a Message</h2>

          <form className="space-y-6 glow-card">
            <div>
              <label className="block text-sm font-semibold text-white mb-2">Name</label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full px-4 py-2 rounded-lg bg-card border border-border text-white placeholder-muted-foreground focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">Email</label>
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full px-4 py-2 rounded-lg bg-card border border-border text-white placeholder-muted-foreground focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">Subject</label>
              <input
                type="text"
                placeholder="How can we help?"
                className="w-full px-4 py-2 rounded-lg bg-card border border-border text-white placeholder-muted-foreground focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">Message</label>
              <textarea
                placeholder="Your message..."
                rows={5}
                className="w-full px-4 py-2 rounded-lg bg-card border border-border text-white placeholder-muted-foreground focus:outline-none focus:border-primary resize-none"
              />
            </div>

            <button className="button-primary w-full">Send Message</button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  )
}

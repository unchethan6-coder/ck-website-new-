'use client'

import { motion } from 'framer-motion'
import { Clock, MapPin, MessageCircle, Sparkles } from 'lucide-react'
import { Container } from '@/components/shared/Container'

const CONTACT_CARDS = [
  {
    icon: MessageCircle,
    title: 'Discord Support',
    description:
      'Join our Discord community for instant support and connect with fellow traders.',
    action: { label: 'Join Discord →', href: 'https://discord.gg/ckcapital' },
  },
  {
    icon: MapPin,
    title: 'Office Address',
    description: (
      <>
        6-7 Waterside Station Road
        <br />
        Harpenden, AL5 4US
        <br />
        United Kingdom
      </>
    ),
  },
  {
    icon: Clock,
    title: 'Support Hours',
    description: (
      <>
        Monday - Friday
        <br />
        8am - 8pm GMT
        <br />
        <span className="font-semibold text-primary">24/7 Community Support</span>
      </>
    ),
  },
]

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background" data-od-id="contact-page">

      {/* ─────────────── Hero ─────────────── */}
      <section className="relative bg-background" data-od-id="contact-hero">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 70% 0%, rgba(212,175,55,0.20), transparent 45%), radial-gradient(circle at 5% 100%, rgba(212,175,55,0.08), transparent 40%)',
          }}
        />
        <Container className="relative py-16 md:py-24">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-[10.5px] font-bold uppercase tracking-[0.16em] text-primary">
                <Sparkles size={11} className="text-primary" />
                Contact Us
                <span className="text-primary/40">·</span>
                24/7 Support
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-5 font-[family-name:var(--font-inter-tight)] text-4xl font-extrabold leading-[1.05] tracking-[-0.02em] text-foreground md:text-5xl lg:text-[52px]"
              data-od-id="contact-hero-title"
            >
              Get In <span className="shimmer-text">Touch</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-5 max-w-xl text-[15px] leading-relaxed text-foreground/55"
            >
              Have questions? Our support team is here to help. Reach out anytime.
            </motion.p>
          </div>
        </Container>
      </section>

      {/* ─────────────── Contact cards ─────────────── */}
      <section className="bg-background py-4 md:py-6" data-od-id="contact-cards">
        <Container>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {CONTACT_CARDS.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.55, delay: i * 0.08 }}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  className="group flex flex-col rounded-2xl border border-foreground/10 bg-foreground/[0.03] p-6 transition-all duration-300 hover:border-primary/30 hover:bg-foreground/[0.05]"
                  data-od-id={`contact-card-${i + 1}`}
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-primary/25 bg-primary/10 transition-colors group-hover:bg-primary/15">
                    <Icon size={20} className="text-primary" />
                  </div>
                  <h3 className="font-[family-name:var(--font-inter-tight)] text-base font-bold text-foreground">
                    {card.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground/55">
                    {card.description}
                  </p>
                  {'action' in card && card.action && (
                    <a
                      href={card.action.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center text-[13px] font-semibold text-[#F7D774] transition-colors hover:text-[#D4AF37]"
                    >
                      {card.action.label}
                    </a>
                  )}
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>
    </div>
  )
}

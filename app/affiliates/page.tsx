'use client'

import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import Link from 'next/link'

const FAQS = [
  { q: 'What is the CK Capital Affiliate Program?', a: 'The affiliate program allows approved creators and traders to earn commissions by referring customers to CK Capital.' },
  { q: 'How do I become an affiliate?', a: 'Apply through the affiliate application process. Each application is reviewed individually.' },
  { q: 'What commission do affiliates earn?', a: 'Approved affiliates can earn up to 25% commission on qualified referrals, subject to their affiliate tier, performance and program terms.' },
  { q: 'When are affiliate payouts processed?', a: 'Affiliate payouts are processed according to our payout schedule. A minimum payout of $250 is required before a payout can be requested or processed.' },
  { q: 'What type of content is not permitted?', a: 'Affiliates must not publish, promote, or distribute any content that is misleading, deceptive, false, offensive, defamatory, unlawful or likely to damage the reputation, brand or interests of the company.' },
  { q: 'Can my affiliate account be reviewed or terminated?', a: 'Yes. All affiliate accounts are subject to ongoing review. CK Capital reserves the right to suspend or terminate any affiliate account or partnership at its sole discretion if it violates program rules, engages in prohibited activity or is no longer aligned with the company objectives.' },
  { q: 'How can I update my affiliate information?', a: 'If you need to update your affiliate information, please contact our support team and provide the required details for verification. Once your identity has been confirmed, our team will review and process the requested changes as soon as possible.' },
  { q: 'What happens if I become inactive?', a: 'Inactive affiliate accounts may be reviewed, suspended or removed from the program.' },
  { q: 'Can CK Capital change the affiliate program terms?', a: 'Yes. CK Capital reserves the right to update affiliate commissions, requirements, benefits and program terms at any time.' },
]

const HIGHLIGHTS = [
  { value: 'Up to 25%', label: 'Commission on qualified referrals' },
  { value: '$250', label: 'Minimum payout threshold' },
  { value: 'Reviewed', label: 'Every application individually' },
]

export default function AffiliatesPage() {
  return (
    <div className='min-h-screen bg-background'>
      <Navbar />

      {/* Hero */}
      <section className='bg-white py-20 md:py-28'>
        <div className='mx-auto max-w-4xl px-4 text-center md:px-6'>
          <p className='mb-3 text-xs font-semibold tracking-[0.25em] text-[#B59410]'>AFFILIATE PROGRAM</p>
          <h1 className='hero-title mb-6 text-black text-balance'>Earn With <span className='gradient-text'>CK Capital</span></h1>
          <p className='mx-auto mb-10 max-w-2xl text-lg text-black/70'>
            Approved creators and traders can earn commissions by referring customers to CK Capital — up to 25% on qualified referrals.
          </p>
          <div className='flex flex-col justify-center gap-4 sm:flex-row'>
            <Link href='/contact' className='button-primary'>Become an Affiliate</Link>
            <a href='https://intercom.help/ck-capital/en/collections/19661119-affiliates' target='_blank' rel='noopener noreferrer' className='button-secondary-dark'>Read Full Terms</a>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className='bg-white py-10 md:py-12'>
        <div className='mx-auto grid max-w-5xl grid-cols-1 gap-6 px-4 sm:grid-cols-3 md:px-6'>
          {HIGHLIGHTS.map((h) => (
            <div key={h.label} className='rounded-2xl border border-black/10 bg-white p-6 text-center shadow-sm'>
              <p className='mb-1 text-3xl md:text-4xl font-bold gradient-text'>{h.value}</p>
              <p className='text-sm text-black/60'>{h.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Terms & FAQs */}
      <section className='bg-white py-12 md:py-16'>
        <div className='mx-auto max-w-4xl px-4 md:px-6'>
          <h2 className='section-title mb-3 text-center text-black'>Program <span className='gradient-text'>Terms & FAQs</span></h2>
          <p className='mb-10 text-center text-black/60'>Everything you need to know about the CK Capital Affiliate Program.</p>
          <div className='space-y-3'>
            {FAQS.map((f, i) => (
              <details key={i} className='group rounded-xl border border-black/10 bg-white p-5 shadow-sm'>
                <summary className='flex cursor-pointer list-none items-center justify-between font-semibold text-black'>
                  <span>{f.q}</span>
                  <span className='ml-4 text-xl leading-none text-[#B59410] transition-transform group-open:rotate-45'>+</span>
                </summary>
                <p className='mt-3 leading-relaxed text-black/70'>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className='bg-white pb-20 pt-4'>
        <div className='mx-auto max-w-3xl px-4 text-center md:px-6'>
          <h2 className='mb-3 text-2xl md:text-3xl font-bold text-black'>Ready to partner with CK Capital?</h2>
          <p className='mb-8 text-black/60'>Apply to the affiliate program and start earning on every qualified referral.</p>
          <Link href='/contact' className='button-primary'>Apply Now</Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}

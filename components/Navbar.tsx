'use client'

import { useState } from 'react'
import Link from 'next/link'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { Menu, X } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 -mb-[92px] bg-transparent px-4 pt-3 md:px-6 md:pt-4">
      <style jsx global>{`
        body > div > section:first-of-type {
          background: #f4f7fa !important;
        }

        body > div > section:first-of-type::after {
          content: '';
          position: absolute;
          inset: 0;
          z-index: 2;
          pointer-events: none;
          background: linear-gradient(90deg, rgba(244,247,250,0.94) 0%, rgba(244,247,250,0.80) 44%, rgba(244,247,250,0.18) 100%), radial-gradient(circle at 24% 20%, rgba(212,175,55,0.22), transparent 32%);
        }

        body > div > section:first-of-type h1 {
          color: #101820 !important;
          letter-spacing: -0.055em !important;
        }

        body > div > section:first-of-type p {
          color: rgba(16,24,32,0.72) !important;
        }

        body > div > section:first-of-type .mx-auto.mb-5 {
          border-color: rgba(212,175,55,0.28) !important;
          background: rgba(255,255,255,0.68) !important;
          color: rgba(16,24,32,0.78) !important;
        }

        body > div > section:first-of-type .button-primary {
          animation: ckHeroPulse 2.8s ease-in-out infinite;
        }

        body > div > section:first-of-type .button-secondary-dark {
          border-color: rgba(15,23,42,0.35) !important;
          background: rgba(255,255,255,0.68) !important;
          color: #101820 !important;
        }

        body > div > section:first-of-type .grid.max-w-3xl > * {
          border-radius: 22px;
          border: 1px solid rgba(212,175,55,0.18);
          background: rgba(255,255,255,0.76);
          padding: 16px;
          backdrop-filter: blur(16px);
        }

        body > div > section:first-of-type .grid.max-w-3xl div {
          color: rgba(16,24,32,0.72) !important;
        }

        @keyframes ckHeroPulse {
          0%, 100% { transform: translateY(0); box-shadow: 0 16px 44px rgba(212,175,55,0.28); }
          50% { transform: translateY(-2px); box-shadow: 0 24px 58px rgba(212,175,55,0.42); }
        }

        @media (max-width: 767px) {
          body > div > section:first-of-type::after {
            background: linear-gradient(180deg, rgba(244,247,250,0.88), rgba(244,247,250,0.42), rgba(244,247,250,0.82));
          }
        }
      `}</style>
      <div className="max-w-7xl mx-auto bg-background/95 backdrop-blur-md rounded-2xl shadow-sm border border-border px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center" aria-label="CK Capital home">
          <span className="font-bold leading-10 text-foreground text-xl md:text-[33px]">CK CAPITAL</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <DropdownMenu>
            <DropdownMenuTrigger className="text-foreground hover:text-primary transition-colors text-sm">
              Products
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-card border-border">
              <DropdownMenuItem className="text-foreground hover:text-primary cursor-pointer">
                <Link href="/evaluation?type=1-step">1-Step Challenge</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-foreground hover:text-primary cursor-pointer">
                <Link href="/evaluation?type=2-step">2-Step Challenge</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-foreground hover:text-primary cursor-pointer">
                <Link href="/instant">Instant Funding</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="/rewards" className="text-foreground hover:text-primary transition-colors text-sm">Rewards</Link>
          <Link href="/trading-objectives" className="text-foreground hover:text-primary transition-colors text-sm">Trading Objectives</Link>
          <Link href="/prime" className="text-foreground hover:text-primary transition-colors text-sm">Prime</Link>

          <DropdownMenu>
            <DropdownMenuTrigger className="text-foreground hover:text-primary transition-colors text-sm">
              Trading
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-card border-border">
              <DropdownMenuItem className="text-foreground hover:text-primary cursor-pointer"><Link href="/about-us">About Us</Link></DropdownMenuItem>
              <DropdownMenuItem className="text-foreground hover:text-primary cursor-pointer"><Link href="/hall-of-fame">Hall of Fame</Link></DropdownMenuItem>
              <DropdownMenuItem className="text-foreground hover:text-primary cursor-pointer"><Link href="/events">Events</Link></DropdownMenuItem>
              <DropdownMenuItem className="text-foreground hover:text-primary cursor-pointer"><Link href="/contact">Contact</Link></DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="/faq" className="text-foreground hover:text-primary transition-colors text-sm">FAQs</Link>
          <Link href="/affiliates" className="text-foreground hover:text-primary transition-colors text-sm">Affiliates</Link>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <LanguageSwitcher />
          <Link href="https://app.ckcapital.co.uk/signin" target="_blank" rel="noopener noreferrer" className="px-6 py-2 rounded-lg border-2 border-primary text-primary text-sm font-semibold hover:bg-primary/5 transition-colors">Sign In</Link>
          <Link href="https://app.ckcapital.co.uk/signup" target="_blank" rel="noopener noreferrer" className="px-6 py-2 rounded-lg bg-primary text-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">Start Challenge</Link>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md rounded-2xl shadow-sm border border-border mx-4 mt-2 px-6 py-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-semibold text-foreground">Products</p>
              <div className="space-y-2 pl-4">
                <Link href="/evaluation?type=1-step" className="block text-sm text-foreground hover:text-primary">1-Step Challenge</Link>
                <Link href="/evaluation?type=2-step" className="block text-sm text-foreground hover:text-primary">2-Step Challenge</Link>
                <Link href="/instant" className="block text-sm text-foreground hover:text-primary">Instant Funding</Link>
              </div>
            </div>
            <Link href="/rewards" className="block text-foreground hover:text-primary text-sm">Rewards</Link>
            <Link href="/trading-objectives" className="block text-foreground hover:text-primary text-sm">Trading Objectives</Link>
            <Link href="/prime" className="block text-foreground hover:text-primary text-sm">Prime</Link>
            <Link href="/faq" className="block text-foreground hover:text-primary text-sm">FAQs</Link>
            <Link href="/affiliates" className="block text-foreground hover:text-primary text-sm">Affiliates</Link>
            <div className="flex gap-2 pt-4">
              <Link href="https://app.ckcapital.co.uk/signin" target="_blank" rel="noopener noreferrer" className="flex-1 px-4 py-2 rounded-lg border-2 border-primary text-primary text-sm font-medium hover:bg-primary hover:text-foreground transition-colors text-center">Sign In</Link>
              <Link href="https://app.ckcapital.co.uk/signup" target="_blank" rel="noopener noreferrer" className="flex-1 px-4 py-2 rounded-lg bg-primary text-foreground text-sm font-medium hover:bg-primary/90 transition-colors text-center">Start Challenge</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

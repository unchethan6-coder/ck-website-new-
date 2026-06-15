'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="sticky top-4 z-50 px-4 md:px-6">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg border border-black/5 px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center" aria-label="CK Capital home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://i.postimg.cc/0jJGVKTC/CK-CAPITAL-Logo.png" alt="CK Capital" className="h-8 md:h-9 w-auto" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {/* Products */}
          <DropdownMenu>
            <DropdownMenuTrigger className="text-black hover:text-primary transition-colors text-sm">
              Products
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white border-black/10">
              <DropdownMenuItem className="text-black hover:text-primary cursor-pointer">
                <Link href="/evaluation?type=1-step">1-Step Challenge</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-black hover:text-primary cursor-pointer">
                <Link href="/evaluation?type=2-step">2-Step Challenge</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-black hover:text-primary cursor-pointer">
                <Link href="/instant">Instant Funding</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>


          {/* Rewards */}
          <Link href="/rewards" className="text-black hover:text-primary transition-colors text-sm">
            Rewards
          </Link>

          {/* Trading Objectives */}
          <Link href="/trading-objectives" className="text-black hover:text-primary transition-colors text-sm">
            Trading Objectives
          </Link>

          {/* Prime */}
          <Link href="/prime" className="text-black hover:text-primary transition-colors text-sm">
            Prime
          </Link>

          {/* Trading */}
          <DropdownMenu>
            <DropdownMenuTrigger className="text-black hover:text-primary transition-colors text-sm">
              Trading
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white border-black/10">
              <DropdownMenuItem className="text-black hover:text-primary cursor-pointer">
                <Link href="/about-us">About Us</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-black hover:text-primary cursor-pointer">
                <Link href="/hall-of-fame">Hall of Fame</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-black hover:text-primary cursor-pointer">
                <Link href="/events">Events</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-black hover:text-primary cursor-pointer">
                <Link href="/contact">Contact</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* FAQs */}
          <Link href="/faq" className="text-black hover:text-primary transition-colors text-sm">
            FAQs
          </Link>

          {/* Affiliates */}
          <Link href="/affiliates" className="text-black hover:text-primary transition-colors text-sm">
            Affiliates
          </Link>
        </div>

        {/* Right Side Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="https://app.ckcapital.co.uk/signin"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 rounded-lg border-2 border-black text-black text-sm font-semibold hover:bg-black/5 transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="https://app.ckcapital.co.uk/signup"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 rounded-lg bg-black text-white text-sm font-semibold hover:bg-black/90 transition-colors"
          >
            Start Challenge
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-black"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white rounded-2xl shadow-lg border border-black/5 mx-4 mt-2 px-6 py-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-semibold text-black">Products</p>
              <div className="space-y-2 pl-4">
                <Link href="/evaluation?type=1-step" className="block text-sm text-black hover:text-primary">
                  1-Step Challenge
                </Link>
                <Link href="/evaluation?type=2-step" className="block text-sm text-black hover:text-primary">
                  2-Step Challenge
                </Link>
                <Link href="/instant" className="block text-sm text-black hover:text-primary">
                  Instant Funding
                </Link>
              </div>
            </div>
            <Link href="/rewards" className="block text-black hover:text-primary text-sm">Rewards</Link>
            <Link href="/trading-objectives" className="block text-black hover:text-primary text-sm">Trading Objectives</Link>
            <Link href="/prime" className="block text-black hover:text-primary text-sm">Prime</Link>
            <Link href="/faq" className="block text-black hover:text-primary text-sm">FAQs</Link>
            <Link href="/affiliates" className="block text-black hover:text-primary text-sm">Affiliates</Link>
            <div className="flex gap-2 pt-4">
              <Link
                href="https://app.ckcapital.co.uk/signin"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-4 py-2 rounded-lg border-2 border-black text-black text-sm font-medium hover:bg-black hover:text-white transition-colors text-center"
              >
                Sign In
              </Link>
              <Link
                href="https://app.ckcapital.co.uk/signup"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-4 py-2 rounded-lg bg-black text-white text-sm font-medium hover:bg-black/90 transition-colors text-center"
              >
                Start Challenge
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

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
    <nav className="navbar-blur sticky top-0 z-50 bg-gradient-to-r from-black via-black/95 to-black/90 border-b-4 border-[#f4c430] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-bold text-xl text-white tracking-wider">
          CK <span className="text-[#f4c430]">CAPITAL</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {/* Products */}
          <DropdownMenu>
            <DropdownMenuTrigger className="text-white hover:text-[#f4c430] transition-colors text-sm font-medium">
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
          <Link href="/rewards" className="text-white hover:text-[#f4c430] transition-colors text-sm font-medium">
            Rewards
          </Link>

          {/* Trading Objectives */}
          <Link href="/trading-objectives" className="text-white hover:text-[#f4c430] transition-colors text-sm font-medium">
            Trading Objectives
          </Link>

          {/* Prime */}
          <Link href="/prime" className="text-white hover:text-[#f4c430] transition-colors text-sm font-medium">
            Prime
          </Link>

          {/* Trading */}
          <DropdownMenu>
            <DropdownMenuTrigger className="text-white hover:text-[#f4c430] transition-colors text-sm font-medium">
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
          <Link href="/faq" className="text-white hover:text-[#f4c430] transition-colors text-sm font-medium">
            FAQs
          </Link>
        </div>

        {/* Right Side Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="https://app.ckcapital.co.uk/signin"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 rounded-full border-2 border-[#f4c430] text-[#f4c430] text-sm font-bold hover:bg-[#f4c430] hover:text-black transition-colors duration-200"
          >
            Sign In
          </Link>
          <Link
            href="https://app.ckcapital.co.uk/signup"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 rounded-full bg-[#f4c430] text-black text-sm font-bold hover:bg-[#e6b820] transition-colors duration-200 shadow-lg"
          >
            Buy Challenge
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-[#f4c430]"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-black/95 border-t-2 border-[#f4c430] px-4 py-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-semibold text-[#f4c430]">Products</p>
              <div className="space-y-2 pl-4">
                <Link href="/evaluation?type=1-step" className="block text-sm text-white hover:text-[#f4c430]">
                  1-Step Challenge
                </Link>
                <Link href="/evaluation?type=2-step" className="block text-sm text-white hover:text-[#f4c430]">
                  2-Step Challenge
                </Link>
                <Link href="/instant" className="block text-sm text-white hover:text-[#f4c430]">
                  Instant Funding
                </Link>
              </div>
            </div>
            <Link href="/rewards" className="block text-white hover:text-[#f4c430] text-sm font-medium">Rewards</Link>
            <Link href="/trading-objectives" className="block text-white hover:text-[#f4c430] text-sm font-medium">Trading Objectives</Link>
            <Link href="/prime" className="block text-white hover:text-[#f4c430] text-sm font-medium">Prime</Link>
            <Link href="/faq" className="block text-white hover:text-[#f4c430] text-sm font-medium">FAQs</Link>
            <div className="flex gap-2 pt-4">
              <Link
                href="https://app.ckcapital.co.uk/signin"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-4 py-2 rounded-full border-2 border-[#f4c430] text-[#f4c430] text-sm font-bold hover:bg-[#f4c430] hover:text-black transition-colors text-center"
              >
                Sign In
              </Link>
              <Link
                href="https://app.ckcapital.co.uk/signup"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-4 py-2 rounded-full bg-[#f4c430] text-black text-sm font-bold hover:bg-[#e6b820] transition-colors text-center"
              >
                Buy Challenge
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

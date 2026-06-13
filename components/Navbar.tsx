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
    <nav className="navbar-blur sticky top-0 z-50 bg-white border-b border-black/10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-bold text-lg text-black">
          CK CAPITAL
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

<<<<<<< HEAD
          {/* FAQs */}
          <Link href="/faq" className="text-black hover:text-primary transition-colors text-sm">
            FAQs
          </Link>
        </div>

        {/* Right Side Actions */}
        <div className="hidden md:flex items-center gap-3">
=======
          {/* Affiliates */}
          <Link href="/affiliates" className="text-foreground hover:text-white transition-colors">
            Affiliates
          </Link>

          {/* More */}
          <DropdownMenu>
            <DropdownMenuTrigger className="text-foreground hover:text-white transition-colors">
              More
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-card border-border">
              <DropdownMenuItem className="text-foreground hover:text-primary cursor-pointer">
                <Link href="/competition">Competition</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-foreground hover:text-primary cursor-pointer">
                <Link href="/blog">Blog</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-foreground hover:text-primary cursor-pointer">
                <Link href="/calculator">Calculator</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Right Side Actions */}
        <div className="hidden md:flex items-center gap-4">
>>>>>>> origin/main
          <Link
            href="https://app.ckcapital.co.uk/signin"
            target="_blank"
            rel="noopener noreferrer"
<<<<<<< HEAD
            className="px-5 py-2 rounded-lg border-2 border-black text-black text-sm font-medium hover:bg-black hover:text-white transition-colors"
          >
            Sign In
=======
            className="button-secondary"
          >
            Log In
>>>>>>> origin/main
          </Link>
          <Link
            href="https://app.ckcapital.co.uk/signup"
            target="_blank"
            rel="noopener noreferrer"
<<<<<<< HEAD
            className="px-5 py-2 rounded-lg bg-black text-white text-sm font-medium hover:bg-black/90 transition-colors"
          >
            Buy Challenge
=======
            className="button-primary"
          >
            Sign Up
>>>>>>> origin/main
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
<<<<<<< HEAD
          className="md:hidden text-black"
=======
          className="md:hidden text-white"
>>>>>>> origin/main
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
<<<<<<< HEAD
        <div className="md:hidden bg-white border-t border-black/10 px-4 py-4">
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
=======
        <div className="md:hidden bg-[#0A0A0A]/95 backdrop-blur-md border-t border-border px-4 py-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-semibold text-primary">Evaluations</p>
              <div className="space-y-2 pl-4">
                <Link href="/evaluation?type=1-step" className="block text-sm text-foreground hover:text-white">
                  1-Step Challenge
                </Link>
                <Link href="/evaluation?type=2-step" className="block text-sm text-foreground hover:text-white">
                  2-Step Challenge
                </Link>
                <Link href="/instant" className="block text-sm text-foreground hover:text-white">
>>>>>>> origin/main
                  Instant Funding
                </Link>
              </div>
            </div>
<<<<<<< HEAD
            <Link href="/rewards" className="block text-black hover:text-primary text-sm">Rewards</Link>
            <Link href="/trading-objectives" className="block text-black hover:text-primary text-sm">Trading Objectives</Link>
            <Link href="/prime" className="block text-black hover:text-primary text-sm">Prime</Link>
            <Link href="/faq" className="block text-black hover:text-primary text-sm">FAQs</Link>
=======
            <Link href="/faq" className="block text-foreground hover:text-white">FAQ</Link>
            <Link href="/about-us" className="block text-foreground hover:text-white">About Us</Link>
            <Link href="/affiliates" className="block text-foreground hover:text-white">Affiliates</Link>
            <div className="space-y-2">
              <p className="text-sm font-semibold text-primary">More</p>
              <div className="space-y-2 pl-4">
                <Link href="/competition" className="block text-sm text-foreground hover:text-white">
                  Competition
                </Link>
                <Link href="/blog" className="block text-sm text-foreground hover:text-white">
                  Blog
                </Link>
                <Link href="/calculator" className="block text-sm text-foreground hover:text-white">
                  Calculator
                </Link>
              </div>
            </div>
>>>>>>> origin/main
            <div className="flex gap-2 pt-4">
              <Link
                href="https://app.ckcapital.co.uk/signin"
                target="_blank"
                rel="noopener noreferrer"
<<<<<<< HEAD
                className="flex-1 px-4 py-2 rounded-lg border-2 border-black text-black text-sm font-medium hover:bg-black hover:text-white transition-colors text-center"
              >
                Sign In
=======
                className="button-secondary flex-1 text-center"
              >
                Log In
>>>>>>> origin/main
              </Link>
              <Link
                href="https://app.ckcapital.co.uk/signup"
                target="_blank"
                rel="noopener noreferrer"
<<<<<<< HEAD
                className="flex-1 px-4 py-2 rounded-lg bg-black text-white text-sm font-medium hover:bg-black/90 transition-colors text-center"
              >
                Buy Challenge
=======
                className="button-primary flex-1 text-center"
              >
                Sign Up
>>>>>>> origin/main
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

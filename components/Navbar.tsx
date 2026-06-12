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
    <nav className="navbar-blur sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-bold text-xl text-white">
          CK CAPITAL
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {/* Evaluations */}
          <DropdownMenu>
            <DropdownMenuTrigger className="text-foreground hover:text-white transition-colors">
              Evaluations
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

          {/* FAQ */}
          <Link href="/faq" className="text-foreground hover:text-white transition-colors">
            FAQ
          </Link>

          {/* About */}
          <DropdownMenu>
            <DropdownMenuTrigger className="text-foreground hover:text-white transition-colors">
              About
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-card border-border">
              <DropdownMenuItem className="text-foreground hover:text-primary cursor-pointer">
                <Link href="/about-us">About Us</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-foreground hover:text-primary cursor-pointer">
                <Link href="/hall-of-fame">Hall of Fame</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-foreground hover:text-primary cursor-pointer">
                <Link href="/events">Events</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-foreground hover:text-primary cursor-pointer">
                <Link href="/contact">Contact</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

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
          <Link
            href="https://app.ckcapital.co.uk/signin"
            target="_blank"
            rel="noopener noreferrer"
            className="button-secondary"
          >
            Log In
          </Link>
          <Link
            href="https://app.ckcapital.co.uk/signup"
            target="_blank"
            rel="noopener noreferrer"
            className="button-primary"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-card/50 backdrop-blur border-t border-border px-4 py-4">
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
                  Instant Funding
                </Link>
              </div>
            </div>
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
            <div className="flex gap-2 pt-4">
              <Link
                href="https://app.ckcapital.co.uk/signin"
                target="_blank"
                rel="noopener noreferrer"
                className="button-secondary flex-1 text-center"
              >
                Log In
              </Link>
              <Link
                href="https://app.ckcapital.co.uk/signup"
                target="_blank"
                rel="noopener noreferrer"
                className="button-primary flex-1 text-center"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

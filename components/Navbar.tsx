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
      <div className="max-w-7xl mx-auto bg-[#0E0B06]/90 backdrop-blur-md rounded-2xl shadow-sm border border-[#D4AF37]/25 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center" aria-label="CK Capital home">
          <span className="font-bold leading-10 text-white text-xl md:text-[33px]">CK CAPITAL</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <DropdownMenu>
            <DropdownMenuTrigger className="text-white hover:text-primary transition-colors text-sm">
              Products
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[#13100A] border-[#D4AF37]/25">
              <DropdownMenuItem className="text-white hover:text-primary cursor-pointer">
                <Link href="/evaluation?type=1-step">1-Step Challenge</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-white hover:text-primary cursor-pointer">
                <Link href="/evaluation?type=2-step">2-Step Challenge</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-white hover:text-primary cursor-pointer">
                <Link href="/instant">Instant Funding</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="/rewards" className="text-white hover:text-primary transition-colors text-sm">Rewards</Link>

          <DropdownMenu>
            <DropdownMenuTrigger className="text-white hover:text-primary transition-colors text-sm">
              Trading
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[#13100A] border-[#D4AF37]/25">
              <DropdownMenuItem className="text-white hover:text-primary cursor-pointer"><Link href="/about-us">About Us</Link></DropdownMenuItem>
              <DropdownMenuItem className="text-white hover:text-primary cursor-pointer"><Link href="/contact">Contact</Link></DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="/faq" className="text-white hover:text-primary transition-colors text-sm">FAQs</Link>
          <Link href="/affiliates" className="text-white hover:text-primary transition-colors text-sm">Affiliates</Link>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <LanguageSwitcher />
          <Link href="https://app.ckcapital.co.uk/signin" target="_blank" rel="noopener noreferrer" className="px-6 py-2 rounded-lg border-2 border-primary text-primary text-sm font-semibold hover:bg-primary/5 transition-colors">Sign In</Link>
          <Link href="https://app.ckcapital.co.uk/signup" target="_blank" rel="noopener noreferrer" className="px-6 py-2 rounded-lg bg-primary text-black text-sm font-semibold hover:bg-primary/90 transition-colors">Start Challenge</Link>
        </div>

        <button className="md:hidden text-white" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-[#0E0B06]/90 backdrop-blur-md rounded-2xl shadow-sm border border-[#D4AF37]/25 mx-4 mt-2 px-6 py-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-semibold text-white">Products</p>
              <div className="space-y-2 pl-4">
                <Link href="/evaluation?type=1-step" className="block text-sm text-white hover:text-primary">1-Step Challenge</Link>
                <Link href="/evaluation?type=2-step" className="block text-sm text-white hover:text-primary">2-Step Challenge</Link>
                <Link href="/instant" className="block text-sm text-white hover:text-primary">Instant Funding</Link>
              </div>
            </div>
            <Link href="/rewards" className="block text-white hover:text-primary text-sm">Rewards</Link>
            <Link href="/faq" className="block text-white hover:text-primary text-sm">FAQs</Link>
            <Link href="/affiliates" className="block text-white hover:text-primary text-sm">Affiliates</Link>
            <div className="flex gap-2 pt-4">
              <Link href="https://app.ckcapital.co.uk/signin" target="_blank" rel="noopener noreferrer" className="flex-1 px-4 py-2 rounded-lg border-2 border-primary text-primary text-sm font-medium hover:bg-primary hover:text-white transition-colors text-center">Sign In</Link>
              <Link href="https://app.ckcapital.co.uk/signup" target="_blank" rel="noopener noreferrer" className="flex-1 px-4 py-2 rounded-lg bg-primary text-black text-sm font-medium hover:bg-primary/90 transition-colors text-center">Start Challenge</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

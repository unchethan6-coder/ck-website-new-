'use client'

import { X } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface ModalHeaderProps {
  onClose?: () => void
  showClose?: boolean
  title?: string
}

export function ModalHeader({ onClose, showClose = true, title }: ModalHeaderProps) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-border shadow-md">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
        {/* Desktop Header */}
        <div className="hidden md:flex items-center justify-between">
          {/* Logo and Nav */}
          <div className="flex items-center gap-8">
            <Link href="/" className="font-bold text-lg text-[#15161a]">
              CK CAPITAL
            </Link>
            <nav className="flex items-center gap-6">
              <Link href="/" className="text-sm text-[#15161a] hover:text-[#f4c430] transition-colors">
                Products
              </Link>
              <Link href="/rewards" className="text-sm text-[#15161a] hover:text-[#f4c430] transition-colors">
                Rewards
              </Link>
              <Link href="/evaluation" className="text-sm text-[#15161a] hover:text-[#f4c430] transition-colors">
                Challenges
              </Link>
              <Link href="/instant" className="text-sm text-[#15161a] hover:text-[#f4c430] transition-colors">
                Instant
              </Link>
              <Link href="/contact" className="text-sm text-[#15161a] hover:text-[#f4c430] transition-colors">
                Support
              </Link>
            </nav>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <Button variant="outline" className="border-[#15161a] text-[#15161a] hover:bg-muted">
              Sign In
            </Button>
            <Button className="bg-[#15161a] text-foreground hover:bg-[#0a0a0c]">
              Join Now
            </Button>
            {showClose && (
              <button
                onClick={onClose}
                className="ml-2 p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <X size={20} className="text-[#15161a]" />
              </button>
            )}
          </div>
        </div>

        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between">
          <Link href="/" className="font-bold text-base text-[#15161a]">
            CK CAPITAL
          </Link>
          <div className="flex items-center gap-2">
            <Button size="sm" className="bg-[#f4c430] text-[#15161a] hover:bg-[#d4a020]">
              Join
            </Button>
            {showClose && (
              <button
                onClick={onClose}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <X size={18} className="text-[#15161a]" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

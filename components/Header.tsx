import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background shadow-sm will-change-transform">
      <nav className="container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 md:py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center group flex-shrink-0">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/CKLogo-1-SPTL8PH49B9R53gI3T5G6yqP5RluMr.png"
            alt="CK Capital"
            width={120}
            height={24}
            className="h-5 sm:h-6 w-auto"
            priority
            loading="eager"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 lg:gap-8 lg:flex mx-auto">
          <Link href="#evaluations" className="text-sm font-medium text-[#4B5563] hover:text-[#1a1a1a] transition-colors duration-150">
            Evaluations
          </Link>
          <Link href="#rewards" className="text-sm font-medium text-[#4B5563] hover:text-[#1a1a1a] transition-colors duration-150">
            Rewards
          </Link>
          <Link href="#how-it-works" className="text-sm font-medium text-[#4B5563] hover:text-[#1a1a1a] transition-colors duration-150">
            How It Works
          </Link>
          <Link href="#prime" className="text-sm font-medium text-[#4B5563] hover:text-[#1a1a1a] transition-colors duration-150">
            Prime
          </Link>
          <Link href="#trading" className="text-sm font-medium text-[#4B5563] hover:text-[#1a1a1a] transition-colors duration-150">
            Trading
          </Link>
          <Link href="#faq" className="text-sm font-medium text-[#4B5563] hover:text-[#1a1a1a] transition-colors duration-150">
            FAQs
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center gap-3">
          <button className="p-2 text-[#4B5563] hover:text-[#1a1a1a]">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Buttons */}
        <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
          <Button 
            variant="outline" 
            className="text-sm font-medium text-[#1a1a1a] border border-[#D9DFE7] hover:bg-[#F5F7FA] px-4 py-2 h-10 transition-colors"
            asChild
          >
            <a href="https://app.ckcapital.co.uk/signin">Log In</a>
          </Button>
          <Button 
            className="bg-primary hover:bg-primary/90 text-foreground text-sm font-semibold px-4 py-2 h-10 transition-colors rounded"
            asChild
          >
            <a href="https://app.ckcapital.co.uk/signup">Start Challenge</a>
          </Button>
        </div>
      </nav>
    </header>
  );
}

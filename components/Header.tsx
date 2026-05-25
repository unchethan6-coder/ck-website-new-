import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-[#E8E8E8] will-change-transform">
      <nav className="container mx-auto flex items-center justify-between px-3 sm:px-4 py-2.5 md:py-3 md:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center group flex-shrink-0">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/CKLogo-1-SPTL8PH49B9R53gI3T5G6yqP5RluMr.png"
            alt="CK Capital"
            width={60}
            height={20}
            className="h-4 sm:h-5 w-auto"
            priority
            loading="eager"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-4 md:gap-8 lg:gap-10 md:flex">
          <Link href="#features" className="text-xs lg:text-sm font-medium text-[#666666] hover:text-[#1a1a1a] transition-colors duration-150">
            Evaluations
          </Link>
          <Link href="#pricing" className="text-xs lg:text-sm font-medium text-[#666666] hover:text-[#1a1a1a] transition-colors duration-150">
            FAQ
          </Link>
          <Link href="#how-it-works" className="text-xs lg:text-sm font-medium text-[#666666] hover:text-[#1a1a1a] transition-colors duration-150">
            More
          </Link>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 flex-shrink-0">
          <Button 
            variant="outline" 
            className="hidden sm:inline-flex text-xs sm:text-sm text-[#1a1a1a] border-[#E8E8E8] hover:bg-[#F5F5F5] px-3 sm:px-4 py-1.5 h-8 sm:h-10"
            asChild
          >
            <a href="https://app.ckcapital.co.uk/signin">Log In</a>
          </Button>
          <Button 
            className="bg-[#F4D957] hover:bg-[#F0C738] text-[#1a1a1a] text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1.5 h-8 sm:h-10 transition-colors duration-150"
            asChild
          >
            <a href="https://app.ckcapital.co.uk/signup">Sign Up</a>
          </Button>
        </div>
      </nav>
    </header>
  );
}

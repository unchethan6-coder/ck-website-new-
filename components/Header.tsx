import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-[#E8E8E8] shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
      <nav className="container mx-auto flex items-center justify-between px-3 sm:px-4 py-3 md:px-8">
        <Link href="/" className="flex items-center group">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/CKLogo-1-SPTL8PH49B9R53gI3T5G6yqP5RluMr.png"
            alt="CK Capital Logo"
            width={60}
            height={20}
            className="h-4 sm:h-5 w-auto group-hover:opacity-80 transition-opacity"
            priority
          />
        </Link>

        <div className="hidden items-center gap-6 md:gap-10 md:flex">
          <Link href="#features" className="text-xs sm:text-sm font-medium text-[#666666] hover:text-[#1a1a1a] transition-colors duration-200">
            Evaluations
          </Link>
          <Link href="#pricing" className="text-xs sm:text-sm font-medium text-[#666666] hover:text-[#1a1a1a] transition-colors duration-200">
            FAQ
          </Link>
          <Link href="#how-it-works" className="text-xs sm:text-sm font-medium text-[#666666] hover:text-[#1a1a1a] transition-colors duration-200">
            More
          </Link>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Button variant="outline" className="hidden sm:inline-flex text-xs sm:text-sm text-[#1a1a1a] border-[#E8E8E8] hover:bg-[#F5F5F5] hover:border-[#D0D0D0] px-3 sm:px-4 py-2">
            Log In
          </Button>
          <Button className="bg-[#E8C547] hover:bg-[#D4AF37] text-[#1a1a1a] text-xs sm:text-sm font-semibold rounded-lg transition-colors px-3 sm:px-4 py-2">
            Sign Up
          </Button>
        </div>
      </nav>
    </header>
  );
}

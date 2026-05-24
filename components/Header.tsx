import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#E8C547] border-b border-[#D4AF37] shadow-sm">
      <nav className="container mx-auto flex items-center justify-between px-4 py-4 md:px-6">
        <Link href="/" className="flex items-center">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/CKLogo-1-SPTL8PH49B9R53gI3T5G6yqP5RluMr.png"
            alt="CK Capital Logo"
            width={200}
            height={67}
            className="h-[2px] w-auto"
            priority
          />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link href="#features" className="text-sm font-medium text-[#1a1a1a] hover:text-[#333333] transition-colors">
            Evaluations
          </Link>
          <Link href="#pricing" className="text-sm font-medium text-[#1a1a1a] hover:text-[#333333] transition-colors">
            FAQ
          </Link>
          <Link href="#how-it-works" className="text-sm font-medium text-[#1a1a1a] hover:text-[#333333] transition-colors">
            More
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" className="hidden sm:inline-flex text-[#1a1a1a] border-[#1a1a1a] hover:bg-[#F5D76E]">
            Log In
          </Button>
          <Button className="bg-white hover:bg-[#F9F9F9] text-[#1a1a1a] font-semibold border border-[#1a1a1a]">
            Sign Up
          </Button>
        </div>
      </nav>
    </header>
  );
}

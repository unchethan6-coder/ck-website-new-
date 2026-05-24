import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#F5EBE0] border-b border-[#E8DED5] shadow-sm">
      <nav className="container mx-auto flex items-center justify-between px-4 py-3 md:px-6">
        <Link href="/" className="flex items-center">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-rN5LVNvUVWE1dB37jCqttzLYZxqoRk.png"
            alt="CK Capital Logo"
            width={120}
            height={30}
            className="h-auto w-auto"
            priority
          />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link href="#features" className="text-sm font-medium text-[#1a1a1a] hover:text-[#FFD700] transition-colors">
            Evaluations
          </Link>
          <Link href="#pricing" className="text-sm font-medium text-[#1a1a1a] hover:text-[#FFD700] transition-colors">
            FAQ
          </Link>
          <Link href="#how-it-works" className="text-sm font-medium text-[#1a1a1a] hover:text-[#FFD700] transition-colors">
            More
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" className="hidden sm:inline-flex text-[#1a1a1a] border-[#1a1a1a] hover:bg-[#FFF8E7]">
            Log In
          </Button>
          <Button className="bg-white hover:bg-[#FFF8E7] text-[#1a1a1a] font-semibold border border-[#1a1a1a]">
            Sign Up
          </Button>
        </div>
      </nav>
    </header>
  );
}

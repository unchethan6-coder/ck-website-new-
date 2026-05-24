import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-blue-900 border-b border-blue-800 shadow-md">
      <nav className="container mx-auto flex items-center justify-between px-4 py-3 md:px-6">
        <Link href="/" className="flex items-center">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/CKLogo%20%281%29-JWcpaOMEVX6Hecl5M4TBpcD9OYZN3C.png"
            alt="CK Capital Logo"
            width={100}
            height={32}
            className="h-auto w-auto"
            priority
          />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link href="#features" className="text-sm font-medium text-gray-100 hover:text-yellow-400 transition-colors">
            Features
          </Link>
          <Link href="#pricing" className="text-sm font-medium text-gray-100 hover:text-yellow-400 transition-colors">
            Pricing
          </Link>
          <Link href="#how-it-works" className="text-sm font-medium text-gray-100 hover:text-yellow-400 transition-colors">
            How It Works
          </Link>
          <Link href="#testimonials" className="text-sm font-medium text-gray-100 hover:text-yellow-400 transition-colors">
            Testimonials
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" className="hidden sm:inline-flex text-gray-100 border-gray-300 hover:bg-blue-800">
            Sign In
          </Button>
          <Button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold">
            Get Started
          </Button>
        </div>
      </nav>
    </header>
  );
}

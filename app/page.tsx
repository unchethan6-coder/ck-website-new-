'use client';

import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ScrollingPromos from '@/components/ScrollingPromos';
import ProductsComparison from '@/components/ProductsComparison';
import HowItWorks from '@/components/HowItWorks';
import Testimonials from '@/components/Testimonials';
import CommunitySection from '@/components/CommunitySection';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import DiscountPopup from '@/components/DiscountPopup';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <DiscountPopup />
      <Header />
      <Hero />
      <ScrollingPromos />
      <ProductsComparison />
      <HowItWorks />
      <Testimonials />
      <CommunitySection />
      <FAQ />
      <Footer />
    </div>
  );
}

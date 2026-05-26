'use client';

import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ScrollingPromos from '@/components/ScrollingPromos';
import WhyChooseCK from '@/components/WhyChooseCK';
import ProductsComparison from '@/components/ProductsComparison';
import HowItWorks from '@/components/HowItWorks';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import DiscountPopup from '@/components/DiscountPopup';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#050505]">
      <DiscountPopup />
      <Header />
      <Hero />
      <ScrollingPromos />
      <WhyChooseCK />
      <ProductsComparison />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <Footer />
    </div>
  );
}

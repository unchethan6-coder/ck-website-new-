'use client';

import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ScrollingPromos from '@/components/ScrollingPromos';
import AboutSection from '@/components/AboutSection';
import PricingCalculator from '@/components/PricingCalculator';
import WhyChooseUs from '@/components/WhyChooseUs';
import HowItWorks from '@/components/HowItWorks';
import TradingRules from '@/components/TradingRules';
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
      <AboutSection />
      <PricingCalculator />
      <WhyChooseUs />
      <HowItWorks />
      <TradingRules />
      <Testimonials />
      <CommunitySection />
      <FAQ />
      <Footer />
    </div>
  );
}

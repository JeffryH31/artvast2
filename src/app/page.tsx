import Header from '@/components/layout/Header';
import HeroSection from '@/components/sections/HeroSection';
import ValuePropositionsSection from '@/components/sections/ValuePropositionsSection';
import TopDesignersSection from '@/components/sections/TopDesignersSection';
import BenefitsSection from '@/components/sections/BenefitsSection';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <ValuePropositionsSection />
      <TopDesignersSection />
      <BenefitsSection />
    </main>
  );
}
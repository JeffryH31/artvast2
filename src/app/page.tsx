import Header from '@/components/layout/Header';
import HeroSection from '@/components/sections/HeroSection';
import ValuePropositionsSection from '@/components/sections/ValuePropositionsSection';
import TopDesignersSection from '@/components/sections/TopDesignersSection';
import BenefitsSection from '@/components/sections/BenefitsSection';

export default function Home() {
  return (
    <>
      <Header />
      {/* Kontainer utama dengan satu gradien latar belakang seamless */}
      <main className="hero-gradient relative overflow-hidden seamless-container">
        <HeroSection />
        <ValuePropositionsSection />
      </main>
      {/* Section lain di luar gradien utama */}
      <TopDesignersSection />
      <BenefitsSection />
    </>
  );
}
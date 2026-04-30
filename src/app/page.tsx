import Header from '@/components/layout/Header';
import HeroSection from '@/components/sections/HeroSection';
import PortfolioGallerySection from '@/components/sections/PortfolioGallerySection';
import FeaturedDesignersRow from '@/components/sections/FeaturedDesignersRow';
import HomeCTASection from '@/components/sections/HomeCTASection';
import ValuePropositionsSection from '@/components/sections/ValuePropositionsSection';
import TopDesignersSection from '@/components/sections/TopDesignersSection';
import BenefitsSection from '@/components/sections/BenefitsSection';

export default function Home() {
  return (
    <div className="bg-white dark:bg-gray-950 transition-colors duration-300">
      <Header />
      {/* Hero/Landing Page Section */}
      <main className="hero-gradient relative overflow-hidden seamless-container">
        <HeroSection />
      </main>
      
      {/* Portfolio Gallery - Dribbble-like structure */}
      <PortfolioGallerySection />
      
      {/* Featured Designers Row */}
      <FeaturedDesignersRow />
      
      {/* CTA Section */}
      <HomeCTASection />
      
      <ValuePropositionsSection />
      <TopDesignersSection />
      <BenefitsSection />
    </div>
  );
}
import Navigation from "../components/landing/Navigation";
import HeroSection from "../components/landing/HeroSection";
import FeaturesSection from "../components/landing/FeaturesSection";
import HowItWorksSection from "../components/landing/HowItWorksSection";
import TestimonialsSection from "../components/landing/TestimonialsSection";
import CTASection from "../components/landing/CTASection";
import Footer from "../components/landing/Footer";
import {
  features,
  testimonials,
  howItWorks,
  footerLinks,
} from "../components/landing/data/landingData";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navigation />
      <HeroSection />
      <FeaturesSection features={features} />
      <HowItWorksSection steps={howItWorks} />
      <TestimonialsSection testimonials={testimonials} />
      <CTASection />
      <Footer links={footerLinks} />
    </div>
  );
};

export default LandingPage;

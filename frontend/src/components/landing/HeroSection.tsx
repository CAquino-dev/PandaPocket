import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown } from "lucide-react";
import moneyBackground from "../../assets/landingPage/moneyBackground.jpg";

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={moneyBackground}
          alt="Financial growth background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#347571]/90 to-[#2a5e5a]/90 dark:from-[#1a3a38]/95 dark:to-[#1a3a38]/95 mix-blend-multiply" />
      </div>

      {/* Hero Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <div className="animate-fade-in-up">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Take Control of Your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">
              Financial Future
            </span>
          </h1>

          {/* Subheading */}
          <p className="max-w-3xl mx-auto text-xl text-white/90 mb-12 leading-relaxed">
            Track expenses, create budgets, and achieve your goals with our
            intelligent finance platform.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              to="/register"
              className="group px-8 py-4 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-xl font-semibold text-lg hover:from-green-500 hover:to-emerald-600 transition-all transform hover:scale-105 shadow-2xl flex items-center justify-center"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <ChevronDown className="w-6 h-6 text-white/80 hover:text-white transition-colors animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

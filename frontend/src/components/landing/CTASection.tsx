import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-24 bg-gradient-to-r from-[#347571] to-[#2a5e5a] dark:from-[#1a3a38] dark:to-[#1a3a38]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Ready to Take Control of Your Finances?
        </h2>
        <p className="text-xl text-white/90 mb-10">
          Join thousands of users who've already transformed their financial
          future
        </p>
        <Link
          to="/register"
          className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-xl font-semibold text-lg hover:from-green-500 hover:to-emerald-600 transition-all transform hover:scale-105 shadow-2xl"
        >
          Start Your Free Trial
          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
};

export default CTASection;

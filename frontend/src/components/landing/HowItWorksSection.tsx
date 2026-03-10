import { ArrowRight } from "lucide-react";
import type { HowItWorkStep } from "../../types/landing";

interface HowItWorksSectionProps {
  steps: HowItWorkStep[];
}

const HowItWorksSection = ({ steps }: HowItWorksSectionProps) => {
  return (
    <section id="how-it-works" className="py-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Get Started in Minutes
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Three simple steps to financial clarity
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((item, index) => (
            <div key={index} className="text-center relative">
              <div className="text-6xl font-bold text-[#347571]/20 dark:text-[#5DBB8A]/20 mb-4">
                {item.step}
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {item.description}
              </p>
              {index < steps.length - 1 && (
                <ArrowRight className="hidden md:block absolute top-1/3 -right-6 w-6 h-6 text-gray-400" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;

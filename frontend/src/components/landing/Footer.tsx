import { Wallet } from "lucide-react";
import type { FooterLinks } from "../../types/landing";

interface FooterProps {
  links: FooterLinks;
}

const Footer = ({ links }: FooterProps) => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Wallet className="w-6 h-6 text-[#5DBB8A] mr-2" />
              <span className="text-xl font-bold">FinWise</span>
            </div>
            <p className="text-gray-400 text-sm">
              Making financial management simple, intuitive, and accessible for
              everyone.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              {links.product.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="hover:text-white transition">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              {links.company.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="hover:text-white transition">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              {links.legal.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="hover:text-white transition">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 FinWise. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

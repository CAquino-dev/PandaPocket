import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Wallet, Menu, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { navLinks } from "./data/landingData";

const Navigation = () => {
  const { token } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = (): void => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo - fixed width to maintain balance */}
          <div className="flex items-center w-[180px]">
            <Wallet
              className={`w-8 h-8 mr-2 ${
                scrolled ? "text-[#347571]" : "text-white"
              }`}
            />
            <span
              className={`text-2xl font-bold ${
                scrolled
                  ? "bg-gradient-to-r from-[#347571] to-[#5DBB8A] bg-clip-text text-transparent"
                  : "text-white"
              }`}
            >
              FinWise
            </span>
          </div>

          {/* Desktop Navigation - centered with flex-1 */}
          <div className="hidden md:flex flex-1 items-center justify-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`transition font-medium ${
                  scrolled
                    ? "text-gray-700 dark:text-gray-300 hover:text-[#347571] dark:hover:text-[#5DBB8A]"
                    : "text-white/90 hover:text-white"
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Desktop Auth Buttons - fixed width to maintain balance */}
          <div className="hidden md:flex items-center justify-end space-x-4 w-[180px]">
            {token ? (
              <Link
                to="/dashboard"
                className="px-6 py-2.5 bg-[#347571] text-white rounded-lg hover:bg-[#2a5e5a] transition font-medium shadow-lg hover:shadow-xl"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`px-6 py-2.5 transition font-medium whitespace-nowrap ${
                    scrolled
                      ? "text-gray-700 dark:text-gray-300 hover:text-[#347571] dark:hover:text-[#5DBB8A]"
                      : "text-white/90 hover:text-white"
                  }`}
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="px-6 py-2.5 bg-[#347571] text-white rounded-lg hover:bg-[#2a5e5a] transition font-medium shadow-lg hover:shadow-xl whitespace-nowrap"
                >
                  Sign up free
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition ${
              scrolled
                ? "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                : "text-white hover:bg-white/10"
            }`}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block py-2 text-gray-700 dark:text-gray-300 hover:text-[#347571] font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4 flex flex-col space-y-3">
              {token ? (
                <Link
                  to="/dashboard"
                  className="px-4 py-2 bg-[#347571] text-white rounded-lg text-center font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-center font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Log in
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 bg-[#347571] text-white rounded-lg text-center font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign up free
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;

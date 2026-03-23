import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { navLinks } from "./data/landingData";
import { ThemeToggle } from "../layout/ThemeToggle";
import redPanda from "../../assets/red-panda.png";

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const location = useLocation();
  const isLandingPage = location.pathname === "/";
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  useEffect(() => {
    const handleScroll = (): void => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Determine if we should show the scrolled/white background
  const showScrolledBackground = scrolled || (isLandingPage && scrolled);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        showScrolledBackground
          ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src={redPanda}
              alt="Red Panda"
              className={`w-25 h-25 object-contain`}
            />
            <span
              className={`text-2xl font-bold ${
                showScrolledBackground
                  ? "bg-gradient-to-r from-[#347571] to-[#5DBB8A] bg-clip-text text-transparent"
                  : "text-white"
              }`}
            >
              PandaPocket
            </span>
          </Link>

          {/* Desktop Navigation - only show on landing page */}
          {isLandingPage && (
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
          )}

          {/* Desktop Auth Buttons - always visible */}
          <div className="hidden md:flex items-center justify-end space-x-1 w-45">
            <ThemeToggle />
            <Link
              to="/login"
              className={`px-6 py-2.5 transition font-medium whitespace-nowrap ${
                showScrolledBackground
                  ? "text-gray-700 dark:text-gray-300 hover:text-[#347571] dark:hover:text-[#5DBB8A]"
                  : "text-white hover:text-white/80"
              }`}
            >
              Log in
            </Link>
            <Link
              to="/register"
              className="px-6 py-2.5 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-lg hover:from-green-500 hover:to-emerald-600 transition font-medium shadow-lg hover:shadow-xl whitespace-nowrap"
            >
              Sign up free
            </Link>
          </div>

          {/* Mobile menu button - only show on landing page */}
          {isLandingPage && (
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
          )}
        </div>
      </div>

      {/* Mobile Navigation - only show on landing page */}
      {isLandingPage && mobileMenuOpen && (
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
              <Link
                to="/login"
                className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-center font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-lg text-center font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign up free
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;

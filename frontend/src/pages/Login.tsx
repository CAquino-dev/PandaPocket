import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import moneyBackground from "../assets/landingPage/moneyBackground.jpg";
import Navigation from "../components/landing/Navigation";
import { toast } from "sonner";

const HeroSection = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        },
      );

      const responseData = await response.json();

      if (!response.ok) {
        toast.error(responseData.message || "Login failed");
        setIsSubmitting(false);
        return;
      }

      const { user, token } = responseData.data;
      login(user, token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred during login");
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <Navigation />
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={moneyBackground}
          alt="Financial growth background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#347571]/90 to-[#2a5e5a]/90 dark:from-[#1a3a38]/95 dark:to-[#1a3a38]/95 mix-blend-multiply" />
      </div>

      {/* Hero Content with Login Form */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content - Hidden on mobile, shown on md and up */}
          <div className="hidden md:block text-left animate-fade-in-up">
            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Take Control of Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">
                Financial Future
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-lg">
              Track expenses, create budgets, and achieve your goals with our
              intelligent finance platform.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/register"
                className="group px-8 py-4 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-xl font-semibold text-lg hover:from-green-500 hover:to-emerald-600 transition-all transform hover:scale-105 shadow-2xl flex items-center justify-center"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Side - Login Form - Full width on mobile, half on desktop */}
          <div className="w-full md:max-w-md mx-auto animate-fade-in-up md:animation-delay-200">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
              <div>
                <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
                <p className="mt-2 text-sm text-white/80">
                  Or{" "}
                  <Link
                    to="/register"
                    className="font-medium text-green-400 hover:text-green-300 transition"
                  >
                    create a new account
                  </Link>
                </p>
              </div>

              <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <input
                      type="email"
                      required
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
                    />
                  </div>

                  <div>
                    <input
                      type="password"
                      required
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center space-x-2 text-white/80">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-green-400 focus:ring-green-400 border-white/30 rounded bg-white/10"
                    />
                    <span>Remember me</span>
                  </label>

                  <a
                    href="#"
                    className="text-green-400 hover:text-green-300 font-medium"
                  >
                    Forgot password?
                  </a>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-lg font-medium text-white bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 transition disabled:opacity-50"
                >
                  {isSubmitting ? "Signing in..." : "Sign in"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

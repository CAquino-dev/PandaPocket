import { Link } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import moneyBackground from "../assets/landingPage/moneyBackground.jpg";
import Navigation from "../components/landing/Navigation";
import { toast } from "sonner";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate passwords match first
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return; // Don't set isSubmitting to true at all
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        },
      );

      const responseData = await response.json();

      if (!response.ok) {
        toast.error(responseData.message || "Registration failed");
        setIsSubmitting(false);
        return;
      }

      // Success toast
      toast.success("Account created successfully!");

      // Navigate to login after successful registration
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("An error occurred during registration");
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="register"
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

      {/* Register Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content - Hidden on mobile, shown on md and up */}
          <div className="hidden md:block text-left animate-fade-in-up">
            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Start Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">
                Financial Journey
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-lg">
              Join thousands of users who are already taking control of their
              finances with our intelligent platform.
            </p>

            {/* Features List */}
            <div className="space-y-4">
              <div className="flex items-center text-white/80">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                <span>Smart budget tracking</span>
              </div>
              <div className="flex items-center text-white/80">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                <span>Expense categorization</span>
              </div>
              <div className="flex items-center text-white/80">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                <span>Financial goal setting</span>
              </div>
              <div className="flex items-center text-white/80">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                <span>Real-time insights</span>
              </div>
            </div>
          </div>

          {/* Right Side - Register Form - Full width on mobile, half on desktop */}
          <div className="w-full md:max-w-md mx-auto animate-fade-in-up md:animation-delay-200">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Create Account
                </h2>
                <p className="mt-2 text-sm text-white/80">
                  Or{" "}
                  <Link
                    to="/login"
                    className="font-medium text-green-400 hover:text-green-300 transition"
                  >
                    sign in to existing account
                  </Link>
                </p>
              </div>

              <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-4">
                  {/* Name Field */}
                  <div>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                      <input
                        type="text"
                        required
                        placeholder="Full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={isSubmitting}
                        className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/10 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                      <input
                        type="email"
                        required
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isSubmitting}
                        className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/10 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isSubmitting}
                        className="w-full pl-10 pr-12 py-3 rounded-lg bg-white/10 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition"
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password Field */}
                  <div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        required
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        disabled={isSubmitting}
                        className={`w-full pl-10 pr-12 py-3 rounded-lg bg-white/10 border text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition ${
                          confirmPassword && password !== confirmPassword
                            ? "border-red-400/50"
                            : "border-white/30"
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition"
                        aria-label={
                          showConfirmPassword
                            ? "Hide confirm password"
                            : "Show confirm password"
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    {/* Real-time password match indicator */}
                    {confirmPassword && password !== confirmPassword && (
                      <p className="text-xs text-red-400 mt-1">
                        Passwords do not match
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center text-sm">
                  <label className="flex items-center space-x-2 text-white/80">
                    <input
                      type="checkbox"
                      required
                      className="h-4 w-4 text-green-400 focus:ring-green-400 border-white/30 rounded bg-white/10"
                    />
                    <span>
                      I agree to the{" "}
                      <a
                        href="#"
                        className="text-green-400 hover:text-green-300"
                      >
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a
                        href="#"
                        className="text-green-400 hover:text-green-300"
                      >
                        Privacy Policy
                      </a>
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-lg font-medium text-white bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 transition disabled:opacity-50"
                >
                  {isSubmitting ? "Creating account..." : "Create account"}
                </button>

                {/* Alternative CTA */}
                <p className="text-center text-sm text-white/60">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-medium text-green-400 hover:text-green-300"
                  >
                    Sign in
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;

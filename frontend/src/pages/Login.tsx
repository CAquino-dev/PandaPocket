import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import logoHero from "../assets/login/loginHero.png";

const Login = () => {
  const { login, token } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        alert(responseData.message || "Login failed");
        setIsSubmitting(false);
        return;
      }

      // Extract user and token from the nested data structure
      const { user, token } = responseData.data;
      
      // Pass the extracted values to login
      login(user, token);
      
      // Navigation will happen via the useEffect above when token is set
      
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-poppins">
      {/* Main Container */}
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        
        {/* LEFT SIDE - FORM */}
        <div className="w-full md:w-1/2 flex items-center justify-center bg-[#347571] px-6 py-12">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 md:p-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#2E2A4F]">
                Sign in to your account
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                Or{" "}
                <a href="#" className="font-medium text-[#5DBB8A] hover:text-[#347571]">
                  start your free trial
                </a>
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
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5DBB8A] focus:border-transparent transition text-foreground"
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
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5DBB8A] focus:border-transparent transition text-foreground"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center space-x-2 text-gray-600">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-[#5DBB8A] focus:ring-[#5DBB8A] border-gray-300 rounded"
                  />
                  <span>Remember me</span>
                </label>

                <a href="#" className="text-[#5DBB8A] hover:text-[#347571] font-medium">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-lg font-medium text-white bg-[#5DBB8A] hover:bg-[#4DAA7C] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F2D96B] transition disabled:opacity-50"
              >
                {isSubmitting ? "Signing in..." : "Sign in"}
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT SIDE - IMAGE */}
        <div className="hidden md:flex w-1/2 bg-[#347571] items-center justify-center relative overflow-hidden p-8">
          <img
            src={logoHero}
            alt="Savings illustration"
            className="max-w-md w-3/4"
          />

          {/* Decorative Glow */}
          <div className="absolute w-96 h-96 bg-[#F2D96B] opacity-10 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
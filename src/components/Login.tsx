import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import logoCMS from "../assets/images/logoCMS.jpg";
import login1 from "../assets/images/login1.jpg"

const Login = () => {
  const navigate = useNavigate();
  const [captchaValidated, setCaptchaValidated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    console.log("Google reCAPTCHA Loaded!");
  }, []);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!captchaValidated) {
      alert("Please complete the reCAPTCHA verification!");
      return;
    }

    // Cek autentikasi login (ganti dengan logika autentikasi yang sesungguhnya)
    if (email === "user@example.com" && password === "password123") {
      // Simpan token setelah login sukses
      localStorage.setItem("authToken", "valid-token");
      // Arahkan ke halaman home setelah login sukses
      navigate("/home");
    } else {
      alert("Invalid credentials");
    }
  };

  const onCaptchaChange = (value: string | null) => {
    console.log("Captcha value:", value);
    setCaptchaValidated(true);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f0f8ff]">
      <div className="flex w-full max-w-4xl bg-white shadow-lg rounded-lg">
        {/* Left Side Image */}
        <div className="hidden md:block w-1/2 bg-[#fffbfb] flex justify-center items-center p-3 pt-24">
          <img src={login1} alt="Illustration" className="w-4/9 h-auto" />
        </div>

        {/* Right Side Form */}
        <div className="w-full md:w-1/2 p-12 bg-[#f4f8fb] rounded-r-lg">
          <div className="flex justify-center mb-2">
            <img src={logoCMS} alt="Logo" className="w-28 h-auto" />
          </div>
          <h2 className="text-center text-xl font-semibold text-[#333] mb-8">Please enter your details</h2>
          
          <form onSubmit={handleLogin}>
            {/* Email Field */}
            <div className="mb-4">
              <label className="block text-sm text-[#333] mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Account"
                className="w-full p-3 border border-[#b0c4de] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007bff]"
                required
              />
            </div>

            {/* Password Field */}
            <div className="mb-6">
              <label className="block text-sm text-[#333] mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your Password"
                className="w-full p-3 border border-[#b0c4de] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007bff]"
                required
              />
            </div>

            {/* Google reCAPTCHA */}
            <div className="mb-6">
              <ReCAPTCHA
                sitekey="6Le2e-AqAAAAANlTBnA6oJFe6vl-AHlkh1LsZvf2"
                onChange={onCaptchaChange}
              />
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-between items-center mb-6">
              <a href="#" className="text-sm text-[#007bff] hover:text-[#0056b3]">Forgot Password?</a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-3 bg-[#007bff] text-white rounded-lg font-semibold hover:bg-[#0056b3] transition duration-300"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

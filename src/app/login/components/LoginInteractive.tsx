"use client";

import { useState } from "react";
import InstitutionalBranding from "./InstitutionalBranding";
import LoginForm from "./LoginForm";
import SecurityFeatures from "./SecurityFeatures";

interface LoginFormData {
  email: string;
  password: string;
  role: string;
  rememberMe: boolean;
}

const LoginInteractive = () => {
  const [loginData, setLoginData] = useState<LoginFormData | null>(null);

  const handleLoginSubmit = (data: LoginFormData) => {
    setLoginData(data);
    console.log("Login submitted:", data);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Main Content */}
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left Panel - Branding & Security */}
        <div className="lg:w-1/2 bg-linear-to-br from-white via-blue-50/30 to-indigo-50/30 p-8 lg:p-12 flex flex-col justify-center relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-40 h-40 bg-indigo-200 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-purple-200 rounded-full blur-3xl"></div>
          </div>

          <div className="max-w-lg mx-auto w-full relative z-10">
            <InstitutionalBranding />
            <div className="hidden lg:block mt-12">
              <SecurityFeatures />
            </div>
          </div>
        </div>

        {/* Right Panel - Login Form */}
        <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center bg-white relative">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-10 right-10 w-24 h-24 bg-blue-100 rounded-full blur-2xl"></div>
            <div className="absolute bottom-10 left-10 w-36 h-36 bg-indigo-100 rounded-full blur-2xl"></div>
          </div>

          <div className="relative z-10">
            <LoginForm onSubmit={handleLoginSubmit} />

            {/* Mobile Security Features */}
            <div className="lg:hidden mt-12">
              <SecurityFeatures />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-slate-200/60 py-6 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4 text-sm text-slate-600">
              <span>
                &copy; {new Date().getFullYear()} HostelHub Management System
              </span>
              <span className="hidden sm:inline text-slate-400">•</span>
              <span className="hidden sm:inline text-slate-600">
                All rights reserved
              </span>
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <a
                href="#"
                className="text-slate-600 hover:text-blue-600 transition-colors duration-200 font-medium"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-slate-600 hover:text-blue-600 transition-colors duration-200 font-medium"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-slate-600 hover:text-blue-600 transition-colors duration-200 font-medium"
              >
                Support
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LoginInteractive;

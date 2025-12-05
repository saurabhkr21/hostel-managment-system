"use client";

import Icon from "@/components/ui/AppIcon";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { signIn, getSession } from "next-auth/react";

interface LoginFormData {
  email: string;
  password: string;
  role: string;
  rememberMe: boolean;
}

interface LoginFormProps {
  onSubmit?: (data: LoginFormData) => void;
}

const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
    role: "STUDENT", // Default to uppercase to match Prisma enum
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Partial<LoginFormData>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);

  const roles = [
    {
      value: "ADMIN",
      label: "Administrator",
      route: "/admin/dashboard",
    },
    { value: "STAFF", label: "Staff Member", route: "/staff/dashboard" },
    { value: "STUDENT", label: "Student", route: "/student/dashboard" },
  ];

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const validateForm = (): boolean => {
    const newErrors: Partial<LoginFormData> = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.role) {
      newErrors.role = "Please select your role";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    field: keyof LoginFormData,
    value: string | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (result?.error) {
        setLoginAttempts((prev) => prev + 1);
        setErrors({
          email: "Invalid credentials. Please check your email and password.",
          password: "Invalid credentials. Please check your email and password.",
        });
      } else {
        // Successful login
        const session = await getSession();
        const userRole = session?.user?.role;

        if (userRole) {
          // Redirect based on the role from the session, not the form
          // This ensures we trust the backend
          if (userRole === 'ADMIN') router.push('/admin/dashboard');
          else if (userRole === 'STAFF') router.push('/staff/dashboard');
          else if (userRole === 'STUDENT') router.push('/student/dashboard');
          else router.push('/');
        } else {
          // Fallback
          router.push('/');
        }
      }
    } catch (error) {
      setErrors({ email: "Login failed. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    alert(
      "Password reset functionality would be implemented here. Please contact your administrator."
    );
  };

  if (!isHydrated) {
    return (
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20 animate-fade-in">
          <div className="animate-pulse">
            <div className="h-8 bg-slate-200 rounded mb-6"></div>
            <div className="space-y-4">
              <div className="h-12 bg-slate-200 rounded"></div>
              <div className="h-12 bg-slate-200 rounded"></div>
              <div className="h-12 bg-slate-200 rounded"></div>
              <div className="h-12 bg-slate-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto animate-fade-in">
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-800 mb-3">
            Welcome Back
          </h2>
          <p className="text-slate-600 font-medium">
            Sign in to access your HostelHub account
          </p>
        </div>

        {loginAttempts > 0 && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl animate-fade-in">
            <div className="flex items-center">
              <Icon
                name="ExclamationTriangleIcon"
                size={20}
                className="text-red-500 mr-3"
              />
              <p className="text-sm text-red-700 font-medium">
                Login failed. Attempts: {loginAttempts}/5
              </p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Role Selection - Optional visual guide, actual role comes from DB */}
          <div>
            <label
              htmlFor="role"
              className="block text-sm font-semibold text-slate-700 mb-3"
            >
              Select Your Role
            </label>
            <div className="relative">
              <select
                id="role"
                value={formData.role}
                onChange={(e) => handleInputChange("role", e.target.value)}
                className="w-full px-4 py-4 pl-12 border-2 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white/80 backdrop-blur-sm border-slate-200 hover:border-blue-300 appearance-none"
              >
                {roles.map((role) => (
                  <option key={role.value} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </select>
              <Icon
                name="UserGroupIcon"
                size={20}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-600"
              />
              <Icon
                name="ChevronDownIcon"
                size={16}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none"
              />
            </div>
            {errors.role && (
              <p className="mt-2 text-sm text-red-600 font-medium">
                {errors.role}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-slate-700 mb-3"
            >
              Email Address
            </label>
            <div className="relative">
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="w-full px-4 py-4 pl-12 border-2 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white/80 backdrop-blur-sm border-slate-200 hover:border-blue-300"
                placeholder="Enter your email address"
              />
              <Icon
                name="EnvelopeIcon"
                size={20}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-600"
              />
            </div>
            {errors.email && (
              <p className="mt-2 text-sm text-red-600 font-medium">
                {errors.email}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-slate-700 mb-3"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className="w-full px-4 py-4 pl-12 pr-12 border-2 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white/80 backdrop-blur-sm border-slate-200 hover:border-blue-300"
                placeholder="Enter your password"
              />
              <Icon
                name="LockClosedIcon"
                size={20}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-600"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors duration-200 p-1"
              >
                <Icon
                  name={showPassword ? "EyeSlashIcon" : "EyeIcon"}
                  size={20}
                />
              </button>
            </div>
            {errors.password && (
              <p className="mt-2 text-sm text-red-600 font-medium">
                {errors.password}
              </p>
            )}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.rememberMe}
                onChange={(e) =>
                  handleInputChange("rememberMe", e.target.checked)
                }
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
              />
              <span className="ml-3 text-sm text-slate-600 font-medium">
                Remember me
              </span>
            </label>
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm text-blue-600 hover:text-blue-700 transition-colors duration-200 font-medium"
            >
              Forgot password?
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || loginAttempts >= 5}
            className="w-full bg-linear-to-br from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl font-semibold hover:shadow-lg focus:ring-2 focus:ring-blue-500/20 focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transform hover:scale-[1.02] active:scale-[0.98] disabled:transform-none"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                Signing In...
              </>
            ) : (
              <>
                <Icon name="ArrowRightIcon" size={20} className="mr-2" />
                Sign In
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

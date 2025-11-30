'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { AlertCircle, ArrowRight, Eye, EyeOff, Copy, Check } from 'lucide-react';
import Image from 'next/image';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedField, setCopiedField] = useState<'email' | 'password' | null>(null);

  const demoEmail = 'demo@borgai.platform';
  const demoPassword = 'demo1234';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Both fields are required.');
      return;
    }

    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        if (rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        }
        router.push('/dashboard');
      } else {
        setError('Invalid email or password. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async (text: string, field: 'email' | 'password') => {
    await navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const fillDemoCredentials = () => {
    setEmail(demoEmail);
    setPassword(demoPassword);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center px-5 py-8">
      <div className="w-full max-w-md">
        {/* Top Branding */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-[#0065BD] leading-tight">
            BORGai
          </h1>
          <p className="text-base font-semibold text-[#6E685F] mt-2 leading-relaxed">
            Intelligent Core Supply Forecasting Platform
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div>
            <label 
              htmlFor="email" 
              className="block text-sm font-medium text-[#333333] mb-1.5"
            >
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="h-12 border-[#E5E3E0] focus:border-[#0065BD] focus:ring-2 focus:ring-[#0065BD]/20 transition-all text-base placeholder:text-[#6E685F]"
            />
          </div>

          {/* Password Input */}
          <div>
            <label 
              htmlFor="password" 
              className="block text-sm font-medium text-[#333333] mb-1.5"
            >
              Password
            </label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className="h-12 pr-10 border-[#E5E3E0] focus:border-[#0065BD] focus:ring-2 focus:ring-[#0065BD]/20 transition-all text-base placeholder:text-[#6E685F]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6E685F] hover:text-[#333333] transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember"
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              className="data-[state=checked]:bg-[#0065BD] data-[state=checked]:border-[#0065BD]"
            />
            <label
              htmlFor="remember"
              className="text-xs text-[#6E685F] cursor-pointer select-none"
            >
              Remember me
            </label>
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-start gap-2 rounded bg-[#E37222]/10 border border-[#E37222] p-3 text-sm text-[#E37222]">
              <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Login Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-black hover:bg-[#333333] text-white font-medium text-sm transition-all duration-150 active:scale-[0.98] disabled:opacity-50"
          >
            {isLoading ? (
              <span>Logging in...</span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <ArrowRight className="h-4 w-4" />
                Login
              </span>
            )}
          </Button>

          {/* Demo Credentials */}
          <div className="mt-5 rounded bg-[#0065BD]/5 border border-[#E5E3E0] p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm">📋</span>
              <p className="text-xs font-medium text-[#333333]">
                Demo Login Credentials
              </p>
            </div>
            <div className="space-y-1 font-mono text-xs">
              <div className="flex items-center justify-between text-[#6E685F]">
                <span>Email: {demoEmail}</span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(demoEmail, 'email')}
                  className="text-[#0065BD] hover:text-[#004E92] transition-colors p-1"
                  aria-label="Copy email"
                >
                  {copiedField === 'email' ? (
                    <Check className="h-3 w-3" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                </button>
              </div>
              <div className="flex items-center justify-between text-[#6E685F]">
                <span>Password: {demoPassword}</span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(demoPassword, 'password')}
                  className="text-[#0065BD] hover:text-[#004E92] transition-colors p-1"
                  aria-label="Copy password"
                >
                  {copiedField === 'password' ? (
                    <Check className="h-3 w-3" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                </button>
              </div>
            </div>
            <button
              type="button"
              onClick={fillDemoCredentials}
              className="mt-2 text-xs text-[#0065BD] hover:text-[#004E92] font-medium transition-colors"
            >
              Click to auto-fill →
            </button>
          </div>
        </form>
        </div>

        {/* Footer */}
        <div className="mt-10 text-center">
          <p className="text-xs text-[#6E685F] mb-2">
            powered by
          </p>
          <p className="text-xs text-[#6E685F] font-medium mb-2">
            Team 66 | Christian Güttler and Robert Hoffmann
          </p>
          <p className="text-xs text-[#6E685F] mb-4">
            REMAN Challenge 2025 - Unlocking the Power of AI for Circular Industries
          </p>
          <div className="flex items-center justify-center gap-4">
            <Image 
              src="/logos/tum-logo.svg" 
              alt="TUM Logo" 
              width={32} 
              height={32}
              className="h-8 w-auto"
            />
            <Image 
              src="/logos/logo_no_bg.svg" 
              alt="REMAN Logo" 
              width={32} 
              height={32}
              className="h-8 w-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

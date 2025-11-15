'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Lock, ArrowLeft } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const { login, register } = useApp();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email || !password) {
      setError('Por favor, preencha todos os campos');
      setLoading(false);
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      setError('As senhas não coincidem');
      setLoading(false);
      return;
    }

    try {
      let success = false;
      if (isLogin) {
        success = await login(email, password);
        if (!success) {
          setError('E-mail ou senha incorretos');
        }
      } else {
        success = await register(email, password);
        if (!success) {
          setError('Este e-mail já está cadastrado');
        }
      }

      if (success) {
        router.push('/dashboard');
      }
    } catch (err) {
      setError('Ocorreu um erro. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-32 h-32 bg-pink-200/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-10 w-40 h-40 bg-rose-200/30 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Back button */}
      <button
        onClick={() => router.push('/welcome')}
        className="absolute top-6 left-6 p-2 rounded-full bg-white/80 hover:bg-white shadow-md transition-all duration-300 hover:scale-110 z-10"
      >
        <ArrowLeft className="w-6 h-6 text-gray-700" />
      </button>

      {/* Login/Register card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 space-y-6">
          {/* Logo */}
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold">
              <span className="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
                GlowUp
              </span>
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                Z
              </span>
            </h1>
            <h2 className="text-2xl font-semibold text-gray-800">
              {isLogin ? t.login.title : t.login.createTitle}
            </h2>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">
                {t.login.email}
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12 rounded-xl border-gray-200 focus:border-pink-500 focus:ring-pink-500"
                  placeholder="seu@email.com"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700">
                {t.login.password}
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 h-12 rounded-xl border-gray-200 focus:border-pink-500 focus:ring-pink-500"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Confirm Password (only for register) */}
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-700">
                  {t.login.confirmPassword}
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10 h-12 rounded-xl border-gray-200 focus:border-pink-500 focus:ring-pink-500"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            )}

            {/* Error message */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                {error}
              </div>
            )}

            {/* Forgot password (only for login) */}
            {isLogin && (
              <div className="text-right">
                <button
                  type="button"
                  className="text-sm text-pink-500 hover:text-pink-600 font-medium transition-colors"
                >
                  {t.login.forgotPassword}
                </button>
              </div>
            )}

            {/* Submit button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              {loading ? '...' : isLogin ? t.login.login : t.login.create}
            </Button>
          </form>

          {/* Toggle login/register */}
          <div className="text-center space-y-2">
            <p className="text-gray-600 text-sm">
              {isLogin ? t.login.noAccount : t.login.hasAccount}
            </p>
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
                setConfirmPassword('');
              }}
              className="text-pink-500 hover:text-pink-600 font-semibold transition-colors"
            >
              {isLogin ? t.login.createAccount : t.login.backToLogin}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

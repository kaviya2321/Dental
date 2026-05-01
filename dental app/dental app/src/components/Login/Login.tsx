import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Stethoscope, ArrowRight, Lock, Mail, ChevronLeft, IdCard } from 'lucide-react';
import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { Card, CardContent } from '@/components/card';
import { Label } from '@/components/label';
import { Role } from '@/types';
import { DEMO_CREDENTIALS, ensureAuthSeeded, signIn, signUp } from '@/services/authService';
import { toast } from 'sonner';

interface LoginProps {
  onLogin: (role: Role) => void;
}

type AuthMode = 'signin' | 'signup';

export const LoginPage = ({ onLogin }: LoginProps) => {
  const [step, setStep] = useState<'selection' | 'form'>('selection');
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [authMode, setAuthMode] = useState<AuthMode>('signin');
  const [isLoading, setIsLoading] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    ensureAuthSeeded();
  }, []);

  const resetForm = () => {
    setFullName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role);
    setAuthMode('signin');
    resetForm();
    setStep('form');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedRole) {
      toast.error('Select a role to continue.');
      return;
    }

    if (authMode === 'signup' && !fullName.trim()) {
      toast.error('Enter your full name to create an account.');
      return;
    }

    if (authMode === 'signup' && password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    setIsLoading(true);

    const result =
      authMode === 'signin'
        ? signIn({ email, password, role: selectedRole })
        : signUp({ name: fullName, email, password, role: selectedRole });

    if (!result.ok) {
      setIsLoading(false);
      toast.error(result.message);
      return;
    }

    toast.success(result.message);
    onLogin(selectedRole);
    setIsLoading(false);
  };

  const currentDemoCredentials =
    DEMO_CREDENTIALS.find((entry) => entry.role === selectedRole) ?? DEMO_CREDENTIALS[0];

  return (
    <div className="relative flex min-h-[100dvh] w-full flex-col items-center overflow-y-auto bg-slate-50 p-4 font-sans text-slate-900">
      <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-blue-100/50 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-cyan-100/50 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="z-10 my-auto w-full max-w-[440px]"
      >
        <div className="mb-10 text-center">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="relative inline-block"
          >
            <div className="absolute inset-0 rounded-full bg-blue-600/10 blur-2xl" />
            <img
              src="/icon.png"
              alt="Alpha Dent Logo"
              className="relative z-10 h-20 w-20 object-contain"
            />
          </motion.div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-950">Alpha Dent</h1>
          <p className="mt-1 text-sm text-slate-500">Modern Dental Care Powered by AI</p>
        </div>

        <AnimatePresence mode="wait">
          {step === 'selection' ? (
            <motion.div
              key="selection"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-4"
            >
              <h2 className="mb-6 text-center text-lg font-semibold text-slate-800">
                Welcome back! Please select your role
              </h2>

              <RoleCard
                title="I am a Patient"
                description="View your dental history, chat with AI, and book appointments."
                icon={<User className="h-6 w-6" />}
                onClick={() => handleRoleSelect('patient')}
                color="bg-blue-600"
              />

              <RoleCard
                title="I am a Doctor"
                description="Manage your patients, view scans, and track appointments."
                icon={<Stethoscope className="h-6 w-6" />}
                onClick={() => handleRoleSelect('doctor')}
                color="bg-slate-950"
              />
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card className="rounded-[2.5rem] border-none bg-white/80 shadow-2xl backdrop-blur-xl">
                <CardContent className="p-8">
                  <button
                    onClick={() => setStep('selection')}
                    className="mb-6 flex items-center text-sm font-medium text-slate-500 transition-colors hover:text-slate-900"
                    type="button"
                  >
                    <ChevronLeft className="mr-1 h-4 w-4" />
                    Back
                  </button>

                  <div className="mb-6 flex rounded-2xl bg-slate-100 p-1">
                    <button
                      type="button"
                      onClick={() => setAuthMode('signin')}
                      className={`flex-1 rounded-xl px-4 py-2 text-sm font-semibold transition-colors ${
                        authMode === 'signin'
                          ? 'bg-white text-slate-950 shadow-sm'
                          : 'text-slate-500 hover:text-slate-900'
                      }`}
                    >
                      Sign In
                    </button>
                    <button
                      type="button"
                      onClick={() => setAuthMode('signup')}
                      className={`flex-1 rounded-xl px-4 py-2 text-sm font-semibold transition-colors ${
                        authMode === 'signup'
                          ? 'bg-white text-slate-950 shadow-sm'
                          : 'text-slate-500 hover:text-slate-900'
                      }`}
                    >
                      Sign Up
                    </button>
                  </div>

                  <h2 className="mb-2 text-2xl font-bold text-slate-950">
                    {authMode === 'signin' ? 'Sign in to Alpha Dent' : 'Create your account'}
                  </h2>
                  <p className="mb-8 text-sm text-slate-500">
                    {selectedRole === 'patient' ? 'Patient' : 'Doctor'} access is selected for this session.
                    {authMode === 'signup' && (
                      <span className="block mt-1 text-[10px] text-amber-600 font-medium">
                        Note: Demo emails cannot be used for new registration.
                      </span>
                    )}
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {authMode === 'signup' && (
                      <div className="space-y-1.5">
                        <Label htmlFor="fullName">Full Name</Label>
                        <div className="relative">
                          <IdCard className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                          <Input
                            id="fullName"
                            placeholder="Your name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                            className="h-12 rounded-2xl border-slate-200 bg-white/50 pl-11 shadow-sm transition-all focus:bg-white"
                          />
                        </div>
                      </div>
                    )}

                    <div className="space-y-1.5">
                      <Label htmlFor="email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <Input
                          id="email"
                          placeholder="name@example.com"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="h-12 rounded-2xl border-slate-200 bg-white/50 pl-11 shadow-sm transition-all focus:bg-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        {authMode === 'signin' && (
                          <span className="text-xs font-semibold text-slate-400">Demo app</span>
                        )}
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <Input
                          id="password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          placeholder="Enter password"
                          className="h-12 rounded-2xl border-slate-200 bg-white/50 pl-11 shadow-sm transition-all focus:bg-white"
                        />
                      </div>
                    </div>

                    {authMode === 'signup' && (
                      <div className="space-y-1.5">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                          <Input
                            id="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            placeholder="Repeat password"
                            className="h-12 rounded-2xl border-slate-200 bg-white/50 pl-11 shadow-sm transition-all focus:bg-white"
                          />
                        </div>
                      </div>
                    )}

                    <Button
                      type="submit"
                      disabled={isLoading}
                      className={`h-12 w-full rounded-2xl text-white shadow-lg transition-all ${
                        selectedRole === 'patient'
                          ? 'bg-blue-600 hover:bg-blue-700'
                          : 'bg-slate-950 hover:bg-black'
                      }`}
                    >
                      {isLoading ? (
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      ) : (
                        <span className="flex items-center gap-2">
                          {authMode === 'signin' ? 'Sign In' : 'Create Account'}
                          <ArrowRight className="h-4 w-4" />
                        </span>
                      )}
                    </Button>
                  </form>

                  {authMode === 'signin' && (
                    <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50/80 p-4 text-sm text-slate-600">
                      <p className="font-semibold text-slate-900">Demo credentials</p>
                      <p className="mt-1">Email: {currentDemoCredentials.email}</p>
                      <p>Password: {currentDemoCredentials.password}</p>
                    </div>
                  )}

                  <div className="mt-8 border-t border-slate-100 pt-8 text-center">
                    <p className="text-sm text-slate-500">
                      {authMode === 'signin' ? "Don't have an account?" : 'Already have an account?'}{' '}
                      <button
                        type="button"
                        onClick={() => setAuthMode(authMode === 'signin' ? 'signup' : 'signin')}
                        className="font-semibold text-blue-600 hover:underline"
                      >
                        {authMode === 'signin' ? 'Sign up now' : 'Sign in'}
                      </button>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

const RoleCard = ({
  title,
  description,
  icon,
  onClick,
  color,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  color: string;
}) => (
  <motion.button
    whileHover={{ scale: 1.02, y: -2 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className="group w-full text-left"
  >
    <Card className="overflow-hidden rounded-[2.5rem] border-none bg-white/80 shadow-xl backdrop-blur-md transition-all group-hover:bg-white group-hover:shadow-2xl">
      <CardContent className="flex items-center gap-5 p-6">
        <div
          className={`h-14 w-14 shrink-0 rounded-[1.25rem] ${color} flex items-center justify-center text-white shadow-lg transition-transform group-hover:rotate-3`}
        >
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-slate-950">{title}</h3>
          <p className="mt-0.5 line-clamp-2 text-xs text-slate-500">{description}</p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-400 transition-colors group-hover:bg-blue-50 group-hover:text-blue-600">
          <ArrowRight className="h-5 w-5" />
        </div>
      </CardContent>
    </Card>
  </motion.button>
);

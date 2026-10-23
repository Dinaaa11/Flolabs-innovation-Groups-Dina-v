import React, { useState } from 'react';
import { FloLogo } from './FloLogo';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setLoggedInUser(email);
      setTimeout(() => {
        onClose();
        setLoggedInUser(null);
        setEmail('');
        setPassword('');
      }, 1500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity">
      <div className="relative w-full max-w-md border border-border bg-card p-6 shadow-2xl rounded-none text-foreground sm:p-8">
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 text-muted hover:text-foreground p-1 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col items-center text-center mb-6">
          <FloLogo className="h-12 w-12 mb-3" />
          <h2 className="text-xl font-bold tracking-tight text-foreground">FloLabs International</h2>
          <p className="text-xs uppercase tracking-widest text-muted mt-1">Venture & Innovation Portal</p>
        </div>

        {loggedInUser ? (
          <div className="py-8 text-center">
            <div className="inline-flex size-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mb-3">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-semibold text-foreground">Welcome back!</h3>
            <p className="text-sm text-muted mt-1">{loggedInUser}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-3.5 py-2.5 bg-background border border-border text-foreground text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1.5">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 bg-background border border-border text-foreground text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
            </div>

            <div className="flex items-center justify-between text-xs text-muted pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="accent-primary" />
                <span>Remember me</span>
              </label>
              <a href="#" className="hover:text-primary transition-colors">Forgot password?</a>
            </div>

            <button
              type="submit"
              className="w-full mt-4 py-2.5 px-4 bg-primary text-white font-medium text-sm transition-opacity hover:opacity-90 cursor-pointer"
            >
              Sign In to FloLabs
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

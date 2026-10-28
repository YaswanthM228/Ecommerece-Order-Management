import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Logo } from '../../components/common/Logo';

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#F7F8FC] dark:bg-[#070A1E] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-3">
        <div className="inline-block">
          <Logo size="large" variant="dark" />
        </div>
        <h2 className="text-2xl font-black text-gray-900 dark:text-white">
          Reset Password
        </h2>
        <p className="text-xs text-gray-500">
          Enter your registered email and we'll send password recovery instructions.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white dark:bg-[#0E1433] py-8 px-6 sm:px-10 shadow-2xl rounded-3xl border border-gray-100 dark:border-violet-950/40 space-y-6">
          {submitted ? (
            <div className="text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-sm text-gray-900 dark:text-white">Check Your Inbox</h3>
              <p className="text-xs text-gray-500">
                A password reset link has been dispatched to <span className="font-bold">{email}</span>.
              </p>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 text-xs font-bold text-brand-violet pt-3 hover:underline"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Login</span>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-gray-50 dark:bg-[#111836] border border-gray-200 dark:border-violet-900/40 text-gray-800 dark:text-white focus:outline-none focus:border-brand-violet"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-brand-violet hover:bg-brand-violet-deep text-white font-bold text-xs shadow-lg shadow-violet-600/30 transition-all"
              >
                Send Reset Link
              </button>

              <div className="text-center pt-2">
                <Link to="/login" className="text-xs font-bold text-gray-500 hover:text-brand-violet">
                  Remember password? Sign In
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

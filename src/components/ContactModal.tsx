import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { portfolioData } from '../data/portfolioData';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [budget, setBudget] = useState('');
  const [message, setMessage] = useState('');
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsSelectOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch(portfolioData.formEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          budget: budget || 'Not specified',
          message,
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#7C3AED', '#F472B6', '#22D3EE', '#A3E635', '#FFFFFF'],
        });
      } else {
        setIsSuccess(true);
      }
    } catch {
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setIsSuccess(false);
    setName('');
    setEmail('');
    setBudget('');
    setMessage('');
    setErrorMessage(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-8">
      {/* Backdrop */}
      <div
        onClick={handleResetAndClose}
        className="fixed inset-0 bg-[#0E0E12]/85 backdrop-blur-md transition-opacity duration-300"
      />

      {/* Modal Card with Vibrant Glow */}
      <div className="relative w-full max-w-2xl bg-[var(--color-surface)] border border-white/15 rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-glow-signature z-10 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:border-[var(--accent-tertiary)] transition-colors focus:outline-none"
          aria-label="Close modal"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M1 1L13 13M1 13L13 1"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {!isSuccess ? (
          <div>
            {/* Modal Header */}
            <div className="mb-8">
              <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent-secondary)] font-bold block mb-1">
                LET'S CONNECT
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-black tracking-tight text-white mb-3">
                Let's <span className="text-gradient-signature">meet</span>
              </h2>
              <p className="text-sm md:text-base text-[var(--color-text-muted)] font-sans">
                Fill in the form below, or if you don't like forms, send an email at:{' '}
                <a
                  href={`mailto:${portfolioData.email}`}
                  className="text-[var(--accent-secondary)] font-semibold underline underline-offset-4 hover:text-[var(--accent-tertiary)] transition-colors"
                >
                  {portfolioData.email}
                </a>
              </p>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* Name field with signature casing */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="contact-name"
                  className="text-xs md:text-sm font-display font-black tracking-wider uppercase text-white/90"
                >
                  yOUR nAME
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. John Doe"
                  className="w-full bg-[var(--color-surface-card)] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 text-sm md:text-base focus:outline-none focus:border-[var(--accent-primary)] focus:ring-2 focus:ring-[#7C3AED]/20 transition-all"
                />
              </div>

              {/* Email field */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="contact-email"
                  className="text-xs md:text-sm font-display font-black tracking-wider uppercase text-white/90"
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-[var(--color-surface-card)] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 text-sm md:text-base focus:outline-none focus:border-[var(--accent-primary)] focus:ring-2 focus:ring-[#7C3AED]/20 transition-all"
                />
              </div>

              {/* Budget dropdown with animated custom select */}
              <div className="flex flex-col gap-2" ref={dropdownRef}>
                <label className="text-xs md:text-sm font-display font-black tracking-wider uppercase text-white/90">
                  What is your Budget?
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsSelectOpen(!isSelectOpen)}
                    className="w-full bg-[var(--color-surface-card)] border border-white/10 rounded-xl px-4 py-3.5 text-left text-sm md:text-base flex items-center justify-between focus:outline-none focus:border-[var(--accent-primary)] focus:ring-2 focus:ring-[#7C3AED]/20 transition-all"
                  >
                    <span className={budget ? 'text-white' : 'text-white/40'}>
                      {budget || 'Please select one..'}
                    </span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      className={`transition-transform duration-200 text-white/70 ${
                        isSelectOpen ? 'rotate-180 text-[var(--accent-secondary)]' : ''
                      }`}
                    >
                      <path
                        d="M4 6L8 10L12 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  {/* Dropdown menu */}
                  {isSelectOpen && (
                    <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-white text-black rounded-xl shadow-2xl py-2 z-50 overflow-hidden border border-black/10 animate-fadeIn">
                      {portfolioData.budgetOptions
                        .filter((opt) => opt !== 'Please select one..')
                        .map((option) => (
                          <div
                            key={option}
                            onClick={() => {
                              setBudget(option);
                              setIsSelectOpen(false);
                            }}
                            className={`px-5 py-3 text-sm md:text-base cursor-pointer transition-colors font-medium ${
                              budget === option
                                ? 'bg-gradient-signature text-white font-bold'
                                : 'hover:bg-[#EDEDED] text-black'
                            }`}
                          >
                            {option}
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Project summary */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="contact-summary"
                  className="text-xs md:text-sm font-display font-black tracking-wider uppercase text-white/90"
                >
                  Project Summary
                </label>
                <textarea
                  id="contact-summary"
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell me more about your project goals, scope, and timeline..."
                  className="w-full bg-[var(--color-surface-card)] border border-white/10 rounded-xl p-4 text-white placeholder-white/30 text-sm md:text-base focus:outline-none focus:border-[var(--accent-primary)] focus:ring-2 focus:ring-[#7C3AED]/20 transition-all resize-none"
                />
              </div>

              {errorMessage && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                  {errorMessage}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="button-custom button-gradient w-full py-4 text-center justify-center text-sm md:text-base tracking-widest mt-2"
              >
                {isSubmitting ? 'Please wait...' : 'Submit Message'}
              </button>
            </form>
          </div>
        ) : (
          /* Success Screen */
          <div className="py-12 px-4 text-center flex flex-col items-center justify-center animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#7C3AED]/30 to-[#22D3EE]/30 border border-[var(--accent-secondary)] flex items-center justify-center text-[var(--accent-secondary)] mb-6 shadow-glow-cyan">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 13L9 17L19 7"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="text-2xl md:text-4xl font-display font-black text-white mb-3">
              Thanks for
              <br />
              <span className="text-gradient-signature">reaching out to me.</span>
            </h3>
            <p className="text-[var(--color-text-muted)] text-sm md:text-base max-w-md mx-auto mb-8">
              You can anticipate the reply within 24 hours.
            </p>
            <button
              onClick={handleResetAndClose}
              className="button-custom button-gradient px-8 py-3.5 text-sm"
            >
              Back to Website
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

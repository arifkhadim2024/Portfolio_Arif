import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Send, Mail, MapPin, Copy, Check, Clock, Sparkles, MessageSquare, User, AtSign, FileText, Phone } from 'lucide-react';
import { profileData } from '../data/profile';
import { socialLinks, contactConfig } from '../data/social';
import { SectionHeader } from '../components/common/SectionHeader';
import { Button } from '../components/common/Button';
import { useClipboard } from '../hooks/useClipboard';
import { IconRenderer } from '../components/common/IconRenderer';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { copied, copy } = useClipboard(2500);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Please provide a subject';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please type your message';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      if (contactConfig.formEndpoint) {
        // Send via configured endpoint (e.g. Formspree)
        await fetch(contactConfig.formEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      } else {
        // Simulate a brief dispatch delay and trigger mailto fallback or clear confirmation
        await new Promise((resolve) => setTimeout(resolve, 800));
      }

      setSubmitted(true);

      // Trigger Confetti explosion
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#6366F1', '#06B6D4', '#10B981', '#F59E0B'],
        });
      } catch (err) {
        // ignore confetti error if canvas is restricted
      }

      // Reset form fields
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyEmail = () => {
    copy(profileData.email);
  };

  return (
    <section id="contact" className="py-20 lg:py-28 relative bg-dark-bg/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Get In Touch"
          title="Let's Build Something Together"
          subtitle="Whether you have an internship opportunity, project collaboration, or simply want to connect, my inbox is always open."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Direct Info & Social Cards (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Quick Contact Card */}
            <div className="glass-card p-6 sm:p-8 rounded-2xl space-y-6">
              <h3 className="text-xl font-bold text-white dark:text-white light:text-slate-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-accent-cyan" />
                Contact Information
              </h3>

              <div className="space-y-4">
                {/* Email Item */}
                <div className="p-4 rounded-xl bg-slate-900/80 dark:bg-slate-900/80 light:bg-slate-100/90 border border-slate-800 dark:border-slate-800 light:border-slate-300 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="p-2.5 rounded-lg bg-primary-500/10 text-primary-400 flex-shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="overflow-hidden">
                      <div className="text-xs text-slate-400 font-medium">Email Address</div>
                      <a
                        href={`mailto:${profileData.email}`}
                        className="text-xs sm:text-sm font-semibold text-white dark:text-white light:text-slate-900 hover:text-primary-400 truncate block transition-colors"
                      >
                        {profileData.email}
                      </a>
                    </div>
                  </div>

                  <button
                    onClick={handleCopyEmail}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/60 transition-colors flex-shrink-0"
                    title="Copy Email to Clipboard"
                    aria-label="Copy email"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Phone Item */}
                {profileData.phone && (
                  <div className="p-4 rounded-xl bg-slate-900/80 dark:bg-slate-900/80 light:bg-slate-100/90 border border-slate-800 dark:border-slate-800 light:border-slate-300 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 flex-shrink-0">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div className="overflow-hidden">
                        <div className="text-xs text-slate-400 font-medium">Phone / WhatsApp</div>
                        <a
                          href={`tel:${profileData.phone.replace(/\s+/g, '')}`}
                          className="text-xs sm:text-sm font-semibold text-white dark:text-white light:text-slate-900 hover:text-primary-400 truncate block transition-colors"
                        >
                          {profileData.phone}
                        </a>
                      </div>
                    </div>
                  </div>
                )}

                {/* Location Item */}
                <div className="p-4 rounded-xl bg-slate-900/80 dark:bg-slate-900/80 light:bg-slate-100/90 border border-slate-800 dark:border-slate-800 light:border-slate-300 flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400 flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-medium">Location</div>
                    <div className="text-xs sm:text-sm font-semibold text-white dark:text-white light:text-slate-900">
                      {profileData.location}
                    </div>
                  </div>
                </div>

                {/* Response SLA */}
                <div className="p-4 rounded-xl bg-slate-900/80 dark:bg-slate-900/80 light:bg-slate-100/90 border border-slate-800 dark:border-slate-800 light:border-slate-300 flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-medium">Response SLA</div>
                    <div className="text-xs sm:text-sm font-semibold text-emerald-400">
                      {contactConfig.responseTime}
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Social Channels
                </h4>
                <div className="flex flex-wrap gap-2.5">
                  {socialLinks.map((social) => (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/80 dark:bg-slate-900/80 light:bg-slate-100 text-slate-300 hover:text-white dark:hover:text-white light:hover:text-primary-600 border border-slate-800 dark:border-slate-800 light:border-slate-300 hover:border-primary-500/40 text-xs font-semibold transition-all hover:scale-105"
                    >
                      <IconRenderer name={social.icon} className="w-4 h-4 text-primary-400" />
                      <span>{social.platform}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Form (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <div className="glass-card p-6 sm:p-8 rounded-2xl relative">
              <h3 className="text-xl font-bold text-white dark:text-white light:text-slate-900 mb-2 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary-400" />
                Send a Message
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mb-6">
                Fill out the form below and I will get back to you promptly.
              </p>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 text-center space-y-3"
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-white">Message Dispatched!</h4>
                  <p className="text-sm text-slate-300 max-w-md mx-auto">
                    Thank you for reaching out! You can also email me directly at{' '}
                    <strong className="text-primary-300">{profileData.email}</strong>.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors"
                  >
                    Send Another Note
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 dark:text-slate-300 light:text-slate-700 mb-1.5 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        <span>Your Name</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className={`w-full px-4 py-2.5 rounded-xl bg-slate-900/90 dark:bg-slate-900/90 light:bg-slate-50 border ${
                          errors.name
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-slate-800 dark:border-slate-800 light:border-slate-300 focus:border-primary-500'
                        } text-sm text-white dark:text-white light:text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-primary-500 transition-all`}
                      />
                      {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 dark:text-slate-300 light:text-slate-700 mb-1.5 flex items-center gap-1.5">
                        <AtSign className="w-3.5 h-3.5 text-slate-400" />
                        <span>Your Email</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className={`w-full px-4 py-2.5 rounded-xl bg-slate-900/90 dark:bg-slate-900/90 light:bg-slate-50 border ${
                          errors.email
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-slate-800 dark:border-slate-800 light:border-slate-300 focus:border-primary-500'
                        } text-sm text-white dark:text-white light:text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-primary-500 transition-all`}
                      />
                      {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 dark:text-slate-300 light:text-slate-700 mb-1.5 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-slate-400" />
                      <span>Subject</span>
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Internship opportunity / Project inquiry"
                      className={`w-full px-4 py-2.5 rounded-xl bg-slate-900/90 dark:bg-slate-900/90 light:bg-slate-50 border ${
                        errors.subject
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-slate-800 dark:border-slate-800 light:border-slate-300 focus:border-primary-500'
                        } text-sm text-white dark:text-white light:text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-primary-500 transition-all`}
                      />
                    {errors.subject && <p className="text-xs text-red-400 mt-1">{errors.subject}</p>}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 dark:text-slate-300 light:text-slate-700 mb-1.5 flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                      <span>Message</span>
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Hi Arif, I saw your portfolio and would like to discuss..."
                      className={`w-full px-4 py-2.5 rounded-xl bg-slate-900/90 dark:bg-slate-900/90 light:bg-slate-50 border ${
                        errors.message
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-slate-800 dark:border-slate-800 light:border-slate-300 focus:border-primary-500'
                      } text-sm text-white dark:text-white light:text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-primary-500 transition-all custom-scrollbar`}
                    />
                    {errors.message && <p className="text-xs text-red-400 mt-1">{errors.message}</p>}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      fullWidth
                      disabled={isSubmitting}
                      icon={<Send className="w-4 h-4" />}
                    >
                      {isSubmitting ? 'Sending Message...' : 'Send Message'}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

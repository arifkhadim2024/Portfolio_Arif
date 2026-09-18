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
import { ContactSphere3D } from '../components/3d/ContactSphere3D';
import { TiltCard } from '../components/visual/TiltCard';

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
        const response = await fetch(contactConfig.formEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
            _replyto: formData.email,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to dispatch message to form endpoint');
        }
      } else {
        const mailtoLink = `mailto:${profileData.email}?subject=${encodeURIComponent(
          `[Portfolio Message] ${formData.subject}`
        )}&body=${encodeURIComponent(
          `Hi Arif,\n\n${formData.message}\n\nFrom: ${formData.name} (${formData.email})`
        )}`;
        window.location.href = mailtoLink;
      }

      setSubmitted(true);

      // Trigger Celebration Confetti explosion
      try {
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#6366F1', '#06B6D4', '#10B981', '#F59E0B'],
        });
      } catch {
        // ignore confetti error if canvas is restricted
      }

      // Reset form fields
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Submission error:', error);
      const mailtoLink = `mailto:${profileData.email}?subject=${encodeURIComponent(
        `[Portfolio Message] ${formData.subject}`
      )}&body=${encodeURIComponent(
        `Hi Arif,\n\n${formData.message}\n\nFrom: ${formData.name} (${formData.email})`
      )}`;
      window.location.href = mailtoLink;
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyEmail = () => {
    copy(profileData.email);
  };

  return (
    <section id="contact" className="py-24 lg:py-32 relative bg-dark-bg/70 overflow-hidden">
      {/* 3D Pulsating Beacon Sphere in background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] opacity-40 dark:opacity-40 light:opacity-15 pointer-events-none z-0">
        <ContactSphere3D />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge="Get In Touch"
          title="Let's Build Intelligent Software Together"
          subtitle="Whether you have an internship opportunity, project collaboration, or simply want to connect, my inbox is always open."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Info & Social Cards (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-6"
          >
            <TiltCard maxTilt={6} glareOpacity={0.25}>
              <div className="glass-card-3d p-6 sm:p-8 rounded-3xl space-y-6 border border-white/10 shadow-2xl">
                <h3 className="text-xl font-bold text-white dark:text-white light:text-slate-900 flex items-center gap-2.5">
                  <Sparkles className="w-5 h-5 text-accent-cyan" />
                  <span>Direct Communication</span>
                </h3>

                <div className="space-y-3.5">
                  {/* Email Item */}
                  <div className="p-4 rounded-2xl bg-slate-900/80 dark:bg-slate-900/80 light:bg-slate-100/90 border border-slate-800 dark:border-slate-800 light:border-slate-300 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="p-2.5 rounded-xl bg-primary-500/15 text-primary-400 flex-shrink-0">
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
                      className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/60 transition-colors flex-shrink-0 cursor-pointer"
                      title="Copy Email to Clipboard"
                      aria-label="Copy email"
                    >
                      {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Phone Item */}
                  {profileData.phone && (
                    <div className="p-4 rounded-2xl bg-slate-900/80 dark:bg-slate-900/80 light:bg-slate-100/90 border border-slate-800 dark:border-slate-800 light:border-slate-300 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className="p-2.5 rounded-xl bg-emerald-500/15 text-emerald-400 flex-shrink-0">
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
                  <div className="p-4 rounded-2xl bg-slate-900/80 dark:bg-slate-900/80 light:bg-slate-100/90 border border-slate-800 dark:border-slate-800 light:border-slate-300 flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-cyan-500/15 text-cyan-400 flex-shrink-0">
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
                  <div className="p-4 rounded-2xl bg-slate-900/80 dark:bg-slate-900/80 light:bg-slate-100/90 border border-slate-800 dark:border-slate-800 light:border-slate-300 flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-emerald-500/15 text-emerald-400 flex-shrink-0">
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
                    Verified Social Channels
                  </h4>
                  <div className="flex flex-wrap gap-2.5">
                    {socialLinks.map((social) => (
                      <a
                        key={social.platform}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/80 dark:bg-slate-900/80 light:bg-slate-100 text-slate-300 hover:text-white dark:hover:text-white light:hover:text-primary-600 border border-slate-800 dark:border-slate-800 light:border-slate-300 hover:border-primary-500/50 text-xs font-semibold transition-all hover:scale-105"
                      >
                        <IconRenderer name={social.icon} className="w-4 h-4 text-primary-400" />
                        <span>{social.platform}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>

          {/* Right Column: Contact Form (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <TiltCard maxTilt={5} glareOpacity={0.25}>
              <div className="glass-card-3d p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl relative">
                <h3 className="text-xl font-bold text-white dark:text-white light:text-slate-900 mb-2 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-primary-400" />
                  <span>Send a Direct Message</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mb-6">
                  Fill out the parameters below and I will respond to your inquiry promptly.
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
                    <h4 className="text-lg font-bold text-white">Message Transmitted!</h4>
                    <p className="text-sm text-slate-300 max-w-md mx-auto">
                      Thank you for reaching out! You can also email me directly at{' '}
                      <strong className="text-primary-300">{profileData.email}</strong>.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-4 px-5 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors cursor-pointer"
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
                        {isSubmitting ? 'Transmitting Message...' : 'Transmit Message'}
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

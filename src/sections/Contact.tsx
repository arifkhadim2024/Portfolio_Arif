import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Send, Mail, MapPin, Copy, Check, Clock, Phone } from 'lucide-react';
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

      // Celebration Confetti
      try {
        confetti({
          particleCount: 70,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#111111', '#666666', '#888888', '#F2F1ED'],
        });
      } catch {
        // ignore if canvas is restricted
      }

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
    <section id="contact" className="py-28 lg:py-40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge="07 // INITIATE CONTACT"
          title="Get In Touch"
          subtitle="Whether you have an internship opportunity, engineering project, or simply want to connect, my inbox is always open."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Info & Socials (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-8"
          >
            <div className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold font-display uppercase tracking-tight text-[#111111] dark:text-[#F2F1ED]">
                Direct Coordinates
              </h3>
              <p className="text-sm text-[#666666] dark:text-[#888888] font-body leading-relaxed">
                Feel free to email directly or copy the address below. I look forward to connecting with fellow engineers and teams.
              </p>
            </div>

            <div className="space-y-3 font-mono text-xs">
              {/* Email */}
              <div className="p-4 rounded-xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-neutral-900/60 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 overflow-hidden">
                  <Mail className="w-4 h-4 text-[#111111] dark:text-[#F2F1ED] flex-shrink-0" />
                  <div className="overflow-hidden">
                    <div className="text-[10px] uppercase text-[#888888]">Email Address</div>
                    <a
                      href={`mailto:${profileData.email}`}
                      className="text-xs sm:text-sm font-bold text-[#111111] dark:text-[#F2F1ED] truncate block hover:underline"
                    >
                      {profileData.email}
                    </a>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 text-[#666666] hover:text-[#111111] dark:text-[#888888] dark:hover:text-[#F2F1ED] transition-colors flex-shrink-0 cursor-pointer"
                  title="Copy email to clipboard"
                  aria-label="Copy email"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Phone */}
              {profileData.phone && (
                <div className="p-4 rounded-xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-neutral-900/60 flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#111111] dark:text-[#F2F1ED] flex-shrink-0" />
                  <div>
                    <div className="text-[10px] uppercase text-[#888888]">Telephone</div>
                    <a
                      href={`tel:${profileData.phone.replace(/\s+/g, '')}`}
                      className="text-xs sm:text-sm font-bold text-[#111111] dark:text-[#F2F1ED] hover:underline"
                    >
                      {profileData.phone}
                    </a>
                  </div>
                </div>
              )}

              {/* Location */}
              <div className="p-4 rounded-xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-neutral-900/60 flex items-center gap-3">
                <MapPin className="w-4 h-4 text-[#111111] dark:text-[#F2F1ED] flex-shrink-0" />
                <div>
                  <div className="text-[10px] uppercase text-[#888888]">Location</div>
                  <div className="text-xs sm:text-sm font-bold text-[#111111] dark:text-[#F2F1ED]">
                    {profileData.location}
                  </div>
                </div>
              </div>

              {/* SLA */}
              <div className="p-4 rounded-xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-neutral-900/60 flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#111111] dark:text-[#F2F1ED] flex-shrink-0" />
                <div>
                  <div className="text-[10px] uppercase text-[#888888]">Response SLA</div>
                  <div className="text-xs font-bold text-[#111111] dark:text-[#F2F1ED]">
                    {contactConfig.responseTime}
                  </div>
                </div>
              </div>
            </div>

            {/* Social Channels */}
            <div className="pt-2">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#888888] mb-3 font-mono">
                Verified Social Channels
              </h4>
              <div className="flex flex-wrap gap-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-black/10 dark:border-white/10 bg-white/50 dark:bg-neutral-900/50 text-[#666666] hover:text-[#111111] dark:text-[#888888] dark:hover:text-[#F2F1ED] text-xs font-mono uppercase tracking-wider transition-all"
                  >
                    <IconRenderer name={social.icon} className="w-3.5 h-3.5 text-[#111111] dark:text-[#F2F1ED]" />
                    <span>{social.platform}</span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Form (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <div className="p-8 sm:p-10 rounded-3xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-neutral-900/70 shadow-sm">
              <div className="space-y-1 mb-6">
                <h3 className="text-xl sm:text-2xl font-bold font-display uppercase tracking-tight text-[#111111] dark:text-[#F2F1ED]">
                  Dispatch Message
                </h3>
                <p className="text-xs font-mono uppercase text-[#888888]">
                  Fill out the parameters below to send a transmission.
                </p>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] text-center space-y-3"
                >
                  <div className="w-10 h-10 rounded-full border border-black/20 dark:border-white/20 flex items-center justify-center mx-auto text-[#111111] dark:text-[#F2F1ED]">
                    <Check className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-bold font-display uppercase tracking-tight text-[#111111] dark:text-[#F2F1ED]">
                    Message Transmitted
                  </h4>
                  <p className="text-xs sm:text-sm text-[#666666] dark:text-[#888888] max-w-md mx-auto font-body">
                    Thank you for reaching out. I will respond to your inquiry shortly. You can also write directly to{' '}
                    <strong className="text-[#111111] dark:text-[#F2F1ED] font-mono">{profileData.email}</strong>.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider border border-black/20 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    Send Another Note
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 text-xs font-mono">
                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#666666] dark:text-[#888888] uppercase tracking-wider mb-1.5 font-bold">
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Jane Doe"
                        className={`w-full px-4 py-3 rounded-xl bg-transparent border ${
                          errors.name
                            ? 'border-rose-500'
                            : 'border-black/15 dark:border-white/15 focus:border-[#111111] dark:focus:border-[#F2F1ED]'
                        } text-sm text-[#111111] dark:text-[#F2F1ED] placeholder:text-[#999999] focus:outline-none transition-colors`}
                      />
                      {errors.name && <p className="text-xs text-rose-500 mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-[#666666] dark:text-[#888888] uppercase tracking-wider mb-1.5 font-bold">
                        Your Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="jane@example.com"
                        className={`w-full px-4 py-3 rounded-xl bg-transparent border ${
                          errors.email
                            ? 'border-rose-500'
                            : 'border-black/15 dark:border-white/15 focus:border-[#111111] dark:focus:border-[#F2F1ED]'
                        } text-sm text-[#111111] dark:text-[#F2F1ED] placeholder:text-[#999999] focus:outline-none transition-colors`}
                      />
                      {errors.email && <p className="text-xs text-rose-500 mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-[#666666] dark:text-[#888888] uppercase tracking-wider mb-1.5 font-bold">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Engineering role / Project inquiry"
                      className={`w-full px-4 py-3 rounded-xl bg-transparent border ${
                        errors.subject
                          ? 'border-rose-500'
                          : 'border-black/15 dark:border-white/15 focus:border-[#111111] dark:focus:border-[#F2F1ED]'
                      } text-sm text-[#111111] dark:text-[#F2F1ED] placeholder:text-[#999999] focus:outline-none transition-colors`}
                    />
                    {errors.subject && <p className="text-xs text-rose-500 mt-1">{errors.subject}</p>}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-[#666666] dark:text-[#888888] uppercase tracking-wider mb-1.5 font-bold">
                      Message
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Hi Arif, I'd like to discuss an opportunity..."
                      className={`w-full px-4 py-3 rounded-xl bg-transparent border ${
                        errors.message
                          ? 'border-rose-500'
                          : 'border-black/15 dark:border-white/15 focus:border-[#111111] dark:focus:border-[#F2F1ED]'
                      } text-sm text-[#111111] dark:text-[#F2F1ED] placeholder:text-[#999999] focus:outline-none transition-colors custom-scrollbar`}
                    />
                    {errors.message && <p className="text-xs text-rose-500 mt-1">{errors.message}</p>}
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
          </motion.div>
        </div>
      </div>
    </section>
  );
};

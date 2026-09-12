import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, ExternalLink, CheckCircle2 } from 'lucide-react';
import { profileData } from '../data/profile';
import { Button } from '../components/common/Button';

export const ResumeCTA: React.FC = () => {
  return (
    <section className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-primary-900/60 via-[#0d1527] to-slate-900/80 border border-primary-500/30 p-8 sm:p-12 shadow-2xl backdrop-blur-xl"
        >
          {/* Ambient Glows */}
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-accent-cyan/15 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-primary-600/20 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-8 space-y-4 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-primary-500/20 text-primary-300 border border-primary-500/30">
                <FileText className="w-3.5 h-3.5" />
                <span>Curriculum Vitae</span>
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                Want to know more about my experience & qualifications?
              </h3>

              <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
                Download my comprehensive resume for a detailed breakdown of my technical projects, engineering coursework, problem-solving skills, and academic history.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs sm:text-sm text-slate-300 pt-2">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-accent-cyan" />
                  Full-Stack Experience
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-accent-cyan" />
                  AI/ML Projects
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-accent-cyan" />
                  Verified Credentials
                </span>
              </div>
            </div>

            {/* Right Action Buttons */}
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-center justify-center gap-3 w-full">
              <Button
                variant="primary"
                size="lg"
                href={profileData.resumeUrl}
                target="_blank"
                fullWidth
                icon={<ExternalLink className="w-4 h-4" />}
                iconPosition="right"
              >
                View Full Resume
              </Button>

              <Button
                variant="secondary"
                size="lg"
                href={profileData.resumeUrl}
                download="Arif_Khadim_Resume.pdf"
                fullWidth
                icon={<Download className="w-4 h-4" />}
              >
                Download PDF
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

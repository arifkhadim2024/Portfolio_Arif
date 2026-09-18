import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, ExternalLink, CheckCircle2, ShieldCheck } from 'lucide-react';
import { profileData } from '../data/profile';
import { Button } from '../components/common/Button';
import { TiltCard } from '../components/visual/TiltCard';

export const ResumeCTA: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TiltCard maxTilt={6} glareOpacity={0.35}>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl overflow-hidden glass-card-3d border border-purple-500/35 p-8 sm:p-14 shadow-2xl backdrop-blur-2xl"
          >
            {/* Ambient Lighting Volumetric Glows (Violet & Plum) */}
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-fuchsia-600/15 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-purple-700/20 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Narrative & 3D Document Highlights (8 cols) */}
              <div className="lg:col-span-8 space-y-5 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold bg-purple-950/80 text-purple-300 border border-purple-500/40 shadow-md backdrop-blur">
                  <FileText className="w-3.5 h-3.5 text-accent-gold" />
                  <span>Curriculum Vitae & Credentials</span>
                </div>

                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#FDFBF7] dark:text-[#FDFBF7] light:text-slate-900 tracking-tight leading-[1.15]">
                  Interested in my technical capabilities & experience?
                </h3>

                <p className="text-sm sm:text-base text-slate-300 dark:text-slate-300 light:text-slate-600 max-w-2xl leading-relaxed font-normal">
                  Download my comprehensive engineering resume for a detailed breakdown of my full-stack projects, AI / ML models, academic record, and industry certifications.
                </p>

                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs sm:text-sm text-slate-300 dark:text-slate-300 light:text-slate-700 pt-2">
                  <span className="flex items-center gap-1.5 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-accent-gold" />
                    Full-Stack Architecture
                  </span>
                  <span className="flex items-center gap-1.5 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-accent-gold" />
                    Applied AI & ML Models
                  </span>
                  <span className="flex items-center gap-1.5 font-medium">
                    <ShieldCheck className="w-4 h-4 text-accent-gold" />
                    Verified Credentials
                  </span>
                </div>
              </div>

              {/* Right Floating Holographic Action Matrix (4 cols) */}
              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-center justify-center gap-3.5 w-full">
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
                  download="Arif_Mohammed_Khadim_Resume.pdf"
                  fullWidth
                  icon={<Download className="w-4 h-4" />}
                >
                  Download PDF
                </Button>
              </div>
            </div>
          </motion.div>
        </TiltCard>
      </div>
    </section>
  );
};

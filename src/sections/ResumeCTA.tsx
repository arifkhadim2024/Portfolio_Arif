import React from 'react';
import { motion } from 'framer-motion';
import { Download, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { profileData } from '../data/profile';
import { Button } from '../components/common/Button';

export const ResumeCTA: React.FC = () => {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-neutral-900/60 p-8 sm:p-14 shadow-sm"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Narrative (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              <div className="text-xs font-mono uppercase tracking-widest text-[#888888]">
                [ CURRICULUM VITAE ]
              </div>

              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#111111] dark:text-[#F2F1ED] font-display uppercase leading-[0.95]">
                Interested in my complete engineering track record?
              </h3>

              <p className="text-base text-[#555555] dark:text-[#AAAAAA] max-w-2xl leading-relaxed font-body">
                Download my comprehensive technical resume for an in-depth breakdown of full-stack architectures, applied machine learning algorithms, academic milestones, and verified credentials.
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#666666] dark:text-[#888888] pt-2">
                <span className="flex items-center gap-1.5 uppercase">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#111111] dark:text-[#F2F1ED]" />
                  Full-Stack Architecture
                </span>
                <span className="flex items-center gap-1.5 uppercase">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#111111] dark:text-[#F2F1ED]" />
                  Applied AI / ML Systems
                </span>
                <span className="flex items-center gap-1.5 uppercase">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#111111] dark:text-[#F2F1ED]" />
                  Verified Credentials
                </span>
              </div>
            </div>

            {/* Right Action Matrix (4 cols) */}
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-stretch gap-3.5 w-full">
              <Button
                variant="primary"
                size="lg"
                href={profileData.resumeUrl}
                target="_blank"
                fullWidth
                icon={<ArrowUpRight className="w-4 h-4" />}
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
      </div>
    </section>
  );
};

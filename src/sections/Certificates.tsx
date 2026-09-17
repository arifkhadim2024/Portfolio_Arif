import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { certificatesData } from '../data/certificates';
import type { Certificate } from '../types';
import { SectionHeader } from '../components/common/SectionHeader';
import { Badge } from '../components/common/Badge';
import { CertificateModal } from '../components/modals/CertificateModal';
import { SpotlightCard } from '../components/visual/SpotlightCard';
import { Award, ExternalLink, Eye, ShieldCheck, Calendar } from 'lucide-react';

export const Certificates: React.FC = () => {
  const [activeCert, setActiveCert] = useState<Certificate | null>(null);

  return (
    <section id="certificates" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Credentials"
          title="Certifications & Honors"
          subtitle="Accredited certifications validating industry-standard competencies in cloud engineering, deep learning, and full-stack development."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificatesData.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <SpotlightCard className="group h-full flex flex-col justify-between hover:shadow-xl transition-all duration-300 overflow-hidden p-6 space-y-4">
                {/* Header with Icon & Date */}
                <div className="flex items-start justify-between gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary-500/10 border border-primary-500/20 text-primary-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Award className="w-6 h-6" />
                  </div>
                  <span className="flex items-center gap-1 text-xs font-mono text-slate-400 bg-slate-800/80 dark:bg-slate-800/80 light:bg-slate-100 px-2.5 py-1 rounded-full border border-slate-700/60 dark:border-slate-700/60 light:border-slate-300">
                    <Calendar className="w-3 h-3 text-accent-cyan" />
                    {cert.issueDate}
                  </span>
                </div>

                {/* Title & Issuer */}
                <div>
                  <h3 className="text-lg font-bold text-white dark:text-white light:text-slate-900 group-hover:text-primary-300 transition-colors line-clamp-2">
                    {cert.title}
                  </h3>
                  <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-500 font-medium mt-1">
                    {cert.issuer}
                  </p>
                </div>

                {/* Credential ID */}
                {cert.credentialId && (
                  <div className="flex items-center gap-1.5 text-xs font-mono text-accent-cyan bg-cyan-500/10 px-2.5 py-1 rounded-lg border border-cyan-500/20 w-fit">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>ID: {cert.credentialId}</span>
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {cert.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="neutral" size="sm">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Footer Action buttons */}
                <div className="pt-4 border-t border-slate-800 dark:border-slate-800 light:border-slate-200 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setActiveCert(cert)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-400 hover:text-primary-300 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Preview</span>
                  </button>

                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-white dark:hover:text-white light:hover:text-slate-900 transition-colors"
                    >
                      <span>Verify</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Certificate Lightbox Modal */}
      <CertificateModal
        certificate={activeCert}
        isOpen={Boolean(activeCert)}
        onClose={() => setActiveCert(null)}
      />
    </section>
  );
};

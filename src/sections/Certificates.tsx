import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { certificatesData } from '../data/certificates';
import type { Certificate } from '../types';
import { SectionHeader } from '../components/common/SectionHeader';
import { Badge } from '../components/common/Badge';
import { CertificateModal } from '../components/modals/CertificateModal';
import { ArrowUpRight, Eye } from 'lucide-react';

export const Certificates: React.FC = () => {
  const [activeCert, setActiveCert] = useState<Certificate | null>(null);

  return (
    <section id="certificates" className="py-28 lg:py-40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="06 // CREDENTIALS"
          title="Certifications & Honors"
          subtitle="Accredited credentials validating industry competencies in AI, full-stack web engineering, Python, and design thinking."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificatesData.map((cert, index) => {
            const certNumber = String(index + 1).padStart(2, '0');
            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <div
                  onClick={() => setActiveCert(cert)}
                  className="editorial-card group h-full flex flex-col justify-between rounded-2xl border border-black/10 dark:border-white/10 p-6 space-y-5 cursor-pointer bg-white/70 dark:bg-neutral-900/70"
                >
                  {/* Top Row */}
                  <div className="flex items-center justify-between text-xs font-mono text-[#888888] uppercase tracking-wider pb-3 border-b border-black/10 dark:border-white/10">
                    <span>CERT // {certNumber}</span>
                    <span>{cert.issueDate}</span>
                  </div>

                  {/* Title & Issuer */}
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold font-display uppercase tracking-tight text-[#111111] dark:text-[#F2F1ED] group-hover:text-[#555555] transition-colors leading-snug">
                      {cert.title}
                    </h3>
                    <p className="text-xs font-mono uppercase text-[#777777]">
                      {cert.issuer}
                    </p>
                  </div>

                  {/* Credential ID */}
                  {cert.credentialId && (
                    <div className="text-[11px] font-mono text-[#888888]">
                      ID: <span className="font-bold text-[#111111] dark:text-[#F2F1ED]">{cert.credentialId}</span>
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

                  {/* Actions Footer */}
                  <div className="pt-4 border-t border-black/10 dark:border-white/10 flex items-center justify-between gap-2 text-xs font-mono">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveCert(cert);
                      }}
                      className="inline-flex items-center gap-1.5 text-[#111111] dark:text-[#F2F1ED] font-bold uppercase tracking-wider hover:underline underline-offset-4 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Preview</span>
                    </button>

                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 text-[#888888] hover:text-[#111111] dark:hover:text-[#F2F1ED] transition-colors uppercase tracking-wider"
                      >
                        <span>Verify</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
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

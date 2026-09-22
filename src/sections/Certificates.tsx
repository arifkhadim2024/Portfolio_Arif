import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { certificatesData } from '../data/certificates';
import type { Certificate } from '../types';
import { SectionHeader } from '../components/common/SectionHeader';
import { Badge } from '../components/common/Badge';
import { CertificateModal } from '../components/modals/CertificateModal';
import { Award, ExternalLink, Eye, ShieldCheck, Calendar } from 'lucide-react';
import { TiltCard } from '../components/visual/TiltCard';

export const Certificates: React.FC = () => {
  const [activeCert, setActiveCert] = useState<Certificate | null>(null);

  return (
    <section id="certificates" className="py-24 lg:py-32 relative bg-dark-bg/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Credentials"
          title="Certifications & Honors"
          subtitle="Accredited certifications validating industry-standard competencies in AI, full-stack development, and problem solving."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificatesData.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <TiltCard maxTilt={8} glareOpacity={0.25} className="h-full">
                <div
                  onClick={() => setActiveCert(cert)}
                  className="glass-card-3d group h-full flex flex-col justify-between rounded-3xl border border-gold-500/15 hover:border-gold-500/40 hover:shadow-2xl hover:shadow-gold-950/30 transition-all overflow-hidden p-6 space-y-4 cursor-pointer"
                >
                  {/* Header with Icon & Date */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gold-500/15 border border-gold-500/30 text-gold-400 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
                      <Award className="w-6 h-6" />
                    </div>
                    <span className="flex items-center gap-1.5 text-xs font-mono text-slate-400 bg-[#17120A] px-3 py-1 rounded-full border border-gold-500/20">
                      <Calendar className="w-3.5 h-3.5 text-accent-gold" />
                      {cert.issueDate}
                    </span>
                  </div>

                  {/* Title & Issuer */}
                  <div>
                    <h3 className="text-lg font-bold text-[#FFF8E7] dark:text-[#FFF8E7] light:text-slate-900 group-hover:text-gold-300 transition-colors line-clamp-2">
                      {cert.title}
                    </h3>
                    <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-500 font-medium mt-1">
                      {cert.issuer}
                    </p>
                  </div>

                  {/* Credential ID in Metallic Gold */}
                  {cert.credentialId && (
                    <div className="flex items-center gap-1.5 text-xs font-mono text-gold-300 bg-gold-500/15 px-3 py-1 rounded-xl border border-gold-500/30 w-fit">
                      <ShieldCheck className="w-3.5 h-3.5 text-accent-gold" />
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
                  <div className="pt-4 border-t border-gold-500/15 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveCert(cert);
                      }}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold-400 hover:text-gold-300 transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-accent-gold" />
                      <span>Preview Certificate</span>
                    </button>

                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-[#FFF8E7] dark:hover:text-[#FFF8E7] light:hover:text-slate-900 transition-colors"
                      >
                        <span>Open Document</span>
                        <ExternalLink className="w-3 h-3 text-gold-400" />
                      </a>
                    )}
                  </div>
                </div>
              </TiltCard>
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

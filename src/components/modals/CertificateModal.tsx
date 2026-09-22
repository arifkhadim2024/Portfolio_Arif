import React from 'react';
import type { Certificate } from '../../types';
import { Modal } from '../common/Modal';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { Award, ExternalLink, Calendar, ShieldCheck } from 'lucide-react';

interface CertificateModalProps {
  certificate: Certificate | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  certificate,
  isOpen,
  onClose,
}) => {
  if (!certificate) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="3xl">
      <div className="space-y-6">
        {/* Certificate Preview Image / Document Viewer */}
        {certificate.image && (
          <div className="relative group rounded-2xl overflow-hidden border border-gold-500/30 aspect-[16/11] bg-[#030304] shadow-2xl">
            <img
              src={certificate.image}
              alt={certificate.title}
              className="w-full h-full object-contain bg-[#0B0A0E] transition-transform duration-300 group-hover:scale-[1.02]"
              loading="lazy"
            />
            <div className="absolute top-3.5 right-3.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#0B0A0E]/95 text-gold-300 shadow-lg backdrop-blur border border-gold-400/40">
                <ShieldCheck className="w-3.5 h-3.5 text-accent-gold" />
                Verified Credential
              </span>
            </div>

            {certificate.credentialUrl && (
              <a
                href={certificate.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-[#FFF8E7] text-xs font-semibold backdrop-blur-[2px]"
                title="Open full document in new tab"
              >
                <span className="bg-[#17120A]/90 px-4 py-2 rounded-xl border border-gold-500/30 shadow-xl flex items-center gap-2 text-gold-200">
                  <ExternalLink className="w-4 h-4 text-accent-gold" />
                  <span>Click to Open Full Document</span>
                </span>
              </a>
            )}
          </div>
        )}

        {/* Certificate Title & Issuer */}
        <div className="flex items-start gap-4">
          <div className="p-3.5 rounded-2xl bg-gold-500/15 border border-gold-500/30 text-gold-400 shadow-inner">
            <Award className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#FFF8E7] dark:text-[#FFF8E7] light:text-slate-900 tracking-tight">
              {certificate.title}
            </h3>
            <p className="text-sm text-slate-400 dark:text-slate-400 light:text-slate-600 mt-0.5">
              Issued by <strong className="text-slate-200 dark:text-slate-200 light:text-slate-800">{certificate.issuer}</strong>
            </p>
          </div>
        </div>

        {/* Metadata Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-[#0B0A0E]/90 dark:bg-[#0B0A0E]/90 light:bg-slate-100/90 border border-gold-500/20 text-xs sm:text-sm">
          <div className="flex items-center gap-2 text-slate-300 dark:text-slate-300 light:text-slate-700 font-mono">
            <Calendar className="w-4 h-4 text-gold-400 flex-shrink-0" />
            <span>Issued: <strong>{certificate.issueDate}</strong></span>
          </div>

          {certificate.credentialId && (
            <div className="flex items-center gap-2 text-slate-300 dark:text-slate-300 light:text-slate-700 font-mono text-xs">
              <ShieldCheck className="w-4 h-4 text-accent-gold flex-shrink-0" />
              <span>ID: <strong className="text-gold-300">{certificate.credentialId}</strong></span>
            </div>
          )}
        </div>

        {/* Tags / Topics covered */}
        {certificate.tags && certificate.tags.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Skills & Competencies Validated
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {certificate.tags.map((tag) => (
                <Badge key={tag} variant="neutral" size="sm">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="pt-4 border-t border-gold-500/20 flex items-center justify-end gap-3">
          <Button variant="outline" size="md" onClick={onClose}>
            Close Preview
          </Button>

          {certificate.credentialUrl && (
            <Button
              variant="primary"
              size="md"
              href={certificate.credentialUrl}
              target="_blank"
              icon={<ExternalLink className="w-4 h-4 text-[#070709]" />}
              iconPosition="right"
            >
              Open Official Document
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};

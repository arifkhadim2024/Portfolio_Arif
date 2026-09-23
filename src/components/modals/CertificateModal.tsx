import React from 'react';
import type { Certificate } from '../../types';
import { Modal } from '../common/Modal';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { ExternalLink, Calendar, ShieldCheck, ArrowUpRight } from 'lucide-react';

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
          <div className="relative group rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 aspect-[16/11] bg-[#0E0E0E] shadow-sm">
            <img
              src={certificate.image}
              alt={certificate.title}
              className="w-full h-full object-contain bg-[#111111] transition-transform duration-300 group-hover:scale-[1.01]"
              loading="lazy"
            />
            <div className="absolute top-3.5 right-3.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono uppercase tracking-wider bg-[#111111]/90 text-[#F2F1ED] backdrop-blur-sm shadow-md">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified Credential
              </span>
            </div>

            {certificate.credentialUrl && (
              <a
                href={certificate.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-mono uppercase tracking-wider backdrop-blur-[2px]"
                title="Open full document in new tab"
              >
                <span className="bg-[#111111] px-4 py-2 rounded-lg border border-white/20 shadow-xl flex items-center gap-2 text-[#F2F1ED]">
                  <ExternalLink className="w-4 h-4" />
                  <span>Open Full Document</span>
                </span>
              </a>
            )}
          </div>
        )}

        {/* Certificate Title & Issuer */}
        <div className="space-y-1">
          <h3 className="text-xl sm:text-2xl font-bold font-display uppercase tracking-tight text-[#111111] dark:text-[#F2F1ED]">
            {certificate.title}
          </h3>
          <p className="text-xs font-mono uppercase text-[#777777] tracking-wider">
            Issued by <strong className="text-[#111111] dark:text-[#F2F1ED]">{certificate.issuer}</strong>
          </p>
        </div>

        {/* Metadata Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-xl border border-black/10 dark:border-white/10 bg-white/50 dark:bg-neutral-900/50 text-xs font-mono">
          <div className="flex items-center gap-2 text-[#666666] dark:text-[#AAAAAA]">
            <Calendar className="w-4 h-4 text-[#111111] dark:text-[#F2F1ED] flex-shrink-0" />
            <span>Issued: <strong>{certificate.issueDate}</strong></span>
          </div>

          {certificate.credentialId && (
            <div className="flex items-center gap-2 text-[#666666] dark:text-[#AAAAAA]">
              <ShieldCheck className="w-4 h-4 text-[#111111] dark:text-[#F2F1ED] flex-shrink-0" />
              <span>ID: <strong className="text-[#111111] dark:text-[#F2F1ED]">{certificate.credentialId}</strong></span>
            </div>
          )}
        </div>

        {/* Tags / Topics covered */}
        {certificate.tags && certificate.tags.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#888888]">
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
        <div className="pt-6 border-t border-black/10 dark:border-white/10 flex items-center justify-end gap-3">
          <Button variant="secondary" size="md" onClick={onClose}>
            Close
          </Button>

          {certificate.credentialUrl && (
            <Button
              variant="primary"
              size="md"
              href={certificate.credentialUrl}
              target="_blank"
              icon={<ArrowUpRight className="w-3.5 h-3.5" />}
              iconPosition="right"
            >
              Open Official Credential
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};

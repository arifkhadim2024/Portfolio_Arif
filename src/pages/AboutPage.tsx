import React from 'react';
import { portfolioData, getTechTagStyle } from '../data/portfolioData';
import { CertificationsSection } from '../sections/CertificationsSection';
import { EducationSection } from '../sections/EducationSection';
import { ResumeCTASection } from '../sections/ResumeCTASection';
import { FooterCards } from '../components/FooterCards';
import { MagneticWrapper } from '../components/MagneticWrapper';
import { FloatingAccents3D } from '../components/FloatingAccents3D';

interface AboutPageProps {
  onNavigate: (page: 'home' | 'projects' | 'about' | 'contact') => void;
  onOpenContactModal: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onNavigate,
  onOpenContactModal,
}) => {
  return (
    <div className="w-full pt-32 pb-16">
      {/* Background Animated Gradient Blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        <div className="absolute top-1/4 left-1/10 w-96 h-96 rounded-full bg-[#7C3AED]/15 blur-[120px]" />
        <div className="absolute top-1/2 right-1/10 w-[30rem] h-[30rem] rounded-full bg-[#22D3EE]/12 blur-[130px]" />
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 rounded-full bg-[#F472B6]/12 blur-[110px]" />
      </div>

      <div className="container-custom relative z-10">
        {/* About Hero Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-28">
          <div className="lg:col-span-7">
            <span className="text-xs md:text-sm font-display font-black tracking-[0.4em] uppercase text-[var(--accent-secondary)] block mb-3 font-bold">
              MY HUMBLE SELF
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-black tracking-tight text-white uppercase mb-8" data-cursor="text">
              Get To <span className="text-gradient-signature">Know Me</span>
            </h1>
            <div className="flex flex-col gap-4 text-sm md:text-base text-[var(--color-text-muted)] font-sans leading-relaxed max-w-xl">
              <p>
                I am <strong className="text-white font-bold">Arif Mohammed Khadim</strong>, a software developer and computer science engineer dedicated to bridging the divide between architectural backend resilience and award-winning interactive frontend artistry.
              </p>
              <p>
                With deep roots in computer science, full-stack systems, and AI/ML pipelines, I specialize in engineering digital products that look breathtaking and perform with ultra-low latency.
              </p>
            </div>
            <div className="mt-8 flex items-center gap-4">
              <MagneticWrapper strength={0.35} dataCursor="button">
                <button
                  onClick={onOpenContactModal}
                  className="button-custom button-gradient px-8 py-4 text-xs md:text-sm shadow-glow-violet"
                  data-cursor="button"
                >
                  Let's Work Together
                </button>
              </MagneticWrapper>
            </div>
          </div>

          <div className="lg:col-span-5 relative flex justify-center items-center">
            {/* 3D Floating Accents Layer */}
            <div className="absolute -inset-10 pointer-events-none z-0">
              <FloatingAccents3D />
            </div>

            {/* Glowing Gradient Border Frame for Portrait */}
            <div
              className="relative p-1 rounded-3xl bg-gradient-to-tr from-[#7C3AED] via-[#F472B6] to-[#22D3EE] shadow-[0_0_50px_rgba(124,58,237,0.35)] z-10 transition-transform duration-500 hover:scale-[1.02]"
              data-cursor="project"
            >
              <div className="relative w-72 sm:w-80 md:w-96 h-88 sm:h-96 md:h-[480px] rounded-[22px] overflow-hidden bg-[#15102A]">
                <img
                  src={portfolioData.avatarUrl}
                  alt={portfolioData.name}
                  className="w-full h-full object-cover img-vibrant transition-all duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)] via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#22D3EE] block mb-1 font-bold">
                    LEAD ENGINEER
                  </span>
                  <span className="text-xl font-display font-black text-white">
                    {portfolioData.name}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* The 4 Signature Values with Distinctive Casing & Vibrant Accents */}
        <div className="mb-32">
          <div className="mb-16">
            <span className="text-xs md:text-sm font-display font-black tracking-[0.4em] uppercase text-[var(--accent-secondary)] block mb-3 font-bold">
              ENGINEERING PHILOSOPHY
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-black tracking-tight text-white uppercase">
              How I <span className="text-gradient-signature">Operate</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {portfolioData.values.map((val, idx) => {
              const accentColor =
                idx === 0
                  ? '#7C3AED'
                  : idx === 1
                  ? '#22D3EE'
                  : idx === 2
                  ? '#F472B6'
                  : '#A3E635';

              return (
                <div
                  key={val.id}
                  className="bg-[var(--color-surface)] border border-[#7C3AED]/20 rounded-3xl p-8 md:p-10 flex flex-col justify-between hover:border-[#22D3EE]/60 hover:shadow-glow-signature transition-all duration-300 group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className="text-xs font-mono uppercase tracking-widest font-bold"
                        style={{ color: accentColor }}
                      >
                        VALUE 0{idx + 1}
                      </span>
                      <span
                        className="w-3 h-3 rounded-full shadow-lg"
                        style={{ backgroundColor: accentColor, boxShadow: `0 0 12px ${accentColor}` }}
                      />
                    </div>

                    {/* Stylized Signature Title */}
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-display font-black text-white tracking-tight uppercase mb-2 group-hover:text-gradient-signature transition-colors">
                      {val.stylizedTitle}
                    </h3>
                    <span className="text-xs md:text-sm font-mono text-[var(--color-text-subtle)] block mb-4 uppercase">
                      {val.subtitle}
                    </span>

                    <p className="text-xs md:text-sm text-[var(--color-text-muted)] leading-relaxed mb-6">
                      {val.description}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-white/10 flex flex-col gap-2.5">
                    {val.points.map((pt, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 text-xs md:text-sm text-[var(--color-text)]"
                      >
                        <span style={{ color: accentColor }} className="font-bold">
                          →
                        </span>
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Experience Timeline */}
        <div className="mb-32">
          <div className="mb-12">
            <span className="text-xs md:text-sm font-display font-black tracking-[0.4em] uppercase text-[var(--accent-secondary)] block mb-3 font-bold">
              CAREER CHRONOLOGY
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-black tracking-tight text-white uppercase">
              Experience & <span className="text-gradient-signature">Internships</span>
            </h2>
          </div>

          <div className="flex flex-col border-t border-[#7C3AED]/20">
            {portfolioData.experiences.map((exp) => (
              <div
                key={exp.id}
                className="py-10 border-b border-white/10 grid grid-cols-1 md:grid-cols-12 gap-8 items-start hover:bg-white/[0.02] transition-colors rounded-2xl px-4"
              >
                <div className="md:col-span-3">
                  <span className="text-xs md:text-sm font-mono tracking-widest uppercase text-[#22D3EE] font-bold block mb-1">
                    {exp.period}
                  </span>
                  <span className="text-xs font-mono text-[var(--color-text-subtle)] block">
                    {exp.type}
                  </span>
                </div>

                <div className="md:col-span-4">
                  <h3 className="text-xl md:text-2xl font-display font-black text-white uppercase">
                    {exp.role}
                  </h3>
                  <span className="text-xs font-mono text-[var(--color-text-subtle)] block mt-1 mb-3">
                    {exp.company} — {exp.location}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className={`px-2.5 py-1 rounded-lg border text-[11px] font-mono font-medium shadow-sm ${getTechTagStyle(tech)}`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-5">
                  <p className="text-xs md:text-sm text-[var(--color-text-muted)] leading-relaxed mb-4">
                    {exp.description}
                  </p>
                  <ul className="flex flex-col gap-2">
                    {exp.achievements.map((item, idx) => (
                      <li
                        key={idx}
                        className="text-xs md:text-sm text-[var(--color-text-muted)] leading-relaxed flex items-start gap-2"
                      >
                        <span className="text-[#F472B6] font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Education Section */}
      <EducationSection />

      {/* Industry Certifications Section */}
      <CertificationsSection />

      {/* Resume CTA Section */}
      <ResumeCTASection />

      {/* Footer */}
      <FooterCards currentPage="about" onNavigate={onNavigate} />
    </div>
  );
};

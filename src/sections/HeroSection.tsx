import React, { useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import { Canvas3D } from '../components/Canvas3D';
import { MagneticWrapper } from '../components/MagneticWrapper';

interface HeroSectionProps {
  onOpenContactModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenContactModal }) => {
  const [heroMode, setHeroMode] = useState<'day' | 'night'>('day');

  const toggleMode = () => {
    setHeroMode(heroMode === 'day' ? 'night' : 'day');
  };

  return (
    <section className="relative w-full min-h-[95vh] flex flex-col justify-center pt-28 pb-16 overflow-hidden">
      {/* Background Animated Gradient Mesh Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        {/* Violet Blob */}
        <div className="absolute top-1/4 left-1/10 w-96 h-96 rounded-full bg-[#7C3AED]/20 blur-[100px] animate-pulse-glow" />
        {/* Hot Pink Blob */}
        <div className="absolute top-1/3 right-1/10 w-[28rem] h-[28rem] rounded-full bg-[#F472B6]/18 blur-[120px] animate-float-slow" />
        {/* Cyan Blob */}
        <div className="absolute bottom-1/10 left-1/3 w-80 h-80 rounded-full bg-[#22D3EE]/15 blur-[90px] animate-pulse-glow" />
        {/* Lime Accent Glow */}
        <div className="absolute top-10 right-1/3 w-64 h-64 rounded-full bg-[#A3E635]/10 blur-[110px]" />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Visual 3D Canvas & Portrait Switcher */}
          <div className="lg:col-span-6 relative flex items-center justify-center order-2 lg:order-1 min-h-[360px] md:min-h-[500px]">
            {/* 3D Canvas Ambient Halo */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-80 md:w-[30rem] h-80 md:h-[30rem] rounded-full bg-gradient-to-tr from-[#7C3AED]/25 via-[#F472B6]/20 to-[#22D3EE]/25 blur-3xl animate-blob-spin" />
            </div>

            {heroMode === 'day' ? (
              /* 3D Interactive WebGL Mesh */
              <div
                className="w-full h-[380px] md:h-[500px] relative transition-opacity duration-500"
                data-cursor="project"
              >
                <Canvas3D isNight={false} />
              </div>
            ) : (
              /* Real Developer Portrait View with Glowing Gradient Frame */
              <div
                className="relative p-1 rounded-3xl bg-gradient-to-tr from-[#7C3AED] via-[#F472B6] to-[#22D3EE] shadow-[0_0_50px_rgba(124,58,237,0.35)] transition-all duration-500 animate-fadeIn"
                data-cursor="project"
              >
                <div className="relative w-72 md:w-96 h-80 md:h-[440px] rounded-[22px] overflow-hidden bg-[#15102A]">
                  <img
                    src={portfolioData.avatarUrl}
                    alt={portfolioData.name}
                    className="w-full h-full object-cover img-vibrant hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)] via-transparent to-transparent opacity-85" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="text-xs font-mono uppercase tracking-widest text-[#22D3EE] block mb-1 font-bold">
                      ENGINEER PROFILE
                    </span>
                    <span className="text-xl font-display font-black text-white">
                      {portfolioData.name}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Poster Typography & Interactive Pill Switcher */}
          <div className="lg:col-span-6 flex flex-col justify-center order-1 lg:order-2">
            {/* Small Pre-headline with Cyan Accent */}
            <div className="text-xs md:text-sm font-display font-black tracking-[0.4em] uppercase text-[#22D3EE] mb-3 md:mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#22D3EE] animate-ping" />
              <span>{portfolioData.hero.greeting}</span>
            </div>

            {/* Massive Poster Headline with Signature Gradient */}
            <div className="relative mb-4">
              <h1
                className="h1 text-4xl sm:text-6xl md:text-7xl lg:text-[7.2rem] font-display font-black tracking-tight uppercase leading-[0.9] text-white"
                data-cursor="text"
              >
                {heroMode === 'day' ? (
                  <>
                    The <span className="text-gradient-signature">Perfect Website</span>
                  </>
                ) : (
                  <>
                    <span className="text-gradient-signature">Creative</span> Engineer
                  </>
                )}
              </h1>

              {/* Interactive Pill Switcher ("AK" Badge with "click me" arrow) */}
              <div className="inline-flex items-center gap-4 mt-6">
                <MagneticWrapper strength={0.4} dataCursor="button">
                  <button
                    onClick={toggleMode}
                    className="group relative flex items-center gap-3 bg-[var(--color-surface)] hover:bg-gradient-signature border border-white/20 px-5 py-2.5 rounded-full shadow-glow-violet transition-all duration-300 hover:scale-105 focus:outline-none"
                    aria-label="Toggle hero presentation mode"
                    data-cursor="button"
                  >
                    <span className="font-display font-black text-xs md:text-sm tracking-widest text-white uppercase">
                      {portfolioData.monogram}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#22D3EE] group-hover:bg-white transition-colors" />
                      <span className="w-2 h-2 rounded-full border border-[#F472B6] group-hover:border-white" />
                    </div>
                  </button>
                </MagneticWrapper>

                {/* Handwritten SVG "Click me" indicator arrow with Violet/Pink color */}
                <div className="flex items-center gap-2 text-[#F472B6] text-xs font-mono tracking-widest uppercase animate-bounce">
                  <svg width="24" height="16" viewBox="0 0 54 34" fill="currentColor">
                    <path d="M9.19964 10.2246C10.4533 10.1371 11.0633 10.9076 11.8652 11.2608C12.412 11.507 13.0131 11.7428 13.5861 11.7677C14.8148 11.8192 15.6244 10.3675 14.9578 9.37431C14.6145 8.88179 14.1766 8.41592 13.6914 8.06288C10.6359 5.85097 7.56036 3.64723 4.45286 1.47983C3.88851 1.07699 3.18226 0.813607 2.4889 0.638604C1.43766 0.363097 0.400658 1.20504 0.375987 2.25636C0.368605 2.55186 0.403745 2.8652 0.4448 3.16445C0.884957 6.08642 1.29085 9.0106 1.78537 11.9222C1.90048 12.6009 2.15498 13.305 2.51946 13.9059C3.21775 15.0617 4.45362 15.0166 5.1932 13.8508C5.39793 13.522 5.51528 13.1234 5.7699 12.517C6.24796 12.9665 6.5974 13.2459 6.89714 13.604C8.81362 15.8686 10.7159 18.1271 12.6123 20.3998C16.8453 25.4451 22.2873 28.8416 28.2169 31.5137C30.0698 32.3415 32.086 32.9392 34.0872 33.2155C37.2212 33.6522 40.3933 33.8394 43.5442 33.9183C47.0945 33.9989 50.0839 32.517 52.617 30.0969C53.0368 29.6926 53.4332 29.1457 53.5814 28.5941C53.6846 28.1896 53.5151 27.5212 53.2141 27.2455C52.9131 26.9698 52.2185 26.8772 51.8308 27.0462C51.1938 27.293 50.6214 27.7826 50.0586 28.2098C47.753 29.9292 45.1908 30.7113 42.3129 30.4983C39.3583 30.2696 36.3798 30.2963 33.4966 29.5004C27.1396 27.727 21.6939 24.3789 17.0955 19.7275C14.5897 17.199 12.4057 14.341 10.0797 11.6226C9.75749 11.2384 9.54762 10.7854 9.19964 10.2246Z" />
                  </svg>
                  <span>Click to toggle mode</span>
                </div>
              </div>
            </div>

            {/* Subheadline Row */}
            <div className="flex items-center gap-3 my-4">
              <span className="text-sm md:text-base font-display font-black tracking-[0.3em] uppercase text-[var(--color-text-muted)]">
                {heroMode === 'day' ? portfolioData.hero.subheadlineDay : portfolioData.hero.subheadlineNight}
              </span>
              <span className="text-[#F472B6] font-bold">—</span>
              <span className="text-sm md:text-base font-display font-black tracking-[0.3em] uppercase text-[#22D3EE]">
                {heroMode === 'day' ? portfolioData.hero.bylineDay : portfolioData.hero.bylineNight}
              </span>
            </div>

            {/* Interactive Reveal Bio Paragraph */}
            <p className="text-sm md:text-base text-[var(--color-text)] font-sans leading-relaxed max-w-xl my-4 transition-all duration-300">
              {heroMode === 'day' ? portfolioData.hero.switchBioDay : portfolioData.hero.switchBioNight}
            </p>

            {/* Main Overview Paragraph */}
            <p className="text-xs md:text-sm text-[var(--color-text-subtle)] font-sans leading-relaxed max-w-xl mb-8">
              {portfolioData.hero.paragraph}
            </p>

            {/* Hero CTA Button with Magnetic Pull & Gradient Effect */}
            <div className="flex items-center gap-4">
              <MagneticWrapper strength={0.35} dataCursor="button">
                <button
                  onClick={onOpenContactModal}
                  className="button-custom button-gradient px-8 py-4 text-xs md:text-sm rounded-[0.8rem]"
                  data-cursor="button"
                >
                  Let's Discuss Your Project
                </button>
              </MagneticWrapper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { Terminal, Copy, Check } from 'lucide-react';
import { profileData } from '../../data/profile';
import { useClipboard } from '../../hooks/useClipboard';

export const CodeSnippetCard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'skills' | 'contact'>('profile');
  const { copied, copy } = useClipboard(2000);

  const snippets = {
    profile: `const developer = {
  name: "${profileData.name}",
  title: "${profileData.headline.split('|')[0].trim()}",
  focus: ["Full-Stack", "AI/ML", "Cloud Systems"],
  passion: "Building performant, elegant software",
  openToRoles: ${profileData.openToWork ? 'true' : 'false'},
  status: "Available for internships & full-time"
};`,
    skills: `const coreTechStack = {
  languages: ["TypeScript", "Python", "JavaScript", "C++"],
  frontend: ["React.js", "Next.js", "Tailwind CSS"],
  backend: ["Node.js", "FastAPI", "Express"],
  databases: ["PostgreSQL", "MongoDB", "Redis"],
  ai_ml: ["PyTorch", "TensorFlow", "Scikit-Learn"]
};`,
    contact: `async function reachOut() {
  const recipient = "${profileData.email}";
  const location = "${profileData.location}";
  
  return await connect({
    target: recipient,
    message: "Let's build something awesome!"
  });
}`
  };

  const handleCopy = () => {
    copy(snippets[activeTab]);
  };

  return (
    <div className="relative rounded-3xl bg-[#0B0A0E]/95 border border-gold-500/30 shadow-2xl backdrop-blur-2xl overflow-hidden font-mono text-xs sm:text-sm">
      {/* Window Controls Bar */}
      <div className="flex items-center justify-between px-4 py-3.5 bg-[#030304] border-b border-gold-500/20">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500/80" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80" />
          <div className="w-3 h-3 rounded-full bg-gold-500/80" />
          <span className="ml-2 text-xs text-slate-400 flex items-center gap-1.5 font-mono">
            <Terminal className="w-3.5 h-3.5 text-accent-gold" />
            arif-khadim.ts
          </span>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1 bg-[#131118] p-1 rounded-xl border border-gold-500/20">
          {(['profile', 'skills', 'contact'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 rounded-lg text-xs capitalize transition-all cursor-pointer ${
                activeTab === tab
                  ? 'bg-gold-500/20 text-gold-300 font-semibold border border-gold-400/40 shadow-sm'
                  : 'text-slate-400 hover:text-[#FFF8E7]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className="p-1.5 rounded-xl text-slate-400 hover:text-[#FFF8E7] hover:bg-[#1A1726] border border-transparent hover:border-gold-500/20 transition-all cursor-pointer"
          title="Copy snippet"
          aria-label="Copy code snippet"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>

      {/* Code Area */}
      <div className="p-4 sm:p-5 overflow-x-auto">
        <pre className="text-slate-300 leading-relaxed font-mono">
          <code>
            {snippets[activeTab].split('\n').map((line, idx) => (
              <div key={idx} className="table-row">
                <span className="table-cell select-none pr-4 text-slate-600 text-right w-6">
                  {idx + 1}
                </span>
                <span className="table-cell whitespace-pre">
                  {line.includes('const') && (
                    <span className="text-gold-400 font-bold">const </span>
                  )}
                  {line.includes('async function') && (
                    <span className="text-gold-400 font-bold">async function </span>
                  )}
                  {line.includes('return await') && (
                    <span className="text-accent-gold font-semibold">return await </span>
                  )}
                  {line.includes('true') && (
                    <span className="text-amber-400 font-semibold">true</span>
                  )}
                  {line.includes('false') && (
                    <span className="text-rose-400 font-semibold">false</span>
                  )}
                  {!line.includes('const') && !line.includes('async') && !line.includes('return') && !line.includes('true') && !line.includes('false') && (
                    <span>{line}</span>
                  )}
                </span>
              </div>
            ))}
          </code>
        </pre>
      </div>

      {/* Footer bar */}
      <div className="px-4 py-2.5 bg-[#030304] border-t border-gold-500/20 flex items-center justify-between text-[11px] text-slate-500 font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
          <span>TypeScript Node v26</span>
        </div>
        <span>UTF-8 // ESM // Cosmic Architecture</span>
      </div>
    </div>
  );
};

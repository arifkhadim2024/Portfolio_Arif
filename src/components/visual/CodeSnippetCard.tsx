import React, { useState } from 'react';
import { Terminal, Copy, Check } from 'lucide-react';
import { profileData } from '../../data/profile';
import { useClipboard } from '../../hooks/useClipboard';

export const CodeSnippetCard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'skills' | 'contact'>('profile');
  const { copied, copy } = useClipboard(2000);

  const snippets = {
    profile: `const engineer = {
  name: "${profileData.name}",
  role: "Full-Stack & AI Engineer",
  education: "B.Tech in Computer Science",
  coreFocus: ["Full-Stack Architecture", "AI/ML Models", "Cloud Tools"],
  availableForRoles: ${profileData.openToWork ? 'true' : 'false'},
  location: "${profileData.location}"
};`,
    skills: `const technologyStack = {
  languages: ["Python", "TypeScript", "JavaScript", "SQL", "C++"],
  frontend: ["React.js", "Next.js", "Tailwind CSS", "Vite"],
  backend: ["FastAPI", "Node.js", "Express", "REST APIs"],
  ai_ml: ["PyTorch", "Scikit-Learn", "Computer Vision", "NLP"],
  databases: ["PostgreSQL", "MongoDB", "Redis", "Supabase"]
};`,
    contact: `async function reachOut() {
  const target = "${profileData.email}";
  
  return await dispatch({
    recipient: target,
    message: "Let's build something awesome."
  });
}`
  };

  const handleCopy = () => {
    copy(snippets[activeTab]);
  };

  return (
    <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-[#111111] text-[#F2F1ED] shadow-sm overflow-hidden font-mono text-xs">
      {/* Window Controls Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#0A0A0A] border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#333333]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#444444]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#666666]" />
          <span className="ml-2 text-[11px] text-[#888888] flex items-center gap-1.5">
            <Terminal className="w-3 h-3 text-[#CCCCCC]" />
            arif-khadim.ts
          </span>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1 bg-[#161616] p-0.5 rounded-lg border border-white/10">
          {(['profile', 'skills', 'contact'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-2.5 py-1 rounded-md text-[10px] uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === tab
                  ? 'bg-white text-[#111111] font-bold shadow-sm'
                  : 'text-[#888888] hover:text-[#F2F1ED]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className="p-1 rounded-md text-[#888888] hover:text-[#F2F1ED] hover:bg-white/10 transition-colors cursor-pointer"
          title="Copy snippet"
          aria-label="Copy code snippet"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Code Area */}
      <div className="p-4 sm:p-5 overflow-x-auto">
        <pre className="text-[#DDDDDD] leading-relaxed font-mono">
          <code>
            {snippets[activeTab].split('\n').map((line, idx) => (
              <div key={idx} className="table-row">
                <span className="table-cell select-none pr-4 text-[#555555] text-right w-6">
                  {idx + 1}
                </span>
                <span className="table-cell whitespace-pre">
                  {line.includes('const') && (
                    <span className="text-white font-bold">const </span>
                  )}
                  {line.includes('async function') && (
                    <span className="text-white font-bold">async function </span>
                  )}
                  {line.includes('return await') && (
                    <span className="text-[#AAAAAA] font-semibold">return await </span>
                  )}
                  {line.includes('true') && (
                    <span className="text-emerald-400 font-semibold">true</span>
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
      <div className="px-4 py-2 bg-[#0A0A0A] border-t border-white/10 flex items-center justify-between text-[10px] text-[#777777] font-mono">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span>TypeScript // Node.js</span>
        </div>
        <span>UTF-8 // ESM</span>
      </div>
    </div>
  );
};

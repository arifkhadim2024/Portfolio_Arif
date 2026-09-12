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
    <div className="relative rounded-2xl bg-[#0d121f]/95 border border-slate-700/80 shadow-2xl backdrop-blur-xl overflow-hidden font-mono text-xs sm:text-sm">
      {/* Window Controls Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#080b13] border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
          <span className="ml-2 text-xs text-slate-400 flex items-center gap-1">
            <Terminal className="w-3.5 h-3.5 text-primary-400" />
            arif-khadim.ts
          </span>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-lg border border-slate-800">
          {(['profile', 'skills', 'contact'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-2.5 py-1 rounded text-xs capitalize transition-colors ${
                activeTab === tab
                  ? 'bg-primary-500/20 text-primary-300 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          title="Copy snippet"
          aria-label="Copy code snippet"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>

      {/* Code Area */}
      <div className="p-4 sm:p-5 overflow-x-auto">
        <pre className="text-slate-300 leading-relaxed">
          <code>
            {snippets[activeTab].split('\n').map((line, idx) => (
              <div key={idx} className="table-row">
                <span className="table-cell select-none pr-4 text-slate-600 text-right w-6">
                  {idx + 1}
                </span>
                <span className="table-cell whitespace-pre">
                  {line.includes('const') && (
                    <span className="text-primary-400 font-bold">const </span>
                  )}
                  {line.includes('async function') && (
                    <span className="text-primary-400 font-bold">async function </span>
                  )}
                  {line.includes('return await') && (
                    <span className="text-accent-cyan font-semibold">return await </span>
                  )}
                  {line.includes('true') && (
                    <span className="text-accent-emerald font-semibold">true</span>
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
      <div className="px-4 py-2 bg-[#090d16] border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>TypeScript Node v26</span>
        </div>
        <span>UTF-8</span>
      </div>
    </div>
  );
};

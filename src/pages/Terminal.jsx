import React, { useState, useEffect, useRef } from "react";

export const Terminal = ({ onClose }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'output', text: 'Welcome to Portfolio Terminal v1.0' },
    { type: 'output', text: 'Type "help" for available commands' },
    { type: 'output', text: '' },
  ]);
  const terminalRef = useRef(null);
  const inputRef = useRef(null);

  const commands = {
    help: () => [
      'Available commands:',
      '  help      - Show this help message',
      '  about     - About me',
      '  skills    - List my skills',
      '  projects  - List all projects',
      '  resume    - Display resume summary',
      '  download  - Download PDF resume',
      '  contact   - Contact information',
      '  clear     - Clear terminal',
      '  gui       - Switch to GUI mode',
    ],
    about: () => [
      'Full Stack Developer & AI/ML Engineer',
      'Passionate about building innovative solutions',
    ],
    skills: () => [
      'Frontend: React, Next.js, Tailwind CSS',
      'Backend: Node.js, Express, MongoDB',
      'AI/ML: TensorFlow, PyTorch, Python',
    ],
    projects: () => [
      '1. E-Commerce Platform - Full Stack MERN',
      '2. Social Media App - Real-time chat',
      '3. Task Management - Productivity app',
    ],
    // 1. New Command: Display Resume Text
    resume: () => [
      '--- Work Experience ---',
      'Senior Developer @ Tech Corp (2024-Present)',
      '• Built scalable microservices',
      '• Reduced latency by 40%',
      '',
      'Software Engineer @ Startup Inc (2022-2024)',
      '• Developed core MVP using React & Node',
      '',
      '--- Education ---',
      'B.Tech in Computer Science',
      '',
      'Type "download" to get the PDF version.'
    ],
    // 2. New Command: Trigger Download
    download: () => {
      // Create a fake link to trigger download
      const link = document.createElement('a');
      link.href = '/resume.pdf'; // REPLACE THIS with your actual file path in /public
      link.download = 'My_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return ['Downloading resume.pdf...'];
    },
    contact: () => [
      'Email: your.email@example.com',
      'GitHub: github.com/yourusername',
    ],
    clear: () => [], // Logic handled in handleCommand now
    gui: () => {
      onClose();
      return ['Switching to GUI mode...'];
    },
  };

  const handleCommand = (cmd) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    // FIX: Handle clear explicitly to prevent state overwrite
    if (trimmed === 'clear') {
      setHistory([]);
      return;
    }

    const newHistory = [...history, { type: 'input', text: `$ ${cmd}` }];

    if (commands[trimmed]) {
      const output = commands[trimmed]();
      if (output) {
        output.forEach(line => {
          newHistory.push({ type: 'output', text: line });
        });
      }
    } else {
      newHistory.push({ type: 'error', text: `Command not found: ${cmd}` });
    }

    setHistory(newHistory);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    }
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col p-6 font-mono selection:bg-green-500 selection:text-black">
      
      {/* Immersive Exit */}
      <button 
        onClick={onClose} 
        className="absolute top-4 right-6 text-gray-500 hover:text-red-500 transition-colors text-xs uppercase tracking-widest"
      >
        [ Close Shell ]
      </button>

      <div 
        ref={terminalRef} 
        className="flex-1 overflow-y-auto scrollbar-hide text-sm md:text-base"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((line, i) => (
          <div key={i} className="mb-1 leading-relaxed">
            {line.type === 'input' && <span className="text-green-500 mr-2">{line.text}</span>}
            {line.type === 'output' && <span className="text-gray-300">{line.text}</span>}
            {line.type === 'error' && <span className="text-red-500">{line.text}</span>}
          </div>
        ))}

        <div className="flex items-center mt-2">
          <span className="text-green-500 mr-3 font-bold">❯</span>
          <input
            ref={inputRef}
            autoFocus
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-gray-200 outline-none caret-green-500 placeholder-gray-600"
            autoComplete="off"
            spellCheck="false"
          />
        </div>
      </div>
    </div>
  );
};
import React, { useState, useEffect, useRef } from "react";
import { profiles } from "../data/profiles"; // Import profiles data

export const Terminal = ({ onClose }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'output', text: 'Welcome to Portfolio Terminal v2.0' },
    { type: 'output', text: 'Type "help" for available commands' },
    { type: 'output', text: '' },
  ]);
  const terminalRef = useRef(null);
  const inputRef = useRef(null);
  const [customScripts, ] = useState({
    random: {
      description: 'Show a random project from all profiles',
      fn: function(sandbox) {
        const allProjects = [];
        Object.values(sandbox.profiles).forEach(profile => {
          profile.sections.forEach(section => {
            section.projects.forEach(project => {
              allProjects.push({
                ...project,
                profileName: profile.name,
                sectionName: section.title
              });
            });
          });
        });
        
        if (allProjects.length === 0) {
          return ['No projects available'];
        }

        const randomProject = allProjects[Math.floor(Math.random() * allProjects.length)];
        return [
          '🎲 Random Project:',
          '',
          randomProject.title,
          `Profile: ${randomProject.profileName}`,
          `Section: ${randomProject.sectionName}`,
          '',
          randomProject.description,
          '',
          `Use "project ${randomProject.id}" for full details`,
        ];
      }
    },
    techstack: {
      description: 'Show technology breakdown across all profiles',
      fn: function(sandbox) {
        const techCount = {};
        Object.values(sandbox.profiles).forEach(profile => {
          profile.sections.forEach(section => {
            section.projects.forEach(project => {
              project.technologies.forEach(tech => {
                techCount[tech] = (techCount[tech] || 0) + 1;
              });
            });
          });
        });

        const sorted = Object.entries(techCount)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 10);

        const output = ['Top 10 Technologies (All Profiles):', ''];
        sorted.forEach(([tech, count], i) => {
          const bar = '█'.repeat(Math.ceil(count / 2));
          output.push(`  ${(i + 1).toString().padStart(2)}. ${tech.padEnd(20)} ${bar} (${count})`);
        });

        return output;
      }
    }
  });

  // Get all profiles data
  const allProfiles = profiles;

  // Safe script execution sandbox
  const executeSafeScript = (scriptFn, args = []) => {
    try {
      // Create a sandboxed context with limited access
      const sandbox = {
        // Safe utilities
        console: {
          log: (...msgs) => msgs.map(m => String(m)),
        },
        Math: Math,
        Date: Date,
        JSON: JSON,
        // All profiles data (read-only)
        profiles: JSON.parse(JSON.stringify(allProfiles)),
        // Arguments
        args: args,
      };

      // Execute script in sandboxed context
      const result = scriptFn.call(sandbox, sandbox);
      return Array.isArray(result) ? result : [String(result)];
    } catch (error) {
      return [`Error executing script: ${error.message}`];
    }
  };

  // Register a custom script (safe API)

  // Built-in commands
  const commands = {
    help: () => {
      const builtInCommands = [
        'Available commands:',
        '  help         - Show this help message',
        '  about        - About me',
        '  skills       - List ALL skills across profiles',
        '  projects     - List ALL projects across all profiles',
        '  project <id> - View specific project details',
        '  work         - Show work experience',
        '  education    - Show education',
        '  resume       - Display resume summary',
        '  download     - Download PDF resume',
        '  contact      - Contact information',
        '  search <term>- Search projects by keyword',
        '  stats        - Show portfolio statistics',
        '  clear        - Clear terminal',
        '  gui          - Switch to GUI mode',
      ];

      const customCommands = Object.keys(customScripts).length > 0 
        ? [
            '',
            'Custom Scripts:',
            ...Object.entries(customScripts).map(([name, { description }]) => 
              `  ${name.padEnd(12)} - ${description}`
            )
          ]
        : [];

      return [...builtInCommands, ...customCommands];
    },

    about: () => {
      return [
        'Full Stack Developer & AI/ML Engineer',
        '',
        'Passionate about building innovative solutions spanning web development,',
        'artificial intelligence, and real-time systems. From pixel-perfect UIs to',
        'scalable microservices, from NLP models to computer vision applications.',
        '',
        'This terminal provides access to all my work across different domains.',
      ];
    },

    skills: () => {
      const allTechs = new Set();
      
      // Aggregate technologies from ALL profiles
      Object.values(allProfiles).forEach(profile => {
        profile.sections.forEach(section => {
          section.projects.forEach(project => {
            project.technologies.forEach(tech => allTechs.add(tech));
          });
        });
      });

      const techList = Array.from(allTechs).sort();
      return [
        'Technical Skills (All Domains):',
        '',
        ...techList.map((tech, i) => 
          `  ${(i + 1).toString().padStart(2)}. ${tech}`
        ),
        '',
        `Total: ${techList.length} technologies`,
      ];
    },

    projects: () => {
      const output = ['ALL Projects Across All Profiles:', ''];
      
      // Iterate through ALL profiles
      Object.entries(allProfiles).forEach(([, profile]) => {
        output.push(`━━━━━ ${profile.name} ━━━━━`);
        output.push('');
        
        profile.sections.forEach(section => {
          output.push(`--- ${section.title} ---`);
          section.projects.forEach((project, i) => {
            output.push(
              `  ${i + 1}. ${project.title}`,
              `     ID: ${project.id} | ${project.category} | ${project.year}`,
              ''
            );
          });
        });
        output.push('');
      });
      
      output.push('Use "project <id>" to view details');
      return output;
    },

    project: (args) => {
      const id = args[0];
      if (!id) return ['Usage: project <id>', 'Example: project p-work-1'];

      let foundProject = null;
      let sectionTitle = '';
      let profileName = '';

      // Search across ALL profiles
      Object.values(allProfiles).forEach(profile => {
        profile.sections.forEach(section => {
          const project = section.projects.find(p => p.id === id);
          if (project) {
            foundProject = project;
            sectionTitle = section.title;
            profileName = profile.name;
          }
        });
      });

      if (!foundProject) {
        return [`Project "${id}" not found`, 'Use "projects" to see all available projects'];
      }

      const output = [
        `=== ${foundProject.title} ===`,
        '',
        `Profile: ${profileName}`,
        `Section: ${sectionTitle}`,
        `Category: ${foundProject.category}`,
        `Year: ${foundProject.year}`,
        `Duration: ${foundProject.duration}`,
        `Match: ${foundProject.match}`,
        '',
        'Description:',
        foundProject.description,
        '',
        'Technologies:',
        ...foundProject.technologies.map(tech => `  • ${tech}`),
      ];

      if (foundProject.features && foundProject.features.length > 0) {
        output.push('', 'Key Features:');
        foundProject.features.forEach((feature, i) => {
          output.push(
            `  ${i + 1}. ${feature.title} (${feature.duration})`,
            `     ${feature.desc}`,
            ''
          );
        });
      }

      if (foundProject.tags) {
        output.push('Tags: ' + foundProject.tags.join(', '));
      }

      return output;
    },

    work: () => {
      const output = ['=== Work Experience (All Profiles) ===', ''];
      
      Object.values(allProfiles).forEach(profile => {
        const workSection = profile.sections.find(s => 
          s.title.toLowerCase().includes('work') || 
          s.title.toLowerCase().includes('experience')
        );

        if (workSection) {
          output.push(`--- ${profile.name} ---`);
          workSection.projects.forEach((project, i) => {
            output.push(
              `${i + 1}. ${project.title}`,
              `   ${project.year} | ${project.duration}`,
              `   ${project.description.substring(0, 100)}...`,
              ''
            );
          });
        }
      });

      return output;
    },

    education: () => {
      const output = ['=== Education (All Profiles) ===', ''];
      
      Object.values(allProfiles).forEach(profile => {
        const eduSection = profile.sections.find(s => 
          s.title.toLowerCase().includes('education')
        );

        if (eduSection) {
          output.push(`--- ${profile.name} ---`);
          eduSection.projects.forEach((project, i) => {
            output.push(
              `${i + 1}. ${project.title}`,
              `   ${project.year} | ${project.rating}`,
              `   ${project.description.substring(0, 100)}...`,
              ''
            );
          });
        }
      });

      return output;
    },

    resume: () => {
      const output = ['=== COMPREHENSIVE RESUME ===', ''];

      Object.entries(allProfiles).forEach(([, profile]) => {
        output.push(`━━━━━ ${profile.name} ━━━━━`);
        output.push('');
        
        profile.sections.forEach(section => {
          output.push(`--- ${section.title} ---`);
          section.projects.forEach(project => {
            output.push(
              `• ${project.title}`,
              `  ${project.year} | ${project.category}`,
            );
            if (project.role) output.push(`  Role: ${project.role}`);
          });
          output.push('');
        });
      });

      output.push('Type "download" to get the PDF version.');
      return output;
    },

    download: () => {
      const link = document.createElement('a');
      link.href = '/resume.pdf';
      link.download = 'Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return ['Downloading resume.pdf...'];
    },

    contact: () => [
      'Contact Information:',
      '',
      'Email: your.email@example.com',
      'GitHub: github.com/yourusername',
      'LinkedIn: linkedin.com/in/yourprofile',
      'Portfolio: yourwebsite.com',
    ],

    search: (args) => {
      const searchTerm = args.join(' ').toLowerCase();
      if (!searchTerm) {
        return ['Usage: search <keyword>', 'Example: search react'];
      }

      const results = [];
      
      // Search across ALL profiles
      Object.values(allProfiles).forEach(profile => {
        profile.sections.forEach(section => {
          section.projects.forEach(project => {
            const searchableText = (
              project.title + ' ' +
              project.description + ' ' +
              project.technologies.join(' ') + ' ' +
              (project.tags || []).join(' ')
            ).toLowerCase();

            if (searchableText.includes(searchTerm)) {
              results.push({
                id: project.id,
                title: project.title,
                section: section.title,
                category: project.category,
                profile: profile.name,
              });
            }
          });
        });
      });

      if (results.length === 0) {
        return [`No projects found matching "${searchTerm}"`];
      }

      const output = [`Found ${results.length} project(s) matching "${searchTerm}":`, ''];
      results.forEach((result, i) => {
        output.push(
          `${i + 1}. ${result.title}`,
          `   Profile: ${result.profile} | Section: ${result.section}`,
          `   Category: ${result.category} | ID: ${result.id}`,
          ''
        );
      });

      return output;
    },

    stats: () => {
      const stats = {
        totalProjects: 0,
        totalTechnologies: new Set(),
        totalSections: 0,
        categories: new Set(),
        profiles: Object.keys(allProfiles).length,
      };

      Object.values(allProfiles).forEach(profile => {
        stats.totalSections += profile.sections.length;
        profile.sections.forEach(section => {
          stats.totalProjects += section.projects.length;
          section.projects.forEach(project => {
            project.technologies.forEach(tech => stats.totalTechnologies.add(tech));
            stats.categories.add(project.category);
          });
        });
      });

      return [
        '=== Portfolio Statistics ===',
        '',
        `Total Profiles: ${stats.profiles}`,
        `Total Sections: ${stats.totalSections}`,
        `Total Projects: ${stats.totalProjects}`,
        `Technologies: ${stats.totalTechnologies.size}`,
        `Categories: ${stats.categories.size}`,
        '',
        'Profile Breakdown:',
        ...Object.entries(allProfiles).map(([, profile]) => {
          let projectCount = 0;
          profile.sections.forEach(s => projectCount += s.projects.length);
          return `  • ${profile.name}: ${projectCount} projects`;
        }),
      ];
    },

    clear: () => [],

    gui: () => {
      onClose();
      return ['Switching to GUI mode...'];
    },
  };

  const handleCommand = (cmd) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    // Handle clear separately
    if (trimmed.toLowerCase() === 'clear') {
      setHistory([]);
      return;
    }

    const newHistory = [...history, { type: 'input', text: `$ ${cmd}` }];

    // Parse command and arguments
    const parts = trimmed.split(/\s+/);
    const commandName = parts[0].toLowerCase();
    const args = parts.slice(1);

    // Check built-in commands
    if (commands[commandName]) {
      try {
        const output = commands[commandName](args);
        if (output && output.length > 0) {
          output.forEach(line => {
            newHistory.push({ type: 'output', text: line });
          });
        }
      } catch (error) {
        newHistory.push({ type: 'error', text: `Error: ${error.message}` });
      }
    }
    // Check custom scripts
    else if (customScripts[commandName]) {
      try {
        const output = executeSafeScript(customScripts[commandName].fn, args);
        output.forEach(line => {
          newHistory.push({ type: 'output', text: line });
        });
      } catch (error) {
        newHistory.push({ type: 'error', text: `Script error: ${error.message}` });
      }
    }
    // Unknown command
    else {
      newHistory.push({ 
        type: 'error', 
        text: `Command not found: ${commandName}`,
      });
      newHistory.push({
        type: 'output',
        text: 'Type "help" to see available commands',
      });
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

  // Example: Register custom scripts on mount (only once)
// Empty dependency array - run only once on mount

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col p-6 font-mono selection:bg-green-500 selection:text-black">
      
      <button 
        onClick={onClose} 
        className="absolute top-4 right-6 text-gray-500 hover:text-red-500 transition-colors text-xs uppercase tracking-widest"
      >
        [ Close Shell ]
      </button>

      <div 
        ref={terminalRef} 
        className="flex-1 overflow-y-auto scrollbar-hide text-sm md:text-base mt-8"
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
            placeholder="Type a command..."
            autoComplete="off"
            spellCheck="false"
          />
        </div>
      </div>

      <div className="text-gray-700 text-xs mt-2 text-center">
        Terminal v2.0 | All Profiles | Safe Script Execution
      </div>
    </div>
  );
};

export default Terminal;
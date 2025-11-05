import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TerminalProps {
    visible: boolean;
    onClose?: () => void;
}

interface HistoryLine {
    type: 'command' | 'output' | 'error';
    content: string;
}

const Terminal: React.FC<TerminalProps> = ({ visible, onClose }) => {
    const [history, setHistory] = useState<HistoryLine[]>([
        { type: 'output', content: 'Welcome to Portfolio Terminal v1.0.0' },
        { type: 'output', content: 'Type "help" for available commands' },
        { type: 'output', content: '' },
    ]);
    const [input, setInput] = useState('');
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);
    const terminalBodyRef = useRef<HTMLDivElement>(null);

    const getCurrentTime = () => {
        return new Date().toLocaleTimeString('en-US', { hour12: false });
    };

    const commands: { [key: string]: (args: string[]) => string } = {
        help: () => {
            return `Available commands:
  help        - Show this help message
  about       - Information about this portfolio
  skills      - List technical skills
  projects    - Show projects
  contact     - Display contact information
  whoami      - Display current user
  date        - Show current date and time
  clear       - Clear terminal screen
  ls          - List directory contents
  pwd         - Print working directory
  echo        - Print text to terminal
  neofetch    - Display system information
  exit        - Close terminal`;
        },
        about: () => {
            return `About This Portfolio
━━━━━━━━━━━━━━━━━━━━━━
This is an interactive 3D portfolio built with:
- Three.js for 3D graphics
- React for UI components
- TypeScript for type safety
- WebGL for rendering

Explore the environment and interact with objects!`;
        },
        skills: () => {
            return `Technical Skills
━━━━━━━━━━━━━━━━
Frontend:     React, TypeScript, Three.js, WebGL
Backend:      Node.js, Express
Tools:        Git, Webpack, npm
Languages:    JavaScript, TypeScript, HTML, CSS`;
        },
        projects: () => {
            return `Projects
━━━━━━━━
[1] 3D Portfolio Website - Interactive 3D environment (This!)
[2] Web Applications - Various full-stack projects
[3] Graphics Projects - WebGL and Three.js experiments

Type 'contact' for more information.`;
        },
        contact: () => {
            return `Contact Information
━━━━━━━━━━━━━━━━━━━
📧 Email:    your-email@example.com
💼 LinkedIn: your-linkedin-profile
🐙 GitHub:   your-github-profile

Feel free to reach out!`;
        },
        whoami: () => {
            return 'guest@portfolio';
        },
        date: () => {
            return new Date().toString();
        },
        clear: () => {
            return '__CLEAR__';
        },
        ls: () => {
            return `about.txt    projects/    skills.txt    contact.txt    README.md`;
        },
        pwd: () => {
            return '/home/guest/portfolio';
        },
        echo: (args: string[]) => {
            return args.join(' ');
        },
        neofetch: () => {
            return `       ___           guest@portfolio
      (.. |          ━━━━━━━━━━━━━━━━━
      (<> |          OS: PortfolioOS 3D
     / __  \\         Shell: bash
    ( /  \\ /|        Terminal: portfolio-term
   _/\\ __)/_)        CPU: Your Browser
   \\/-____\\/         GPU: WebGL 2.0
                     Resolution: ${window.innerWidth}x${window.innerHeight}
                     Theme: Cyberpunk`;
        },
        exit: () => {
            return '__EXIT__';
        },
    };

    const executeCommand = (cmd: string) => {
        const trimmedCmd = cmd.trim();
        if (!trimmedCmd) return;

        // Add command to history
        const newHistory: HistoryLine[] = [
            ...history,
            { type: 'command', content: `$ ${trimmedCmd}` },
        ];

        const parts = trimmedCmd.split(' ');
        const command = parts[0].toLowerCase();
        const args = parts.slice(1);

        if (command in commands) {
            const output = commands[command](args);

            if (output === '__CLEAR__') {
                setHistory([]);
                return;
            }

            if (output === '__EXIT__') {
                onClose?.();
                return;
            }

            newHistory.push({ type: 'output', content: output });
        } else {
            newHistory.push({
                type: 'error',
                content: `Command not found: ${command}. Type 'help' for available commands.`,
            });
        }

        setHistory(newHistory);
        setCommandHistory([...commandHistory, trimmedCmd]);
        setHistoryIndex(-1);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            executeCommand(input);
            setInput('');
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (commandHistory.length > 0) {
                const newIndex =
                    historyIndex === -1
                        ? commandHistory.length - 1
                        : Math.max(0, historyIndex - 1);
                setHistoryIndex(newIndex);
                setInput(commandHistory[newIndex]);
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex !== -1) {
                const newIndex = historyIndex + 1;
                if (newIndex >= commandHistory.length) {
                    setHistoryIndex(-1);
                    setInput('');
                } else {
                    setHistoryIndex(newIndex);
                    setInput(commandHistory[newIndex]);
                }
            }
        } else if (e.key === 'l' && e.ctrlKey) {
            e.preventDefault();
            setHistory([]);
        } else if (e.key === 'c' && e.ctrlKey) {
            e.preventDefault();
            setInput('');
        }
    };

    useEffect(() => {
        if (visible && inputRef.current) {
            inputRef.current.focus();
        }
    }, [visible]);

    useEffect(() => {
        if (terminalBodyRef.current) {
            terminalBodyRef.current.scrollTop =
                terminalBodyRef.current.scrollHeight;
        }
    }, [history]);

    const handleTerminalClick = () => {
        inputRef.current?.focus();
    };

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 50, scale: 0.9 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    style={styles.terminalWindow}
                    className="terminal-window"
                >
                    {/* Terminal Header */}
                    <div style={styles.terminalHeader}>
                        <div style={styles.terminalButtons}>
                            <div
                                style={{ ...styles.terminalButton, ...styles.closeButton }}
                                onClick={onClose}
                            />
                            <div style={{ ...styles.terminalButton, ...styles.minimizeButton }} />
                            <div style={{ ...styles.terminalButton, ...styles.maximizeButton }} />
                        </div>
                        <div style={styles.terminalTitle}>
                            guest@portfolio: ~
                        </div>
                        <div style={styles.terminalTime}>{getCurrentTime()}</div>
                    </div>

                    {/* Terminal Body */}
                    <div
                        ref={terminalBodyRef}
                        style={styles.terminalBody}
                        onClick={handleTerminalClick}
                    >
                        {history.map((line, index) => (
                            <div
                                key={index}
                                style={{
                                    ...styles.terminalLine,
                                    ...(line.type === 'command' && styles.commandLine),
                                    ...(line.type === 'error' && styles.errorLine),
                                }}
                            >
                                {line.content}
                            </div>
                        ))}

                        {/* Input Line */}
                        <div style={styles.inputContainer}>
                            <span style={styles.prompt}>$ </span>
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                style={styles.input}
                                spellCheck={false}
                                autoComplete="off"
                            />
                            <span className="terminal-cursor">_</span>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    terminalWindow: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '800px',
        maxWidth: '90vw',
        height: '500px',
        maxHeight: '80vh',
        backgroundColor: '#1e1e1e',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.7)',
        border: '1px solid #333',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1000,
        fontFamily: '"Fira Code", "Courier New", monospace',
    },
    terminalHeader: {
        backgroundColor: '#2d2d2d',
        padding: '10px 12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid #404040',
        userSelect: 'none',
    },
    terminalButtons: {
        display: 'flex',
        gap: '8px',
    },
    terminalButton: {
        width: '12px',
        height: '12px',
        borderRadius: '50%',
        cursor: 'pointer',
        transition: 'filter 0.2s',
    },
    closeButton: {
        backgroundColor: '#ff5f56',
    },
    minimizeButton: {
        backgroundColor: '#ffbd2e',
    },
    maximizeButton: {
        backgroundColor: '#27c93f',
    },
    terminalTitle: {
        color: '#c5c5c5',
        fontSize: '13px',
        fontWeight: 600,
    },
    terminalTime: {
        color: '#888',
        fontSize: '11px',
    },
    terminalBody: {
        flex: 1,
        padding: '16px',
        overflowY: 'auto',
        backgroundColor: '#0a0a0a',
        color: '#00ff41',
        fontSize: '14px',
        lineHeight: '1.6',
        cursor: 'text',
    },
    terminalLine: {
        whiteSpace: 'pre-wrap',
        marginBottom: '4px',
    },
    commandLine: {
        color: '#00d9ff',
        marginTop: '8px',
    },
    errorLine: {
        color: '#ff6b6b',
    },
    inputContainer: {
        display: 'flex',
        alignItems: 'center',
        marginTop: '8px',
    },
    prompt: {
        color: '#00d9ff',
        marginRight: '8px',
        fontWeight: 'bold',
    },
    input: {
        flex: 1,
        backgroundColor: 'transparent',
        border: 'none',
        outline: 'none',
        color: '#00ff41',
        fontSize: '14px',
        fontFamily: 'inherit',
        caretColor: 'transparent',
    },
};

export default Terminal;

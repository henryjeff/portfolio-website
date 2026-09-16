import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import ResumeView from './OS/components/ResumeView';
import FeaturedProjects from './OS/components/FeaturedProjects';
import SkillsMatrix from './OS/components/SkillsMatrix';
import ContactCard from './OS/components/ContactCard';
import SkillGame from './OS/components/SkillGame';

interface WindowState {
    id: string;
    title: string;
    icon: string;
    active: boolean;
    z: number;
}

interface WindowProps {
    id: string;
    title: string;
    icon: string;
    active: boolean;
    z: number;
    isFocused: boolean;
    onFocus: (id: string) => void;
    onClose: (id: string, e: React.MouseEvent) => void;
    onMinimize: (id: string, e: React.MouseEvent) => void;
    children: React.ReactNode;
    width?: string;
    height?: string;
    top?: string;
    left?: string;
}

// Declared OUTSIDE OS to prevent unmounting/remounting on state changes
const Window: React.FC<WindowProps> = ({
    id,
    title,
    icon,
    active,
    z,
    isFocused,
    onFocus,
    onClose,
    onMinimize,
    children,
    width = '78%',
    height = '82%',
    top = '5%',
    left = '7%',
}) => {
    if (!active) return null;

    return (
        <div
            onMouseDown={() => onFocus(id)}
            style={{
                position: 'absolute',
                top,
                left,
                width,
                height,
                backgroundColor: '#c0c0c0',
                border: '2px solid #fff',
                borderRightColor: '#000',
                borderBottomColor: '#000',
                display: 'flex',
                flexDirection: 'column',
                zIndex: z,
                boxShadow: '3px 3px 12px rgba(0,0,0,0.6)',
            }}
        >
            {/* Title Bar */}
            <div
                style={{
                    backgroundColor: isFocused ? '#000080' : '#808080',
                    color: '#fff',
                    padding: '3px 6px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontWeight: 'bold',
                    fontSize: '12px',
                    letterSpacing: '0.3px',
                    cursor: 'default',
                    userSelect: 'none',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    <span>{icon}</span>
                    <span>{title}</span>
                </div>
                <div style={{ display: 'flex', gap: '3px' }}>
                    {/* Minus / Minimize Button */}
                    <button
                        onMouseDown={(e) => {
                            e.stopPropagation();
                        }}
                        onClick={(e) => {
                            e.stopPropagation();
                            onMinimize(id, e);
                        }}
                        style={{
                            backgroundColor: '#c0c0c0',
                            border: '1px solid #fff',
                            borderRightColor: '#444',
                            borderBottomColor: '#444',
                            padding: '0 6px',
                            cursor: 'pointer',
                            fontSize: '11px',
                            fontWeight: 'bold',
                            lineHeight: '14px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        title="Minimize"
                    >
                        _
                    </button>
                    {/* Cross / Close Button */}
                    <button
                        onMouseDown={(e) => {
                            e.stopPropagation();
                        }}
                        onClick={(e) => {
                            e.stopPropagation();
                            onClose(id, e);
                        }}
                        style={{
                            backgroundColor: '#c0c0c0',
                            border: '1px solid #fff',
                            borderRightColor: '#444',
                            borderBottomColor: '#444',
                            padding: '0 6px',
                            cursor: 'pointer',
                            fontSize: '11px',
                            fontWeight: 'bold',
                            lineHeight: '14px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        title="Close"
                    >
                        ✕
                    </button>
                </div>
            </div>

            {/* Window Body */}
            <div
                style={{
                    flex: 1,
                    overflowY: 'auto',
                    padding: id === 'game' ? '0' : '16px',
                    backgroundColor: id === 'game' ? '#000' : '#fff',
                    border: '1px solid #808080',
                    margin: '2px',
                }}
                className="custom-scrollbar"
            >
                {children}
            </div>
        </div>
    );
};

interface DesktopIconProps {
    id: string;
    label: string;
    icon: string;
    isSelected: boolean;
    onOpen: (id: string) => void;
}

// Declared OUTSIDE OS
const DesktopIcon: React.FC<DesktopIconProps> = ({ id, label, icon, isSelected, onOpen }) => {
    return (
        <div
            onDoubleClick={() => onOpen(id)}
            onClick={() => onOpen(id)}
            style={{
                width: '84px',
                textAlign: 'center',
                cursor: 'pointer',
                padding: '8px 4px',
                userSelect: 'none',
            }}
        >
            <div
                style={{
                    fontSize: '38px',
                    filter: 'drop-shadow(2px 2px 2px rgba(0,0,0,0.8))',
                    transition: 'transform 0.1s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
                {icon}
            </div>
            <div
                style={{
                    color: '#fff',
                    fontSize: '11px',
                    marginTop: '3px',
                    padding: '1px 3px',
                    textShadow: '1px 1px #000',
                    backgroundColor: isSelected ? '#000080' : 'transparent',
                    display: 'inline-block',
                    wordBreak: 'break-word',
                }}
            >
                {label}
            </div>
        </div>
    );
};

// Independent Clock so second ticks do not re-render OS
const SystemClock: React.FC = () => {
    const [time, setTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return <span>⌚ {time}</span>;
};

const OS: React.FC = () => {
    const [startMenuOpen, setStartMenuOpen] = useState(false);
    const [highestZ, setHighestZ] = useState(10);
    const startMenuRef = useRef<HTMLDivElement>(null);

    const [windows, setWindows] = useState<WindowState[]>([
        { id: 'cv', title: 'Waseeq_Haider_Resume.doc', icon: '📄', active: true, z: 10 },
        { id: 'projects', title: 'C:\\Projects\\Software_Showcase.exe', icon: '📁', active: false, z: 1 },
        { id: 'skills', title: 'C:\\System32\\Skills_Matrix.exe', icon: '🛡️', active: false, z: 1 },
        { id: 'contact', title: 'C:\\Network\\Direct_Contact.exe', icon: '✉️', active: false, z: 1 },
        { id: 'game', title: 'Security_Breach_Challenge.exe', icon: '🎮', active: false, z: 1 },
    ]);

    // Close start menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (startMenuRef.current && !startMenuRef.current.contains(e.target as Node)) {
                setStartMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const focusWindow = (id: string) => {
        setHighestZ(prev => {
            const nextZ = prev + 1;
            setWindows(curr =>
                curr.map(w => (w.id === id ? { ...w, active: true, z: nextZ } : w))
            );
            return nextZ;
        });
    };

    const toggleWindow = (id: string) => {
        setWindows(prev => {
            const target = prev.find(w => w.id === id);
            if (!target) return prev;

            if (!target.active) {
                // Open and focus
                const nextZ = highestZ + 1;
                setHighestZ(nextZ);
                return prev.map(w => (w.id === id ? { ...w, active: true, z: nextZ } : w));
            } else {
                // If it's already focused, minimize it
                if (target.z === highestZ) {
                    return prev.map(w => (w.id === id ? { ...w, active: false } : w));
                } else {
                    // Bring to front
                    const nextZ = highestZ + 1;
                    setHighestZ(nextZ);
                    return prev.map(w => (w.id === id ? { ...w, z: nextZ } : w));
                }
            }
        });
    };

    const closeWindow = (id: string, e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        setWindows(prev => prev.map(w => (w.id === id ? { ...w, active: false } : w)));
    };

    const minimizeWindow = (id: string, e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        setWindows(prev => prev.map(w => (w.id === id ? { ...w, active: false } : w)));
    };

    const openLink = (url: string, e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    const openWindowFromMenu = (id: string) => {
        focusWindow(id);
        setStartMenuOpen(false);
    };

    return (
        <div
            style={{
                height: '100%',
                backgroundColor: '#008080', // Classic Windows 95 Teal
                position: 'relative',
                overflow: 'hidden',
                fontFamily: '"MS Sans Serif", Arial, sans-serif',
                userSelect: 'none',
            }}
        >
            {/* Desktop Icons Grid */}
            <div
                style={{
                    padding: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                }}
            >
                <DesktopIcon
                    id="cv"
                    label="My Profile"
                    icon="📄"
                    isSelected={Boolean(windows.find(w => w.id === 'cv')?.active && windows.find(w => w.id === 'cv')?.z === highestZ)}
                    onOpen={focusWindow}
                />
                <DesktopIcon
                    id="projects"
                    label="Projects"
                    icon="📁"
                    isSelected={Boolean(windows.find(w => w.id === 'projects')?.active && windows.find(w => w.id === 'projects')?.z === highestZ)}
                    onOpen={focusWindow}
                />
                <DesktopIcon
                    id="skills"
                    label="Skills & Certs"
                    icon="🛡️"
                    isSelected={Boolean(windows.find(w => w.id === 'skills')?.active && windows.find(w => w.id === 'skills')?.z === highestZ)}
                    onOpen={focusWindow}
                />
                <DesktopIcon
                    id="contact"
                    label="Contact"
                    icon="✉️"
                    isSelected={Boolean(windows.find(w => w.id === 'contact')?.active && windows.find(w => w.id === 'contact')?.z === highestZ)}
                    onOpen={focusWindow}
                />
                <DesktopIcon
                    id="game"
                    label="Hacking Game"
                    icon="🎮"
                    isSelected={Boolean(windows.find(w => w.id === 'game')?.active && windows.find(w => w.id === 'game')?.z === highestZ)}
                    onOpen={focusWindow}
                />
            </div>

            {/* Resume / Profile Window */}
            <Window
                id="cv"
                title="Waseeq_Haider_Resume.doc"
                icon="📄"
                active={windows.find(w => w.id === 'cv')?.active || false}
                z={windows.find(w => w.id === 'cv')?.z || 1}
                isFocused={windows.find(w => w.id === 'cv')?.z === highestZ}
                onFocus={focusWindow}
                onClose={closeWindow}
                onMinimize={minimizeWindow}
                top="4%"
                left="6%"
                width="82%"
                height="86%"
            >
                <ResumeView />
            </Window>

            {/* Projects Showcase Window */}
            <Window
                id="projects"
                title="C:\Projects\Software_Showcase.exe"
                icon="📁"
                active={windows.find(w => w.id === 'projects')?.active || false}
                z={windows.find(w => w.id === 'projects')?.z || 1}
                isFocused={windows.find(w => w.id === 'projects')?.z === highestZ}
                onFocus={focusWindow}
                onClose={closeWindow}
                onMinimize={minimizeWindow}
                top="6%"
                left="10%"
                width="80%"
                height="84%"
            >
                <FeaturedProjects />
            </Window>

            {/* Skills & Certifications Matrix Window */}
            <Window
                id="skills"
                title="C:\System32\Skills_Matrix.exe"
                icon="🛡️"
                active={windows.find(w => w.id === 'skills')?.active || false}
                z={windows.find(w => w.id === 'skills')?.z || 1}
                isFocused={windows.find(w => w.id === 'skills')?.z === highestZ}
                onFocus={focusWindow}
                onClose={closeWindow}
                onMinimize={minimizeWindow}
                top="8%"
                left="14%"
                width="76%"
                height="80%"
            >
                <SkillsMatrix />
            </Window>

            {/* Contact Card Window */}
            <Window
                id="contact"
                title="C:\Network\Direct_Contact.exe"
                icon="✉️"
                active={windows.find(w => w.id === 'contact')?.active || false}
                z={windows.find(w => w.id === 'contact')?.z || 1}
                isFocused={windows.find(w => w.id === 'contact')?.z === highestZ}
                onFocus={focusWindow}
                onClose={closeWindow}
                onMinimize={minimizeWindow}
                top="10%"
                left="18%"
                width="64%"
                height="75%"
            >
                <ContactCard />
            </Window>

            {/* Security Breach Game Window */}
            <Window
                id="game"
                title="Security_Breach_Challenge.exe"
                icon="🎮"
                active={windows.find(w => w.id === 'game')?.active || false}
                z={windows.find(w => w.id === 'game')?.z || 1}
                isFocused={windows.find(w => w.id === 'game')?.z === highestZ}
                onFocus={focusWindow}
                onClose={closeWindow}
                onMinimize={minimizeWindow}
                top="12%"
                left="16%"
                width="68%"
                height="68%"
            >
                <SkillGame />
            </Window>

            {/* Start Menu Popup */}
            {startMenuOpen && (
                <div
                    ref={startMenuRef}
                    onMouseDown={(e) => e.stopPropagation()}
                    style={{
                        position: 'absolute',
                        bottom: '30px',
                        left: '2px',
                        width: '240px',
                        backgroundColor: '#c0c0c0',
                        border: '2px solid #fff',
                        borderRightColor: '#000',
                        borderBottomColor: '#000',
                        display: 'flex',
                        zIndex: 9999,
                        boxShadow: '3px 3px 10px rgba(0,0,0,0.6)',
                    }}
                >
                    {/* Vertical Side Banner */}
                    <div
                        style={{
                            width: '28px',
                            backgroundColor: '#000080',
                            color: '#fff',
                            writingMode: 'vertical-rl',
                            transform: 'rotate(180deg)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '10px 0',
                            fontWeight: 'bold',
                            fontSize: '13px',
                            letterSpacing: '2px',
                        }}
                    >
                        WaseeqOS 98
                    </div>

                    {/* Menu Items */}
                    <div style={{ flex: 1, padding: '4px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        {[
                            { id: 'cv', icon: '📄', label: 'Waseeq Haider CV' },
                            { id: 'projects', icon: '📁', label: 'Featured Projects' },
                            { id: 'skills', icon: '🛡️', label: 'Skills & Certifications' },
                            { id: 'contact', icon: '✉️', label: 'Contact Info' },
                            { id: 'game', icon: '🎮', label: 'Security Breach Game' },
                        ].map((item) => (
                            <div
                                key={item.id}
                                onClick={() => openWindowFromMenu(item.id)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    padding: '6px 10px',
                                    fontSize: '11px',
                                    cursor: 'pointer',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = '#000080';
                                    e.currentTarget.style.color = '#fff';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                    e.currentTarget.style.color = '#000';
                                }}
                            >
                                <span style={{ fontSize: '16px' }}>{item.icon}</span>
                                <span>{item.label}</span>
                            </div>
                        ))}

                        <div style={{ height: '1px', backgroundColor: '#808080', margin: '4px 2px', borderBottom: '1px solid #fff' }} />

                        <div
                            onClick={(e) => {
                                openLink('https://github.com/waseeq-haider', e);
                                setStartMenuOpen(false);
                            }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                padding: '6px 10px',
                                fontSize: '11px',
                                color: '#000',
                                cursor: 'pointer',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#000080';
                                e.currentTarget.style.color = '#fff';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'transparent';
                                e.currentTarget.style.color = '#000';
                            }}
                        >
                            <span style={{ fontSize: '16px' }}>🐙</span>
                            <span>GitHub Profile ↗</span>
                        </div>

                        <div
                            onClick={(e) => {
                                openLink('https://waseeq.vercel.app/', e);
                                setStartMenuOpen(false);
                            }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                padding: '6px 10px',
                                fontSize: '11px',
                                color: '#000',
                                cursor: 'pointer',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#000080';
                                e.currentTarget.style.color = '#fff';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'transparent';
                                e.currentTarget.style.color = '#000';
                            }}
                        >
                            <span style={{ fontSize: '16px' }}>🌐</span>
                            <span>Live Web Portfolio ↗</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Bottom Taskbar */}
            <div
                style={{
                    height: '30px',
                    backgroundColor: '#c0c0c0',
                    borderTop: '2px solid #fff',
                    position: 'absolute',
                    bottom: 0,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '2px',
                    zIndex: 1000,
                    boxSizing: 'border-box',
                }}
            >
                {/* Start Button */}
                <button
                    onMouseDown={(e) => e.stopPropagation()}
                    onClick={() => setStartMenuOpen(prev => !prev)}
                    style={{
                        fontWeight: 'bold',
                        padding: '2px 10px',
                        backgroundColor: '#c0c0c0',
                        border: '2px solid #fff',
                        borderRightColor: startMenuOpen ? '#fff' : '#000',
                        borderBottomColor: startMenuOpen ? '#fff' : '#000',
                        borderTopColor: startMenuOpen ? '#000' : '#fff',
                        borderLeftColor: startMenuOpen ? '#000' : '#fff',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        cursor: 'pointer',
                        fontSize: '11px',
                    }}
                >
                    <span style={{ fontSize: '14px' }}>🏁</span> Start
                </button>

                {/* Open Tasks on Taskbar */}
                <div style={{ flex: 1, display: 'flex', gap: '4px', paddingLeft: '8px', overflowX: 'auto' }}>
                    {windows
                        .filter((w) => w.active)
                        .map((w) => {
                            const isFocused = w.z === highestZ;
                            return (
                                <button
                                    key={w.id}
                                    onMouseDown={(e) => e.stopPropagation()}
                                    onClick={() => toggleWindow(w.id)}
                                    style={{
                                        backgroundColor: '#c0c0c0',
                                        border: '2px solid #000',
                                        borderRightColor: isFocused ? '#000' : '#fff',
                                        borderBottomColor: isFocused ? '#000' : '#fff',
                                        borderTopColor: isFocused ? '#808080' : '#fff',
                                        borderLeftColor: isFocused ? '#808080' : '#fff',
                                        padding: '0 8px',
                                        fontSize: '11px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '4px',
                                        minWidth: '110px',
                                        maxWidth: '180px',
                                        height: '24px',
                                        fontWeight: isFocused ? 'bold' : 'normal',
                                        cursor: 'pointer',
                                        overflow: 'hidden',
                                        whiteSpace: 'nowrap',
                                        textOverflow: 'ellipsis',
                                    }}
                                >
                                    <span>{w.icon}</span>
                                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{w.title}</span>
                                </button>
                            );
                        })}
                </div>

                {/* System Tray & Clock */}
                <div
                    style={{
                        border: '2px solid #808080',
                        borderRightColor: '#fff',
                        borderBottomColor: '#fff',
                        padding: '0 8px',
                        fontSize: '11px',
                        height: '22px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        backgroundColor: '#c0c0c0',
                        marginRight: '4px',
                    }}
                >
                    <span>🛡️</span>
                    <SystemClock />
                </div>
            </div>

            {/* Scrollbar & Global Desktop Styles */}
            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 16px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #dfdfdf;
                    box-shadow: inset 1px 1px #808080;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #c0c0c0;
                    border: 1px solid #fff;
                    border-right-color: #808080;
                    border-bottom-color: #808080;
                }
            `}</style>
        </div>
    );
};

ReactDOM.render(<OS />, document.getElementById('os-root'));

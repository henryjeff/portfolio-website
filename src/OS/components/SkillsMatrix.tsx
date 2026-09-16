import React from 'react';

interface SkillCategory {
    category: string;
    icon: string;
    skills: { name: string; level?: string }[];
}

const SKILL_DATA: SkillCategory[] = [
    {
        category: 'Cybersecurity & Ethical Hacking',
        icon: '🛡️',
        skills: [
            { name: 'Metasploit Framework', level: 'Advanced' },
            { name: 'Burp Suite (Web Pentest)', level: 'Advanced' },
            { name: 'Nmap & Network Recon', level: 'Advanced' },
            { name: 'Wireshark & Packet Analysis', level: 'Proficient' },
            { name: 'Hydra & Brute-Force Testing', level: 'Proficient' },
            { name: 'Vulnerability Assessment', level: 'Advanced' },
            { name: 'Web App Security Controls', level: 'Advanced' },
            { name: 'Linux Security Auditing', level: 'Advanced' },
        ],
    },
    {
        category: 'AI-Assisted Development & Workflows',
        icon: '🤖',
        skills: [
            { name: 'Claude Code', level: 'Expert' },
            { name: 'Google Antigravity', level: 'Expert' },
            { name: 'OpenCode & Cursor IDE', level: 'Advanced' },
            { name: 'Lovable Full-Stack AI', level: 'Advanced' },
            { name: 'Advanced Prompt Engineering', level: 'Expert' },
            { name: 'AI Coding Workflows', level: 'Expert' },
            { name: 'Agentic Pairing & Automation', level: 'Advanced' },
        ],
    },
    {
        category: 'Languages & Core Frontend',
        icon: '💻',
        skills: [
            { name: 'JavaScript (ES6+)', level: 'Advanced' },
            { name: 'Python', level: 'Proficient' },
            { name: 'HTML5 & Semantic Markup', level: 'Advanced' },
            { name: 'CSS3 & Responsive Design', level: 'Advanced' },
        ],
    },
    {
        category: 'Frameworks & Modern Web',
        icon: '⚡',
        skills: [
            { name: 'React.js', level: 'Advanced' },
            { name: 'Next.js', level: 'Proficient' },
            { name: 'Vite', level: 'Advanced' },
            { name: 'Tailwind CSS', level: 'Advanced' },
        ],
    },
    {
        category: 'Backend, Database & APIs',
        icon: '🗄️',
        skills: [
            { name: 'Supabase', level: 'Proficient' },
            { name: 'PostgreSQL', level: 'Proficient' },
            { name: 'RESTful API Architecture', level: 'Advanced' },
            { name: 'Secure Authentication & Sessions', level: 'Advanced' },
        ],
    },
    {
        category: 'Development Tools & Platforms',
        icon: '🛠️',
        skills: [
            { name: 'Git & Version Control', level: 'Advanced' },
            { name: 'GitHub CI/CD & Workflows', level: 'Advanced' },
            { name: 'Vercel Deployment', level: 'Advanced' },
            { name: 'Linux Environment (Kali/Ubuntu)', level: 'Advanced' },
            { name: 'Cross-Browser Optimization', level: 'Advanced' },
        ],
    },
];

const CERTIFICATIONS = [
    {
        title: 'Certified Ethical Hacker (CEH)',
        issuer: 'EC-Council',
        year: '2024',
        badge: 'GOLD CERT',
        desc: 'Industry-standard ethical hacking certification covering penetration testing, network defense, threat analysis, and vulnerability exploitation.',
    },
    {
        title: 'Claude 101',
        issuer: 'Anthropic',
        year: '2025',
        badge: 'AI SPECIALIST',
        desc: 'Advanced prompt design, context window utilization, and system prompting with Claude models.',
    },
    {
        title: 'AI Fluency',
        issuer: 'Anthropic',
        year: '2025',
        badge: 'AI CERTIFIED',
        desc: 'Harnessing frontier LLM capabilities for enterprise software development and intelligent agent workflows.',
    },
];

const SkillsMatrix: React.FC = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Certifications Banner */}
            <div
                style={{
                    backgroundColor: '#000080',
                    color: '#fff',
                    padding: '10px 14px',
                    border: '2px solid #fff',
                    borderRightColor: '#000',
                    borderBottomColor: '#000',
                }}
            >
                <div style={{ fontWeight: 'bold', fontSize: '13px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span>🏆</span> OFFICIAL CERTIFICATIONS & CREDENTIALS
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '8px' }}>
                    {CERTIFICATIONS.map((cert) => (
                        <div
                            key={cert.title}
                            style={{
                                backgroundColor: '#fff',
                                color: '#000',
                                border: '2px solid #808080',
                                borderRightColor: '#dfdfdf',
                                borderBottomColor: '#dfdfdf',
                                padding: '8px 10px',
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                                <span style={{ fontWeight: 'bold', fontSize: '12px', color: '#000080' }}>{cert.title}</span>
                                <span style={{ fontSize: '9px', backgroundColor: '#ffd700', color: '#000', padding: '1px 5px', fontWeight: 'bold' }}>
                                    {cert.badge}
                                </span>
                            </div>
                            <div style={{ fontSize: '11px', color: '#444', marginBottom: '4px' }}>
                                Issuer: <b>{cert.issuer}</b> ({cert.year})
                            </div>
                            <div style={{ fontSize: '10px', color: '#555', lineHeight: '1.3' }}>
                                {cert.desc}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Categorized Skills Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
                {SKILL_DATA.map((cat) => (
                    <div
                        key={cat.category}
                        style={{
                            backgroundColor: '#f5f5f5',
                            border: '2px solid #fff',
                            borderRightColor: '#808080',
                            borderBottomColor: '#808080',
                            padding: '10px',
                        }}
                    >
                        <div
                            style={{
                                fontWeight: 'bold',
                                fontSize: '12px',
                                color: '#000080',
                                borderBottom: '1px solid #808080',
                                paddingBottom: '4px',
                                marginBottom: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                            }}
                        >
                            <span>{cat.icon}</span> {cat.category}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            {cat.skills.map((skill) => (
                                <div
                                    key={skill.name}
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        backgroundColor: '#fff',
                                        border: '1px solid #dfdfdf',
                                        padding: '3px 6px',
                                        fontSize: '11px',
                                    }}
                                >
                                    <span style={{ color: '#111' }}>{skill.name}</span>
                                    {skill.level && (
                                        <span
                                            style={{
                                                fontSize: '9px',
                                                backgroundColor: '#c0c0c0',
                                                border: '1px solid #808080',
                                                padding: '0 4px',
                                                color: '#000',
                                            }}
                                        >
                                            {skill.level}
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SkillsMatrix;

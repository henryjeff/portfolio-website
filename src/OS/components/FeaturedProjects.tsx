import React, { useState } from 'react';
import GitHubProjects from './GitHubProjects';

interface Project {
    id: string;
    title: string;
    subtitle?: string;
    description: string;
    tags: string[];
    link?: string;
    badge?: string;
    icon: string;
}

const FEATURED_PROJECTS: Project[] = [
    {
        id: 'cv-gen',
        title: 'CV Generator Web App',
        subtitle: 'Resume & Career Tool',
        description: 'Created a web-based tool that helps users build resumes, focused on user-friendly design and functionality.',
        tags: ['JavaScript', 'HTML5', 'CSS3', 'Responsive UI', 'PDF Export'],
        link: 'https://waseeq-haider.github.io/cv-generator/',
        badge: 'LIVE TOOL',
        icon: '📄',
    },
    {
        id: 'hibi',
        title: 'HIBI — Learning Management System (LMS)',
        subtitle: 'Japan Education Platform',
        description: 'Developed a comprehensive Learning Management System for Japanese education environments, streamlining course management and student tracking.',
        tags: ['Full-Stack', 'LMS', 'Education Tech', 'Supabase', 'PostgreSQL'],
        badge: 'INTERNATIONAL',
        icon: '🎓',
    },
    {
        id: 'staycore',
        title: 'StayCore — Property Management System',
        subtitle: 'Hospitality & Real Estate Automation',
        description: 'Built a property management system to automate bookings, property tracking, and client communications.',
        tags: ['Automation', 'PostgreSQL', 'REST APIs', 'Client Workflows'],
        badge: 'ENTERPRISE',
        icon: '🏢',
    },
    {
        id: 'cv-attendance',
        title: 'Cultural Voyagers — Attendance Management System',
        subtitle: 'Internal Workforce Operations',
        description: 'Designed and deployed an automated attendance tracking solution for organizational operations.',
        tags: ['Access Control', 'Attendance Tracking', 'Workflow Security'],
        badge: 'PRODUCTION',
        icon: '⏱️',
    },
    {
        id: 'cv-finance',
        title: 'Cultural Voyagers — Finance & Invoice Management System',
        subtitle: 'Billing & Financial Reporting Application',
        description: 'Created a financial and invoice management application to streamline billing workflows and financial reporting.',
        tags: ['Financial Workflows', 'Invoicing', 'Payment Security', 'Data Integrity'],
        badge: 'PRODUCTION',
        icon: '💰',
    },
    {
        id: 'techytools',
        title: 'Techytoolsai Portfolio & Showcase',
        subtitle: 'AI Tools & Client Web Solutions',
        description: 'Developed a showcase site for AI tools and development projects, alongside client web solutions built for TechRealm.',
        tags: ['AI Tools', 'Next.js', 'React.js', 'Vercel', 'Tailwind CSS'],
        link: 'https://techytoolai.vercel.app/',
        badge: 'LIVE SHOWCASE',
        icon: '🤖',
    },
];

const FeaturedProjects: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'featured' | 'github'>('featured');

    const openLink = (url: string, e: React.MouseEvent) => {
        e.stopPropagation();
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            {/* Retro Tabs Header */}
            <div style={{ display: 'flex', gap: '3px', borderBottom: '2px solid #808080', paddingBottom: '2px', marginBottom: '12px' }}>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setActiveTab('featured');
                    }}
                    style={{
                        padding: '5px 14px',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        backgroundColor: activeTab === 'featured' ? '#c0c0c0' : '#dfdfdf',
                        border: '2px solid #fff',
                        borderRightColor: activeTab === 'featured' ? '#000' : '#808080',
                        borderBottomColor: activeTab === 'featured' ? '#c0c0c0' : '#808080',
                        borderTopColor: '#fff',
                        borderLeftColor: '#fff',
                        transform: activeTab === 'featured' ? 'translateY(2px)' : 'none',
                    }}
                >
                    📁 Featured Software ({FEATURED_PROJECTS.length})
                </button>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setActiveTab('github');
                    }}
                    style={{
                        padding: '5px 14px',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        backgroundColor: activeTab === 'github' ? '#c0c0c0' : '#dfdfdf',
                        border: '2px solid #fff',
                        borderRightColor: activeTab === 'github' ? '#000' : '#808080',
                        borderBottomColor: activeTab === 'github' ? '#c0c0c0' : '#808080',
                        borderTopColor: '#fff',
                        borderLeftColor: '#fff',
                        transform: activeTab === 'github' ? 'translateY(2px)' : 'none',
                    }}
                >
                    🐙 GitHub Repositories
                </button>
            </div>

            {/* Tab 1: Featured Projects */}
            {activeTab === 'featured' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
                    {FEATURED_PROJECTS.map((proj) => (
                        <div
                            key={proj.id}
                            style={{
                                backgroundColor: '#f0f0f0',
                                border: '2px solid #fff',
                                borderRightColor: '#808080',
                                borderBottomColor: '#808080',
                                padding: '12px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                boxShadow: 'inset 1px 1px #dfdfdf',
                            }}
                        >
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                                    <span style={{ fontSize: '20px' }}>{proj.icon}</span>
                                    {proj.badge && (
                                        <span
                                            style={{
                                                fontSize: '10px',
                                                padding: '2px 6px',
                                                backgroundColor: proj.badge.includes('LIVE') ? '#008000' : '#000080',
                                                color: '#fff',
                                                fontWeight: 'bold',
                                                fontFamily: 'monospace',
                                            }}
                                        >
                                            {proj.badge}
                                        </span>
                                    )}
                                </div>
                                <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', color: '#000080' }}>
                                    {proj.title}
                                </h4>
                                {proj.subtitle && (
                                    <div style={{ fontSize: '11px', color: '#555', fontStyle: 'italic', marginBottom: '6px' }}>
                                        {proj.subtitle}
                                    </div>
                                )}
                                <p style={{ fontSize: '12px', color: '#222', lineHeight: '1.4', margin: '0 0 10px 0' }}>
                                    {proj.description}
                                </p>
                            </div>

                            <div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '10px' }}>
                                    {proj.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            style={{
                                                fontSize: '10px',
                                                backgroundColor: '#dfdfdf',
                                                border: '1px solid #999',
                                                padding: '1px 5px',
                                                color: '#333',
                                            }}
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {proj.link ? (
                                    <button
                                        onClick={(e) => openLink(proj.link!, e)}
                                        style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '5px',
                                            backgroundColor: '#c0c0c0',
                                            border: '2px solid #fff',
                                            borderRightColor: '#000',
                                            borderBottomColor: '#000',
                                            padding: '4px 10px',
                                            color: '#000',
                                            fontSize: '11px',
                                            fontWeight: 'bold',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        <span>🌐</span> Open Live Application ↗
                                    </button>
                                ) : (
                                    <span
                                        style={{
                                            display: 'inline-block',
                                            backgroundColor: '#e6e6e6',
                                            border: '1px solid #aaa',
                                            padding: '3px 8px',
                                            fontSize: '11px',
                                            color: '#666',
                                        }}
                                    >
                                        🔒 Deployed Internal System
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Tab 2: Live GitHub Repos */}
            {activeTab === 'github' && (
                <div>
                    <div style={{ marginBottom: '8px', fontSize: '12px', color: '#333', backgroundColor: '#ffffcc', padding: '6px 10px', border: '1px solid #cccc00' }}>
                        📡 Connecting to <b>github.com/waseeq-haider</b> live repository index...
                    </div>
                    <GitHubProjects username="waseeq-haider" />
                </div>
            )}
        </div>
    );
};

export default FeaturedProjects;

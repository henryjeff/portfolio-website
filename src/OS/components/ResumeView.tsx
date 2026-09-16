import React from 'react';

const ResumeView: React.FC = () => {
    const handleDownload = (e: React.MouseEvent) => {
        e.stopPropagation();
        const cvText = `================================================================================
                           WASEEQ HAIDER - CV / RESUME
  Cybersecurity Specialist & Software Developer | CEH (Certified Ethical Hacker)
================================================================================

CONTACT DETAILS:
----------------
Location:  Muzaffarabad, Pakistan
Phone:     (+92) 317 0883933
Email:     waseeqyt@gmail.com
Portfolio: https://waseeq.vercel.app/
GitHub:    https://github.com/waseeq-haider

PROFESSIONAL SUMMARY:
---------------------
Passionate Computer Science student with CEH certification and hands-on experience
in web development, cybersecurity, and modern AI-driven coding workflows.

WORK EXPERIENCE:
----------------
1. Cultural Voyagers, Rawalpindi, Pakistan
   Cybersecurity Specialist & Software Developer
   SEPTEMBER 2025 - PRESENT
   • Secured company web platforms, booking systems, and internal tools against cyber threats.
   • Conducted vulnerability assessments and penetration testing on websites and web applications.
   • Identified and fixed security misconfigurations, weak authentication, and data exposure risks.
   • Implemented basic web application security controls including input validation, access control, and secure sessions.
   • Monitored systems for suspicious activity, malware, and unauthorized access attempts.
   • Assisted in securing customer data, booking records, and payment-related workflows.
   • Advised management on cybersecurity best practices and risk mitigation strategies.
   • Helped develop new web software and led IT infrastructure migration to transition manual Google Sheets and workflows to a software-driven online system.
   • Performed Linux-based security testing using industry tools.

2. TechRealm, Lahore, Pakistan
   Web Developer
   NOVEMBER 2025 - DECEMBER 2025
   • Developed and maintained responsive websites and web applications for multiple clients.
   • Converted UI/UX designs into clean, functional frontend code using HTML, CSS, and JavaScript.
   • Built and optimized landing pages, business websites, and portfolios.
   • Ensured cross-browser compatibility and mobile responsiveness.
   • Improved website performance, loading speed, and visual consistency.
   • Debugged and fixed frontend issues, layout bugs, and JavaScript errors.
   • Integrated contact forms, inquiry systems, and dynamic UI components.

EDUCATION:
----------
Paramount School and Science College, Muzaffarabad, Pakistan
Intermediate in Computer Science (ICS)
AUGUST 2022 - APRIL 2024

FEATURED SOFTWARE PROJECTS:
---------------------------
1. CV Generator Web App (https://waseeq-haider.github.io/cv-generator/)
   Web-based resume builder application focused on usability and PDF output.
2. HIBI — Learning Management System (LMS) | Japan
   Learning Management System for Japanese education environments.
3. StayCore — Property Management System
   Property management solution to automate bookings, property tracking, and client communications.
4. Cultural Voyagers — Attendance Management System
   Automated attendance tracking solution for organizational operations.
5. Cultural Voyagers — Finance & Invoice Management System
   Financial and invoice management application for billing workflows and financial reporting.
6. Techytoolsai Portfolio & Showcase (https://techytoolai.vercel.app/)
   Showcase site for AI tools and development projects, alongside client web solutions.

TECHNICAL SKILLS:
-----------------
• Cybersecurity: Metasploit, Burp Suite, Hydra, Wireshark, Nmap, Penetration Testing, Vulnerability Assessment, Linux Auditing.
• AI Development: Claude Code, Google Antigravity, OpenCode, Cursor, Lovable, Prompt Engineering, AI Coding Workflows.
• Languages: JavaScript, Python, HTML5, CSS3.
• Frameworks & Libraries: React.js, Next.js, Vite, Tailwind CSS.
• Backend & Database: Supabase, PostgreSQL, REST APIs.
• Dev Tools & Workflow: Git, GitHub, Vercel, Responsive Web Development.

OFFICIAL CERTIFICATIONS:
------------------------
• Certified Ethical Hacker (CEH) — EC-Council (2024)
• Claude 101 — Anthropic
• AI Fluency — Anthropic

LANGUAGES:
----------
• Urdu: Native
• English: Proficient (Reading: C2; Listening, Speaking, Writing: C1)
================================================================================
`;
        try {
            const blob = new Blob([cvText], { type: 'text/plain;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'Waseeq_Haider_Resume.txt';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch (err) {
            window.open('/Waseeq_Haider_Resume.txt', '_blank');
        }
    };

    const handlePrint = (e: React.MouseEvent) => {
        e.stopPropagation();
        try {
            window.print();
        } catch (err) {
            console.error(err);
        }
    };

    const openLink = (url: string, e: React.MouseEvent) => {
        e.stopPropagation();
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', color: '#111', fontSize: '13px', lineHeight: '1.5' }}>
            {/* Toolbar / Header Strip */}
            <div
                style={{
                    backgroundColor: '#e8e8e8',
                    border: '1px solid #808080',
                    padding: '8px 12px',
                    marginBottom: '14px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '8px',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '18px' }}>📝</span>
                    <b>DOCUMENT: Waseeq_Haider_Resume.doc</b>
                    <span style={{ backgroundColor: '#008000', color: '#fff', fontSize: '10px', padding: '1px 6px', fontWeight: 'bold' }}>
                        VERIFIED CEH
                    </span>
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <button
                        onClick={handleDownload}
                        style={{
                            padding: '4px 12px',
                            cursor: 'pointer',
                            fontSize: '11px',
                            fontWeight: 'bold',
                            backgroundColor: '#c0c0c0',
                            border: '2px solid #fff',
                            borderRightColor: '#000',
                            borderBottomColor: '#000',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                        }}
                    >
                        <span>📥</span> Download CV (.txt)
                    </button>
                    <button
                        onClick={handlePrint}
                        style={{
                            padding: '4px 12px',
                            cursor: 'pointer',
                            fontSize: '11px',
                            backgroundColor: '#c0c0c0',
                            border: '2px solid #fff',
                            borderRightColor: '#000',
                            borderBottomColor: '#000',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                        }}
                    >
                        <span>🖨️</span> Print / PDF
                    </button>
                    <a
                        href="mailto:waseeqyt@gmail.com?subject=Hire%20Waseeq%20Haider"
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            padding: '4px 12px',
                            fontSize: '11px',
                            backgroundColor: '#000080',
                            color: '#fff',
                            border: '2px solid #fff',
                            borderRightColor: '#000',
                            borderBottomColor: '#000',
                            textDecoration: 'none',
                            fontWeight: 'bold',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                        }}
                    >
                        <span>✉️</span> Hire Me
                    </a>
                </div>
            </div>

            {/* Resume Header */}
            <div style={{ borderBottom: '3px double #000080', paddingBottom: '12px', marginBottom: '16px' }}>
                <h1 style={{ margin: 0, fontSize: '28px', color: '#000080', letterSpacing: '0.5px' }}>
                    Waseeq Haider
                </h1>
                <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#333', marginTop: '4px' }}>
                    Cybersecurity Specialist & Software Developer | CEH Certified
                </div>
                <div style={{ fontSize: '12px', color: '#555', marginTop: '6px', display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                    <span>📍 Muzaffarabad, Pakistan</span>
                    <span>📞 <a href="tel:+923170883933" onClick={(e) => e.stopPropagation()} style={{ color: '#000080', fontWeight: 'bold' }}>(+92) 317 0883933</a></span>
                    <span>✉️ <a href="mailto:waseeqyt@gmail.com" onClick={(e) => e.stopPropagation()} style={{ color: '#000080', fontWeight: 'bold' }}>waseeqyt@gmail.com</a></span>
                    <span>🌐 <a href="https://waseeq.vercel.app/" onClick={(e) => openLink('https://waseeq.vercel.app/', e)} target="_blank" rel="noopener noreferrer" style={{ color: '#000080', fontWeight: 'bold', cursor: 'pointer' }}>Portfolio ↗</a></span>
                    <span>💻 <a href="https://github.com/waseeq-haider" onClick={(e) => openLink('https://github.com/waseeq-haider', e)} target="_blank" rel="noopener noreferrer" style={{ color: '#000080', fontWeight: 'bold', cursor: 'pointer' }}>GitHub ↗</a></span>
                </div>
                <div style={{ marginTop: '10px', backgroundColor: '#f0f4f8', borderLeft: '4px solid #000080', padding: '8px 12px', fontSize: '12px', color: '#222' }}>
                    Passionate Computer Science student with <b>CEH certification</b> and hands-on experience in web development, cybersecurity, and modern AI coding workflows.
                </div>
            </div>

            {/* Experience Section */}
            <div style={{ marginBottom: '20px' }}>
                <div
                    style={{
                        backgroundColor: '#000080',
                        color: '#fff',
                        padding: '4px 8px',
                        fontWeight: 'bold',
                        fontSize: '12px',
                        letterSpacing: '1px',
                        marginBottom: '10px',
                    }}
                >
                    [ 1. WORK EXPERIENCE ]
                </div>

                {/* Cultural Voyagers */}
                <div style={{ marginBottom: '16px', paddingLeft: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
                        <div>
                            <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#000' }}>
                                Cultural Voyagers
                            </span>{' '}
                            <span style={{ fontSize: '12px', color: '#555' }}>— Rawalpindi, Pakistan</span>
                        </div>
                        <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#000080', backgroundColor: '#e0e8f5', padding: '1px 6px' }}>
                            SEPTEMBER 2025 - PRESENT
                        </span>
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#006699', margin: '2px 0 6px 0' }}>
                        Cybersecurity Specialist & Software Developer
                    </div>
                    <ul style={{ margin: '4px 0', paddingLeft: '20px', color: '#222', fontSize: '12px' }}>
                        <li style={{ marginBottom: '4px' }}>Secured company web platforms, booking systems, and internal tools against cyber threats.</li>
                        <li style={{ marginBottom: '4px' }}>Conducted vulnerability assessments and penetration testing on websites and web applications.</li>
                        <li style={{ marginBottom: '4px' }}>Identified and fixed security misconfigurations, weak authentication, and data exposure risks.</li>
                        <li style={{ marginBottom: '4px' }}>Implemented basic web application security controls including input validation, access control, and secure sessions.</li>
                        <li style={{ marginBottom: '4px' }}>Monitored systems for suspicious activity, malware, and unauthorized access attempts.</li>
                        <li style={{ marginBottom: '4px' }}>Assisted in securing customer data, booking records, and payment-related workflows.</li>
                        <li style={{ marginBottom: '4px' }}>Advised management on cybersecurity best practices and risk mitigation strategies.</li>
                        <li style={{ marginBottom: '4px' }}>Helped develop new web software and led IT infrastructure migration to transition manual Google Sheets and workflows to a software-driven online system.</li>
                        <li style={{ marginBottom: '4px' }}>Performed Linux-based security testing using industry tools.</li>
                    </ul>
                </div>

                {/* TechRealm */}
                <div style={{ marginBottom: '16px', paddingLeft: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
                        <div>
                            <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#000' }}>
                                TechRealm
                            </span>{' '}
                            <span style={{ fontSize: '12px', color: '#555' }}>— Lahore, Pakistan</span>
                        </div>
                        <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#444', backgroundColor: '#eaeaea', padding: '1px 6px' }}>
                            NOVEMBER 2025 - DECEMBER 2025
                        </span>
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#006699', margin: '2px 0 6px 0' }}>
                        Web Developer
                    </div>
                    <ul style={{ margin: '4px 0', paddingLeft: '20px', color: '#222', fontSize: '12px' }}>
                        <li style={{ marginBottom: '4px' }}>Developed and maintained responsive websites and web applications for multiple clients.</li>
                        <li style={{ marginBottom: '4px' }}>Converted UI/UX designs into clean, functional frontend code using HTML, CSS, and JavaScript.</li>
                        <li style={{ marginBottom: '4px' }}>Built and optimized landing pages, business websites, and portfolios.</li>
                        <li style={{ marginBottom: '4px' }}>Ensured cross-browser compatibility and mobile responsiveness.</li>
                        <li style={{ marginBottom: '4px' }}>Improved website performance, loading speed, and visual consistency.</li>
                        <li style={{ marginBottom: '4px' }}>Debugged and fixed frontend issues, layout bugs, and JavaScript errors.</li>
                        <li style={{ marginBottom: '4px' }}>Integrated contact forms, inquiry systems, and dynamic UI components.</li>
                    </ul>
                </div>
            </div>

            {/* Education Section */}
            <div style={{ marginBottom: '20px' }}>
                <div
                    style={{
                        backgroundColor: '#000080',
                        color: '#fff',
                        padding: '4px 8px',
                        fontWeight: 'bold',
                        fontSize: '12px',
                        letterSpacing: '1px',
                        marginBottom: '10px',
                    }}
                >
                    [ 2. EDUCATION ]
                </div>
                <div style={{ paddingLeft: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
                        <div>
                            <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#000' }}>
                                Paramount School and Science College
                            </span>{' '}
                            <span style={{ fontSize: '12px', color: '#555' }}>— Muzaffarabad, Pakistan</span>
                        </div>
                        <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#444' }}>
                            AUGUST 2022 - APRIL 2024
                        </span>
                    </div>
                    <div style={{ fontSize: '13px', color: '#333', marginTop: '2px' }}>
                        <b>Intermediate in Computer Science (ICS)</b>
                    </div>
                </div>
            </div>

            {/* Featured Projects Highlight */}
            <div style={{ marginBottom: '20px' }}>
                <div
                    style={{
                        backgroundColor: '#000080',
                        color: '#fff',
                        padding: '4px 8px',
                        fontWeight: 'bold',
                        fontSize: '12px',
                        letterSpacing: '1px',
                        marginBottom: '10px',
                    }}
                >
                    [ 3. KEY SOFTWARE PROJECTS ]
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '8px', paddingLeft: '8px' }}>
                    <div style={{ border: '1px solid #ccc', padding: '8px', backgroundColor: '#fafafa' }}>
                        <b>• CV Generator Web App</b>{' '}
                        <button onClick={(e) => openLink('https://waseeq-haider.github.io/cv-generator/', e)} style={{ fontSize: '11px', color: '#000080', background: 'none', border: 'none', textDecoration: 'underline', cursor: 'pointer', padding: 0 }}>
                            [Live Link ↗]
                        </button>
                        <div style={{ fontSize: '11px', color: '#444', marginTop: '2px' }}>
                            Web-based tool that helps users build resumes, focused on user-friendly design and functionality.
                        </div>
                    </div>
                    <div style={{ border: '1px solid #ccc', padding: '8px', backgroundColor: '#fafafa' }}>
                        <b>• HIBI — Learning Management System (LMS)</b> | Japan
                        <div style={{ fontSize: '11px', color: '#444', marginTop: '2px' }}>
                            LMS for Japanese education environments, streamlining course management and student tracking.
                        </div>
                    </div>
                    <div style={{ border: '1px solid #ccc', padding: '8px', backgroundColor: '#fafafa' }}>
                        <b>• StayCore — Property Management System</b>
                        <div style={{ fontSize: '11px', color: '#444', marginTop: '2px' }}>
                            Automates bookings, property tracking, and client communications.
                        </div>
                    </div>
                    <div style={{ border: '1px solid #ccc', padding: '8px', backgroundColor: '#fafafa' }}>
                        <b>• Cultural Voyagers — Attendance System</b>
                        <div style={{ fontSize: '11px', color: '#444', marginTop: '2px' }}>
                            Automated attendance tracking solution for organizational operations.
                        </div>
                    </div>
                    <div style={{ border: '1px solid #ccc', padding: '8px', backgroundColor: '#fafafa' }}>
                        <b>• Cultural Voyagers — Finance & Invoice System</b>
                        <div style={{ fontSize: '11px', color: '#444', marginTop: '2px' }}>
                            Financial & invoice management application for billing workflows and financial reporting.
                        </div>
                    </div>
                    <div style={{ border: '1px solid #ccc', padding: '8px', backgroundColor: '#fafafa' }}>
                        <b>• Techytoolsai Portfolio & Showcase</b>{' '}
                        <button onClick={(e) => openLink('https://techytoolai.vercel.app/', e)} style={{ fontSize: '11px', color: '#000080', background: 'none', border: 'none', textDecoration: 'underline', cursor: 'pointer', padding: 0 }}>
                            [Live Link ↗]
                        </button>
                        <div style={{ fontSize: '11px', color: '#444', marginTop: '2px' }}>
                            Showcase site for AI tools and development projects, alongside client web solutions built for TechRealm.
                        </div>
                    </div>
                </div>
            </div>

            {/* Skills & AI-Assisted Development */}
            <div style={{ marginBottom: '20px' }}>
                <div
                    style={{
                        backgroundColor: '#000080',
                        color: '#fff',
                        padding: '4px 8px',
                        fontWeight: 'bold',
                        fontSize: '12px',
                        letterSpacing: '1px',
                        marginBottom: '10px',
                    }}
                >
                    [ 4. TECHNICAL SKILLS & AI WORKFLOWS ]
                </div>
                <div style={{ paddingLeft: '8px', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px' }}>
                    <div>
                        <b>Cybersecurity:</b> Metasploit, Burp Suite, Hydra, Wireshark, Nmap, Penetration Testing, Vulnerability Assessment, Linux Security.
                    </div>
                    <div>
                        <b>AI-Assisted Development:</b> Extensive experience utilizing Claude Code, Google Antigravity, OpenCode, Cursor, and Lovable to accelerate full-stack development. Skilled in advanced prompt engineering and implementing modern AI-driven coding workflows for software optimization.
                    </div>
                    <div>
                        <b>Languages:</b> JavaScript, Python, HTML5, CSS3.
                    </div>
                    <div>
                        <b>Frameworks & Libraries:</b> React.js, Next.js, Vite, Tailwind CSS.
                    </div>
                    <div>
                        <b>Backend & Database:</b> Supabase, PostgreSQL, REST APIs.
                    </div>
                    <div>
                        <b>Development Tools & Platforms:</b> Git, GitHub, Vercel, Responsive Web Development.
                    </div>
                </div>
            </div>

            {/* Certifications & Languages */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                <div>
                    <div
                        style={{
                            backgroundColor: '#000080',
                            color: '#fff',
                            padding: '4px 8px',
                            fontWeight: 'bold',
                            fontSize: '12px',
                            letterSpacing: '1px',
                            marginBottom: '10px',
                        }}
                    >
                        [ 5. CERTIFICATIONS ]
                    </div>
                    <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '12px', color: '#222' }}>
                        <li style={{ marginBottom: '4px' }}>
                            <b>Certified Ethical Hacker (CEH)</b> — EC-Council (2024)
                        </li>
                        <li style={{ marginBottom: '4px' }}>
                            <b>Claude 101</b> — Anthropic
                        </li>
                        <li style={{ marginBottom: '4px' }}>
                            <b>AI Fluency</b> — Anthropic
                        </li>
                    </ul>
                </div>

                <div>
                    <div
                        style={{
                            backgroundColor: '#000080',
                            color: '#fff',
                            padding: '4px 8px',
                            fontWeight: 'bold',
                            fontSize: '12px',
                            letterSpacing: '1px',
                            marginBottom: '10px',
                        }}
                    >
                        [ 6. SPOKEN LANGUAGES ]
                    </div>
                    <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '12px', color: '#222' }}>
                        <li style={{ marginBottom: '4px' }}>
                            <b>Urdu:</b> Native
                        </li>
                        <li style={{ marginBottom: '4px' }}>
                            <b>English:</b> Proficient (Reading: C2; Listening, Speaking, Writing: C1)
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ResumeView;

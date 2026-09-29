import os
import sys
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
)
from reportlab.lib.units import inch

def generate_polished_master_resume(output_path=None):
    if output_path is None:
        base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        output_path = os.path.join(base_dir, "public", "Hamza_Ahmed_CV.pdf")

    # Target: EXACTLY 1 PAGE, Calibrated for Maximum Readability, Senior Executive Tech Styling
    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        leftMargin=0.38 * inch,
        rightMargin=0.38 * inch,
        topMargin=0.32 * inch,
        bottomMargin=0.32 * inch
    )

    PRIMARY = colors.HexColor("#0F172A")       # Slate 900
    SECONDARY = colors.HexColor("#0284C7")     # Sky Blue 600
    COMPANY_COLOR = colors.HexColor("#0369A1") # Deep Sky 700
    TEXT_MAIN = colors.HexColor("#1E293B")     # Slate 800
    TEXT_MUTED = colors.HexColor("#64748B")    # Slate 500
    HEADER_BG = colors.HexColor("#F1F5F9")     # Slate 100
    BAR_ACCENT = colors.HexColor("#0284C7")    # Accent border

    name_style = ParagraphStyle(
        'HeaderName',
        fontName='Helvetica-Bold',
        fontSize=19.5,
        leading=21.5,
        textColor=PRIMARY,
        alignment=1,
        spaceAfter=1
    )

    role_style = ParagraphStyle(
        'HeaderRole',
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=12,
        textColor=SECONDARY,
        alignment=1,
        spaceAfter=2.5
    )

    contact_style = ParagraphStyle(
        'HeaderContact',
        fontName='Helvetica',
        fontSize=8.1,
        leading=10.8,
        textColor=TEXT_MUTED,
        alignment=1,
        spaceAfter=2
    )

    section_title = ParagraphStyle(
        'SectionTitle',
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=10.5,
        textColor=PRIMARY,
        textTransform='uppercase'
    )

    summary_text = ParagraphStyle(
        'SummaryText',
        fontName='Helvetica',
        fontSize=8.1,
        leading=11.2,
        textColor=TEXT_MAIN,
        alignment=4
    )

    job_title = ParagraphStyle(
        'JobTitle',
        fontName='Helvetica-Bold',
        fontSize=8.6,
        leading=11.2,
        textColor=PRIMARY
    )

    job_meta = ParagraphStyle(
        'JobMeta',
        fontName='Helvetica-Bold',
        fontSize=8.0,
        leading=11.2,
        textColor=TEXT_MUTED,
        alignment=2
    )

    bullet_style = ParagraphStyle(
        'Bullet',
        fontName='Helvetica',
        fontSize=8.0,
        leading=10.8,
        textColor=TEXT_MAIN,
        leftIndent=10,
        firstLineIndent=-6,
        spaceAfter=1.2
    )

    skill_row_label = ParagraphStyle(
        'SkillLabel',
        fontName='Helvetica-Bold',
        fontSize=8.0,
        leading=10.8,
        textColor=PRIMARY
    )

    skill_row_val = ParagraphStyle(
        'SkillVal',
        fontName='Helvetica',
        fontSize=8.0,
        leading=10.8,
        textColor=TEXT_MAIN
    )

    app_text = ParagraphStyle(
        'AppText',
        fontName='Helvetica',
        fontSize=7.9,
        leading=10.4,
        textColor=TEXT_MAIN
    )

    app_link = ParagraphStyle(
        'AppLink',
        fontName='Helvetica-Bold',
        fontSize=7.7,
        leading=10.4,
        textColor=SECONDARY,
        alignment=2
    )

    story = []

    def make_section_banner(title):
        t = Table(
            [[Paragraph(f"<b>{title}</b>", section_title)]],
            colWidths=[7.74 * inch]
        )
        t.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,-1), HEADER_BG),
            ('LEFTPADDING', (0,0), (-1,-1), 5),
            ('RIGHTPADDING', (0,0), (-1,-1), 5),
            ('TOPPADDING', (0,0), (-1,-1), 1.6),
            ('BOTTOMPADDING', (0,0), (-1,-1), 1.6),
            ('LINELEFT', (0,0), (0,-1), 3.2, BAR_ACCENT),
        ]))
        return t

    # 1. HEADER
    story.append(Paragraph("HAMZA AHMED", name_style))
    story.append(Paragraph("SENIOR MOBILE & FRONTEND ENGINEER &nbsp;•&nbsp; REACT NATIVE / REACT.JS / TYPESCRIPT", role_style))
    
    contact_p = (
        'hamza_ahmed95@icloud.com &nbsp;•&nbsp; +92-307-015-9904 &nbsp;•&nbsp; Karachi, Pakistan (Open to Remote / US-EU Shifts)<br/>'
        'Portfolio: <a href="https://hamza-ahmed-portfolio.vercel.app/" color="#0284C7"><u>hamza-ahmed-portfolio.vercel.app</u></a> &nbsp;•&nbsp; '
        'LinkedIn: <a href="https://www.linkedin.com/in/hamza-ahmed-9545s75" color="#0284C7"><u>linkedin.com/in/hamza-ahmed-9545s75</u></a> &nbsp;•&nbsp; '
        'GitHub: <a href="https://github.com/HamzaAhmed4059" color="#0284C7"><u>github.com/HamzaAhmed4059</u></a>'
    )
    story.append(Paragraph(contact_p, contact_style))
    story.append(Spacer(1, 2))

    # 2. PROFESSIONAL SUMMARY
    story.append(make_section_banner("PROFESSIONAL SUMMARY"))
    story.append(Spacer(1, 2))
    sum_text = (
        "<b>Senior Mobile & Frontend Engineer</b> with <b>6+ years</b> shipping production-grade React Native & React.js applications for distributed teams. Proven track record in <b>white-label multi-tenant architecture</b>, <b>custom native bridges (Swift/Kotlin)</b>, VoIP/telephony (Twilio/CallKit), turn-by-turn navigation (Mapbox), and <b>automated testing (TDD, Detox E2E)</b>. <b>AI-First engineer</b> leveraging Cursor, Claude, and OpenCode to accelerate scaffolding, test generation, and refactoring without sacrificing code quality. Experienced across US/EU time zones."
    )
    story.append(Paragraph(sum_text, summary_text))
    story.append(Spacer(1, 2.5))

    # 3. TECHNICAL SKILLS
    story.append(make_section_banner("TECHNICAL SKILLS"))
    story.append(Spacer(1, 1.5))
    
    skills_data = [
        [Paragraph("Mobile Development:", skill_row_label), Paragraph("React Native (CLI & Expo), Flutter, Swift, Kotlin, Custom Native Modules, SQLite, Offline Sync", skill_row_val)],
        [Paragraph("Frontend & Web:", skill_row_label), Paragraph("React.js, Next.js, Angular, TypeScript, JavaScript (ES6+), Redux Toolkit, Zustand, HTML5, CSS3, Tailwind CSS", skill_row_val)],
        [Paragraph("Backend & APIs:", skill_row_label), Paragraph("Node.js, Express, NestJS, REST APIs, GraphQL, SQL, Supabase, Firebase, PostgreSQL, MongoDB", skill_row_val)],
        [Paragraph("Testing & Delivery:", skill_row_label), Paragraph("Test-Driven Development (TDD), Detox (E2E Testing), Jest, Sentry, CodePush (OTA), Fastlane, CI/CD", skill_row_val)],
        [Paragraph("Integrations & AI:", skill_row_label), Paragraph("Twilio VoIP, iOS CallKit, Android Notifee/FCM, Mapbox Navigation, Google Maps, WebRTC, LiveKit, Cursor, Claude", skill_row_val)]
    ]
    t_skills = Table(skills_data, colWidths=[1.60 * inch, 6.14 * inch])
    t_skills.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0.5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0.5),
    ]))
    story.append(t_skills)
    story.append(Spacer(1, 2.5))

    # 4. PROFESSIONAL EXPERIENCE
    story.append(make_section_banner("PROFESSIONAL EXPERIENCE"))
    story.append(Spacer(1, 1.5))

    # Role 1: Akvateq & Knockio
    row1 = [
        [
            Paragraph("<b>Lead Mobile Engineer (Knockio Core) / Team Lead</b> — <font color='#0369A1'><b>Akvateq</b></font>", job_title),
            Paragraph("Karachi, Pakistan &nbsp;|&nbsp; <b>May 2022 – Present</b>", job_meta)
        ]
    ]
    t_r1 = Table(row1, colWidths=[4.4 * inch, 3.34 * inch])
    t_r1.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0.5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1.2),
    ]))
    story.append(t_r1)

    akvateq_bullets = [
        "Lead mobile architecture and manage a squad of 3 engineers within an 18-person agile team; oversee sprint delivery and code reviews.",
        "Architected <b>Knockio</b> (Core Flagship Product), an enterprise CRM & field-ops platform (React Native CLI) deployed nationwide.",
        "Engineered real-time <b>Twilio VoIP calling</b> (iOS CallKit, Android Notifee/FCM), handling 500+ daily calls.",
        "Built custom native bridges (Swift/Kotlin) for <b>Mapbox turn-by-turn navigation</b>, live GPS tracking, territory clustering, and route planning.",
        "Delivered a <b>multi-tenant white-label theming engine</b>, enabling instant branding and automated client deployments from a single codebase.",
        "Pioneered <b>TDD adoption</b> and <b>Detox E2E test suites</b>, reducing critical regression bugs by 45% and elevating release stability.",
        "Implemented an automated OTA pipeline via <b>CodePush</b>, cutting hotfix distribution cycles from 48 hours to under 15 minutes."
    ]
    for b in akvateq_bullets:
        story.append(Paragraph(f"• {b}", bullet_style))

    story.append(Spacer(1, 1.8))

    # Role 2: Gotech
    row2 = [
        [
            Paragraph("<b>Lead Mobile Engineer (Advisory & Delivery)</b> — <font color='#0369A1'><b>Gotech</b></font>", job_title),
            Paragraph("Remote / Part-Time &nbsp;|&nbsp; <b>May 2025 – Present</b>", job_meta)
        ]
    ]
    t_r2 = Table(row2, colWidths=[4.4 * inch, 3.34 * inch])
    t_r2.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0.5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1.2),
    ]))
    story.append(t_r2)

    gotech_bullets = [
        "Provide technical oversight, architectural direction, and code quality governance across mobile development teams.",
        "Supervised modular refactoring and state optimization in React Native, improving cold-start launch times by ~30%.",
        "Mentored engineers in adopting AI-first development workflows (Cursor, Claude) and enforced automated testing standards."
    ]
    for b in gotech_bullets:
        story.append(Paragraph(f"• {b}", bullet_style))

    story.append(Spacer(1, 1.8))

    # Role 3: SudoWare
    row3 = [
        [
            Paragraph("<b>Mobile App Developer (React Native)</b> — <font color='#0369A1'><b>SudoWare</b></font>", job_title),
            Paragraph("Karachi, Pakistan &nbsp;|&nbsp; <b>Nov 2020 – Dec 2021</b>", job_meta)
        ]
    ]
    t_r3 = Table(row3, colWidths=[4.4 * inch, 3.34 * inch])
    t_r3.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0.5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1.2),
    ]))
    story.append(t_r3)

    sudoware_bullets = [
        "Developed cross-platform mobile apps (React Native / Expo) with Google Maps API integration for real-time geolocation and tracking.",
        "Optimized REST API consumption and local SQLite caching, cutting network latency and enhancing UI fluidity."
    ]
    for b in sudoware_bullets:
        story.append(Paragraph(f"• {b}", bullet_style))

    story.append(Spacer(1, 2.5))

    # 5. SHIPPED PRODUCTION APPS
    story.append(make_section_banner("SHIPPED PRODUCTION APPS (APP STORE & PLAY STORE)"))
    story.append(Spacer(1, 1.2))

    apps_data = [
        [
            Paragraph("• <b>Knockio (Flagship):</b> Enterprise CRM & field-ops with Mapbox routing, Twilio VoIP, and offline sync.", app_text),
            Paragraph('<a href="https://apps.apple.com/us/app/knockio-field-service-crm/id6756485440" color="#0284C7"><u>App Store</u></a> &nbsp;|&nbsp; <a href="https://play.google.com/store/apps/details?id=com.knockio.crm&hl=en&pli=1" color="#0284C7"><u>Play Store</u></a>', app_link)
        ],
        [
            Paragraph("• <b>Outlaws Roofing:</b> Knockio white-label deployment for roofing contractor workforce ops & route planning.", app_text),
            Paragraph('<a href="https://apps.apple.com/us/app/outlaws-roofing/id6792015146" color="#0284C7"><u>App Store</u></a> &nbsp;|&nbsp; <a href="https://play.google.com/store/apps/details?id=org.outlawsroofing.com&hl=en" color="#0284C7"><u>Play Store</u></a>', app_link)
        ],
        [
            Paragraph("• <b>TalkGenie AI:</b> Context-aware AI customer-support chatbot mobile app powered by LLMs & Supabase.", app_text),
            Paragraph('<a href="https://apps.apple.com/us/app/talkgenie-ai/id6778013827" color="#0284C7"><u>App Store</u></a> &nbsp;|&nbsp; <a href="https://play.google.com/store/apps/details?id=ai.talkgenie.mobile&hl=en" color="#0284C7"><u>Play Store</u></a>', app_link)
        ],
        [
            Paragraph("• <b>Cruisimity:</b> Social driving & navigation app with custom cruise routes, live trip tracking, and chat.", app_text),
            Paragraph('<a href="https://apps.apple.com/us/app/cruisimity/id6744337395" color="#0284C7"><u>App Store</u></a>', app_link)
        ],
        [
            Paragraph("• <b>Wedstimate:</b> 4.8★ wedding vendor marketplace with upfront pricing, direct messaging, and in-app purchases.", app_text),
            Paragraph('<a href="https://apps.apple.com/us/app/wedstimate-wedding-vendors/id6712045315" color="#0284C7"><u>App Store</u></a> &nbsp;|&nbsp; <a href="https://play.google.com/store/apps/details?id=com.wedstimatemobileapp&hl=en" color="#0284C7"><u>Play Store</u></a>', app_link)
        ],
        [
            Paragraph("• <b>Organic Produce Finder:</b> 5.0★ marketplace connecting buyers with local growers — geolocation & messaging.", app_text),
            Paragraph('<a href="https://apps.apple.com/us/app/organic-produce-finder/id6742911565" color="#0284C7"><u>App Store</u></a> &nbsp;|&nbsp; <a href="https://play.google.com/store/apps/details?id=com.organicproduce.co&hl=en" color="#0284C7"><u>Play Store</u></a>', app_link)
        ],
        [
            Paragraph("• <b>IVY Online & MyMonstro:</b> EdTech LMS platform (HD video lectures) & school tracking portal (Web + Android).", app_text),
            Paragraph('<a href="https://apps.apple.com/pk/app/ivy-online-learning-platform/id6499261611" color="#0284C7"><u>App Store</u></a> &nbsp;|&nbsp; <a href="https://play.google.com/store/apps/details?id=com.monstro.monstrox&hl=en" color="#0284C7"><u>Play Store</u></a>', app_link)
        ]
    ]

    t_apps = Table(apps_data, colWidths=[6.10 * inch, 1.64 * inch])
    t_apps.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0.4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0.4),
    ]))
    story.append(t_apps)
    story.append(Spacer(1, 2.5))

    # 6. EDUCATION & LANGUAGES
    t_bottom_head = [
        [
            make_section_banner("EDUCATION"),
            make_section_banner("LANGUAGES")
        ]
    ]
    t_b_head = Table(t_bottom_head, colWidths=[3.97 * inch, 3.77 * inch])
    t_b_head.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(t_b_head)
    story.append(Spacer(1, 1.2))

    t_bottom_content = [
        [
            Paragraph("<b>Bachelor of Science in Computer Science (BSCS)</b><br/><font color='#64748B'>Iqra University, Karachi &nbsp;|&nbsp; 2016 – 2020</font>", ParagraphStyle('EduM', fontName='Helvetica', fontSize=7.8, leading=10.4, textColor=TEXT_MAIN)),
            Paragraph("• <b>English:</b> Professional Working (Fluent Async / Technical)<br/>• <b>Urdu:</b> Native", ParagraphStyle('LangM', fontName='Helvetica', fontSize=7.8, leading=10.4, textColor=TEXT_MAIN))
        ]
    ]
    t_b_body = Table(t_bottom_content, colWidths=[3.97 * inch, 3.77 * inch])
    t_b_body.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(t_b_body)

    doc.build(story)
    print(f"Generated Polished Master CV: {output_path}")

if __name__ == "__main__":
    out = sys.argv[1] if len(sys.argv) > 1 else None
    generate_polished_master_resume(out)

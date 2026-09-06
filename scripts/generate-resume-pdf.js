const { jsPDF } = require('jspdf');
const fs = require('fs');
const path = require('path');

function calculateExperience(startDateStr = '2021-04-26') {
  const startDate = new Date(startDateStr);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - startDate.getTime());
  const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365.25);
  const rounded = Math.round(diffYears * 2) / 2;
  return `${rounded}+ Years`;
}

function buildResumePdf() {
  const expText = calculateExperience('2021-04-26');
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth(); // ~595.28 pt
  const pageHeight = doc.internal.pageSize.getHeight(); // ~841.89 pt
  const margin = 42;
  const contentWidth = pageWidth - margin * 2; // ~511 pt

  let y = 45;

  // Helper function for section headings with horizontal line
  function drawSectionHeader(title, color = [0, 0, 0]) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(color[0], color[1], color[2]);
    doc.text(title, margin, y);
    y += 5;
    doc.setDrawColor(70, 70, 70);
    doc.setLineWidth(0.75);
    doc.line(margin, y, margin + contentWidth, y);
    y += 14;
  }

  // ==========================================
  // PAGE 1
  // ==========================================

  // 1. Header - PAVAN SAI VEJJU
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(26, 54, 93); // Navy Blue #1A365D
  doc.text('PAVAN SAI VEJJU', pageWidth / 2, y, { align: 'center' });
  y += 18;

  // 2. Subtitle with Highlighted Experience
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10.5);
  doc.setTextColor(30, 30, 30);
  const prefix = 'Front-End Developer (React JS) || Work Experience : ';
  const prefixWidth = doc.getTextWidth(prefix);
  const highlightWidth = doc.getTextWidth(expText);
  const totalSubWidth = prefixWidth + highlightWidth;
  const subStartX = (pageWidth - totalSubWidth) / 2;

  doc.text(prefix, subStartX, y);

  // Yellow Highlight Box
  doc.setFillColor(255, 235, 59); // Yellow
  doc.rect(subStartX + prefixWidth - 2, y - 9.5, highlightWidth + 4, 13, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 0, 0);
  doc.text(expText, subStartX + prefixWidth, y);
  y += 15;

  // 3. Contact Line
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(30, 30, 30);
  const contactPart1 = 'Email: pavansaivejju@gmail.com || mobile: 9133953205 || ';
  const contactPart2 = 'LinkedIn Profile';
  const c1Width = doc.getTextWidth(contactPart1);
  const c2Width = doc.getTextWidth(contactPart2);
  const contactTotal = c1Width + c2Width;
  const contactStartX = (pageWidth - contactTotal) / 2;

  doc.text(contactPart1, contactStartX, y);
  doc.setTextColor(0, 102, 204); // Blue link
  doc.text(contactPart2, contactStartX + c1Width, y);
  doc.link(contactStartX + c1Width, y - 9, c2Width, 11, {
    url: 'https://www.linkedin.com/in/pavan-sai-vejju-2264231b2',
  });
  // underline link
  doc.setDrawColor(0, 102, 204);
  doc.setLineWidth(0.5);
  doc.line(contactStartX + c1Width, y + 1.5, contactStartX + c1Width + c2Width, y + 1.5);
  y += 24;

  // ==========================================
  // Professional Summary
  // ==========================================
  drawSectionHeader('Professional Summary');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(30, 30, 30);

  const summaryP1 = `Senior Frontend Engineer with ${expText.replace('+', '+')} of experience building scalable enterprise and responsive web applications in `;
  const highlightedSkills = 'React.js, Nextjs ,TypeScript, Redux, Redux-Saga, JavaScript, HTML5, and CSS3,';
  const summaryP2 = ' and modern frontend architecture. Experienced in Micro Frontends, real-time applications, data visualization, and performance optimization. Skilled at state management, API integrations, and real-time data handling, while ensuring cross-browser compatibility, accessibility, and pixel-perfect UI implementation. Proficient in leveraging AI-assisted development tools such as GitHub Copilot, ChatGPT, and Cursor AI to accelerate development, improve code quality, and streamline debugging. Passionate about building intelligent,user-centric applications with clean architecture and maintainable code.';

  // Render paragraph with highlighted section
  const fullSummary = summaryP1 + highlightedSkills + summaryP2;
  const summaryLines = doc.splitTextToSize(fullSummary, contentWidth);

  // We highlight the specific line segment where React.js ... CSS3, appears
  // For exact layout rendering in PDF:
  summaryLines.forEach((line) => {
    if (line.includes('React.js, Nextjs') || line.includes('TypeScript, Redux') || line.includes('HTML5, and CSS3,')) {
      // Find matching index in this line to highlight
      const matchStart = line.indexOf('React.js');
      if (matchStart !== -1) {
        const before = line.substring(0, matchStart);
        const match = line.substring(matchStart);
        const bW = doc.getTextWidth(before);
        const mW = doc.getTextWidth(match);
        doc.setFillColor(255, 235, 59);
        doc.rect(margin + bW - 1, y - 8.5, mW + 2, 11, 'F');
      } else if (line.includes('HTML5, and CSS3,')) {
        const matchEnd = line.indexOf('and modern');
        const match = matchEnd !== -1 ? line.substring(0, matchEnd) : line;
        const mW = doc.getTextWidth(match);
        doc.setFillColor(255, 235, 59);
        doc.rect(margin - 1, y - 8.5, mW + 2, 11, 'F');
      } else {
        const mW = doc.getTextWidth(line);
        doc.setFillColor(255, 235, 59);
        doc.rect(margin - 1, y - 8.5, mW + 2, 11, 'F');
      }
    }
    doc.setTextColor(30, 30, 30);
    doc.text(line, margin, y);
    y += 13.5;
  });
  y += 10;

  // ==========================================
  // Technical Skills
  // ==========================================
  drawSectionHeader('Technical Skills');

  const skillsData = [
    {
      label: 'Frontend Engineering: ',
      text: 'React.js, Next.js, TypeScript, JavaScript (ES6+), React Hooks, Redux, Redux toolkit(RTK), Redux Saga, Tailwind CSS, Fluent UI, HTML5, CSS3, SCSS',
    },
    {
      label: 'API & Integration: ',
      text: 'REST APIs, GraphQL, Microsoft SignalR, JWT Authentication, API Integration, Data Handling',
    },
    {
      label: 'Testing & Quality: ',
      text: 'Jest, React Testing Library, Stryker Mutation Testing, Unit Testing, Code Quality Practices',
    },
    {
      label: 'Architecture: ',
      text: 'Micro Frontends, Module Federation, Atomic Design, Component-Based Architecture',
    },
    {
      label: 'Visualization: ',
      text: 'High charts, Recharts, Interactive Dashboards, Data Visualization',
    },
    {
      label: 'DevOps & Tools: ',
      text: 'Git, GitHub, Azure DevOps, CI/CD, npm, pnpm',
    },
    {
      label: 'AI-Assisted Development: ',
      text: 'GitHub Copilot, ChatGPT, Cursor AI, Claude AI, Prompt Engineering, AI-assisted Debugging & Code Optimization',
    },
  ];

  skillsData.forEach((skill) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(20, 20, 20);
    const labelW = doc.getTextWidth(skill.label);

    const fullLine = skill.label + skill.text;
    const wrapped = doc.splitTextToSize(fullLine, contentWidth);

    wrapped.forEach((line, lineIdx) => {
      if (lineIdx === 0) {
        doc.setFont('helvetica', 'bold');
        doc.text(skill.label, margin, y);
        doc.setFont('helvetica', 'normal');
        const rest = line.replace(skill.label, '');
        doc.text(rest, margin + labelW, y);
      } else {
        doc.setFont('helvetica', 'normal');
        doc.text(line, margin, y);
      }
      y += 13.5;
    });
    y += 1.5;
  });
  y += 10;

  // ==========================================
  // Projects (Heading)
  // ==========================================
  drawSectionHeader('Projects');

  // Project 1: FC26 Game Stats Platform
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(20, 20, 20);
  doc.text('FC26 Game Stats Platform - Metaplore - (Client: Electronic Arts) - (contract)', margin, y);
  y += 14;

  // Tech line
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  const p1TechLabel = 'Tech: ';
  doc.text(p1TechLabel, margin, y);
  doc.setFont('helvetica', 'normal');
  doc.text('Next.js | React | TypeScript | Tailwind | Recharts | Jest | Stryker', margin + doc.getTextWidth(p1TechLabel), y);
  y += 13.5;

  // Description line
  const p1DescFull = 'Description: Game Stats Platform is an interactive analytics dashboard for EA FC26 that provides players with insights into matches, wins, losses, rankings, and performance trends. Duration: Jan 2026 – present';
  const p1DescLines = doc.splitTextToSize(p1DescFull, contentWidth);
  p1DescLines.forEach((line) => {
    if (line.startsWith('Description:')) {
      doc.setFont('helvetica', 'bold');
      doc.text('Description: ', margin, y);
      doc.setFont('helvetica', 'normal');
      doc.text(line.replace('Description: ', ''), margin + doc.getTextWidth('Description: '), y);
    } else {
      doc.setFont('helvetica', 'normal');
      doc.text(line, margin, y);
    }
    y += 13.5;
  });
  y += 3;

  // Roles & Responsibilities
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('Roles & Responsibilities', margin, y);
  y += 14;

  const fc26Bullets = [
    'Developed reusable, responsive UI components and interactive analytics dashboards.',
    'Built player statistics modules, performance visualizations, and PNG export functionality.',
    'Integrated REST APIs and contributed to a scalable Micro Frontend architecture.',
    'Ensured high code quality through Jest unit testing and Stryker mutation testing.',
    'Collaborated with cross-functional Agile teams to deliver high-quality features.',
  ];

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  fc26Bullets.forEach((bullet) => {
    doc.text('•', margin + 8, y);
    const bulletLines = doc.splitTextToSize(bullet, contentWidth - 24);
    bulletLines.forEach((line, lIdx) => {
      doc.text(line, margin + 20, y);
      y += 13;
    });
  });

  // ==========================================
  // PAGE 2
  // ==========================================
  doc.addPage();
  y = 45;

  // Project 2: Symphony Trade Capture
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(20, 20, 20);
  doc.text('Symphony- Trade-capture - Amphora Software (contract)', margin, y);
  y += 14;

  // Tech line
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  const p2TechLabel = 'Tech: ';
  doc.text(p2TechLabel, margin, y);
  doc.setFont('helvetica', 'normal');
  doc.text('React.js, React Hooks, Redux, Redux-Saga, TypeScript, HTML, CSS, JavaScript, Tan stack', margin + doc.getTextWidth(p2TechLabel), y);
  y += 13.5;

  // Duration
  doc.setFont('helvetica', 'bold');
  const p2DurLabel = 'Duration : ';
  doc.text(p2DurLabel, margin, y);
  doc.setFont('helvetica', 'normal');
  doc.text('October 2025 – December 2025', margin + doc.getTextWidth(p2DurLabel), y);
  y += 13.5;

  // Description
  const p2DescFull = "Description: Symphony Trade Capture is a core module of Amphora's ETRM platform that streamlines energy trade capture, validation, pricing, and position management.";
  const p2DescLines = doc.splitTextToSize(p2DescFull, contentWidth);
  p2DescLines.forEach((line) => {
    if (line.startsWith('Description:')) {
      doc.setFont('helvetica', 'bold');
      doc.text('Description: ', margin, y);
      doc.setFont('helvetica', 'normal');
      doc.text(line.replace('Description: ', ''), margin + doc.getTextWidth('Description: '), y);
    } else {
      doc.setFont('helvetica', 'normal');
      doc.text(line, margin, y);
    }
    y += 13.5;
  });
  y += 3;

  // Responsibilities
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('Responsibilities:', margin, y);
  y += 14;

  const symphonyBullets = [
    'Built dynamic and responsive forms using TanStack Form, with field-level validation and optimized state handling.',
    'Integrated GraphQL APIs for fetching and submitting trade data, ensuring efficient schema-based communication.',
    'Performed UI design, code refactoring, and performance improvements, adhering to clean and scalable coding standards.',
    'Developed reusable common components and implemented unit testing using Jest and React Testing Library to ensure reliability and maintainability.',
  ];

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  symphonyBullets.forEach((bullet) => {
    doc.text('•', margin + 8, y);
    const bulletLines = doc.splitTextToSize(bullet, contentWidth - 24);
    bulletLines.forEach((line) => {
      doc.text(line, margin + 20, y);
      y += 13;
    });
  });
  y += 14;

  // Project 3: UGL CMS & PMS - Techwave
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(20, 20, 20);
  doc.text('UGL CMS & PMS - Techwave', margin, y);
  y += 14;

  // Tech Stack & Duration line
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  const uglTechFull = 'Tech Stack: React.js | TypeScript | Redux |Redux toolkit(RTK)| Redux Saga | Fluent UI | Microsoft SignalR | Highcharts | REST APIs | Jest|Azure DevOps Duration: January 2022 – October -2025';
  const uglTechLines = doc.splitTextToSize(uglTechFull, contentWidth);
  uglTechLines.forEach((line) => {
    doc.setFont('helvetica', 'normal');
    if (line.startsWith('Tech Stack:')) {
      doc.setFont('helvetica', 'bold');
      doc.text('Tech Stack: ', margin, y);
      doc.setFont('helvetica', 'normal');
      doc.text(line.replace('Tech Stack: ', ''), margin + doc.getTextWidth('Tech Stack: '), y);
    } else {
      doc.text(line, margin, y);
    }
    y += 13.5;
  });

  // Description
  const uglDescFull = 'Description: UGL CMS & PMS are enterprise railway asset monitoring and performance management applications that provide real-time train condition monitoring, asset health insights, operational reporting, and maintenance planning.';
  const uglDescLines = doc.splitTextToSize(uglDescFull, contentWidth);
  uglDescLines.forEach((line) => {
    if (line.startsWith('Description:')) {
      doc.setFont('helvetica', 'bold');
      doc.text('Description: ', margin, y);
      doc.setFont('helvetica', 'normal');
      doc.text(line.replace('Description: ', ''), margin + doc.getTextWidth('Description: '), y);
    } else {
      doc.setFont('helvetica', 'normal');
      doc.text(line, margin, y);
    }
    y += 13.5;
  });
  y += 3;

  // Roles & Responsibilities
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('Roles & Responsibilities:', margin, y);
  y += 14;

  const uglBullets = [
    'Developed scalable and reusable UI components using React.js, TypeScript, and Fluent UI.',
    'Built interactive dashboards and data visualizations using Highcharts for asset monitoring and performance analysis.',
    'Implemented real-time data updates using Microsoft SignalR and integrated REST APIs for backend communication.',
    'Managed complex application state using Redux and Redux Saga with optimized frontend architecture.',
    'Improved application performance through reusable components, code optimization, and responsive design practices.',
    'Supported CI/CD deployments using Azure DevOps and collaborated with Agile teams for feature delivery',
  ];

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  uglBullets.forEach((bullet) => {
    doc.text('•', margin + 8, y);
    const bulletLines = doc.splitTextToSize(bullet, contentWidth - 24);
    bulletLines.forEach((line) => {
      doc.text(line, margin + 20, y);
      y += 13;
    });
  });
  y += 14;

  // Project 4: Aman Travels
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(20, 20, 20);
  doc.text('Aman Travels', margin, y);
  y += 14;

  // Tech Stack line
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  const amanTechLabel = 'Tech Stack: ';
  doc.text(amanTechLabel, margin, y);
  doc.setFont('helvetica', 'normal');
  doc.text('React.js | Redux | Ant Design | GraphQL | HTML | CSS | Jest|JavaScript', margin + doc.getTextWidth(amanTechLabel), y);
  y += 13.5;

  // Duration
  doc.setFont('helvetica', 'bold');
  const amanDurLabel = 'Duration: ';
  doc.text(amanDurLabel, margin, y);
  doc.setFont('helvetica', 'normal');
  doc.text('April 2021 – December 2021', margin + doc.getTextWidth(amanDurLabel), y);
  y += 13.5;

  // Description
  const amanDescFull = 'Description: Multilingual travel management application providing booking services for hotels, transportation, apartments, and railway services through a responsive web platform.';
  const amanDescLines = doc.splitTextToSize(amanDescFull, contentWidth);
  amanDescLines.forEach((line) => {
    if (line.startsWith('Description:')) {
      doc.setFont('helvetica', 'bold');
      doc.text('Description: ', margin, y);
      doc.setFont('helvetica', 'normal');
      doc.text(line.replace('Description: ', ''), margin + doc.getTextWidth('Description: '), y);
    } else {
      doc.setFont('helvetica', 'normal');
      doc.text(line, margin, y);
    }
    y += 13.5;
  });
  y += 3;

  // Roles & Responsibilities
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('Roles & Responsibilities:', margin, y);
  y += 14;

  const amanBullets = [
    'Developed reusable React components and responsive UI screens using Ant Design.',
    'Integrated GraphQL APIs and Redux for efficient data management.',
    'Improved frontend performance using code optimization and modern React practices.',
  ];

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  amanBullets.forEach((bullet) => {
    doc.text('•', margin + 8, y);
    const bulletLines = doc.splitTextToSize(bullet, contentWidth - 24);
    bulletLines.forEach((line) => {
      doc.text(line, margin + 20, y);
      y += 13;
    });
  });
  y += 20;

  // ==========================================
  // Education
  // ==========================================
  drawSectionHeader('Education', [74, 119, 122]); // Muted blue/teal #4A777A as in screenshot

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(20, 20, 20);
  doc.text('Bachelor of Technology (B.Tech), Jawaharlal Nehru Technological University, Kakinada - 2019', margin, y);

  // Save to public directory
  const outDir = path.join(__dirname, '../public');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }
  const filePath = path.join(outDir, 'Pavan_Sai_Vejju_Resume.pdf');
  const pdfBuffer = Buffer.from(doc.output('arraybuffer'));
  fs.writeFileSync(filePath, pdfBuffer);
  console.log('Resume PDF generated successfully at:', filePath);
}

buildResumePdf();

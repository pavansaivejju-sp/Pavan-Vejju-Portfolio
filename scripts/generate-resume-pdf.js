const fs = require('node:fs');
const path = require('node:path');
const { jsPDF } = require('jspdf');

const outputDirectory = path.join(__dirname, '../public');
const startDate = new Date(2021, 3, 26);

function experienceAt(date = new Date()) {
  let months = (date.getFullYear() - startDate.getFullYear()) * 12 + date.getMonth() - startDate.getMonth();
  if (date.getDate() < startDate.getDate()) months -= 1;
  months = Math.max(0, months);
  return `${Math.floor(months / 12)}.${(months % 12) + 1}`;
}

function completedExperience() {
  let months = (new Date().getFullYear() - startDate.getFullYear()) * 12 + new Date().getMonth() - startDate.getMonth();
  if (new Date().getDate() < startDate.getDate()) months -= 1;
  months = Math.max(0, months);
  return {
    years: Math.floor(months / 12),
    months: months % 12,
  };
}

function germanExperience() {
  const { years, months } = completedExperience();
  const yearText = `${years} ${years === 1 ? 'Jahr' : 'Jahre'}`;
  const monthText = `${months} ${months === 1 ? 'Monat' : 'Monate'}`;
  return `${yearText} und ${monthText}`;
}

const resumes = {
  en: {
    filename: 'Pavan_Sai_Vejju_Resume_Generated_EN.pdf',
    email: 'pavansaivejju@gmail.com',
    location: 'Hyderabad, India',
    linkedinLabel: 'LinkedIn Profile',
    experience: `${experienceAt()} Years`,
    heading: 'CURRICULUM VITAE',
    subtitle: 'Front-End Developer (React JS)',
    sections: {
      summary: 'Professional Summary',
      skills: 'Technical Skills',
      experience: 'Professional Experience',
      education: 'Education',
      responsibilities: 'Key Contributions',
    },
    summary: `Front-End Developer with ${experienceAt()} years of experience building and scaling high-performance web applications using React.js, TypeScript, Next.js (SSR/SSG), and Micro-frontends. Strong background in frontend system design, REST API integration, real-time data handling, data visualization, and advanced state management. Experienced in performance optimization, cross-browser compatibility, and maintainable delivery in Agile environments.`,
    skills: [
      ['Frontend Engineering', 'React.js, Next.js (SSR/SSG), TypeScript, JavaScript (ES6+), React Hooks, HTML5, CSS3, SCSS, Tailwind CSS, Fluent UI, Bootstrap'],
      ['Architecture & State Management', 'Micro-frontends, Module Federation, System Design, Atomic Design, Component-Based Architecture, Redux, Redux Toolkit, Redux-Saga, Context API'],
      ['APIs & Integration', 'REST APIs, GraphQL, Microsoft SignalR, JWT Authentication, Contentful SDK'],
      ['Testing & Visualization', 'Jest, React Testing Library, Stryker, Highcharts, Recharts, Interactive Dashboards'],
      ['DevOps & AI Tools', 'Git, GitHub, Azure DevOps, CI/CD, npm, pnpm, GitHub Copilot, ChatGPT, Cursor AI, Claude AI'],
    ],
    jobs: [
      {
        company: 'Metaplore (Electronic Arts) | Front-End Developer | Jan 2026 - Present',
        projects: [
          {
            title: 'Loyalty Contentful Hub | Jul 2026 - Present',
            description: "Custom Contentful SDK application for EA's loyalty platform, enabling business teams to configure reward-program content models.",
            bullets: [
              'Developed custom Contentful UI extensions and interactive forms with Next.js and TypeScript.',
              'Created landing and reward-page configuration modules to streamline content schema creation.',
              'Implemented tag-based role access controls for secure, structured content delivery.',
            ],
          },
          {
            title: 'EA MVP+ Membership Platform | Mar 2026 - Jul 2026',
            description: 'Scalable Next.js platform for cross-franchise rewards, early access incentives, and bundle subscriptions.',
            bullets: [
              'Built dynamic nested routing for parent, child, and optional sub-program hierarchies without hardcoded paths.',
              'Synchronized global and local state with REST APIs for reward validation and eligibility checks.',
              'Implemented Module Federation micro-frontends, lazy loading, and component-level performance improvements.',
              'Added unit and integration coverage using Jest and React Testing Library.',
            ],
          },
          {
            title: 'FC26 Game Stats Platform | Jan 2026 - Mar 2026',
            description: "Player statistics platform for EA's FC26 with interactive match-performance visualizations.",
            bullets: [
              'Built Recharts visualizations for win ratios, match statistics, and historical gameplay metrics.',
              'Implemented downloadable PNG snapshots of player statistics.',
              'Wrote Jest tests and used Stryker mutation testing to validate implemented modules.',
            ],
          },
        ],
      },
      {
        company: 'Amphora Software | Front-End Developer | Oct 2025 - Dec 2025',
        projects: [
          {
            title: 'Symphony Trade Capture',
            description: 'Energy commodity trade-management module within Amphora ETRM.',
            bullets: [
              'Built responsive TanStack Form workflows with field-level validation and optimized state handling.',
              'Integrated GraphQL APIs for fetching and submitting trade data.',
              'Developed reusable components and tests with Jest and React Testing Library.',
            ],
          },
        ],
      },
      {
        company: 'Techwave | Front-End Developer | Apr 2021 - Oct 2025',
        projects: [
          {
            title: 'UGL CMS | Oct 2023 - Oct 2025',
            description: 'Condition Monitoring System helping support teams monitor live train asset conditions and maintenance needs.',
            bullets: [
              'Built real-time dashboards and Highcharts heatmaps, spline graphs, and bar charts using React.',
              'Integrated Microsoft SignalR for live updates and asset tracking.',
              'Applied Atomic Design, Fluent UI, Redux, and Redux-Saga to build reusable components and manage application state.',
            ],
          },
          {
            title: 'UGL PMS | Jan 2022 - Sep 2023',
            description: 'Cloud-hosted asset-performance and service-monitoring application with SAP integration.',
            bullets: [
              'Delivered the Maintenance Schedule module, SAP synchronization, and automated PDF/CSV/PNG reports.',
              'Configured Azure DevOps CI/CD pipelines and deployments.',
            ],
          },
          {
            title: 'Aman Travels | Apr 2021 - Dec 2021',
            description: 'Multilingual travel booking and services application.',
            bullets: [
              'Developed reusable React and Ant Design interfaces and integrated GraphQL APIs.',
              'Improved frontend performance using code splitting and caching techniques.',
            ],
          },
        ],
      },
    ],
    education: 'Bachelor of Technology (B.Tech) | Jawaharlal Nehru Technological University, Kakinada | 2019',
  },
  de: {
    filename: 'Pavan_Sai_Vejju_Resume_Generated_DE.pdf',
    email: 'pavanvejju19@gmail.com',
    location: 'Hyderabad, Indien',
    linkedinLabel: 'LinkedIn-Profil',
    experience: germanExperience(),
    heading: 'LEBENSLAUF',
    subtitle: 'Frontend-Entwickler (React JS)',
    sections: {
      summary: 'Profil',
      skills: 'Technische Kenntnisse',
      experience: 'Berufserfahrung',
      education: 'Ausbildung',
      responsibilities: 'Wichtige Beiträge',
    },
    summary: `Frontend-Entwickler mit ${germanExperience()} Berufserfahrung in der Entwicklung leistungsstarker Webanwendungen mit React.js, TypeScript, Next.js (SSR/SSG) und Microfrontends. Schwerpunkte sind Frontend-Systemdesign, REST-APIs, Echtzeitdaten, Datenvisualisierung und fortgeschrittene Zustandsverwaltung. Erfahrung mit Performance-Optimierung, Browserkompatibilität und wartbarer Softwareentwicklung in Agile-Teams.`,
    skills: [
      ['Frontend-Entwicklung', 'React.js, Next.js (SSR/SSG), TypeScript, JavaScript (ES6+), React Hooks, HTML5, CSS3, SCSS, Tailwind CSS, Fluent UI, Bootstrap'],
      ['Architektur und Zustandsverwaltung', 'Microfrontends, Module Federation, Systemdesign, Atomic Design, komponentenbasierte Architektur, Redux, Redux Toolkit, Redux-Saga, Context API'],
      ['APIs und Integration', 'REST-APIs, GraphQL, Microsoft SignalR, JWT-Authentifizierung, Contentful SDK'],
      ['Testing und Visualisierung', 'Jest, React Testing Library, Stryker, Highcharts, Recharts, interaktive Dashboards'],
      ['DevOps und KI-Werkzeuge', 'Git, GitHub, Azure DevOps, CI/CD, npm, pnpm, GitHub Copilot, ChatGPT, Cursor AI, Claude AI'],
    ],
    jobs: [
      {
        company: 'Metaplore (Electronic Arts) | Frontend-Entwickler | 01/2026 - heute',
        projects: [
          {
            title: 'Loyalty Contentful Hub | 07/2026 - heute',
            description: 'Contentful-SDK-Anwendung für die Loyalty-Plattform von EA zur Verwaltung von Inhaltsmodellen für Prämienprogramme.',
            bullets: [
              'Entwicklung benutzerdefinierter Contentful-UI-Erweiterungen und interaktiver Formulare mit Next.js und TypeScript.',
              'Erstellung von Konfigurationsmodulen für Landingpages und Prämienseiten.',
              'Einführung tagbasierter Zugriffsrechte für sichere und strukturierte Inhalte.',
            ],
          },
          {
            title: 'EA MVP+ Mitgliedschaftsplattform | 03/2026 - 07/2026',
            description: 'Skalierbare Next.js-Plattform für spielübergreifende Prämien, Early Access und Abonnements.',
            bullets: [
              'Implementierung dynamischer, verschachtelter Routen ohne fest codierte Programmpfade.',
              'Synchronisierung globaler und lokaler Zustände mit REST-APIs für Prämien- und Berechtigungsprüfungen.',
              'Aufbau einer Microfrontend-Architektur mit Module Federation, Lazy Loading und Performance-Optimierungen.',
              'Erstellung von Unit- und Integrationstests mit Jest und React Testing Library.',
            ],
          },
          {
            title: 'FC26-Spielstatistikplattform | 01/2026 - 03/2026',
            description: 'Statistikplattform für EA FC26 mit interaktiver Visualisierung von Spieler- und Matchdaten.',
            bullets: [
              'Entwicklung von Recharts-Diagrammen für Gewinnquoten, Matchstatistiken und historische Spieldaten.',
              'Implementierung herunterladbarer PNG-Schnappschüsse von Spielerstatistiken.',
              'Jest-Tests und Stryker-Mutationstests zur Prüfung der implementierten Module.',
            ],
          },
        ],
      },
      {
        company: 'Amphora Software | Frontend-Entwickler | 10/2025 - 12/2025',
        projects: [
          {
            title: 'Symphony Trade Capture',
            description: 'Modul zur Erfassung und Verwaltung von Energiegeschäften in Amphoras ETRM-Plattform.',
            bullets: [
              'Entwicklung responsiver TanStack-Formulare mit Feldvalidierung und optimierter Zustandsverwaltung.',
              'Integration von GraphQL-APIs zum Abrufen und Übermitteln von Handelsdaten.',
              'Entwicklung wiederverwendbarer Komponenten und Tests mit Jest und React Testing Library.',
            ],
          },
        ],
      },
      {
        company: 'Techwave | Frontend-Entwickler | 04/2021 - 10/2025',
        projects: [
          {
            title: 'UGL CMS | 10/2023 - 10/2025',
            description: 'System zur Zustandsüberwachung von Zuganlagen und zur Erkennung von Wartungsbedarf.',
            bullets: [
              'Entwicklung von Echtzeit-Dashboards und Highcharts-Visualisierungen mit React.',
              'Integration von Microsoft SignalR für Live-Aktualisierungen und Anlagenverfolgung.',
              'Nutzung von Atomic Design, Fluent UI, Redux und Redux-Saga für Komponenten und Anwendungszustände.',
            ],
          },
          {
            title: 'UGL PMS | 01/2022 - 09/2023',
            description: 'Cloudbasierte Plattform zur Anlagenleistung und Serviceüberwachung mit SAP-Integration.',
            bullets: [
              'Entwicklung der Wartungsplanung, SAP-Synchronisierung und automatisierter PDF-, CSV- und PNG-Berichte.',
              'Einrichtung von CI/CD-Pipelines und Deployments mit Azure DevOps.',
            ],
          },
          {
            title: 'Aman Travels | 04/2021 - 12/2021',
            description: 'Mehrsprachige Anwendung für Reisebuchungen und Dienstleistungen.',
            bullets: [
              'Entwicklung wiederverwendbarer React- und Ant-Design-Oberflächen sowie Integration von GraphQL-APIs.',
              'Verbesserung der Frontend-Performance durch Code-Splitting und Caching.',
            ],
          },
        ],
      },
    ],
    education: 'Bachelor of Technology (B.Tech) | Jawaharlal Nehru Technological University, Kakinada | 2019',
  },
};

function buildResume(locale, content) {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 42;
  const contentWidth = pageWidth - margin * 2;
  let y = 44;

  const ensureSpace = (height) => {
    if (y + height > pageHeight - 42) {
      doc.addPage();
      y = 44;
    }
  };

  const sectionHeading = (title) => {
    ensureSpace(34);
    y += 7;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(26, 54, 93);
    doc.text(title, margin, y);
    y += 5;
    doc.setDrawColor(186, 143, 85);
    doc.setLineWidth(1);
    doc.line(margin, y, pageWidth - margin, y);
    y += 15;
  };

  const paragraph = (value, options = {}) => {
    doc.setFont('helvetica', options.bold ? 'bold' : 'normal');
    doc.setFontSize(options.size || 9.2);
    doc.setTextColor(35, 35, 35);
    const lines = doc.splitTextToSize(value, contentWidth - (options.indent || 0));
    for (const line of lines) {
      ensureSpace(13);
      doc.text(line, margin + (options.indent || 0), y);
      y += 12.5;
    }
  };

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(26, 54, 93);
  doc.text('PAVAN SAI VEJJU', pageWidth / 2, y, { align: 'center' });
  y += 17;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(100, 100, 100);
  doc.text(content.heading, pageWidth / 2, y, { align: 'center' });
  y += 14;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(35, 35, 35);
  doc.text(`${content.subtitle} | ${content.experience}`, pageWidth / 2, y, { align: 'center' });
  y += 15;
  doc.setFontSize(9);
  const contactParts = [content.location, content.email, '+91 9133953205', content.linkedinLabel];
  const contactSeparators = [' | ', ' | ', ' | '];
  const contactWidth = contactParts.reduce((width, part) => width + doc.getTextWidth(part), 0) + contactSeparators.reduce((width, part) => width + doc.getTextWidth(part), 0);
  let contactX = (pageWidth - contactWidth) / 2;
  contactParts.forEach((part, index) => {
    const partWidth = doc.getTextWidth(part);
    doc.text(part, contactX, y);
    if (index === 1) doc.link(contactX, y - 9, partWidth, 11, { url: `mailto:${content.email}` });
    if (index === 3) doc.link(contactX, y - 9, partWidth, 11, { url: 'https://www.linkedin.com/in/pavan-sai-vejju-2264231b2' });
    contactX += partWidth;
    if (contactSeparators[index]) {
      doc.text(contactSeparators[index], contactX, y);
      contactX += doc.getTextWidth(contactSeparators[index]);
    }
  });
  y += 12;

  sectionHeading(content.sections.summary);
  paragraph(content.summary);

  sectionHeading(content.sections.skills);
  for (const [label, skills] of content.skills) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.8);
    const labelWidth = doc.getTextWidth(`${label}: `);
    const lines = doc.splitTextToSize(`${label}: ${skills}`, contentWidth);
    lines.forEach((line, index) => {
      ensureSpace(12);
      if (index === 0) {
        doc.setTextColor(25, 25, 25);
        doc.text(`${label}: `, margin, y);
        doc.setFont('helvetica', 'normal');
        doc.text(line.slice(`${label}: `.length), margin + labelWidth, y);
      } else {
        doc.setFont('helvetica', 'normal');
        doc.text(line, margin, y);
      }
      y += 12;
    });
    y += 2;
  }

  sectionHeading(content.sections.experience);
  for (const job of content.jobs) {
    ensureSpace(25);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(26, 54, 93);
    doc.text(doc.splitTextToSize(job.company, contentWidth), margin, y);
    y += 14;

    for (const project of job.projects) {
      ensureSpace(30);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.3);
      doc.setTextColor(35, 35, 35);
      const titleLines = doc.splitTextToSize(project.title, contentWidth - 8);
      titleLines.forEach((line) => {
        ensureSpace(12);
        doc.text(line, margin + 8, y);
        y += 12;
      });
      paragraph(project.description, { indent: 8, size: 8.7 });
      for (const bullet of project.bullets) {
        paragraph(`- ${bullet}`, { indent: 16, size: 8.7 });
      }
      y += 4;
    }
    y += 4;
  }

  sectionHeading(content.sections.education);
  paragraph(content.education, { bold: true });

  const pageCount = doc.getNumberOfPages();
  for (let page = 1; page <= pageCount; page += 1) {
    doc.setPage(page);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(120, 120, 120);
    doc.text(`${page} / ${pageCount}`, pageWidth - margin, pageHeight - 22, { align: 'right' });
  }

  const filePath = path.join(outputDirectory, content.filename);
  fs.writeFileSync(filePath, Buffer.from(doc.output('arraybuffer')));
  console.log(`Generated ${locale} resume: ${filePath}`);
}

fs.mkdirSync(outputDirectory, { recursive: true });
for (const [locale, content] of Object.entries(resumes)) buildResume(locale, content);
import { motion } from 'framer-motion';

interface ScrollSectionProps {
  scrollProgress: number;
}

interface Section {
  start: number;
  end: number;
  content: React.ReactNode;
  position?: 'left' | 'center' | 'right';
}

export function ScrollOverlay({ scrollProgress }: ScrollSectionProps) {
  const sections: Section[] = [
    {
      start: 0,
      end: 0.15,
      position: 'center',
      content: (
        <div className="glass-panel rounded-lg p-8 text-center max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Apurva A. Khangal</h1>
          <p className="mb-2">Mumbai, India</p>
          <p className="mb-2 text-primary">+91-7506202034 | apurvakhangal29@gmail.com</p>
          <div className="flex justify-center gap-4 mb-2">
            <a href="#" className="underline text-blue-500">LinkedIn</a>
            <a href="#" className="underline text-blue-500">GitHub</a>
          </div>
        </div>
      ),
    },
    {
      start: 0.16,
      end: 0.30,
      position: 'left',
      content: (
        <div className="glass-panel rounded-lg p-8 max-w-xl">
          <h2 className="text-xl font-semibold mb-2">EDUCATION</h2>
          <ul className="text-sm">
            <li className="mb-2">
              <strong>Sardar Patel Institute of Technology</strong><br />
              B.Tech in Computer Engineering (SGPA: 7.73)<br />
              2024 – 2027
            </li>
            <li className="mb-2">
              <strong>Pearl Academy</strong><br />
              Minors in UI / UX Design<br />
              2025 – 2027
            </li>
            <li className="mb-2">
              <strong>K.J. Somaiya Polytechnic</strong><br />
              Diploma in Computer Engineering (95.9%)<br />
              2021 – 2024
            </li>
          </ul>
        </div>
      ),
    },
    {
      start: 0.31,
      end: 0.45,
      position: 'right',
      content: (
        <div className="glass-panel rounded-lg p-8 max-w-xl">
          <h2 className="text-xl font-semibold mb-2">EXPERIENCE</h2>
          <div className="mb-2">
            <strong>Sysnet Global Technologies Pvt. Ltd.</strong><br />
            IT Intern (Infrastructure Data Analyst)<br />
            June 2023 – August 2023<br />
            <ul className="list-disc ml-5 text-sm mt-1">
              <li>Collected and validated asset data across sites; identified mismatches and improved inventory accuracy.</li>
              <li>Performed structured data updates and maintained asset records using internal tools and Excel.</li>
              <li>Supported infrastructure rollout schedules and contributed to reporting for IT asset tracking.</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      start: 0.46,
      end: 0.60,
      position: 'center',
      content: (
        <div className="glass-panel rounded-lg p-8 max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold mb-2">PROJECTS</h2>
          <div className="mb-4">
            <strong>Click with Caution: ML against Phishing Threats</strong><br />
            <span className="italic">Phishing URL Detection Using Machine Learning</span>
            <ul className="list-disc ml-5 text-sm mt-1">
              <li>Built an end-to-end phishing URL detection system using a labelled dataset of 233K+ URLs from Kaggle.</li>
              <li>Engineered features from URL structure and domain properties, applied SMOTE for class balancing, and used PCA to reduce dimensionality.</li>
              <li>Trained and evaluated SVM, Logistic Regression, and Random Forest models, achieving 99.94% test accuracy with SVM.</li>
              <li>Designed a highly generalizable model suitable for integration into real-time phishing protection systems.</li>
            </ul>
          </div>
          <div>
            <strong>Brain Operated Wheelchair</strong><br />
            <span className="italic">Diploma Major Project</span>
            <ul className="list-disc ml-5 text-sm mt-1">
              <li>Designed a hands-free automation system to control external devices using EEG brainwave signals.</li>
              <li>Collected custom data and analysed EEG patterns, then trained a Machine Learning model to classify mental states for triggering commands.</li>
              <li>Integrated the system with external hardware (wheelchair model) to demonstrate real-time brainwave controlled movement.</li>
              <li>Showcased the feasibility of neurotechnology driven IoT solutions for assistive applications.</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      start: 0.61,
      end: 0.75,
      position: 'left',
      content: (
        <div className="glass-panel rounded-lg p-8 max-w-xl">
          <h2 className="text-xl font-semibold mb-2">SKILLS</h2>
          <ul className="list-disc ml-5 text-sm">
            <li><strong>Languages:</strong> Python, Java, C++</li>
            <li><strong>Databases:</strong> MySQL, Oracle, MongoDB (basic)</li>
            <li><strong>Developer Tools:</strong> VS Code, Jupyter Notebook, Git</li>
            <li><strong>Data & Analytics Tools:</strong> Power BI, Pandas, Scikit-learn, 1D CNN, Matplotlib, Numpy</li>
            <li><strong>Design & UI/UX:</strong> Figma, Adobe XD, Illustrator, Photoshop, Canva</li>
          </ul>
        </div>
      ),
    },
    {
      start: 0.76,
      end: 0.85,
      position: 'right',
      content: (
        <div className="glass-panel rounded-lg p-8 max-w-xl">
          <h2 className="text-xl font-semibold mb-2">POSITION OF RESPONSIBILITY</h2>
          <div className="mb-2">
            <strong>Head of Creatives</strong><br />
            Oculus (Annual Techno-Cultural Fest), SPIT
            <ul className="list-disc ml-5 text-sm mt-1">
              <li>Designed various posters, social media posts, and banners, enhancing the event’s visual appeal.</li>
              <li>Collaborated with a team of designers to create cohesive branding and promotional materials.</li>
              <li>Increased audience engagement by 20% through impactful and strategic design execution.</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      start: 0.86,
      end: 1.0,
      position: 'center',
      content: (
        <div className="glass-panel rounded-lg p-8 max-w-xl mx-auto">
          <h2 className="text-xl font-semibold mb-2">CERTIFICATIONS</h2>
          <ul className="list-disc ml-5 text-sm">
            <li>Introduction to Cybersecurity (Cisco Networking Academy)</li>
            <li>Power BI for Business Professionals (Infosys Springboard)</li>
            <li>HTML Web Development Crash Course (Infosys Springboard)</li>
          </ul>
        </div>
      ),
    },
  ];

  const getPositionClasses = (pos?: string) => {
    switch (pos) {
      case 'left': return 'items-center justify-start pl-[10vw]';
      case 'right': return 'items-center justify-end pr-[10vw]';
      default: return 'items-center justify-center';
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 10 }}>
      {sections.map((section, i) => {
        const sectionProgress = (scrollProgress - section.start) / (section.end - section.start);
        const isVisible = scrollProgress >= section.start && scrollProgress <= section.end;

        // Fade in/out at edges
        let opacity = 0;
        if (isVisible) {
          const fadeIn = i === 0 ? 1 : Math.min(sectionProgress / 0.2, 1);
          const fadeOut = Math.min((1 - sectionProgress) / 0.2, 1);
          opacity = Math.min(fadeIn, fadeOut);
        }

        return (
          <div
            key={i}
            className={`absolute inset-0 flex ${getPositionClasses(section.position)} transition-opacity duration-500`}
            style={{
              opacity,
              pointerEvents: isVisible ? 'auto' : 'none',
            }}
          >
            {section.content}
          </div>
        );
      })}
    </div>
  );
}

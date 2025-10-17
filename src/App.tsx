import { useState, useEffect } from 'react';
import './App.css';
import { apiGateWayWebSocketUrl } from './constants';
import PresenceSnackbar from './components/PresenceSnackbar/PresenceSnackbar';

const App = () => {
  const [visitorCount, setVisitorCount] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [presenceMsg, setPresenceMsg] = useState("");

  useEffect(() => {
    const fetchVisitorCountRealTime = () => {
      try {
        const socket = new WebSocket(apiGateWayWebSocketUrl)
        socket.onopen = () => {console.log("connection opened!");}

        socket.onmessage = (e) => {
          try {
            const res = JSON.parse(e.data);
            if (res.type === "updatedCount") {
              setVisitorCount(res.count);
            }
            if (res.type === "presence") {
              setPresenceMsg(res.msg);
            }
          } catch (error) {
            console.log("error with count: ", error)
          }
        }
        socket.onclose = (e) => {
          console.log("connection closed", e.code, e.reason);        
        }

        socket.onerror = (e) => {
          console.log("connection error: ", e);
        }
      } catch (error) {
        console.log("error is: ", error);        
      } finally {
        setLoading(false)
      }
    };
    fetchVisitorCountRealTime();
  }, []);

  return (

<div className="resume-container">
  <div className="visitor-counter">
    {loading ? (
      <span>Loading visitors...</span>
    ) : (
      <span>👁️ Visitors: {visitorCount?.toLocaleString()}</span>
    )}
  </div>
  <PresenceSnackbar message={presenceMsg} />
  <header className="header">
    <h1 className="name">TAI NGUYEN</h1>
    <p className="title">Full-Stack Developer | AWS Solutions Architect - Associate</p>
    
    <div className="contact-info">
      <a href="mailto:phattai2407@gmail.com" className="contact-link">
        <span className="icon">✉️</span>
        phattai2407@gmail.com
      </a>
      <a href="tel:+358449876196" className="contact-link">
        <span className="icon">📱</span>
        +358 44 9876 196
      </a>
      <a href="https://linkedin.com/in/tai-nguyen-173625169/" target="_blank" rel="noopener noreferrer" className="contact-link">
        <span className="icon">💼</span>
        LinkedIn
      </a>
      <a href="https://github.com/TaiNguyen2407" target="_blank" rel="noopener noreferrer" className="contact-link">
        <span className="icon">💻</span>
        GitHub
      </a>
    </div>
  </header>

  <section className="section">
    <h2 className="section-title">
      <span className="icon">🎯</span>
      Summary
    </h2>
    <p className="summary-text">
     AWS-certified Full-Stack Developer with 2+ years building scalable HR platforms using <strong>Python, TypeScript/React, and cloud-native architectures</strong>.  Specialize in <strong>designing RESTful APIs</strong>, <strong>automating workflows</strong>, and <strong>optimizing developer experience</strong>. Proven track record of <strong>delivering features that save 250+ annual work hours</strong> and maintaining <strong>API systems serving multiple internal applications</strong>.  Passionate about <strong>clean code, system design and continuous learning</strong>, with a focus on creating software systems that are not only functional but also highly <strong>reliable, scalable, and maintainable</strong>.

    </p>
  </section>

  <section className="section">
    <h2 className="section-title">
      <span className="icon">🛠️</span>
      Technical Skills
    </h2>
    
    <div className="skills-grid">
      <div className="skill-category">
        <h3 className="skill-category-title">
          <span className="icon">💻</span>
          Languages
        </h3>
        <div className="skill-tags">
          <span className="skill-tag">Python</span>
          <span className="skill-tag">TypeScript</span>
          <span className="skill-tag">JavaScript</span>
          <span className="skill-tag">SQL</span>
          <span className="skill-tag">HTML/CSS</span>
        </div>
      </div>

      <div className="skill-category">
        <h3 className="skill-category-title">
          <span className="icon">⚛️</span>
          Frontend
        </h3>
        <div className="skill-tags">
          <span className="skill-tag">React</span>
          <span className="skill-tag">React Native</span>
          <span className="skill-tag">Redux</span>
          <span className="skill-tag">Tailwind CSS</span>
          <span className="skill-tag">Responsive Design</span>
        </div>
      </div>

      <div className="skill-category">
        <h3 className="skill-category-title">
          <span className="icon">🔧</span>
          Backend & APIs
        </h3>
        <div className="skill-tags">
          <span className="skill-tag">FastAPI</span>
          <span className="skill-tag">REST APIs</span>
          <span className="skill-tag">PostgreSQL</span>
          <span className="skill-tag">SQLAlchemy</span>
          <span className="skill-tag">API Gateway</span>
        </div>
      </div>

      <div className="skill-category">
        <h3 className="skill-category-title">
          <span className="icon">☁️</span>
          AWS & Cloud
        </h3>
        <div className="skill-tags">
          <span className="skill-tag">Lambda</span>
          <span className="skill-tag">RDS Aurora</span>
          <span className="skill-tag">S3</span>
          <span className="skill-tag">API Gateway</span>
          <span className="skill-tag">CloudWatch</span>
          <span className="skill-tag">IAM</span>
        </div>
      </div>

      <div className="skill-category">
        <h3 className="skill-category-title">
          <span className="icon">🤖</span>
          AI & ML
        </h3>
        <div className="skill-tags">
          <span className="skill-tag">NLP</span>
          <span className="skill-tag">GPT-4</span>
          <span className="skill-tag">LangChain</span>
          <span className="skill-tag">RAG Systems</span>
          <span className="skill-tag">Document AI</span>
        </div>
      </div>

      <div className="skill-category">
        <h3 className="skill-category-title">
          <span className="icon">🔄</span>
          Tools & Methods
        </h3>
        <div className="skill-tags">
          <span className="skill-tag">Git</span>
          <span className="skill-tag">Docker</span>
          <span className="skill-tag">CI/CD</span>
          <span className="skill-tag">Agile/Scrum</span>
          <span className="skill-tag">TDD</span>
        </div>
      </div>
    </div>
  </section>

  <section className="section">
    <h2 className="section-title">
      <span className="icon">💼</span>
      Professional Experience
    </h2>

    <div className="experience-item">
      <div className="experience-header">
        <div>
          <h3 className="job-title">Junior Software Developer</h3>
          <p className="company">Wärtsilä</p>
        </div>
        <span className="date-badge">Oct 2024 - Present</span>
      </div>
      <ul className="achievements">
        <li><strong>Architected and deployed</strong> an automated HR data synchronization system integrating third-party APIs with internal platform using <strong>Python, FastAPI, and AWS Lambda</strong>. Eliminated manual data entry, saving <strong>250+ hours annually</strong></li>
        <li><strong>Developed full-stack features</strong> for HR web application using <strong>React, TypeScript, and PostgreSQL</strong>, improving data accuracy and reducing user complaints</li>
        <li><strong>Maintained internal employee API</strong> serving multiple internal applications; managed <strong>RDS Aurora database migrations</strong>, SSL certificate renewals, and performance optimization</li>
        <li><strong>Developed an AI-powered HR chatbot</strong> using <strong>OpenAI API</strong> and <strong>Retrieval-Augmented Generation (RAG)</strong> with <strong>Azure Cognitive Search</strong> to help employees easily access HR policies, contracts, and internal documents — <strong>streamlining HR information retrieval and improving workflow efficiency</strong>.</li>
        <li>Earned <strong>AWS Solutions Architect - Associate certification</strong> (2025) to enhance cloud architecture expertise</li>
      </ul>
    </div>

    <div className="experience-item">
      <div className="experience-header">
        <div>
          <h3 className="job-title">Software Developer Trainee</h3>
          <p className="company">Wärtsilä</p>
        </div>
        <span className="date-badge">Mar 2023 - Oct 2024</span>
      </div>
      <ul className="achievements">
        <li><strong>Contributed to development</strong> of HR internal tools using <strong>Python, React, and AWS services</strong> (Lambda, S3, RDS)</li>
        <li><strong>Collaborated in Agile team</strong> participating in sprint planning, daily standups, code reviews, and retrospectives</li>
        <li><strong>Gained hands-on experience</strong> with cloud infrastructure, serverless architecture, and modern DevOps practices</li>
        <li><strong>Implemented responsive UI components</strong> and RESTful API endpoints following clean code principles</li>
      </ul>
    </div>
  </section>

  <section className="section">
    <h2 className="section-title">
      <span className="icon">🏆</span>
      Certifications
    </h2>

    <div className="certification-item">
      <div className="certification-header">
        <div>
          <h3 className="certification-title">
            <span className="icon">☁️</span>
            AWS Certified Solutions Architect - Associate
          </h3>
          <p className="certification-issuer">Amazon Web Services (AWS)</p>
          <a 
            href="https://www.credly.com/badges/02309618-7f79-4d30-8a33-8938c6eba680" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="certification-link"
          >
            <span className="icon">🔗</span>
            View Credential on Credly
          </a>
        </div>
        <span className="certification-badge">2025</span>
      </div>
    </div>
  </section>

  <section className="section">
    <h2 className="section-title">
      <span className="icon">🎓</span>
      Education
    </h2>

    <div className="education-item">
      <div className="education-header">
        <div>
          <h3 className="degree">M.Sc. in Computer Science</h3>
          <p className="school">Aalto University</p>
          <p className="major">Major: Software Systems and Technologies</p>
        </div>
        <span className="date-badge">2025 - Present</span>
      </div>
    </div>

    <div className="education-item">
      <div className="education-header">
        <div>
          <h3 className="degree">B.Eng. in Information Technology</h3>
          <p className="school">Metropolia University of Applied Sciences</p>
          <p className="major">GPA: 4.59/5.0</p>
          <p className="thesis">Thesis: Optimizing Developer Experience through Clean Code Practices</p>
        </div>
        <span className="date-badge">2021 - 2025</span>
      </div>
    </div>
  </section>

  <section className="section">
    <h2 className="section-title">
      <span className="icon">🚀</span>
      Projects
    </h2>

     <div className="project-item">
      <div className="project-header">
        <h3 className="project-title">Cloud Resume Challenge</h3>
        <a href="https://github.com/TaiNguyen2407/Cloud-Resume-Tai-Nguyen" target="_blank" rel="noopener noreferrer" className="github-link">
          <span className="icon">🔗</span>
        </a>
      </div>
      <p className="project-description">
        This interactive resume! Built a serverless, full-stack application with visitor tracking, 
        deployed on AWS using infrastructure-as-code principles. Demonstrates cloud architecture skills 
        and modern web development practices.
      </p>
      <p className="tech-stack">
        <strong>Tech Stack:</strong> React, TypeScript, AWS Lambda, DynamoDB, API Gateway, CloudFront, S3, CI/CD
      </p>
    </div>

    <div className="project-item">
      <div className="project-header">
        <h3 className="project-title">DocumentChat - AI Document Assistant</h3>
        <a href="https://github.com/TaiNguyen2407/DocumentChat" target="_blank" rel="noopener noreferrer" className="github-link">
          <span className="icon">🔗</span>
        </a>
      </div>
      <p className="project-description">
        Built an intelligent document processing system that enables conversational interactions with PDFs 
        using NLP and large language models. Implemented RAG (Retrieval-Augmented Generation) architecture 
        for accurate context-aware responses.
      </p>
      <p className="tech-stack">
        <strong>Tech Stack:</strong> Python, React, GPT4All (Orca 3B), LLama 2 (7B), LangChain, Vector Embeddings
      </p>
    </div>

    <div className="project-item">
      <div className="project-header">
        <h3 className="project-title">Aurora Hunting - Social Photo Sharing App</h3>
        <a href="https://github.com/TaiNguyen2407/Aurora_Hunting" target="_blank" rel="noopener noreferrer" className="github-link">
          <span className="icon">🔗</span>
        </a>
      </div>
      <p className="project-description">
        Developed a cross-platform mobile application for capturing and sharing Northern Lights photography. 
        Implemented real-time photo upload, user authentication, and interactive feed with like/comment features.
      </p>
      <p className="tech-stack">
        <strong>Tech Stack:</strong> React Native, Firebase, Expo, JavaScript, REST APIs
      </p>
    </div>

  </section>

  <footer className="footer">
    <p>Built with React + TypeScript | Deployed on AWS | View source on <a rel="noopener noreferrer" href="https://github.com/TaiNguyen2407/Cloud-Resume-Tai-Nguyen" target='_blank'>GitHub</a></p>
  </footer>
</div>
  );
};

export default App;
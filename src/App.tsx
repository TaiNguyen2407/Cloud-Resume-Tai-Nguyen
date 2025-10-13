// App.tsx
import React, { useState, useEffect } from 'react';
import './App.css';
import { apiGateWayUrl } from './constants';

const App = () => {
  const [visitorCount, setVisitorCount] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchVisitorCount = async () => {
      try {
        const response = await fetch(apiGateWayUrl)
        const data = await response.json();
        setVisitorCount(data);
      } catch (error) {
        console.error('Error fetching visitor count:', error);
        setVisitorCount(0);
      } finally {
        setLoading(false);
      }
    };

    fetchVisitorCount();
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

      {/* Header */}
      <header className="header">
        <h1 className="name">TAI NGUYEN</h1>
        <p className="title">Junior Software Developer | AWS Solutions Architect - Associate</p>
        
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
          Detail-oriented Junior Software Developer with hands-on experience in building HR web applications 
          and internal APIs using Python, FastAPI, React and AWS services (Lambda, S3, RDS Aurora, API Gateway, etc.). 
          Certified AWS Solutions Architect - Associate with strong focus on system design, clean code and developer 
          productivity. Passionate about improving system reliability, scalability and maintainability. Currently 
          working at Wärtsilä and pursuing M.Sc. in Computer Science at Aalto University.
        </p>
      </section>

      <section className="section">
        <h2 className="section-title">
          <span className="icon">💼</span>
          Experience
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
            <li>Develop key features for internal HR platform, improving data accuracy and user experience</li>
            <li>Lead the design and implementation of an automated HR knowledge collection system from third-party API. Estimated to save HR personnel 250 hours of manual work annually</li>
            <li>Maintain an internal API used by 40+ applications; Handle RDS Aurora DB migrations and certificate renewals</li>
            <li>Contribute in developing in-house AI applications for internal use</li>
            <li>Achieve AWS Solutions Architect - Associate (2025) to enhance cloud design expertise</li>
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
            <li>Support development of HR internal tools using Python, React and AWS</li>
            <li>Participate in agile sprints, daily standups, and collaborative planning</li>
            <li>Gain practical experience in cloud infrastructure and deployment workflows</li>
          </ul>
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
              <p className="school">Metropolia UAS</p>
              <p className="major">GPA: 4.59/5</p>
              <p className="thesis">Thesis: Optimizing Developer Experience through Clean Code</p>
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
            <h3 className="project-title">DocumentChat</h3>
            <a href="https://github.com/TaiNguyen2407/DocumentChat" target="_blank" rel="noopener noreferrer" className="github-link">
              <span className="icon">🔗</span>
            </a>
          </div>
          <p className="project-description">
            An interactive, conversational AI tool for summarizing documents (PDFs) using NLP techniques.
          </p>
          <p className="tech-stack">
            <strong>Tech Stack:</strong> Python, React, GPT4All mini Orca 3b model, LLama 2 7b model
          </p>
        </div>

        <div className="project-item">
          <div className="project-header">
            <h3 className="project-title">Aurora Hunting</h3>
            <a href="https://github.com/TaiNguyen2407/Aurora_Hunting" target="_blank" rel="noopener noreferrer" className="github-link">
              <span className="icon">🔗</span>
            </a>
          </div>
          <p className="project-description">
            An Instagram-inspired application to capture and share real-time northern light pictures. 
            Implemented features allowing users to upload, manage, and delete photos in real time.
          </p>
          <p className="tech-stack">
            <strong>Tech Stack:</strong> React Native
          </p>
        </div>
      </section>

      <footer className="footer">
        <p>Built with React + TypeScript | Deployed on AWS</p>
      </footer>
    </div>
  );
};

export default App;
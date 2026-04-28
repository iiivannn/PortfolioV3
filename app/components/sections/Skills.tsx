export default function Skills() {
  return (
    <section className="skills-section" id="skills">
      <div className="skills-header">
        <span className="skills-section-label">Skills</span>
        <h2 className="skills-section-title">What I Work With</h2>
      </div>

      <div className="skills-grid">
        <div className="skills-category">
          <span className="skill-comment">Frontend</span>
          <div className="skills-pills">
            <span className="skill-pill">HTML5</span>
            <span className="skill-pill">CSS3</span>
            <span className="skill-pill">SCSS</span>
            <span className="skill-pill">JavaScript</span>
            <span className="skill-pill">TypeScript</span>
            <span className="skill-pill">React</span>
            <span className="skill-pill">Next.js</span>
            <span className="skill-pill">GSAP</span>
          </div>
        </div>

        <div className="skills-category">
          <span className="skill-comment">Backend</span>
          <div className="skills-pills">
            <span className="skill-pill">Node.js</span>
            <span className="skill-pill">Python</span>
            <span className="skill-pill">Flask</span>
            <span className="skill-pill">PostgreSQL</span>
            <span className="skill-pill">Prisma</span>
            <span className="skill-pill">NextAuth</span>
          </div>
        </div>

        <div className="skills-category">
          <span className="skill-comment">Tools</span>
          <div className="skills-pills">
            <span className="skill-pill">VS Code</span>
            <span className="skill-pill">Git</span>
            <span className="skill-pill">GitHub</span>
            <span className="skill-pill">Figma</span>
            <span className="skill-pill">Vercel</span>
            <span className="skill-pill">Neon</span>
          </div>
        </div>
      </div>
    </section>
  );
}

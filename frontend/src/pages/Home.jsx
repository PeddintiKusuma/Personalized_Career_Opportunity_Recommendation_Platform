import { Link } from "react-router-dom";
import PublicLayout from "../components/PublicLayout";
import { getSession } from "../services/auth";

const STEPS = [
  { n: "01", title: "Create your profile", text: "Sign up with skills and academic interests so matching has something real to work with." },
  { n: "02", title: "Verify and log in", text: "Confirm your email, then open a dashboard built around internships and projects." },
  { n: "03", title: "Get ranked matches", text: "The backend scores opportunities against your skills. You see the best fits first." },
  { n: "04", title: "Apply and track", text: "Apply in one click. Admins review status so you are not guessing what happened next." },
];

const FEATURES = [
  { title: "Skill-based recommendations", text: "Internships and projects are ranked from the skills you list—no paid matching engine." },
  { title: "Direct applications", text: "Apply from the listing itself and follow Applied, Accepted, or Rejected in one place." },
  { title: "Skill-gap analysis", text: "Compare your profile with a role and get free tutorials for the missing pieces." },
  { title: "Resume skill scan", text: "Paste resume text. We highlight skills locally in the browser—nothing is uploaded to a paid API." },
  { title: "Saved shortlist", text: "Bookmark internships on this device while you decide what to apply for." },
  { title: "Admin workspace", text: "Staff can publish opportunities, review applications, and see a simple status snapshot." },
];

const FAQS = [
  {
    q: "Does this use any paid APIs?",
    a: "No. Matching runs on the Spring Boot backend. Learning links point to free sites such as MDN, freeCodeCamp, CS50, and Kaggle Learn.",
  },
  {
    q: "Who can use the admin side?",
    a: "Campus or project admins. Use the seeded admin login after the backend starts, then add internships and projects for students.",
  },
  {
    q: "How are recommendations calculated?",
    a: "Your comma-separated skills are compared with internship titles and project tech stacks. Higher overlap ranks higher.",
  },
  {
    q: "Is email verification a real inbox message?",
    a: "This academic build uses a verification token on the site so you can complete the flow without a mail subscription.",
  },
];

export default function Home() {
  const session = getSession();
  const dashboard = session
    ? session.role === "ADMIN"
      ? "/admin/dashboard"
      : "/dashboard"
    : null;

  return (
    <PublicLayout>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Personalized Career Opportunity Platform</p>
          <h1>Find internships and projects that actually match what you can do.</h1>
          <p className="lede">
            CareerHub helps students turn skills into a shortlist: recommended internships, academic projects,
            applications, and free prep tools—without paid subscriptions.
          </p>
          <div className="btn-row">
            {dashboard ? (
              <Link className="btn" to={dashboard}>Open dashboard</Link>
            ) : (
              <>
                <Link className="btn" to="/signup">Create free account</Link>
                <Link className="btn ghost" to="/login">Student login</Link>
              </>
            )}
          </div>
        </div>
        <aside className="hero-panel">
          <h3>What you get</h3>
          <ul>
            <li>Ranked internships from your skill list</li>
            <li>Project ideas aligned to your stack</li>
            <li>Application status in one view</li>
            <li>Free learning links for skill gaps</li>
          </ul>
          <p className="muted">Built with React and Spring Boot. Data stays on your local backend.</p>
        </aside>
      </section>

      <section className="stats-row">
        <div className="stat"><span>Workflow</span><strong>4 steps</strong></div>
        <div className="stat"><span>Matching</span><strong>Skills first</strong></div>
        <div className="stat"><span>Cost</span><strong>Free tools</strong></div>
        <div className="stat"><span>Roles</span><strong>Student + admin</strong></div>
      </section>

      <section id="how" className="section">
        <div className="section-head">
          <h2>How it works</h2>
          <p>A simple path from signup to a reviewed application.</p>
        </div>
        <div className="step-grid">
          {STEPS.map((step) => (
            <article className="card" key={step.n}>
              <span className="step-n">{step.n}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="features" className="section">
        <div className="section-head">
          <h2>Features</h2>
          <p>Everything students and admins need for an academic career portal.</p>
        </div>
        <div className="grid">
          {FEATURES.map((item) => (
            <article className="card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section cta-band">
        <div>
          <h2>Ready to build your shortlist?</h2>
          <p className="muted">Start with a profile, or browse free learning resources first.</p>
        </div>
        <div className="btn-row">
          <Link className="btn" to="/signup">Sign up</Link>
          <Link className="btn ghost" to="/resources">Free learning</Link>
        </div>
      </section>

      <section id="faq" className="section">
        <div className="section-head">
          <h2>FAQ</h2>
          <p>Short answers for students and project evaluators.</p>
        </div>
        <div className="faq-list">
          {FAQS.map((item) => (
            <details className="card faq-item" key={item.q}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </section>
    </PublicLayout>
  );
}

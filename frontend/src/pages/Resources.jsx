import PublicLayout from "../components/PublicLayout";
import { FREE_RESOURCES } from "../data/skills";

export default function Resources() {
  return (
    <PublicLayout>
      <section className="page-narrow">
        <div className="page-title">
          <h1>Free learning library</h1>
          <p>
            Curated, no-subscription resources. Use these when a recommendation shows a skill you still need to practice.
          </p>
        </div>
        <div className="grid" style={{ marginTop: 24 }}>
          {FREE_RESOURCES.map((item) => (
            <article className="card" key={item.url}>
              <h3>{item.name}</h3>
              <p>{item.topic}</p>
              <a className="btn ghost" href={item.url} target="_blank" rel="noreferrer">
                Open free site
              </a>
            </article>
          ))}
        </div>
      </section>
    </PublicLayout>
  );
}

import { SiteConfig } from "@/lib/content";

/** Author profile panel shown alongside the page content. */
export function Sidebar({ cfg }: { cfg: SiteConfig }) {
  const a = cfg.author ?? {};
  // Empty or absent in config.yml means the Affiliations block is hidden.
  const affiliations = cfg.affiliations ?? [];

  const socials = [
    a.email && { href: `mailto:${a.email}`, icon: "fas fa-envelope", cls: "email-icon", title: "Email" },
    a.googlescholar && {
      href: `https://scholar.google.com/citations?user=${a.googlescholar}`,
      icon: "fas fa-graduation-cap", cls: "scholar-icon", title: "Google Scholar",
    },
    a.github && { href: `https://github.com/${a.github}`, icon: "fab fa-github", cls: "github-icon", title: "GitHub" },
    a.linkedin && {
      href: `https://www.linkedin.com/in/${a.linkedin}`,
      icon: "fab fa-linkedin", cls: "linkedin-icon", title: "LinkedIn",
    },
    a.orcid && {
      href: `https://orcid.org/${a.orcid}`,
      icon: "fab fa-orcid", cls: "orcid-icon", title: "ORCID",
    },
  ].filter(Boolean) as { href: string; icon: string; cls: string; title: string }[];

  return (
    <aside className="sidebar-wrap">
      <div className="author__avatar">
        {/* Plain <img> keeps these as static files under public/images. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/images/${a.avatar ?? "profile.png"}`}
          alt={a.name ?? "Profile photo"}
          width={240}
          height={240}
          className="hover-lift"
        />
      </div>

      <div className="author__content">
        <h3>{a.name ?? "John Doe"}</h3>
        <h4>{a.description ?? "Open Source Enthusiast"}</h4>
      </div>

      {socials.length > 0 && (
        <div className="author__socials">
          {socials.map((s) => (
            <a key={s.title} href={s.href} title={s.title} target="_blank" rel="noreferrer">
              <i className={`${s.icon} fa-icon ${s.cls}`} />
            </a>
          ))}
        </div>
      )}

      {affiliations.length > 0 && (
        <div className="author__section">
          <div className="sidebar-section-title">Affiliations</div>
          <div className="affil-grid">
            {affiliations.map((af) => {
              /* eslint-disable-next-line @next/next/no-img-element */
              const logo = (
                <img
                  src={`/images/${af.logo}`}
                  alt={af.name}
                  className="affil-logo hover-lift"
                />
              );
              return af.url ? (
                <a key={af.name} href={af.url} target="_blank" rel="noreferrer" title={af.name}>
                  {logo}
                </a>
              ) : (
                <span key={af.name} title={af.name}>
                  {logo}
                </span>
              );
            })}
          </div>
        </div>
      )}

      <div className="author__cv">
        <a href="/files/John_Doe_CV.pdf" target="_blank" rel="noreferrer" className="cv-button">
          <i className="fas fa-file-pdf" /> Download CV
        </a>
      </div>

      <div className="author__credit">
        Graphic Resources:{" "}
        <a href="https://www.flaticon.com/" target="_blank" rel="noreferrer">Flaticon</a>
      </div>
    </aside>
  );
}

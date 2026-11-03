"use client";

import { useState } from "react";

export interface CvOption {
  label: string;
  href: string;
}

/**
 * "Download CV" control. With more than one version configured it expands on
 * click to offer each; with a single one it stays a plain link, since there is
 * nothing to choose between.
 */
export function CvButton({ options }: { options: CvOption[] }) {
  const [open, setOpen] = useState(false);

  if (options.length === 0) return null;

  if (options.length === 1) {
    return (
      <a
        href={options[0].href}
        target="_blank"
        rel="noreferrer"
        className="cv-button"
      >
        <i className="fas fa-file-pdf" /> Download CV
      </a>
    );
  }

  return (
    // Shrink-wraps the button so the options below can stretch to match its
    // width. `.author__cv` stays a full-width block so its border-top still
    // reads as a divider across the sidebar.
    <div className="cv-menu">
      <button
        type="button"
        className="cv-button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <i className="fas fa-file-pdf" /> Download CV
        <i
          className={`fas fa-chevron-${open ? "up" : "down"} cv-button__caret`}
          aria-hidden="true"
        />
      </button>

      {/* Always mounted, so opening and closing can both animate; CSS
          collapses it to zero height and hides it from assistive tech. */}
      <div className={`cv-options${open ? " cv-options--open" : ""}`}>
        <div className="cv-options__inner" inert={!open || undefined}>
          {options.map((o) => (
            <a
              key={o.label}
              href={o.href}
              target="_blank"
              rel="noreferrer"
              className="cv-options__item"
            >
              {o.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

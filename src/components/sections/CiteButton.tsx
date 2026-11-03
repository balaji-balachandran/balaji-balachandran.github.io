"use client";

import { useState } from "react";

/** Decodes the entities that appear in citation strings from the YAML. */
function toPlainText(html: string): string {
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * "Cite" toggle. Keeps the citation out of the way until asked for, and
 * offers a one-click copy of the plain-text form.
 */
export function CiteButton({ citation }: { citation: string }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(toPlainText(citation));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard access can be blocked (insecure origin, permissions);
      // the citation is still visible to select manually.
      setCopied(false);
    }
  }

  return (
    <>
      <button
        type="button"
        className="btn"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        {open ? "Hide citation" : "Cite"}
      </button>

      {open && (
        <div className="cite-panel">
          <p className="cite-panel__text" dangerouslySetInnerHTML={{ __html: citation }} />
          <button type="button" className="btn btn--small" onClick={copy}>
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      )}
    </>
  );
}

/**
 * /playground -- a scratch page for trying out components, animations and
 * styling. Completely separate from the site: see the layout next door.
 *
 * Add experiments as <section className="pg-card"> blocks, and their styles
 * to playground.css. Nothing here ships to the real page.
 */
export default function Playground() {
  return (
    <>
      <header className="pg-header">
        <h1>Playground</h1>
        <p>Scratch space. Separate layout and stylesheet from the site.</p>
      </header>

      <section className="pg-card">
        <h2>Demo animation</h2>
        <div className="pg-demo-box" />
      </section>
    </>
  );
}

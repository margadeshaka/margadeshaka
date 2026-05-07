/**
 * Cosmic background layer — drifting starfield + 3 large aurora blobs.
 * Renders behind all content. SSR-friendly, no JS required.
 */
export default function CosmicLayer() {
  return (
    <>
      <div className="stars" aria-hidden="true" />
      <div
        className="aurora-blob"
        style={{ top: '10%', left: '12%', width: 380, height: 380, background: 'rgba(255, 200, 100, 0.07)' }}
        aria-hidden="true"
      />
      <div
        className="aurora-blob"
        style={{ bottom: '12%', right: '8%', width: 460, height: 460, background: 'rgba(126, 77, 212, 0.09)' }}
        aria-hidden="true"
      />
      <div
        className="aurora-blob"
        style={{ top: '60%', left: '55%', width: 320, height: 320, background: 'rgba(0, 230, 170, 0.05)' }}
        aria-hidden="true"
      />
    </>
  );
}

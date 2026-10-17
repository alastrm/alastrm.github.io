export function ForgeDeployment() {
  return (
    <div className="forge-deployment">
      <div className="forge-caption"><span className="forge-caption-dot" /> Blue / green deployment</div>
      <svg
        viewBox="0 0 600 320"
        role="img"
        aria-labelledby="forge-visual-title forge-visual-description"
        className="forge-diagram"
        fill="none"
      >
        <title id="forge-visual-title">Zero-downtime routing with Traefik</title>
        <desc id="forge-visual-description">Traefik routes incoming traffic to the active environment while the other stays on standby. Blue and Green exchange roles without downtime.</desc>
        <path d="M68 160H198" className="forge-line" />
        <path d="M326 160H363Q379 160 379 144V100Q379 84 395 84H423" className="forge-line" />
        <path d="M326 160H363Q379 160 379 176V220Q379 236 395 236H423" className="forge-line" />
        <path d="M326 160H363Q379 160 379 144V100Q379 84 395 84H423" className="forge-route forge-route-blue" />
        <path d="M326 160H363Q379 160 379 176V220Q379 236 395 236H423" className="forge-route forge-route-green" />
        <path d="M68 160H198" className="forge-incoming" />
        <circle cx="68" cy="160" r="21" fill="var(--forge-node-surface)" stroke="var(--forge-node-border)" />
        <path d="M58 160H78M68 150V170M61 153L75 167M61 167L75 153" stroke="var(--project-muted)" strokeWidth="1.2" />
        <text x="68" y="207" textAnchor="middle" className="forge-label">Traffic</text>
        <rect x="198" y="120" width="128" height="80" rx="12" fill="var(--forge-node-surface)" stroke="var(--forge-node-border)" />
        <path d="M220 146H236M231 141L236 146L231 151M236 174H220M225 169L220 174L225 179" stroke="var(--project-secondary)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        <text x="274" y="165" textAnchor="middle" className="forge-node-name">Traefik</text>
        <text x="262" y="229" textAnchor="middle" className="forge-label">Reverse proxy</text>
        <g className="forge-environment forge-blue">
          <rect x="423" y="42" width="144" height="84" rx="12" fill="var(--forge-blue-surface)" stroke="currentColor" strokeOpacity=".5" />
          <rect x="440" y="60" width="19" height="22" rx="4" stroke="currentColor" />
          <path d="M445 67H454M445 74H451" stroke="currentColor" />
          <text x="471" y="77" className="forge-node-name">Blue</text>
          <circle cx="444" cy="104" r="3" fill="currentColor" />
          <text x="455" y="108" className="forge-status forge-blue-active">Active</text>
          <text x="455" y="108" className="forge-status forge-blue-standby">Standby</text>
        </g>
        <g className="forge-environment forge-green">
          <rect x="423" y="194" width="144" height="84" rx="12" fill="var(--forge-green-surface)" stroke="currentColor" strokeOpacity=".5" />
          <rect x="440" y="212" width="19" height="22" rx="4" stroke="currentColor" />
          <path d="M445 219H454M445 226H451" stroke="currentColor" />
          <text x="471" y="229" className="forge-node-name">Green</text>
          <circle cx="444" cy="256" r="3" fill="currentColor" />
          <text x="455" y="260" className="forge-status forge-green-active">Active</text>
          <text x="455" y="260" className="forge-status forge-green-standby">Standby</text>
        </g>
      </svg>
      <div className="forge-footnote"><span />One server. Two environments. No downtime.</div>
    </div>
  );
}

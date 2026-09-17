// Add new notes here. The homepage sorts by publishedAt, newest first.
// content is trusted HTML that YOU write; do not insert visitor-submitted HTML.
// Image paths inside content are relative to the reading page: ../assets/...
const logs = [
  {
    id: "2026-09-17",
    publishedAt: "2026-09-17T21:42:00+05:30",
    date: "Thu 17 Sep 21:42pm",
    title: "today i learnt how to calculate orbit velocity",
    heading: "so let’s see how to find the velocity",
    // Starter note based on the topic in the sketch. Edit or replace freely.
    content: `
      <p>first why i’m doing this ........<br>
      i wanted to understand what keeps something in orbit.</p>
      <figure class="orbit-diagram">
        <svg viewBox="0 0 340 170" role="img" aria-labelledby="orbit-title orbit-description">
          <title id="orbit-title">A circular orbit</title>
          <desc id="orbit-description">A satellite moves tangentially around a central body. Gravity points inward. The radius r runs from the centre to the satellite.</desc>
          <circle cx="144" cy="87" r="63" fill="none" stroke="currentColor" stroke-width="0.7" />
          <circle cx="144" cy="87" r="15" fill="none" stroke="currentColor" stroke-width="0.8" />
          <circle cx="207" cy="87" r="3" fill="currentColor" />
          <path d="M144 87h58" stroke="currentColor" stroke-width="0.7" stroke-dasharray="2 4" />
          <path d="M207 82V31m-4 5 4-5 4 5M201 96h-32m5-3-5 3 5 3" fill="none" stroke="currentColor" stroke-width="0.8" />
          <text x="170" y="79">r</text><text x="218" y="45">velocity</text>
          <text x="170" y="114">gravity</text>
        </svg>
        <figcaption>always falling, always missing.</figcaption>
      </figure>
      <p>for a circular orbit, gravity supplies the inward acceleration. so the two expressions meet here:</p>
      <p class="formula" aria-label="G M m divided by r squared equals m v squared divided by r">GMm / r² = mv² / r</p>
      <p>the satellite’s mass cancels out. rearrange, then take the square root:</p>
      <p class="formula" aria-label="v equals the square root of G M divided by r">v = √(GM / r)</p>
      <ul>
        <li><code>G</code> — gravitational constant</li>
        <li><code>M</code> — mass of the body being orbited</li>
        <li><code>r</code> — distance from its centre, not its surface</li>
      </ul>
      <h2>a small check</h2>
      <p>using Earth’s approximate gravitational parameter, <code>GM = 3.986 × 10¹⁴ m³/s²</code>, and a radius of <code>6.771 × 10⁶ m</code>:</p>
      <pre><code>const mu = 3.986e14;  // m³/s²
const radius = 6.771e6; // m
const velocity = Math.sqrt(mu / radius);
// about 7,673 m/s → 7.67 km/s</code></pre>
      <p>this is the ideal circular-orbit case. a higher orbit means a lower orbital speed. that’s the part i wanted to remember.</p>
    `,
  },
];

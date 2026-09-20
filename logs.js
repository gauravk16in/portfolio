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

  {

    id: "2026-09-21",
    publishedAt: "2026-09-21T02:45:00+05:30",
    date: "Mon 21 Sep 02:45am",
    title: "I re-revised every basic concept of JAVA",
    heading: "I was having trouble in solving problems with Java, so I revised every concept.",

    content: `
      <p>It all started with a problem where I was stuck as I used to code in Python then C++, but now I have switched to Java.</p>
      <figure>
        <img src="../assets/java-notes.png" alt="Java concepts I revised">
        <figcaption>Java revision notes.</figcaption>
      </figure>
      <p>I was revising for 2 days, and here is what I learnt till now:</p>
      <ol>
        <li>Working of Java program</li>
        <li>Intro to JVM, JRE, and JDK</li>
        <li>Creating a class in Java</li>
        <li>A basic Java program</li>
        <li>Keywords in Java</li>
        <li>Variables</li>
        <li>Data types</li>
        <li>Data types and implicit conversion</li>
        <li>Explicit conversion</li>
        <li>Binary number system overview</li>
        <li>Converting binary to decimal</li>
        <li>Binary addition</li>
        <li>Binary subtraction</li>
        <li>Two's complement</li>
        <li>Types of operators</li>
        <li>Arithmetic operations</li>
        <li>Relational operators</li>
        <li>Logical operators</li>
        <li>Bitwise operators</li>
        <li>Increment, decrement, and ternary operator</li>
        <li>Taking user input</li>
        <li>Conditional statements</li>
        <li>If-else, nested if-else, else-if</li>
        <li>Ternary operators advanced</li>
        <li>Loops</li>
        <li>Elements</li>
        <li>Break and continue statement</li>
        <li>Nested loops</li>
        <li>Pattern matching</li>
        <li>Labeled break and continue statements</li>
        <li>Arrays and how they work</li>
        <li>For-each loop</li>
        <li>2D arrays</li>
        <li>Methods / functions</li>
        <li>Components of method, calling methods</li>
        <li>Parameters of methods</li>
        <li>Math class methods</li>
        <li>Java strings</li>
        <li>Creating Java strings</li>
        <li>Comparisons</li>
      </ol>
    `,



  },

  {

    id: "2026-09-21-02",
    publishedAt: "2026-09-21T03:45:00+05:30",
    date: "Mon 21 Sep 03:45am",
    title: "Oops - Part (Class and objects)",
    heading: "Object oriented programming is the way to solve real world problems",

    content: `
      <p>
      Let's start with what I learnt about class<br>
      so, Class is a way to arrange data and behaviour informations. 
      and Object is an instance of class which has those properties & behaviour attached.<br>

      I have attached my understanding with chocolate factory example 
      refer the image attached below for some fun understanding.
      </p>

      <figure>
        <img src="../assets/classes.png" alt="classes and objects">
        <figcaption>classes and objects</figcaption>
      </figure>

      <p>Few logical things to understand and recap better-

      A class can be decelared once only while object can be declared multiple times.<br>
      Class doesn't take any memory while object does once created.

      and how I can forget - we can create custom classes (user defined)


      
      </p>


    `,



  },
];

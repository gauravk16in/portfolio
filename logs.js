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

    content:`


    <p>It all started with a problem where I was suck as I used to code in python then C++ but now I have switch to Java

    <figure>
      <img src="/assets/java-notes.png" alt="Java concepts I revised">
      <figcaption>Java revision notes.</figcaption>
    </figure>

    <br> I was revising from 2 days btw and here is what I learnt till the date...
    #1 working of java program
    #2 intro to JVM , JRE, and JDK
    #3 creating a class in java
    #4 a basic java program
    #5 keywords in java
    #6 variables
    #7 data types
    #8 data types and implicit conversion
    #9 explict conversion
    #10 binary number system overview
    #11 converting binary to decimal
    #12 binary addition
    #13 binary subtraction
    #14 two's compliment
    #15 types of operators
    #16 arithmetic operations
    #17 relational operators
    #18 logical operators
    #19 bitwise operators
    #20 increment, decrement, and ternary operator
    #21 taking user input
    #22 conditional statements
    #23 if else, nested if else , elif
    #24 ternary operators adv
    #25 loops 
    #26 elements 
    #27 break and continue statement
    #28 nested loops
    #29 pattern matching
    #30 labeled break and continue statements
    #31 arrrays and it's working
    #32 for each loop
    #33 2d arrays
    #34 methods / functions
    #35 components of method, calling methods
    #36 parameters of methods
    #37 maths class method
    #38 java strings
    #39 creating java string
    #40 comparisions 
    </p>


    `,



  }
];

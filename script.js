const btn = document.getElementById("themeToggle");
const hero = document.getElementById("heroContent");

btn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    btn.textContent = "(LIGHT)";

    hero.innerHTML = `
      <h1 class="gt">
            HELLO<br />
             STRANGER (*) 
          </h1>

          <p>
            <br>I believe design is the intersection of play and purpose.
            <br />
             My mission is to craft a more connected and transparent world by designing tools that empower healthier, 
             more meaningful<br>lives both on and offline.
          </p>

          <p>
            <br>I love to touch <span> Grass </span> in the 
            <span>Dark</span>.
          </p>
    `;
  } else {
    btn.textContent = "(DARK)";

    hero.innerHTML = `
      <h1 class="greeting-text">
            Hey, I'm Gaurav —<br />
            Let me introduce myself 
          </h1>

          <p>
            <br>A Computer Science Engineering student based in Bangalore, India.
            <br />
            I'm learning algorithms and system design, currently working with
            React, Dart, and C programming.
          </p>

          <p>
            <br>Building thoughtful projects with <span>my Arch setup</span> &
            <span>clean code</span>.
          </p>
    `;
  }
});
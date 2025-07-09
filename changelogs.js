document.addEventListener("DOMContentLoaded", () => {
  const changelogBtn = document.createElement("a");
  changelogBtn.textContent = "📝 Changelog";
  changelogBtn.style.cursor = "pointer";

  const header = document.querySelector("header");
  if (header) {
    header.appendChild(changelogBtn);
  }

  const overlay = document.createElement("div");
  overlay.id = "overlay";
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  overlay.style.zIndex = "10002";
  overlay.style.display = "none";

  const changelogBox = document.createElement("div");
  changelogBox.id = "changelogBox";
changelogBox.innerHTML = `
  <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #ccc; padding-bottom: 8px;">
    <h2 style="margin: 0; font-size: 18px; color: #fff;">Muutokset</h2>
    <button id="closeChangelog" style="background: none; border: none; font-size: 24px; color: #fff; cursor: pointer;">×</button>
  </div>
  <ul style="margin-top: 12px; padding-left: 18px; list-style-type: disc; color: #f0f0f0; max-height: 400px; overflow-y: auto;">
    <li><strong style="color:#90ee90">v1.1.06</strong>: Korjattu kriittinen ongelma, jonka aiheutti edellisen visuaalisen ongelman korjaaminen (taas).</li>
    <li><strong style="color:#90ee90">v1.1.05</strong>: Korjattu kriittinen ongelma, jonka aiheutti edellisen visuaalisen ongelman korjaaminen.</li>
    <li><strong style="color:#90ee90">v1.1.04</strong>: Korjattu muutama visuaalinen ongelma.</li>
    <li><strong style="color:#90ee90">v1.1.03</strong>: Parannettu pelin värimaailmaa. <br> Lisätty kustomoitu scrolltrack. <br> Lisätty paremmat napit (Jotka koodasin itse. En käyttänyt mitään resurssipankkeja, vaan tein ne itse!!!!!!!!!!) <br> Korjasin visuaalisen ongelman joka ärsytti minua itseäni. </li>
    <li><strong style="color:#90ee90">v1.1.02</strong>: Lisätty "Hard Mode". <br> Korjattu mobiilinäkymää.</li>
    <li><strong style="color:#90ee90">v1.1.01</strong>: Parannettu pelin värimaailmaa. <br> Lisätty jokerille animaatio. <br> Backend-muutoksia.</li>
    <li><strong style="color:#90ee90">v1.1</strong>: Lisätty asetukset. <br> Aloitettu savegame-prosessin luominen.</li>
    <li><strong style="color:#90ee90">v1.0.22</strong>: Korjattu mobiilinäkymää.</li>
    <li><strong style="color:#90ee90">v1.0.21</strong>: Korjattu erittäin kriittinen ongelma jokereiden ja ässien käyttäytymisessä. Lisätty pelistatistiikkasivulle lisää tietoa!</li>
    <li><strong style="color:#90ee90">v1.0.20</strong>: Kerää enemmän dataa pelinsisäisesti. <br> Päivitetty backend-jokerilogiikkaa.</li>
    <li><strong style="color:#90ee90">v1.0.19</strong>: Pari muutosta, jotka parantavat peliä.</li>
    <li><strong style="color:#90ee90">v1.0.18</strong>: Muutettu changelogin ulkonäköä.</li>
    <li><strong style="color:#90ee90">v1.0.17</strong>: Lisätty infoboksiin lisää tietoa.</li>
    <li><strong style="color:#90ee90">v1.0.16</strong>: Lisätty infoboksi, joka näyttää sinulle pelatut pelit ja kokonaispisteet.</li>
    <li><strong style="color:#90ee90">v1.0.15</strong>: Jokerilogiikka toimii taas oikein. Uudistettu korttianimaatio. Korjattu kirjoitusvirheitä. Backend-päivityksiä. Lisätty pisteiden laskuri (ei vielä käytössä).</li>
    <li><strong style="color:#90ee90">v1.0.14</strong>: Korjattu duplikaattipisteet. Jokerilogiikkaa parannettu.</li>
    <li><strong style="color:#90ee90">v1.0.13</strong>: Parannettu ulkoasu mobiilissa.</li>
    <li><strong style="color:#90ee90">v1.0.12</strong>: Poistettu pelimuotojen ero. Vaihdettu värimaailmaa.</li>
    <li><strong style="color:#90ee90">v1.0.11</strong>: Korjattu hutien lasku.</li>
    <li><strong style="color:#90ee90">v1.0.1</strong>: Lisätty changelog-painike. Korjauksia.</li>
    <li><strong style="color:#90ee90">v1.0</strong>: Ensijulkaisu.</li>
  </ul>
`;
const changelogList = changelogBox.querySelector("ul");
changelogList.style.maxHeight = "300px";
changelogList.style.overflowY = "auto";
changelogList.style.paddingRight = "10px";


changelogList.style.scrollbarWidth = "thin";
changelogList.style.scrollbarColor = "#4caf50rgb(26, 26, 26, 0.0)";

const style = document.createElement("style");
style.textContent = `
  #changelogBox ul::-webkit-scrollbar {
    width: 8px;
    background: transparent;
  }

  #changelogBox ul::-webkit-scrollbar-track {
    background: transparent !important;
    border: none !important;
  }

  #changelogBox ul::-webkit-scrollbar-track-piece {
    background: transparent !important;
  }

  #changelogBox ul::-webkit-scrollbar-thumb {
    background-color: #4caf50;
    border-radius: 4px;
    border: none;
  }

  #changelogBox ul::-webkit-scrollbar-thumb:hover {
    background-color: #66bb6a;
  }

  #changelogBox ul {
    scrollbar-width: thin;
    scrollbar-color: #4caf50 transparent;
  }
`;
document.head.appendChild(style);

document.head.appendChild(style);

document.head.appendChild(style);

  changelogBox.style.position = "fixed";
  changelogBox.style.top = "50%";
  changelogBox.style.left = "50%";
  changelogBox.style.transform = "translate(-50%, -50%)";
  changelogBox.style.background = "#2d4d2d"; 
  changelogBox.style.color = "#f0f0f0";       
  changelogBox.style.maxWidth = "400px";
  changelogBox.style.maxHeight = "80vh";
  changelogBox.style.overflowY = "auto";
  changelogBox.style.padding = "16px 20px";
  changelogBox.style.borderRadius = "10px";
  changelogBox.style.boxShadow = "0 4px 10px rgba(0,0,0,0.4)";
  changelogBox.style.zIndex = "10001";
  changelogBox.style.fontFamily = "sans-serif";
  changelogBox.style.fontSize = "14px";
  changelogBox.style.display = "none";

  document.body.appendChild(overlay);
  document.body.appendChild(changelogBox);

  let visible = false;

  function toggleChangelog(state) {
    visible = state;
    changelogBox.style.display = visible ? "block" : "none";
    overlay.style.display = visible ? "block" : "none";
  }

  changelogBtn.addEventListener("click", () => {
    toggleChangelog(!visible);
  });

  overlay.addEventListener("click", () => {
    toggleChangelog(false);
  });

  changelogBox.addEventListener("click", (e) => {
    if (e.target.id === "closeChangelog") {
      toggleChangelog(false);
    }
  });
});


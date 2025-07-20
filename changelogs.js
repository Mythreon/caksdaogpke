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
  overlay.style.zIndex = "10000";
  overlay.style.display = "none";

  const changelogBox = document.createElement("div");
  changelogBox.id = "changelogBox";
changelogBox.innerHTML = `
  <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #ccc; padding-bottom: 8px;">
<h2 style="margin: 0; font-size: 20px; color: #aaffaa; text-shadow: 1px 1px 2px #000;">Muutokset</h2>
<button id="closeChangelog" style="
  background-color: #388e3c;
  color: white;
  font-size: 18px;
  border: none;
  border-radius: 6px;
  padding: 4px 10px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  box-shadow: 0 2px 6px rgba(0,0,0,0.3);
">x</button>
  </div>
  <ul style="margin-top: 12px; padding-left: 18px; list-style-type: disc; color: #f0f0f0; max-height: 400px; overflow-y: auto;">
    <li><strong style="color:#90ee90">v1.2.3</strong>: Uusi visuaalinen tyylisuuntaus valmis. </li>
    <li><strong style="color:#90ee90">v1.2.21</strong>: Lisätty asetus partikkeleiden poistamiseen.</li>
    <li><strong style="color:#90ee90">v1.2.2</strong>: Uusi visuaalinen tyylisuuntaus; ei vielä täysin valmis, mutta sitä kohti mennään.</li>
    <li><strong style="color:#90ee90">v1.2.12</strong>: Korjattu Highscore-taulukko. Joitakin pieniä muutkoksia muuallakin.</li>
    <li><strong style="color:#90ee90">v1.2.1</strong>: Paljon muutoksia: Statistiikkaruudulla, Main Menussa ja pari modaalia muutettuna. + Debug-moodin valmistelua.</li>
    <li><strong style="color:#90ee90">v1.2</strong>: Korjattu kaikki visuaaliset ongelmat, jotka löysin. Lisätty savegame-funktio, joka antaa sinun tehdä savegamen. Savegame on enkryptoitu, ja sitä ei voi todellakaan muokata helposti. </li>
    <li><strong style="color:#90ee90">v1.1.12</strong>: Pelissä on nyt parempi anticheat; kaikki edelliset pisteet tullaan nollaamaan. </li>
    <li><strong style="color:#90ee90">v1.1.11</strong>: Korjattu ongelma, jossa Main Menu latautui myöhemmin kuin peli. <br><br> Mini: 1.1.11.1: Korjattu erittäin pieni visuaalinen ongelma liittyen tähän.</li>
    <li><strong style="color:#90ee90">v1.1.10</strong>: Lisätty Main Menu, ja korjattu pari visuaalista ongelmaa.</li>
    <li><strong style="color:#90ee90">v1.1.09</strong>: Korjattu ongelma, joka aiheutti pelin jumittumisen IOS laitteilla.</li>
    <li><strong style="color:#90ee90">v1.1.08</strong>: Korjattu ongelma changelogin kanssa.</li>
    <li><strong style="color:#90ee90">v1.1.07</strong>: Korttien symbolien pitäisi nyt näkyä IOS pohjaisilla laitteilla.</li>
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
  #changelogBox {
    background: #1a3d1a;
    color: #e0ffe0;
    max-width: 480px;
    max-height: 80vh;
    overflow-y: auto;
    padding: 20px 24px;
    border-radius: 12px;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.5);
    z-index: 10001;
    font-family: 'sans-serif';
    font-size: 14px;
    display: none;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  #changelogBox h2 {
    font-size: 20px;
    color: #aaffaa;
    text-shadow: 1px 1px 2px #000;
  }

  #changelogBox button#closeChangelog {
    background-color: #388e3c;
    color: white;
    font-size: 18px;
    border: none;
    border-radius: 6px;
    padding: 4px 10px;
    cursor: pointer;
    transition: background-color 0.2s ease;
    box-shadow: 0 2px 6px rgba(0,0,0,0.3);
  }

  #changelogBox button#closeChangelog:hover {
    background-color: #43a047;
  }

  #changelogBox ul {
    scrollbar-width: thin;
    scrollbar-color: #4caf50 transparent;
    list-style: disc;
    padding-left: 18px;
    color: #e0ffe0;
    margin-top: 12px;
  }

  #changelogBox ul::-webkit-scrollbar {
    width: 8px;
  }

  #changelogBox ul::-webkit-scrollbar-track {
    background: transparent;
  }

  #changelogBox ul::-webkit-scrollbar-thumb {
    background-color: #4caf50;
    border-radius: 4px;
  }

  #changelogBox ul::-webkit-scrollbar-thumb:hover {
    background-color: #66bb6a;
  }

  #overlay {
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 10000;
  }
`;
document.head.appendChild(style);

  changelogBox.style.position = "fixed";
  changelogBox.style.top = "50%";
  changelogBox.style.left = "50%";
  changelogBox.style.transform = "translate(-50%, -50%)";
  changelogBox.style.background = "#1a3d1a"; 
  changelogBox.style.color = "#e0ffe0"; 
  changelogBox.style.maxWidth = "480px";
  changelogBox.style.maxHeight = "80vh";
  changelogBox.style.overflowY = "auto";
  changelogBox.style.padding = "20px 24px";
  changelogBox.style.borderRadius = "12px";
  changelogBox.style.boxShadow = "0 6px 18px rgba(0, 0, 0, 0.5)";
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

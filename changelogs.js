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
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <h3 style="margin: 0;">Muutokset</h3>
      <button id="closeChangelog" style="background: none; border: none; font-size: 20px; cursor: pointer; line-height: 1;">×</button>
    </div>
    <ul style="margin-top: 10px;">
      <li><strong>v1.0.17</strong> - Lisätty infoboksiin lisää tietoa.</li>
      <li><strong>v1.0.16</strong> - Lisätty infoboksi, joka näyttää sinulle sinun pelatut pelit sekä kokonaispisteet; eli, miten addiktoitunut olet.</li>
      <li><strong>v1.0.15</strong> - Jokerilogiikka toimii taas oikein. <br> Uudistettu korttianimaatio. <br> Korjattu kirjoitusvirheitä. <br> Muunneltu pari backend-asiaa, jotta huijaaminen olisi vaikeampaa. <br> lisätty laskuri, joka laskee kaikkien pelien yhteiset pisteet; tosin ei vielä käytössä.</li>
      <li><strong>v1.0.14</strong> - Korjattu ongelma, joka aiheutti sen, että saman pistemäärän peli näyttäytyisi kahdesti. <br> Hieman muutettu jokerilogiikkaa toimimaan paremmin. </li>
      <li><strong>v1.0.13</strong> - Näyttää paremmalta mobiililaitteistolla</li>
      <li><strong>v1.0.12</strong> - Poistettu Klassisen ja Kompleksin pelimuotojen ero.<br>Vaihdettu värimaailmaa.</li>
      <li><strong>v1.0.11</strong> - Korjattu hutien lasku</li>
      <li><strong>v1.0.1</strong> - Lisätty Changelog-painike ja korjattu tiettyjä ongelmia</li>
      <li><strong>v1.0</strong> - Ensijulkaisu.</li>
    </ul>
  `;
  changelogBox.style.position = "fixed";
  changelogBox.style.top = "50%";
  changelogBox.style.left = "50%";
  changelogBox.style.transform = "translate(-50%, -50%)";
  changelogBox.style.background = "darkgreen";
  changelogBox.style.color = "#222";
  changelogBox.style.padding = "16px 20px";
  changelogBox.style.borderRadius = "10px";
  changelogBox.style.boxShadow = "0 4px 10px rgba(0,0,0,0.4)";
  changelogBox.style.maxWidth = "300px";
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

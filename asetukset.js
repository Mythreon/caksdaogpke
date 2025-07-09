const ASETUKSET_KEY = "asetukset";

const oletusAsetukset = {
  showMessages: true,
  hardMode: false,
};

function haeAsetukset() {
  const tallennetut = localStorage.getItem(ASETUKSET_KEY);
  return tallennetut ? JSON.parse(tallennetut) : { ...oletusAsetukset };
}

function tallennaAsetukset(asetukset) {
  localStorage.setItem(ASETUKSET_KEY, JSON.stringify(asetukset));
}

document.addEventListener("DOMContentLoaded", () => {
  const asetukset = haeAsetukset();
  window.getAsetukset = () => asetukset;

  const gearBtn = document.createElement("a");
  gearBtn.textContent = "⚙️";
  gearBtn.style.cursor = "pointer";
  gearBtn.title = "Asetukset";

  const header = document.querySelector("header");
  if (header) header.appendChild(gearBtn);

  const overlay = document.createElement("div");
  overlay.id = "asetuksetOverlay";
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  overlay.style.zIndex = "10000";
  overlay.style.display = "none";

  const menu = document.createElement("div");
  menu.id = "asetuksetMenu";
menu.innerHTML = `
  <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #ccc; padding-bottom: 8px;">
    <h2 style="margin: 0; font-size: 18px; color: #fff;">Asetukset</h2>
    <button id="closeSettings" style="background: none; border: none; font-size: 12px; color: #fff; cursor: pointer;">×</button>
  </div>

  <label style="display: flex; align-items: center; margin-top: 12px; color: #f0f0f0;">
    <div class="custom-toggle">
      <input type="checkbox" id="toggleMessages">
      <span class="slider"></span>
    </div>
    Näytä viestit
  </label>

  <label style="display: flex; align-items: center; margin-top: 12px; color: #f0f0f0;">
    <div class="custom-toggle">
      <input type="checkbox" id="toggleHardMode">
      <span class="slider"></span>
    </div>
    Hard Mode
  </label>
`;

  menu.style.position = "fixed";
  menu.style.top = "50%";
  menu.style.left = "50%";
  menu.style.transform = "translate(-50%, -50%)";
  menu.style.background = "#2d4d2d";
  menu.style.color = "#f0f0f0";
  menu.style.padding = "16px 20px";
  menu.style.borderRadius = "10px";
  menu.style.boxShadow = "0 4px 10px rgba(0,0,0,0.4)";
  menu.style.zIndex = "10001";
  menu.style.maxWidth = "300px";
  menu.style.fontFamily = "sans-serif";
  menu.style.fontSize = "14px";
  menu.style.display = "none";

  document.body.appendChild(overlay);
  document.body.appendChild(menu);

  const toggleMessages = menu.querySelector("#toggleMessages");
  toggleMessages.checked = asetukset.showMessages;

  toggleMessages.addEventListener("change", () => {
    asetukset.showMessages = toggleMessages.checked;
    tallennaAsetukset(asetukset);
  });

  const toggleHardMode = menu.querySelector("#toggleHardMode");
  toggleHardMode.checked = asetukset.hardMode;

  toggleHardMode.addEventListener("change", () => {
  asetukset.hardMode = toggleHardMode.checked;
  tallennaAsetukset(asetukset);
});


  let menuVisible = false;

  function toggleMenu(state) {
    menuVisible = state;
    menu.style.display = state ? "block" : "none";
    overlay.style.display = state ? "block" : "none";
  }

  gearBtn.addEventListener("click", () => {
    toggleMenu(!menuVisible);
  });

  overlay.addEventListener("click", () => {
    toggleMenu(false);
  });

  menu.querySelector("#closeSettings").addEventListener("click", () => {
    toggleMenu(false);
  });
});


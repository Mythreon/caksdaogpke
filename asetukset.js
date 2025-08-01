const ASETUKSET_KEY = "asetukset";

const oletusAsetukset = {
  showMessages: true,
  particlesEnabled: true, 
  hardMode: false,
  debugMode: false,
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
  overlay.style.zIndex = "100001";
  overlay.style.display = "none";

  const menu = document.createElement("div");
  menu.id = "asetuksetMenu";
menu.innerHTML = `
  <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #ccc; padding-bottom: 8px;">
<h2 style="margin: 0; font-size: 20px; color: #aaffaa; text-shadow: 1px 1px 2px #000;">Asetukset</h2>
<button id="closeSettings" style="
  background-color: #388e3c;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 6px;
  padding: 4px 10px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  box-shadow: 0 2px 6px rgba(0,0,0,0.3);
">x</button>
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
    <input type="checkbox" id="toggleParticles">
    <span class="slider"></span>
  </div>
  Näytä partikkelit
</label>

  <label style="display: flex; align-items: center; margin-top: 12px; color: #f0f0f0;">
    <div class="custom-toggle">
      <input type="checkbox" id="toggleHardMode">
      <span class="slider"></span>
    </div>
    Hard Mode
  </label>
  <label style="display: flex; align-items: center; margin-top: 12px; color: #f0f0f0;">
  <div class="custom-toggle">
    <input type="checkbox" id="toggleDebugMode">
    <span class="slider"></span>
   </div>
   Debug Mode
  </label>

`;

  menu.style.position = "fixed";
  menu.style.top = "50%";
  menu.style.left = "50%";
  menu.style.transform = "translate(-50%, -50%)";
  menu.style.background = "#1a3d1a"; 
  menu.style.color = "#e0ffe0"; 
  menu.style.padding = "20px 24px";
  menu.style.borderRadius = "12px";
  menu.style.boxShadow = "0 6px 18px rgba(0,0,0,0.5)";
  menu.style.zIndex = "100002";
  menu.style.maxWidth = "360px";
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

  const toggleParticles = menu.querySelector("#toggleParticles");
toggleParticles.checked = asetukset.particlesEnabled;

toggleParticles.addEventListener("change", () => {
  asetukset.particlesEnabled = toggleParticles.checked;
  tallennaAsetukset(asetukset);
  
  if (asetukset.particlesEnabled) {
    alustaPartikkelit(); 
  }
});


  const toggleHardMode = menu.querySelector("#toggleHardMode");
  toggleHardMode.checked = asetukset.hardMode;

  toggleHardMode.addEventListener("change", () => {
  asetukset.hardMode = toggleHardMode.checked;
  tallennaAsetukset(asetukset);
});

  const toggleDebugMode = menu.querySelector("#toggleDebugMode");
  toggleDebugMode.checked = asetukset.debugMode;

  toggleDebugMode.addEventListener("change", () => {
    asetukset.debugMode = toggleDebugMode.checked;
    tallennaAsetukset(asetukset);
    if (toggleDebugMode.checked) {
      alert("Debug mode on, lag may occur!");
    }
  });

  let menuVisible = false;

  function toggleMenu(state) {
    menuVisible = state;
    menu.style.display = state ? "block" : "none";
    overlay.style.display = state ? "block" : "none";
  }

  window.toggleMenu = toggleMenu; 

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

document.addEventListener("DOMContentLoaded", () => {

      const loadingScreen = document.getElementById("loadingScreen");
  if (loadingScreen) {
    loadingScreen.style.display = "none";
  }
  const style = document.createElement("style");
  style.textContent = `
    #mainMenu {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: radial-gradient(circle at center, #063f09 0%, #021a05 100%);
      color: #e8ffe8;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      z-index: 100000;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      text-align: center;
      box-shadow: inset 0 0 60px rgba(0, 255, 100, 0.15);
      animation: fadeIn 1s ease-out;
    }

    @keyframes fadeIn {
      from { opacity: 1; transform: scale(1.103); }
      to { opacity: 1; transform: scale(1); }
    }

    #mainMenu h2 {
      font-size: 36px;
      margin-bottom: 30px;
      color: #b6ffba;
      text-shadow: 0 0 6px rgba(50, 255, 100, 0.3);
    }

    #mainMenu button {
      margin: 12px;
      padding: 14px 32px;
      font-size: 20px;
      border: 2px solid #3f704d;
      border-radius: 12px;
      background: linear-gradient(to bottom, #2e7d32, #1b5e20);
      color: #eaffea;
      cursor: pointer;
      transition: all 0.25s ease-in-out;
      box-shadow: 0 0 12px rgba(0, 255, 100, 0.1), inset 0 0 6px rgba(255,255,255,0.05);
    }

    #mainMenu button:hover {
      background: #388e3c;
      color: #ffffff;
      border-color: #64dd17;
      box-shadow: 0 0 14px #64dd17, inset 0 0 6px #ffffff22;
    }
  `;
  document.head.appendChild(style);


  const mainMenu = document.createElement("div");
  mainMenu.id = "mainMenu";
  mainMenu.innerHTML = `
    <h2>Anna, kun selitän pelin</h2>
    <button id="startGameBtn">   Aloita peli   </button>
    <button id="viewScoresBtn">Statistiikkaa</button>
    <button id="settingsBtn">Asetukset</button>
    <button id="howToPlayBtn">Pelistä</button>

  `;
  document.body.appendChild(mainMenu);

  const hideGameElements = () => {
    document.getElementById("cardGrid").style.display = "none";
    document.getElementById("scoreBox").style.display = "none";
    document.getElementById("totalScoreBox").style.display = "none";
    document.getElementById("resetBtn").style.display = "none";
    document.getElementById("highScores").style.display = "none";
  };

  const showGameElements = () => {
    document.getElementById("cardGrid").style.display = "grid";
    document.getElementById("scoreBox").style.display = "block";
    document.getElementById("totalScoreBox").style.display = "block";
    document.getElementById("resetBtn").style.display = "inline-block";
    document.getElementById("highScores").style.display = "";
  };

  hideGameElements();
/*
    const bgMusic = document.createElement("audio");
  bgMusic.src = ""; 
  bgMusic.loop = true; 
  bgMusic.volume = 0.2; 
  document.body.appendChild(bgMusic);

  bgMusic.play().catch(() => {
    console.log("Musiikki eipäs lähtenyt.");
  });

*/
  document.getElementById("startGameBtn").addEventListener("click", () => {
    mainMenu.remove();
//    bgMusic.pause();
//    bgMusic.currentTime = 0;
    showGameElements();
    initGame();
    renderHighScores();
  });

  document.getElementById("viewScoresBtn").addEventListener("click", () => {
    document.getElementById("infoButton").click();
  });

  document.getElementById("settingsBtn").addEventListener("click", () => {
  if (typeof toggleMenu === "function") {
    toggleMenu(true);
  }
});


////////////////////////////////////////////////////////////
 //                Ohjehommeli Main Menu                 //
////////////////////////////////////////////////////////////

  const helpOverlay = document.createElement("div");
  Object.assign(helpOverlay.style, {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: "199998",
    display: "none"
  });

  const helpModal = document.createElement("div");
  Object.assign(helpModal.style, {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#2d4d2d",
    padding: "20px",
    color: "#fff",
    borderRadius: "10px",
    zIndex: "199999",
    maxWidth: "90%",
    textAlign: "left",
    fontFamily: "sans-serif",
    display: "none",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)"
  });

  helpModal.innerHTML = `
    <h3 style="margin-top: 0;">Pelistä</h3>
    <p>Peli on open-source peli! <a href=https://github.com/Mythreon/caksdaogpke>Pelin Github-sivu</a></p>
    <p>© 2025 <p>
    <p>Coded by Mythreon</p>
    <p>Music by Mythreon</p>
    <p>Idea by - <p>
    <p>(Most of the credit goes to -)</p>
    <button id="closeHelpBtn" style="
      margin-top: 15px;
      padding: 8px 16px;
      border: none;
      border-radius: 6px;
      background-color: #2d4d2d;
      color: white;
      font-size: 16px;
      cursor: pointer;
      box-shadow: 0 2px 6px rgba(0,0,0,0.3);
    ">Sulje</button>
  `;

  document.body.appendChild(helpOverlay);
  document.body.appendChild(helpModal);

  const helpBtn = document.getElementById("howToPlayBtn");
  const closeHelpBtn = helpModal.querySelector("#closeHelpBtn");

  helpBtn.addEventListener("click", () => {
    helpOverlay.style.display = "block";
    helpModal.style.display = "block";
  });

  closeHelpBtn.addEventListener("click", () => {
    helpOverlay.style.display = "none";
    helpModal.style.display = "none";
  });

  helpOverlay.addEventListener("click", () => {
    helpOverlay.style.display = "none";
    helpModal.style.display = "none";
  });
});

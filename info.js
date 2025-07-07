document.addEventListener("DOMContentLoaded", () => {
  const sessionStart = Date.now(); // Tallennetaan session alkamisaika

  const infoBtn = document.createElement("a");
  infoBtn.id = "infoButton";
  infoBtn.textContent = "(i)";

  Object.assign(infoBtn.style, {
    position: "fixed",
    top: "50px",
    left: "10px",
    backgroundColor: "rgba(6, 165, 0, 0.8)",
    padding: "6px 10px",
    borderRadius: "6px",
    color: "#222",
    fontWeight: "bold",
    fontSize: "16px",
    fontFamily: "sans-serif",
    cursor: "pointer",
    textDecoration: "none",
    zIndex: "10001",
    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
    transition: "color 0.2s ease",
  });

  infoBtn.addEventListener("mouseenter", () => {
    infoBtn.style.color = "#007bff";
  });

  infoBtn.addEventListener("mouseleave", () => {
    infoBtn.style.color = "#222";
  });

  document.body.appendChild(infoBtn);

  const overlay = document.createElement("div");
  overlay.id = "overlay";
  Object.assign(overlay.style, {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: "19999",
    display: "none",
  });

  const modal = document.createElement("div");
  modal.id = "infoModal";
  Object.assign(modal.style, {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    background: "darkgreen",
    color: "#000",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.4)",
    zIndex: "20000",
    display: "none",
    minWidth: "280px",
    maxWidth: "80vw",
    textAlign: "center",
    fontFamily: "sans-serif"
  });

  const statsText = document.createElement("div");
  statsText.id = "infoText";

  const closeButton = document.createElement("button");
  closeButton.textContent = "Sulje";
  Object.assign(closeButton.style, {
    marginTop: "15px",
    padding: "8px 16px",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "#388e3c",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
    boxShadow: "0 2px 6px rgba(0,0,0,0.3)"
  });

  closeButton.addEventListener("click", () => {
    modal.style.display = "none";
    overlay.style.display = "none";
  });

  overlay.addEventListener("click", () => {
    modal.style.display = "none";
    overlay.style.display = "none";
  });

  modal.appendChild(statsText);
  modal.appendChild(closeButton);
  document.body.appendChild(overlay);
  document.body.appendChild(modal);

  infoBtn.addEventListener("click", () => {
    const allScores = JSON.parse(localStorage.getItem("allScores") || "[]");
    const totalPoints = allScores.reduce((sum, s) => sum + s, 0);
    const totalGames = allScores.length;

    const totalTime = parseInt(localStorage.getItem("totalTimeSpent") || "0", 10);
    const minutes = Math.floor(totalTime / 60);
    const seconds = totalTime % 60;

    statsText.innerHTML = `
      <h3 style="margin-top: 0;">Pelitilastot</h3>
      <p>Pelatut pelit: <strong>${totalGames}</strong></p>
      <p>Kokonaistulokset: <strong>${totalPoints} pistettä</strong></p>
      <p>Aikaa käytetty sivustolla: <strong>${minutes} min ${seconds} s</strong></p>
    `;

    modal.style.display = "block";
    overlay.style.display = "block";
  });

  window.addEventListener("beforeunload", () => {
    const sessionDuration = Math.floor((Date.now() - sessionStart) / 1000); 
    const existingTime = parseInt(localStorage.getItem("totalTimeSpent") || "0", 10);
    localStorage.setItem("totalTimeSpent", existingTime + sessionDuration);
  });
});

// This by far was the hardest out of anything to create
  document.addEventListener("DOMContentLoaded", () => {
  const highScores = document.getElementById("highScores");
  if (!highScores) return;

  const overlay = document.createElement("div");
  overlay.id = "highScoresOverlay";
  Object.assign(overlay.style, {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "none",
    zIndex: "99998"
  });
  document.body.appendChild(overlay);

  // Desktop view (>=768px): always show in top right
  if (window.innerWidth >= 768) {
    Object.assign(highScores.style, {
      position: "fixed",
      top: "10px",
      right: "10px",
      transform: "none",
      backgroundColor: "rgba(0,92,11,0.2)",
      zIndex: "1000",
      display: "block",
      width: "200px",
      maxHeight: "80vh",
      overflowY: "auto",
      borderRadius: "8px",
      padding: "10px",
      boxShadow: "0 2px 5px rgba(0,0,0,0.2)"
    });
    return;
  }

  // --- MOBILE MODE ---

  Object.assign(highScores.style, {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: "99999",
    backgroundColor: "rgba(0,92,11,0.95)",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.6)",
    maxWidth: "90vw",
    maxHeight: "80vh",
    overflowY: "auto",
    display: "none"
  });

  const scoreBtn = document.createElement("div");
  scoreBtn.textContent = "1";
  Object.assign(scoreBtn.style, {
    position: "fixed",
    top: "10px",
    right: "10px",
    width: "40px",
    height: "40px",
    backgroundColor: "rgba(0, 92, 11, 0.8)",
    color: "#333",
    fontWeight: "bold",
    fontSize: "20px",
    borderRadius: "50%",
    textAlign: "center",
    lineHeight: "40px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
    cursor: "pointer",
    zIndex: "100000"
  });
  document.body.appendChild(scoreBtn);

  scoreBtn.addEventListener("click", () => {
    highScores.style.display = "block";
    overlay.style.display = "block";
  });

  overlay.addEventListener("click", () => {
    highScores.style.display = "none";
    overlay.style.display = "none";
  });
});

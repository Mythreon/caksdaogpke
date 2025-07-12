document.addEventListener("DOMContentLoaded", () => {
  const sessionStart = Date.now();

  const SECRET_SALT = "🧂salainenhommeliiniTortelliinilalalalalalalalalalalalalalalalallalal3573jnijnH8sfnSJNFSDSKFN98dNGNDGKJSNFOJSIDHG8dg87sguhdifhgp";
  const SECRET_ENCRYPTION_KEY = "superS4lted🔒keyTSAHUFSHdfdsojgkflSN9NGISNIJGNDF89GDNGInidngosjndgsd8g98goiGHSDGODNGkirjoitantahanjojotainettaseolisivaikeampaasaadaselville💜💜💜💜💜💜💜💜💜💜💖😳pariemojia💀😳ortelliini2025!";

  async function getKeyMaterial(password) {
    const enc = new TextEncoder();
    return crypto.subtle.importKey(
      "raw",
      enc.encode(password),
      { name: "PBKDF2" },
      false,
      ["deriveKey"]
    );
  }

  async function deriveKey(password) {
    const salt = new TextEncoder().encode("static-salt-used");
    const keyMaterial = await getKeyMaterial(password);
    return crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt,
        iterations: 100000,
        hash: "SHA-256"
      },
      keyMaterial,
      { name: "AES-GCM", length: 256 },
      false,
      ["encrypt", "decrypt"]
    );
  }

  async function encryptData(data, password) {
    const key = await deriveKey(password);
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encoded = new TextEncoder().encode(data);
    const ciphertext = await crypto.subtle.encrypt(
      { name: "AES-GCM", iv },
      key,
      encoded
    );
    return {
      iv: Array.from(iv),
      encrypted: btoa(String.fromCharCode(...new Uint8Array(ciphertext)))
    };
  }

  async function decryptData(encryptedData, ivArray, password) {
    const key = await deriveKey(password);
    const iv = new Uint8Array(ivArray);
    const data = Uint8Array.from(atob(encryptedData), c => c.charCodeAt(0));
    const decrypted = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv },
      key,
      data
    );
    return new TextDecoder().decode(decrypted);
  }

  function hashScore(scoreArray, secret = SECRET_SALT) {
    const data = scoreArray.join(",") + secret;
    let hash = 0;
    for (let i = 0; i < data.length; i++) {
      hash = ((hash << 5) - hash) + data.charCodeAt(i);
      hash |= 0;
    }
    return hash.toString();
  }

  function getSafeAllScores() {
    const raw = localStorage.getItem("allScores");
    const hash = localStorage.getItem("allScoresHash");
    if (!raw) return [];

    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        const expectedHash = hashScore(parsed);
        if (expectedHash === hash) {
          return parsed;
        } else {
          console.warn("⚠️ Huom: Pistetiedot voivat olla muokattuja!");
          alert("⚠️ Tallennettu pistetieto on mahdollisesti muokattu ja nollataan.");
          localStorage.removeItem("allScores");
          localStorage.removeItem("allScoresHash");
        }
      }
    } catch (e) {
      console.warn("Virheellinen pistedata: ", e);
    }

    return [];
  }

  function round(n) {
    return Math.round(n);
  }

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
    zIndex: "9998",
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
    zIndex: "199999",
    display: "none",
  });

  const modal = document.createElement("div");
  modal.id = "infoModal";
  Object.assign(modal.style, {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    background: "#2d4d2d",
    color: "#f0f0f0",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.4)",
    zIndex: "200000",
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

  const downloadButton = document.createElement("button");
  downloadButton.textContent = "Tallenna peli";
  Object.assign(downloadButton.style, {
    marginTop: "10px",
    marginLeft: "10px",
    padding: "8px 16px",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "#079300ff",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
    boxShadow: "0 2px 6px rgba(0,0,0,0.3)"
  });
  modal.appendChild(downloadButton);

  downloadButton.addEventListener("click", async () => {
    const allScores = getSafeAllScores();
    const averageScore = parseInt(localStorage.getItem("averageScore") || "0");
    const gamesCompleted = parseInt(localStorage.getItem("gamesCompleted") || "0");
    const totalTimeSpent = parseInt(localStorage.getItem("totalTimeSpent") || "0");
    const totalAces = parseInt(localStorage.getItem("totalAces") || "0");
    const totalMisses = parseInt(localStorage.getItem("totalMisses") || "0");
    const jokerCount = parseInt(localStorage.getItem("jokerCount") || "0");
    const scoreHash = hashScore(allScores);

    const rawData = JSON.stringify({
      gamesPlayed: gamesCompleted,
      averageScore,
      totalPoints: allScores.reduce((sum, s) => sum + s, 0),
      totalTimeSpent,
      totalAces,
      totalMisses,
      jokerCount,
      rawScores: allScores,
      scoreHash
    });

    const encrypted = await encryptData(rawData, SECRET_ENCRYPTION_KEY);

    const saveFile = {
      version: 1,
      iv: encrypted.iv,
      data: encrypted.encrypted
    };

    const blob = new Blob([JSON.stringify(saveFile, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "saveGameKorttipeli.json";
    a.click();
    URL.revokeObjectURL(url);
  });

  const loadButton = document.createElement("button");
  loadButton.textContent = "Lataa tallennettu peli";
  Object.assign(loadButton.style, {
    marginTop: "10px",
    marginLeft: "10px",
    padding: "8px 16px",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "#058f00ff",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
    boxShadow: "0 2px 6px rgba(0,0,0,0.3)"
  });
  modal.appendChild(loadButton);

  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = ".json";
  fileInput.style.display = "none";
  document.body.appendChild(fileInput);

  loadButton.addEventListener("click", () => {
    fileInput.click();
  });

  fileInput.addEventListener("change", async () => {
    const file = fileInput.files[0];
    if (!file) return;

    try {
      const text = await file.text();
      const save = JSON.parse(text);

      if (!save.data || !save.iv || !Array.isArray(save.iv)) {
        alert("Virheellinen tiedostomuoto.");
        return;
      }

      const decrypted = await decryptData(save.data, save.iv, SECRET_ENCRYPTION_KEY);
      const parsed = JSON.parse(decrypted);

      const {
        gamesPlayed,
        averageScore,
        totalPoints,
        totalTimeSpent,
        totalAces,
        totalMisses,
        jokerCount,
        rawScores,
        scoreHash
      } = parsed;

      const computedHash = hashScore(rawScores);
      if (computedHash !== scoreHash) {
        alert("⚠️ Tiedoston tarkistussumma ei täsmää. Tallennus saatettu muokata käsin.");
        return;
      }

      localStorage.setItem("allScores", JSON.stringify(rawScores));
      localStorage.setItem("allScoresHash", scoreHash);
      localStorage.setItem("averageScore", averageScore.toString());
      localStorage.setItem("gamesCompleted", gamesPlayed.toString());
      localStorage.setItem("totalTimeSpent", totalTimeSpent.toString());
      localStorage.setItem("totalAces", totalAces.toString());
      localStorage.setItem("totalMisses", totalMisses.toString());
      localStorage.setItem("jokerCount", jokerCount.toString());

      alert("Tallennus ladattu onnistuneesti!");
      window.location.reload();

    } catch (err) {
      alert("Tiedoston purku epäonnistui.");
      console.error("Decryption/load error:", err);
    }
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
  const allScores = getSafeAllScores();
  const totalPoints = round(allScores.reduce((sum, s) => sum + s, 0));
  const totalGames = allScores.length;

  const totalTime = parseInt(localStorage.getItem("totalTimeSpent") || "0", 10);
  const hours = Math.floor(totalTime / 3600);
  const minutes = Math.floor((totalTime % 3600) / 60);
  const seconds = totalTime % 60;

  const jokerCount = parseInt(localStorage.getItem("jokerCount") || "0");
  const averageScore = parseInt(localStorage.getItem("averageScore") || "0");
  const gamesCompleted = parseInt(localStorage.getItem("gamesCompleted") || "0");
  const totalAces = parseInt(localStorage.getItem("totalAces") || "0");
  const totalMisses = parseInt(localStorage.getItem("totalMisses") || "0");

  let timeText;
  if (hours > 0) {
    timeText = `${hours} tuntia ${minutes} minuuttia`;
  } else {
    timeText = `${minutes} min ${seconds} s`;
  }

  statsText.innerHTML = `
    <h3 style="margin-top: 0;">Pelitilastot</h3>
    <p> Pelatut pelit: <strong>${totalGames}</strong></p>
    <p> Keskimääräinen pistemäärä: <strong>${averageScore}</strong></p>
    <p> Kokonaistulokset: <strong>${totalPoints} pistettä</strong></p>
    <p> Aikaa käytetty sivustolla: <strong>${timeText}</strong></p>
    <p> Ässiä yhteensä: <strong>${totalAces}</strong></p>
    <p> Huteja yhteensä: <strong>${totalMisses}</strong></p>
    <p> Jokereita nähty: <strong>${jokerCount}</strong></p>
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

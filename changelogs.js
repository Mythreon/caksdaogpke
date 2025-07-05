document.addEventListener("DOMContentLoaded", () => {
  const changelogBtn = document.createElement("a");
  changelogBtn.textContent = "📝 Changelog";
  changelogBtn.style.cursor = "pointer";

  const header = document.querySelector("header");
  if (header) {
    header.appendChild(changelogBtn);
  }

  const changelogBox = document.createElement("div");
  changelogBox.id = "changelogBox";
  changelogBox.innerHTML = `
    <h3 style="margin-top: 0;">Muutokset</h3>
    <ul>
    <li><strong>v1.0.11</strong> - Korjattu hutien lasku</li>
    <li><strong>v1.0.1</strong> - Lisätty Changelog-painike ja korjattu tiettyjä ongelmia</li>
    <li><strong>v1.0</strong> - Ensijulkaisu.</li>
    </ul>
  `;
  changelogBox.style.position = "fixed";
  changelogBox.style.top = "50px";
  changelogBox.style.left = "10px";
  changelogBox.style.background = "rgba(63, 162, 10, 0.86)";
  changelogBox.style.color = "#222";
  changelogBox.style.padding = "12px 16px";
  changelogBox.style.borderRadius = "8px";
  changelogBox.style.boxShadow = "0 2px 8px rgba(0,0,0,0.3)";
  changelogBox.style.maxWidth = "250px";
  changelogBox.style.display = "none";
  changelogBox.style.zIndex = "10001";
  changelogBox.style.fontFamily = "sans-serif";
  changelogBox.style.fontSize = "14px";

  document.body.appendChild(changelogBox);

  let visible = false;
  changelogBtn.addEventListener("click", () => {
    visible = !visible;
    changelogBox.style.display = visible ? "block" : "none";
  });
});

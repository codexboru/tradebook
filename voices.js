// voices.js

export let voices = [];

// 🜁 Stimme speichern
export function saveVoice(data) {
  voices.push(data);
  updateLocalStorage();
}

// 🜂 Stimme visuell darstellen
export function renderVoice(data) {
  const box = document.createElement("div");
  box.className = `voice-box ${data.direction === "LONG" ? "long" : "short"}`;
  box.innerHTML = `
    <strong>${data.direction === "LONG" ? "🟢🜂" : "🔴🜂"} ${data.username}</strong><br>
    Entry: ${data.entry} | Leverage: ${data.leverage}x | Size: ${data.size}<br>
    Liq: ${data.liq} | PnL: ${data.pnl} | ROI: ${data.roi}%<br>
    Richtung: ${data.direction}<br>
    <small>${data.time}</small>
  `;
  document.getElementById("voiceContainer").appendChild(box);
}

// 🜃 Speicher aktualisieren
export function updateLocalStorage() {
  localStorage.setItem("voices", JSON.stringify(voices));
}

// 🜄 Stimme löschen (nach Index)
export function deleteVoice(index) {
  voices.splice(index, 1);
  updateLocalStorage();
}

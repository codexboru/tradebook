// main.js

import { voices, saveVoice, renderVoice, updateLocalStorage, deleteVoice } from './voices.js';
import { renderTableRow, renderTable } from './table.js';
import { exportVoices, restoreVoices } from './export.js';

// 🜁 Initiales Laden der gespeicherten Stimmen
window.onload = function() {
  const stored = localStorage.getItem("voices");
  if (stored) {
    const parsed = JSON.parse(stored);
    parsed.forEach(v => {
      voices.push(v);
      renderVoice(v);
      renderTableRow(v, voices.length - 1); // Index korrekt setzen
    });
  }
};

// 🜂 Neue Stimme speichern und darstellen
window.saveVoiceHandler = function() {
  const direction = document.getElementById("direction").value;
  if (direction !== "LONG" && direction !== "SHORT") {
    alert("Nur LONG oder SHORT erlaubt.");
    return;
  }

  const data = {
    username: document.getElementById("username").value,
    entry: document.getElementById("entry").value,
    leverage: document.getElementById("leverage").value,
    size: document.getElementById("size").value,
    liq: document.getElementById("liq").value,
    pnl: document.getElementById("pnl").value,
    roi: document.getElementById("roi").value,
    direction: direction,
    time: new Date().toLocaleString("de-DE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    })
  };

  saveVoice(data);
  renderVoice(data);
  renderTableRow(data, voices.length - 1);
};

// 🜃 Stimme löschen und Tabelle neu rendern
window.deleteVoiceAndRender = function(index) {
  deleteVoice(index);   // Modul aus voices.js
  renderTable();        // Modul aus table.js
};

// 🜄 Export & Wiederherstellung
window.exportVoicesHandler = exportVoices;
window.restoreVoicesHandler = restoreVoices;

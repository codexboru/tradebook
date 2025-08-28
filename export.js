// export.js
import { voices, updateLocalStorage, renderVoice } from './voices.js';
import { renderTableRow } from './table.js';

export function exportVoices() {
  const blob = new Blob([JSON.stringify(voices, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "codexbtc.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function restoreVoices(input) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const restored = JSON.parse(e.target.result);
      if (!Array.isArray(restored)) throw new Error("Ungültiges Format");
      voices.length = 0;
      restored.forEach(v => voices.push(v));
      updateLocalStorage();
      document.getElementById("voiceContainer").innerHTML = "";
      document.getElementById("voicesBody").innerHTML = "";
      voices.forEach(v => {
        renderVoice(v);
        renderTableRow(v);
      });
    } catch (err) {
      alert("Fehler beim Wiederherstellen: " + err.message);
    }
  };
  reader.readAsText(file);
}
